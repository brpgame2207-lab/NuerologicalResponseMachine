import React, { createContext, useContext, useState, useEffect } from 'react';

export interface TestAttempt {
  id: string;
  module: 
    | 'visual-reflex' 
    | 'memory-tile' 
    | 'focus-endurance' 
    | 'game-catch' 
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
  const [history, setHistory] = useState<TestAttempt[]>([]);
  const [scores, setScores] = useState<PerformanceScores>({
    npi: 0,
    reflex: 0,
    memory: 0,
    focus: 0,
    endurance: 0,
    cognitive: 0,
    accuracy: 0,
  });

  // Load history from local storage on mount
  useEffect(() => {
    const saved = localStorage.getItem('nras_history');
    if (saved) {
      try {
        setHistory(JSON.parse(saved));
      } catch (e) {
        console.error('Failed to parse neurological history', e);
      }
    } else {
      // Seed initial mock scientific data if empty to show dashboard state on first visit
      const seedData = seedMockData();
      localStorage.setItem('nras_history', JSON.stringify(seedData));
      setHistory(seedData);
    }
  }, []);

  // Update scores whenever history changes
  useEffect(() => {
    if (history.length === 0) {
      setScores({
        npi: 0,
        reflex: 0,
        memory: 0,
        focus: 0,
        endurance: 0,
        cognitive: 0,
        accuracy: 0,
      });
      return;
    }

    // Filter attempts by category
    const reflexAttempts = history.filter(h => 
      h.module === 'visual-reflex' || h.module === 'game-catch' || h.module === 'game-pop'
    );
    const memoryAttempts = history.filter(h => h.module === 'memory-tile');
    const focusAttempts = history.filter(h => h.module === 'focus-endurance');
    const cognitiveAttempts = history.filter(h => 
      h.module === 'game-stroop' || h.module === 'game-direction'
    );

    // Calculate sub-scores (default to 50 if no attempts, to indicate baseline)
    const getAvgScore = (attempts: TestAttempt[], fallback = 60) => {
      if (attempts.length === 0) return fallback;
      const sum = attempts.reduce((acc, curr) => acc + curr.score, 0);
      return Math.round(sum / attempts.length);
    };

    const reflex = getAvgScore(reflexAttempts, 70);
    const memory = getAvgScore(memoryAttempts, 65);
    const focus = getAvgScore(focusAttempts, 68);

    // Endurance can be calculated based on focus duration + fatigue index + success rate
    const endurance = focusAttempts.length > 0 
      ? Math.round(
          focusAttempts.reduce((acc, curr) => {
            const fatigueBonus = curr.rawMetrics.fatigueIndex ? (1 - curr.rawMetrics.fatigueIndex) * 100 : 80;
            const accuracyWeight = curr.accuracy;
            return acc + (fatigueBonus * 0.4 + accuracyWeight * 0.6);
          }, 0) / focusAttempts.length
        )
      : 64;

    const cognitive = getAvgScore(cognitiveAttempts, 66);
    
    // Global accuracy is average accuracy of all attempts
    const accuracy = Math.round(
      history.reduce((acc, curr) => acc + curr.accuracy, 0) / history.length
    );

    // NPI Formula: NPI = 0.25*Reflex + 0.20*Memory + 0.20*Focus + 0.20*Cognitive + 0.15*Accuracy
    const npi = Math.round(
      0.25 * reflex +
      0.20 * memory +
      0.20 * focus +
      0.20 * cognitive +
      0.15 * accuracy
    );

    setScores({
      npi,
      reflex,
      memory,
      focus,
      endurance,
      cognitive,
      accuracy,
    });
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
      module: 'game-catch',
      timestamp: generateDate(0),
      score: 90,
      accuracy: 96,
      responseTime: 320,
      rawMetrics: { caughtCount: 24, missedCount: 1 }
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
