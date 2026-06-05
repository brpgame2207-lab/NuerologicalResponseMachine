import React, { createContext, useContext, useState } from 'react';

export interface TestAttempt {
  id: string;
  module: 
    | 'visual-reflex' 
    | 'memory-tile' 
    | 'focus-endurance' 
    | 'game-pop' 
    | 'game-direction' 
    | 'game-stroop';
  timestamp: string; // ISO date string
  score: number; // 0 - 100
  accuracy: number; // 0 - 100 %
  responseTime?: number; // ms, optional
  rawMetrics: {
    // Visual reflex
    bestTime?: number;
    avgTime?: number;
    attemptsCount?: number;
    // Memory tile
    gridSize?: number;
    correctTilesCount?: number;
    totalTilesCount?: number;
    // Focus endurance
    duration?: number;
    hits?: number;
    misses?: number;
    falseClicks?: number;
    fatigueIndex?: number; // 0 - 1
    // Game catch
    caughtCount?: number;
    missedCount?: number;
    // Game pop
    targetsPopped?: number;
    // Game direction
    correctKeys?: number;
    totalKeys?: number;
    // Game stroop
    conflictCorrect?: number;
    conflictTotal?: number;
    [key: string]: any;
  };
}

interface PerformanceScores {
  npi: number;
  reflex: number;
  memory: number;
  focus: number;
  endurance: number;
  cognitive: number;
  accuracy: number;
}

interface ProgressContextType {
  history: TestAttempt[];
  scores: PerformanceScores;
  addAttempt: (attempt: Omit<TestAttempt, 'id' | 'timestamp'>) => void;
  clearHistory: () => void;
  getPerformanceCategory: (score: number) => 'Elite' | 'Excellent' | 'Good' | 'Average' | 'Needs Improvement';
}

const ProgressContext = createContext<ProgressContextType | undefined>(undefined);

export const useProgress = () => {
  const context = useContext(ProgressContext);
  if (!context) {
    throw new Error('useProgress must be used within a ProgressProvider');
  }
  return context;
};

// Help helper to evaluate response categorization
const getPerformanceCategory = (score: number): 'Elite' | 'Excellent' | 'Good' | 'Average' | 'Needs Improvement' => {
  if (score >= 90) return 'Elite';
  if (score >= 80) return 'Excellent';
  if (score >= 70) return 'Good';
  if (score >= 50) return 'Average';
  return 'Needs Improvement';
};

export const ProgressProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [history, setHistory] = useState<TestAttempt[]>(() => {
    const saved = localStorage.getItem('nras_history');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        console.error('Failed to parse neurological history', e);
      }
    }
    // Seed initial mock scientific data if empty to show dashboard state on first visit
    const seedData = seedMockData();
    localStorage.setItem('nras_history', JSON.stringify(seedData));
    return seedData;
  });

  // Derived scores calculation via useMemo to avoid cascading renders
  const scores = React.useMemo<PerformanceScores>(() => {
    if (history.length === 0) {
      return { npi: 0, reflex: 0, memory: 0, focus: 0, endurance: 0, cognitive: 0, accuracy: 0 };
    }

    /**
     * Each module contributes partial weights to each dimension (0–1).
     * Weights sum tells how "pure" each module is for a dimension.
     * E.g. visual-reflex is 100% reflex, game-direction is 50% reflex + 50% cognitive.
     */
    type Dim = 'reflex' | 'memory' | 'focus' | 'endurance' | 'cognitive';
    const moduleContrib: Record<string, Partial<Record<Dim, number>>> = {
      'visual-reflex':   { reflex: 1.0 },
      'memory-tile':     { memory: 1.0 },
      'focus-endurance': { focus: 0.5, endurance: 0.5 },
      'game-pop':        { reflex: 0.6, cognitive: 0.4 },
      'game-direction':  { reflex: 0.5, cognitive: 0.5 },
      'game-stroop':     { cognitive: 0.7, focus: 0.3 },
    };

    // For each dimension: accumulate weighted score sum and total weight
    const dimAccum: Record<Dim, { wSum: number; wTotal: number }> = {
      reflex:    { wSum: 0, wTotal: 0 },
      memory:    { wSum: 0, wTotal: 0 },
      focus:     { wSum: 0, wTotal: 0 },
      endurance: { wSum: 0, wTotal: 0 },
      cognitive: { wSum: 0, wTotal: 0 },
    };

    history.forEach(h => {
      const contrib = moduleContrib[h.module];
      if (!contrib) return;

      // Special endurance calculation for focus-endurance module
      const effectiveScore = (h.module === 'focus-endurance' && contrib.endurance)
        ? Math.round(
            (h.rawMetrics.fatigueIndex != null
              ? (1 - h.rawMetrics.fatigueIndex) * 100 * 0.4
              : h.score * 0.4) +
            h.accuracy * 0.6
          )
        : h.score;

      (Object.keys(contrib) as Dim[]).forEach(dim => {
        const w = contrib[dim]!;
        dimAccum[dim].wSum   += effectiveScore * w;
        dimAccum[dim].wTotal += w;
      });
    });

    // Compute each dimension avg; 0 if no data at all for that dimension
    const avg = (dim: Dim) =>
      dimAccum[dim].wTotal > 0
        ? Math.round(dimAccum[dim].wSum / dimAccum[dim].wTotal)
        : 0;

    const reflex    = avg('reflex');
    const memory    = avg('memory');
    const focus     = avg('focus');
    const endurance = avg('endurance');
    const cognitive = avg('cognitive');

    // Global accuracy = average accuracy across ALL attempts (every module)
    const accuracy = Math.round(
      history.reduce((acc, h) => acc + h.accuracy, 0) / history.length
    );

    /**
     * NPI formula — dimension weights only count populated dimensions,
     * so playing only games still gives a fair score rather than being
     * dragged down by 0-valued unplayed dimensions.
     */
    const dimWeights: Record<Dim, number> = {
      reflex:    0.25,
      memory:    0.20,
      focus:     0.20,
      endurance: 0.10,
      cognitive: 0.20,
    };
    const accuracyWeight = 0.05;

    let npiWeightedSum = accuracy * accuracyWeight;
    let npiTotalWeight = accuracyWeight;

    (Object.keys(dimWeights) as Dim[]).forEach(dim => {
      if (dimAccum[dim].wTotal > 0) {
        npiWeightedSum += avg(dim) * dimWeights[dim];
        npiTotalWeight += dimWeights[dim];
      }
    });

    const npi = Math.min(100, Math.round(npiWeightedSum / npiTotalWeight));

    return { npi, reflex, memory, focus, endurance, cognitive, accuracy };
  }, [history]);


  const addAttempt = (attempt: Omit<TestAttempt, 'id' | 'timestamp'>) => {
    const newAttempt: TestAttempt = {
      ...attempt,
      id: Math.random().toString(36).substring(2, 11),
      timestamp: new Date().toISOString(),
    };
    
    setHistory(prev => {
      const updated = [newAttempt, ...prev];
      localStorage.setItem('nras_history', JSON.stringify(updated));
      return updated;
    });
  };

  const clearHistory = () => {
    localStorage.removeItem('nras_history');
    setHistory([]);
  };

  return (
    <ProgressContext.Provider value={{ history, scores, addAttempt, clearHistory, getPerformanceCategory }}>
      {children}
    </ProgressContext.Provider>
  );
};

// Seed initial research records so visual dashboards contain scientific data immediately
function seedMockData(): TestAttempt[] {
  const baseDate = new Date();
  const generateDate = (daysAgo: number) => {
    const d = new Date(baseDate);
    d.setDate(baseDate.getDate() - daysAgo);
    return d.toISOString();
  };

  return [
    {
      id: 'mock-1',
      module: 'visual-reflex',
      timestamp: generateDate(4),
      score: 82,
      accuracy: 100,
      responseTime: 232,
      rawMetrics: { bestTime: 210, avgTime: 232, attemptsCount: 5 }
    },
    {
      id: 'mock-2',
      module: 'memory-tile',
      timestamp: generateDate(4),
      score: 75,
      accuracy: 80,
      responseTime: 1800,
      rawMetrics: { gridSize: 16, correctTilesCount: 8, totalTilesCount: 10 }
    },
    {
      id: 'mock-3',
      module: 'focus-endurance',
      timestamp: generateDate(3),
      score: 78,
      accuracy: 88,
      responseTime: 450,
      rawMetrics: { duration: 60, hits: 22, misses: 3, falseClicks: 1, fatigueIndex: 0.18 }
    },
    {
      id: 'mock-4',
      module: 'game-stroop',
      timestamp: generateDate(3),
      score: 85,
      accuracy: 90,
      responseTime: 650,
      rawMetrics: { conflictCorrect: 18, conflictTotal: 20 }
    },
    {
      id: 'mock-5',
      module: 'visual-reflex',
      timestamp: generateDate(2),
      score: 88,
      accuracy: 100,
      responseTime: 204,
      rawMetrics: { bestTime: 195, avgTime: 204, attemptsCount: 5 }
    },
    {
      id: 'mock-6',
      module: 'memory-tile',
      timestamp: generateDate(2),
      score: 85,
      accuracy: 90,
      responseTime: 1600,
      rawMetrics: { gridSize: 16, correctTilesCount: 9, totalTilesCount: 10 }
    },
    {
      id: 'mock-7',
      module: 'game-direction',
      timestamp: generateDate(1),
      score: 80,
      accuracy: 95,
      responseTime: 410,
      rawMetrics: { correctKeys: 19, totalKeys: 20 }
    },
    {
      id: 'mock-8',
      module: 'focus-endurance',
      timestamp: generateDate(1),
      score: 84,
      accuracy: 92,
      responseTime: 420,
      rawMetrics: { duration: 90, hits: 36, misses: 2, falseClicks: 1, fatigueIndex: 0.14 }
    },
    {
      id: 'mock-9',
      module: 'game-pop',
      timestamp: generateDate(0),
      score: 88,
      accuracy: 93,
      responseTime: 310,
      rawMetrics: { targetsPopped: 21 }
    },
    {
      id: 'mock-10',
      module: 'visual-reflex',
      timestamp: generateDate(0),
      score: 94,
      accuracy: 100,
      responseTime: 182,
      rawMetrics: { bestTime: 178, avgTime: 182, attemptsCount: 5 }
    }
  ];
}
