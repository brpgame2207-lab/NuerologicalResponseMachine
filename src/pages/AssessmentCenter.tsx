import React, { useState, useEffect, useRef } from 'react';
import { 
  Brain, 
  Timer, 
  HelpCircle, 
  Sparkles, 
  AlertTriangle, 
  Grid, 
  ShieldCheck,
  Target,
  RefreshCw,
  Gauge
} from 'lucide-react';
import { useProgress } from '../context/ProgressContext';
import GlassCard from '../components/GlassCard';

type AssessmentModule = 'visual-reflex' | 'memory-tile' | 'focus-endurance' | null;

export const AssessmentCenter: React.FC = () => {
  const [activeModule, setActiveModule] = useState<AssessmentModule>(null);
  const { addAttempt, getPerformanceCategory } = useProgress();

  return (
    <div className="space-y-6">
      {/* Navigation header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center border-b border-slate-800 pb-4 gap-4">
        <div>
          <h1 className="text-3xl font-extrabold tracking-tight">Assessment Center</h1>
          <p className="text-sm text-slate-400">Measure, calibrate, and record neurological response baselines.</p>
        </div>
        {activeModule && (
          <button 
            onClick={() => setActiveModule(null)}
            className="text-xs font-mono text-cyan-400 hover:text-cyan-300 border border-cyan-500/20 bg-cyan-500/5 px-3 py-1.5 rounded-lg flex items-center space-x-1.5 transition-colors"
          >
            <RefreshCw className="h-3.5 w-3.5" />
            <span>RETURN TO MODULE SELECTOR</span>
          </button>
        )}
      </div>

      {!activeModule ? (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Module 1 Card */}
          <GlassCard glowColor="cyan" className="flex flex-col justify-between h-[360px]">
            <div className="space-y-4">
              <div className="flex justify-between items-start">
                <div className="bg-cyan-500/10 p-2 rounded-lg border border-cyan-500/30 text-cyan-400">
                  <Timer className="h-6 w-6" />
                </div>
                <span className="text-[10px] text-cyan-400 font-mono tracking-wider bg-cyan-500/5 px-2 py-0.5 rounded border border-cyan-500/20">
                  MODULE 1
                </span>
              </div>
              <h3 className="text-xl font-bold">Visual Reflex Checker</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Measures absolute synaptic processing speed. Detects latency from photo-reception on the retina, trans-axonal conduction through the optic tract, somatic decision-making in the cortex, and peripheral motor contraction.
              </p>
              <div className="text-[10px] text-slate-500 font-mono">
                ⚡ Latency Scale: Elite (&lt;200ms) | Good (250-320ms)
              </div>
            </div>
            <button 
              onClick={() => setActiveModule('visual-reflex')}
              className="w-full bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold py-2.5 rounded-lg text-sm transition-colors mt-4"
            >
              Initialize Module
            </button>
          </GlassCard>

          {/* Module 2 Card */}
          <GlassCard glowColor="purple" className="flex flex-col justify-between h-[360px]">
            <div className="space-y-4">
              <div className="flex justify-between items-start">
                <div className="bg-purple-500/10 p-2 rounded-lg border border-purple-500/30 text-purple-400">
                  <Grid className="h-6 w-6" />
                </div>
                <span className="text-[10px] text-purple-400 font-mono tracking-wider bg-purple-500/5 px-2 py-0.5 rounded border border-purple-500/20">
                  MODULE 2
                </span>
              </div>
              <h3 className="text-xl font-bold">Color Tile Memory</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Assesses temporary spatial and chromatic memory. Lights up an active grid sequence. Relies on the working memory capacity of the prefrontal cortex and spatial encoding loops within the hippocampus.
              </p>
              <div className="text-[10px] text-slate-500 font-mono">
                🧠 Target Metrics: Recall accuracy & recognition speed
              </div>
            </div>
            <button 
              onClick={() => setActiveModule('memory-tile')}
              className="w-full bg-purple-600 hover:bg-purple-500 text-white font-bold py-2.5 rounded-lg text-sm transition-colors mt-4"
            >
              Initialize Module
            </button>
          </GlassCard>

          {/* Module 3 Card */}
          <GlassCard glowColor="green" className="flex flex-col justify-between h-[360px]">
            <div className="space-y-4">
              <div className="flex justify-between items-start">
                <div className="bg-emerald-500/10 p-2 rounded-lg border border-emerald-500/30 text-emerald-400">
                  <Target className="h-6 w-6" />
                </div>
                <span className="text-[10px] text-emerald-400 font-mono tracking-wider bg-emerald-500/5 px-2 py-0.5 rounded border border-emerald-500/20">
                  MODULE 3
                </span>
              </div>
              <h3 className="text-xl font-bold">Focus Endurance Test</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Quantifies sustained visual attention (vigilance) and distractor inhibition. Over a prolonged span, clicking active green targets while filtering purple distractors measures cognitive fatigue accumulation.
              </p>
              <div className="text-[10px] text-slate-500 font-mono">
                🎯 Target Metrics: Attention stability & fatigue index
              </div>
            </div>
            <button 
              onClick={() => setActiveModule('focus-endurance')}
              className="w-full bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold py-2.5 rounded-lg text-sm transition-colors mt-4"
            >
              Initialize Module
            </button>
          </GlassCard>
        </div>
      ) : (
        <div className="space-y-6">
          {activeModule === 'visual-reflex' && <VisualReflexModule addAttempt={addAttempt} getPerformanceCategory={getPerformanceCategory} />}
          {activeModule === 'memory-tile' && <MemoryTileModule addAttempt={addAttempt} />}
          {activeModule === 'focus-endurance' && <FocusEnduranceModule addAttempt={addAttempt} />}
        </div>
      )}
    </div>
  );
};

/* ==========================================
   MODULE 1: VISUAL REFLEX CHECKER
   ========================================== */
interface ModuleProps {
  addAttempt: (attempt: any) => void;
  getPerformanceCategory: (score: number) => string;
}

const VisualReflexModule: React.FC<ModuleProps> = ({ addAttempt, getPerformanceCategory }) => {
  const [phase, setPhase] = useState<'idle' | 'preparing' | 'waiting' | 'green' | 'result' | 'misfire'>('idle');
  const [attempts, setAttempts] = useState<number[]>([]);
  const timerRef = useRef<any>(null);
  const startTimeRef = useRef<number>(0);

  // Clean timer on unmount
  useEffect(() => {
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, []);

  const handleStartTest = () => {
    setPhase('preparing');
    // Simulated diagnostic checks
    timerRef.current = setTimeout(() => {
      setPhase('waiting');
      const randomDelay = Math.random() * 4000 + 2000; // 2s - 6s
      
      timerRef.current = setTimeout(() => {
        setPhase('green');
        startTimeRef.current = performance.now();
      }, randomDelay);

    }, 1200);
  };

  const handleTriggerClick = () => {
    if (phase === 'waiting' || phase === 'preparing') {
      // Early misfire
      if (timerRef.current) clearTimeout(timerRef.current);
      setPhase('misfire');
    } else if (phase === 'green') {
      const clickTime = performance.now();
      const reactionTime = Math.round(clickTime - startTimeRef.current);
      
      const updatedAttempts = [...attempts, reactionTime];
      setAttempts(updatedAttempts);
      setPhase('result');

      // Calculate relative reflex score: e.g. base limit 400ms = 50 pts, 180ms = 95 pts.
      const score = Math.max(10, Math.min(100, Math.round(100 - (reactionTime - 170) / 4.5)));
      
      addAttempt({
        module: 'visual-reflex',
        score,
        accuracy: 100,
        responseTime: reactionTime,
        rawMetrics: {
          bestTime: Math.min(...updatedAttempts),
          avgTime: Math.round(updatedAttempts.reduce((a, b) => a + b, 0) / updatedAttempts.length),
          attemptsCount: updatedAttempts.length
        }
      });
    }
  };

  const currentResult = attempts.length > 0 ? attempts[attempts.length - 1] : 0;
  const bestTime = attempts.length > 0 ? Math.min(...attempts) : 0;
  const avgTime = attempts.length > 0 ? Math.round(attempts.reduce((a,b)=>a+b, 0) / attempts.length) : 0;
  
  // Consistency: standard deviation of reaction times (lower is more consistent)
  const calculateConsistency = () => {
    if (attempts.length <= 1) return 100;
    const mean = avgTime;
    const variance = attempts.reduce((acc, v) => acc + Math.pow(v - mean, 2), 0) / attempts.length;
    const stdDev = Math.sqrt(variance);
    // scale to 0-100 score where lower stdDev is closer to 100 consistency
    return Math.max(10, Math.min(100, Math.round(100 - stdDev * 1.5)));
  };

  const consistency = calculateConsistency();

  // Get performance category label
  const category = getPerformanceCategory(
    Math.max(10, Math.min(100, Math.round(100 - (currentResult - 170) / 4.5)))
  );

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      {/* Active Testing Module */}
      <GlassCard glowColor="cyan" className="lg:col-span-2 flex flex-col justify-between space-y-6">
        <div className="flex justify-between items-center border-b border-slate-800 pb-3">
          <div className="flex items-center space-x-2">
            <Timer className="h-5 w-5 text-cyan-400" />
            <h2 className="text-lg font-bold">Latency Assay Panel</h2>
          </div>
          <span className="text-xs text-slate-400 font-mono">TESTS RUN: {attempts.length}</span>
        </div>

        {/* Trigger Target Box */}
        <div 
          onClick={handleTriggerClick}
          className={`
            h-64 rounded-xl flex flex-col items-center justify-center text-center cursor-pointer select-none transition-all duration-150 border-2 relative overflow-hidden
            ${phase === 'idle' ? 'bg-slate-950/60 border-slate-800 hover:border-slate-700' : ''}
            ${phase === 'preparing' ? 'bg-slate-900 border-yellow-500/30' : ''}
            ${phase === 'waiting' ? 'bg-[#991b1b]/20 border-red-500/50 hover:bg-[#991b1b]/30' : ''}
            ${phase === 'green' ? 'bg-[#10b981]/30 border-emerald-400 shadow-[0_0_35px_rgba(16,185,129,0.2)]' : ''}
            ${phase === 'result' ? 'bg-slate-950/60 border-cyan-500/40 hover:border-cyan-500/60' : ''}
            ${phase === 'misfire' ? 'bg-red-950/40 border-rose-600/50' : ''}
          `}
        >
          {phase === 'idle' && (
            <div className="space-y-2 pointer-events-none">
              <span className="text-sm font-mono text-cyan-400 block tracking-wider">SYSTEM CALIBRATED</span>
              <button 
                onClick={(e) => { e.stopPropagation(); handleStartTest(); }}
                className="bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold px-6 py-2.5 rounded-lg text-sm shadow-[0_0_15px_rgba(0,229,255,0.2)] transition-colors pointer-events-auto"
              >
                Click To Initiate Sensor
              </button>
            </div>
          )}

          {phase === 'preparing' && (
            <div className="space-y-2 font-mono text-xs">
              <RefreshCw className="h-6 w-6 text-yellow-400 animate-spin mx-auto" />
              <p className="text-yellow-400 tracking-wider">INITIATING PHOTO-RECEIVE CHANNEL...</p>
              <p className="text-slate-500">Wait for stimulus signal.</p>
            </div>
          )}

          {phase === 'waiting' && (
            <div className="space-y-1 text-center">
              <span className="text-4xl font-extrabold text-red-500 animate-pulse tracking-wide block">STATIONARY</span>
              <p className="text-xs font-mono text-slate-400 uppercase tracking-widest mt-2">WAIT FOR GREEN SIGNAL</p>
              <p className="text-[10px] text-slate-500 font-mono">(Clicking now will cause synaptic misfire)</p>
            </div>
          )}

          {phase === 'green' && (
            <div className="space-y-1 text-center">
              <span className="text-5xl font-black text-emerald-400 tracking-widest animate-bounce block">CLICK NOW!</span>
              <p className="text-xs font-mono text-emerald-200 tracking-widest">TRANSMIT MOTOR ACTION POTENTIAL</p>
            </div>
          )}

          {phase === 'result' && (
            <div className="space-y-3">
              <span className="text-xs font-mono text-cyan-400 block uppercase tracking-widest">ASSAY COMPLETED</span>
              <div className="text-5xl font-black text-white font-mono tracking-tighter">
                {currentResult} <span className="text-xs text-slate-400 font-normal">ms</span>
              </div>
              <div className="text-xs font-mono">
                Performance Category: <span className="text-cyan-300 font-bold">{category}</span>
              </div>
              <button 
                onClick={(e) => { e.stopPropagation(); handleStartTest(); }}
                className="bg-slate-900 border border-slate-800 hover:bg-slate-800 text-xs px-4 py-2 rounded font-mono text-slate-300 transition-colors pointer-events-auto"
              >
                START SUBSEQUENT SCANS
              </button>
            </div>
          )}

          {phase === 'misfire' && (
            <div className="space-y-3 p-4">
              <AlertTriangle className="h-10 w-10 text-rose-500 animate-bounce mx-auto" />
              <span className="text-sm font-bold text-rose-500 tracking-wider font-mono block">SYNAPTIC MISFIRE DETECTION</span>
              <p className="text-xs text-slate-400 max-w-sm mx-auto leading-relaxed">
                Visual response command sent before sensory signal arrived in visual cortex. The reflex loop triggered prematurely.
              </p>
              <button 
                onClick={(e) => { e.stopPropagation(); handleStartTest(); }}
                className="bg-rose-500/20 border border-rose-500/40 hover:bg-rose-500/30 text-xs text-rose-300 px-4 py-2 rounded font-mono transition-colors pointer-events-auto"
              >
                Reset Calibration Loop
              </button>
            </div>
          )}
        </div>

        {/* Dynamic score summary */}
        <div className="grid grid-cols-3 gap-4 border-t border-slate-800/60 pt-4">
          <div className="bg-slate-900/60 rounded-lg p-3 border border-slate-850/60">
            <span className="text-[10px] text-slate-500 font-mono block">BEST TIME</span>
            <span className="text-xl font-bold font-mono text-cyan-400">{bestTime || '--'} <span className="text-[10px] text-slate-500 font-normal">ms</span></span>
          </div>
          <div className="bg-slate-900/60 rounded-lg p-3 border border-slate-850/60">
            <span className="text-[10px] text-slate-500 font-mono block">AVERAGE LATENCY</span>
            <span className="text-xl font-bold font-mono text-teal-400">{avgTime || '--'} <span className="text-[10px] text-slate-500 font-normal">ms</span></span>
          </div>
          <div className="bg-slate-900/60 rounded-lg p-3 border border-slate-850/60">
            <span className="text-[10px] text-slate-500 font-mono block">CONSISTENCY</span>
            <span className="text-xl font-bold font-mono text-purple-400">{attempts.length > 1 ? `${consistency}%` : '--'}</span>
          </div>
        </div>
      </GlassCard>

      {/* Neurological context card */}
      <GlassCard glowColor="purple" className="flex flex-col justify-between space-y-4 text-sm">
        <div className="space-y-3">
          <div className="flex items-center space-x-2 border-b border-slate-800 pb-2">
            <Brain className="h-5 w-5 text-purple-400" />
            <h3 className="font-bold">Neurological Process</h3>
          </div>
          
          <div className="space-y-4 leading-relaxed text-xs text-slate-300">
            <p>
              When the screen changes from Red to Green, your visual receptors (photoreceptive rods and cones in the retina) trigger electrical impulses.
            </p>
            <div className="border-l-2 border-cyan-500/30 pl-3 py-1 space-y-2 font-mono text-[10px] text-slate-400 bg-slate-900/40 rounded-r">
              <div>1. Photoreceptors convert photons.</div>
              <div>2. Action potential travels via <b>Optic Nerve</b>.</div>
              <div>3. Synapses in <b>Lateral Geniculate Nucleus</b>.</div>
              <div>4. Reaches primary <b>Visual Cortex</b>.</div>
              <div>5. Signal travels to <b>Motor Cortex</b>.</div>
              <div>6. Descends spinal cord to finger muscles.</div>
            </div>
            <p>
              Each synaptic connection introduces a delay of about 1-2ms. An average healthy reflex time of 220ms is the physical threshold for full signal transit across this sensory-decision-motor loop.
            </p>
          </div>
        </div>

        <div className="bg-slate-900/80 rounded border border-slate-800 p-3 flex items-start space-x-2 text-[10px] text-slate-500">
          <HelpCircle className="h-4 w-4 text-purple-400 shrink-0 mt-0.5" />
          <span>Consistency tracks variations. Lower variability indicates strong myelin insulation around active motor pathways.</span>
        </div>
      </GlassCard>
    </div>
  );
};

/* ==========================================
   MODULE 2: COLOR TILE MEMORY CHALLENGE
   ========================================== */
const MemoryTileModule: React.FC<{ addAttempt: (attempt: any) => void }> = ({ addAttempt }) => {
  const [sequence, setSequence] = useState<{ index: number; color: string }[]>([]);
  const [gameState, setGameState] = useState<'idle' | 'showing' | 'recall' | 'result'>('idle');
  const [recallIndex, setRecallIndex] = useState<number>(0);
  const [litTile, setLitTile] = useState<{ index: number; color: string } | null>(null);
  
  // Recall options state
  const [selectedRecallTile, setSelectedRecallTile] = useState<number | null>(null);
  const [recallResults, setRecallResults] = useState<{ index: number; colorMatched: boolean; locationMatched: boolean }[]>([]);
  const [score, setScore] = useState<number>(0);
  
  // Timing parameters
  const startTimeRef = useRef<number>(0);
  const totalRecallTimeRef = useRef<number>(0);

  const colors = [
    { name: 'Red', hex: '#ef4444' },
    { name: 'Blue', hex: '#3b82f6' },
    { name: 'Green', hex: '#10b981' },
    { name: 'Yellow', hex: '#f59e0b' },
    { name: 'Purple', hex: '#8b5cf6' },
    { name: 'Orange', hex: '#f97316' }
  ];

  const handleStartGame = () => {
    setGameState('showing');
    setSelectedRecallTile(null);
    setRecallResults([]);
    setRecallIndex(0);
    
    // Generate sequence of 5 random tiles and colors
    const seq: { index: number; color: string }[] = [];
    const usedIndices = new Set<number>();
    
    for (let i = 0; i < 5; i++) {
      let idx;
      do {
        idx = Math.floor(Math.random() * 9);
      } while (usedIndices.has(idx) && usedIndices.size < 9); // avoid duplicates if sequence is short
      usedIndices.add(idx);
      
      const col = colors[Math.floor(Math.random() * colors.length)].name;
      seq.push({ index: idx, color: col });
    }
    setSequence(seq);

    // Flash sequence to player
    let step = 0;
    const interval = setInterval(() => {
      if (step < seq.length) {
        setLitTile(seq[step]);
        // Sound beep simulator could go here
        setTimeout(() => {
          setLitTile(null);
        }, 800);
        step++;
      } else {
        clearInterval(interval);
        setTimeout(() => {
          setGameState('recall');
          startTimeRef.current = performance.now();
        }, 400);
      }
    }, 1200);
  };

  const handleTileClick = (index: number) => {
    if (gameState !== 'recall' || selectedRecallTile !== null) return;
    
    // Show color selection options for this clicked tile
    setSelectedRecallTile(index);
  };

  const handleColorChoice = (colorName: string) => {
    if (selectedRecallTile === null) return;

    const currentTarget = sequence[recallIndex];
    const locationMatched = selectedRecallTile === currentTarget.index;
    const colorMatched = colorName === currentTarget.color;

    const result = {
      index: selectedRecallTile,
      locationMatched,
      colorMatched
    };

    const updatedResults = [...recallResults, result];
    setRecallResults(updatedResults);
    
    // Increment index
    const nextIndex = recallIndex + 1;
    setRecallIndex(nextIndex);
    setSelectedRecallTile(null);

    // If completed
    if (nextIndex >= sequence.length) {
      const endRecallTime = performance.now();
      totalRecallTimeRef.current = Math.round(endRecallTime - startTimeRef.current);
      setGameState('result');
      
      // Calculate score based on exact matching (each node worth 20 points: 10 for location, 10 for color)
      const correctColorCount = updatedResults.filter(r => r.colorMatched).length;
      const correctLocCount = updatedResults.filter(r => r.locationMatched).length;
      
      const rawScore = (correctColorCount + correctLocCount) * 10;
      setScore(rawScore);

      addAttempt({
        module: 'memory-tile',
        score: rawScore,
        accuracy: Math.round(((correctColorCount + correctLocCount) / (sequence.length * 2)) * 100),
        responseTime: Math.round(totalRecallTimeRef.current / sequence.length), // average response time per tile
        rawMetrics: {
          gridSize: 9,
          correctTilesCount: correctLocCount,
          totalTilesCount: sequence.length,
          patternRecallPct: Math.round((correctLocCount / sequence.length) * 100),
          recallAccuracy: Math.round((correctColorCount / sequence.length) * 100)
        }
      });
    }
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      {/* Dynamic tile play area */}
      <GlassCard glowColor="purple" className="lg:col-span-2 flex flex-col justify-between space-y-6">
        <div className="flex justify-between items-center border-b border-slate-800 pb-3">
          <div className="flex items-center space-x-2">
            <Grid className="h-5 w-5 text-purple-400" />
            <h2 className="text-lg font-bold">Spatial-Chromatic Recall</h2>
          </div>
          <span className="text-xs font-mono text-slate-400">
            {gameState === 'showing' ? `FLASHING PATHWAY ${recallIndex + 1}/5` : ''}
            {gameState === 'recall' ? `RECALL PHASE: TARGET ${recallIndex + 1}/5` : ''}
            {gameState === 'result' ? 'ASSAY COMPLETE' : ''}
          </span>
        </div>

        {/* Playing Board */}
        <div className="relative flex flex-col items-center justify-center p-4">
          
          {/* Tile Grid */}
          <div className="grid grid-cols-3 gap-3 w-64 h-64">
            {Array(9).fill(null).map((_, index) => {
              // Determine if tile is currently illuminated
              const isLit = litTile && litTile.index === index;
              const tileColorHex = isLit ? colors.find(c => c.name === litTile!.color)?.hex : 'transparent';
              
              // Recall feedback visual cue
              const recallStepMatched = recallResults.find(r => r.index === index);

              return (
                <div
                  key={index}
                  onClick={() => handleTileClick(index)}
                  style={{ backgroundColor: isLit ? tileColorHex : undefined }}
                  className={`
                    w-full h-full rounded-lg border flex items-center justify-center relative cursor-pointer select-none transition-all duration-200
                    ${isLit ? 'border-transparent shadow-lg text-white font-extrabold' : 'border-slate-800 bg-slate-900/50 hover:bg-slate-900 hover:border-slate-700'}
                    ${gameState === 'recall' && selectedRecallTile === index ? 'ring-2 ring-purple-500 scale-95 shadow-[0_0_15px_rgba(124,58,237,0.4)]' : ''}
                  `}
                >
                  <span className="text-[10px] text-slate-600 font-mono absolute top-1 left-1.5">{index + 1}</span>
                  {/* Recall feedback dot */}
                  {recallStepMatched && (
                    <div className={`w-3 h-3 rounded-full ${recallStepMatched.locationMatched ? 'bg-emerald-500' : 'bg-rose-500'}`} />
                  )}
                </div>
              );
            })}
          </div>

          {/* Color Selection Overlay Popover */}
          {selectedRecallTile !== null && (
            <div className="absolute inset-0 bg-[#070b19]/90 backdrop-blur-md flex flex-col items-center justify-center p-6 text-center space-y-4 rounded-xl border border-purple-500/20 z-20">
              <span className="text-xs text-purple-300 font-mono tracking-wider">IDENTIFY COLOR ASSOCIATED WITH TILE {selectedRecallTile + 1}</span>
              <div className="grid grid-cols-3 gap-3 w-full max-w-sm">
                {colors.map((c) => (
                  <button
                    key={c.name}
                    onClick={() => handleColorChoice(c.name)}
                    style={{ borderLeftColor: c.hex }}
                    className="bg-slate-900 hover:bg-slate-800 text-white text-xs py-2 px-3 border border-slate-800 rounded border-l-4 font-mono transition-colors"
                  >
                    {c.name}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Prompt overlays */}
          {gameState === 'idle' && (
            <div className="absolute inset-0 bg-[#070b19]/90 backdrop-blur-sm flex flex-col items-center justify-center space-y-3 rounded-xl border border-slate-800">
              <Grid className="h-10 w-10 text-purple-400 animate-pulse" />
              <div className="text-center">
                <span className="text-xs font-mono text-slate-500 block mb-1">GRID MEMORY ACTIVE</span>
                <button
                  onClick={handleStartGame}
                  className="bg-purple-600 hover:bg-purple-500 text-white font-bold px-6 py-2 rounded text-sm tracking-wide shadow-lg shadow-purple-500/20 transition-all"
                >
                  LOAD SEQUENCE
                </button>
              </div>
            </div>
          )}

          {gameState === 'result' && (
            <div className="absolute inset-0 bg-[#070b19]/95 backdrop-blur-md flex flex-col items-center justify-center text-center space-y-4 rounded-xl border border-purple-500/30">
              <span className="text-xs font-mono text-purple-400 tracking-widest block">DIAGNOSTIC ARCHIVE</span>
              <div className="text-4xl font-extrabold tracking-tight">
                Score: <span className="text-purple-400 font-mono">{score}%</span>
              </div>
              <div className="text-xs text-slate-400 space-y-1 font-mono">
                <div>Recall Accuracy: {Math.round((recallResults.filter(r=>r.colorMatched).length / sequence.length)*100)}%</div>
                <div>Pattern Recall: {Math.round((recallResults.filter(r=>r.locationMatched).length / sequence.length)*100)}%</div>
                <div>Recall Speed: {(totalRecallTimeRef.current / 1000).toFixed(2)}s</div>
              </div>
              <button 
                onClick={handleStartGame}
                className="bg-slate-900 border border-slate-800 hover:bg-slate-850 text-xs px-4 py-2 rounded font-mono text-slate-300 transition-colors"
              >
                RUN SUBSEQUENT ASSAY
              </button>
            </div>
          )}
        </div>

        {/* Dynamic tips */}
        <div className="bg-slate-900/60 rounded-lg p-3 border border-slate-850/60 flex items-center space-x-2 text-xs text-slate-400">
          <Sparkles className="h-4 w-4 text-purple-400 shrink-0" />
          <span>Memorize spatial paths and color properties simultaneously. Both metrics feed your Working Memory Index.</span>
        </div>
      </GlassCard>

      {/* Neuroscience focus */}
      <GlassCard glowColor="cyan" className="flex flex-col justify-between space-y-4 text-sm">
        <div className="space-y-3">
          <div className="flex items-center space-x-2 border-b border-slate-800 pb-2">
            <Brain className="h-5 w-5 text-cyan-400" />
            <h3 className="font-bold">Memory Pathways</h3>
          </div>

          <div className="space-y-3 text-xs text-slate-300 leading-relaxed">
            <p>
              Short-term recall utilizes two distinct processes in the brain: the **Visuospatial Sketchpad** (temporary storage of spatial coordinates) and **Chromatic Encoding** (visual recognition pathways).
            </p>
            <p>
              Sensory input from the eye reaches the visual cortex and is then split:
            </p>
            <div className="bg-slate-900/50 rounded p-2.5 border border-slate-850 font-mono text-[10px] text-slate-400 space-y-1">
              <div><b>Dorsal Stream ("Where"):</b> Frontoparietal networks map spatial layout.</div>
              <div><b>Ventral Stream ("What"):</b> Temporal lobes identify color definitions.</div>
            </div>
            <p>
              Both channels converge in the **Prefrontal Cortex** for active maintenance. If attention flags for a millisecond, the synaptic connection decays and the memory is lost from the hippocampus register.
            </p>
          </div>
        </div>

        <div className="bg-slate-900/80 rounded border border-slate-800 p-3 flex items-start space-x-2 text-[10px] text-slate-500 font-mono">
          <ShieldCheck className="h-4 w-4 text-emerald-400 shrink-0 mt-0.5" />
          <span>Training this module systematically triggers neuroplasticity in the prefrontal cortex, enhancing overall executive function.</span>
        </div>
      </GlassCard>
    </div>
  );
};

/* ==========================================
   MODULE 3: FOCUS ENDURANCE TEST
   ========================================== */
interface TargetItem {
  id: number;
  x: number; // percentage
  y: number; // percentage
  type: 'target' | 'distractor';
  createdAt: number;
  duration: number; // ms to live
  color: string;
}

const FocusEnduranceModule: React.FC<{ addAttempt: (attempt: any) => void }> = ({ addAttempt }) => {
  const [duration, setDuration] = useState<60 | 90 | 120>(60);
  const [gameState, setGameState] = useState<'idle' | 'testing' | 'result'>('idle');
  const [targets, setTargets] = useState<TargetItem[]>([]);
  const [timeLeft, setTimeLeft] = useState<number>(60);
  
  // Scoring parameters
  const [hits, setHits] = useState<number>(0);
  const [misses, setMisses] = useState<number>(0);
  const [falseClicks, setFalseClicks] = useState<number>(0);
  
  // Timing / Latency lists to compute Fatigue Index
  const [latencies, setLatencies] = useState<{ timeStamp: number; latency: number }[]>([]);
  
  const timerRef = useRef<any>(null);
  const gameIntervalRef = useRef<any>(null);
  const targetIdRef = useRef<number>(0);
  const activeWindowStartRef = useRef<number>(0);

  const startTest = () => {
    setGameState('testing');
    setTimeLeft(duration);
    setHits(0);
    setMisses(0);
    setFalseClicks(0);
    setLatencies([]);
    setTargets([]);
    targetIdRef.current = 0;
    activeWindowStartRef.current = performance.now();

    // Spawn initial targets
    spawnTarget();
    spawnTarget();

    // Clock count down timer
    timerRef.current = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timerRef.current!);
          endTest();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    // Spawning loop
    gameIntervalRef.current = setInterval(() => {
      spawnTarget();
    }, 850);
  };

  const spawnTarget = () => {
    const isTarget = Math.random() > 0.35; // 65% target, 35% distractor
    const newTarget: TargetItem = {
      id: targetIdRef.current++,
      x: Math.random() * 80 + 10, // keep 10% margins
      y: Math.random() * 80 + 10,
      type: isTarget ? 'target' : 'distractor',
      createdAt: performance.now(),
      duration: Math.random() * 800 + 1200, // lives for 1.2s to 2.0s
      color: isTarget ? 'border-cyan-400 bg-cyan-500/25 shadow-cyan-500/30' : 'border-purple-500 bg-purple-500/25 shadow-purple-500/30'
    };

    setTargets((prev) => [...prev, newTarget]);

    // Handle target natural expiry (miss)
    setTimeout(() => {
      setTargets((prev) => {
        const found = prev.find(t => t.id === newTarget.id);
        if (found) {
          if (found.type === 'target') {
            setMisses((m) => m + 1);
          }
          return prev.filter(t => t.id !== newTarget.id);
        }
        return prev;
      });
    }, newTarget.duration);
  };

  const handleTargetClick = (e: React.MouseEvent<HTMLDivElement>, item: TargetItem) => {
    e.stopPropagation(); // prevent clicking background (false click)
    
    const clickTime = performance.now();
    const latency = clickTime - item.createdAt;

    if (item.type === 'target') {
      setHits((h) => h + 1);
      setLatencies((prev) => [...prev, { timeStamp: clickTime - activeWindowStartRef.current, latency }]);
    } else {
      // Clicked distractor
      setFalseClicks((f) => f + 1);
    }

    setTargets((prev) => prev.filter(t => t.id !== item.id));
  };

  const handleBackgroundClick = () => {
    if (gameState !== 'testing') return;
    setFalseClicks((f) => f + 1);
  };

  const endTest = () => {
    if (gameIntervalRef.current) clearInterval(gameIntervalRef.current);
    if (timerRef.current) clearInterval(timerRef.current);
    setGameState('result');
  };

  useEffect(() => {
    return () => {
      if (gameIntervalRef.current) clearInterval(gameIntervalRef.current);
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, []);

  // Compute stats on completion
  useEffect(() => {
    if (gameState === 'result') {
      const totalTargetsPresented = hits + misses;
      const accuracyVal = totalTargetsPresented > 0 ? Math.round((hits / totalTargetsPresented) * 100) : 0;
      
      // Calculate Fatigue Index: compare response times of first 25% of timeline vs last 25% of timeline
      let fatigueIdx = 0.15; // default fallback if data points are low
      if (latencies.length > 4) {
        const sortedByTime = [...latencies].sort((a,b) => a.timeStamp - b.timeStamp);
        const splitCount = Math.floor(sortedByTime.length / 3);
        const earlyLatencyAvg = sortedByTime.slice(0, splitCount).reduce((acc, l) => acc + l.latency, 0) / splitCount;
        const lateLatencyAvg = sortedByTime.slice(-splitCount).reduce((acc, l) => acc + l.latency, 0) / splitCount;
        
        // ratio representing deceleration
        fatigueIdx = Math.max(0, Math.min(1, (lateLatencyAvg - earlyLatencyAvg) / earlyLatencyAvg));
      }

      // Attention stability: inverse of fatigue index & accuracy (closer to 100 is best)
      const attentionStability = Math.round(Math.max(10, Math.min(100, accuracyVal - fatigueIdx * 100)));
      
      // Overall focus score
      const focusScore = Math.max(10, Math.min(100, Math.round(accuracyVal * 0.7 + (1 - fatigueIdx) * 30)));

      addAttempt({
        module: 'focus-endurance',
        score: focusScore,
        accuracy: accuracyVal,
        responseTime: latencies.length > 0 ? Math.round(latencies.reduce((acc, l) => acc + l.latency, 0) / latencies.length) : 0,
        rawMetrics: {
          duration,
          hits,
          misses,
          falseClicks,
          fatigueIndex: Number(fatigueIdx.toFixed(3)),
          attentionStability
        }
      });
    }
  }, [gameState]);

  const avgLatency = latencies.length > 0 ? Math.round(latencies.reduce((acc, l) => acc + l.latency, 0) / latencies.length) : 0;
  
  // Calculate relative stats during or after
  const calculatedAccuracy = (hits + misses) > 0 ? Math.round((hits / (hits + misses)) * 100) : 0;

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      {/* Playing field */}
      <GlassCard glowColor="green" className="lg:col-span-2 flex flex-col justify-between space-y-6">
        <div className="flex justify-between items-center border-b border-slate-800 pb-3">
          <div className="flex items-center space-x-2">
            <Target className="h-5 w-5 text-emerald-400 animate-pulse" />
            <h2 className="text-lg font-bold">Vigilance Field Assay</h2>
          </div>
          {gameState === 'testing' && (
            <div className="flex items-center space-x-3 text-xs font-mono">
              <span className="text-slate-400">TIME: {timeLeft}s</span>
              <span className="text-emerald-400">HITS: {hits}</span>
              <span className="text-rose-500">MISS: {misses}</span>
            </div>
          )}
        </div>

        {/* Dynamic visual arena */}
        <div 
          onClick={handleBackgroundClick}
          className="h-80 w-full relative bg-slate-950/80 rounded-xl border border-slate-850 overflow-hidden cursor-crosshair"
        >
          {gameState === 'testing' && targets.map((t) => (
            <div
              key={t.id}
              onClick={(e) => handleTargetClick(e, t)}
              style={{ top: `${t.y}%`, left: `${t.x}%` }}
              className={`
                absolute w-12 h-12 rounded-full border-2 flex flex-col items-center justify-center text-[7px] font-mono font-bold select-none cursor-pointer transform -translate-x-1/2 -translate-y-1/2 transition-transform duration-100 active:scale-90 shadow-md animate-pulse
                ${t.color}
              `}
            >
              {t.type === 'target' ? (
                <>
                  <span className="text-cyan-300">TARGET</span>
                  <span className="text-[6px] text-slate-400">CLICK</span>
                </>
              ) : (
                <>
                  <span className="text-purple-300">IGNORE</span>
                  <span className="text-[6px] text-slate-400">WARN</span>
                </>
              )}
            </div>
          ))}

          {gameState === 'idle' && (
            <div className="absolute inset-0 bg-slate-950/90 flex flex-col items-center justify-center space-y-4 p-6">
              <Target className="h-12 w-12 text-emerald-400 animate-spin" />
              <div className="text-center space-y-3">
                <span className="text-xs font-mono text-slate-500 block uppercase tracking-widest">Select Assay Span</span>
                
                <div className="flex justify-center space-x-2">
                  {[60, 90, 120].map((t) => (
                    <button
                      key={t}
                      onClick={() => setDuration(t as any)}
                      className={`
                        px-4 py-1.5 rounded font-mono text-xs border transition-all
                        ${duration === t 
                          ? 'border-emerald-400 text-emerald-400 bg-emerald-500/10' 
                          : 'border-slate-800 text-slate-400 hover:text-slate-200'
                        }
                      `}
                    >
                      {t} SEC
                    </button>
                  ))}
                </div>

                <button
                  onClick={startTest}
                  className="bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold px-6 py-2.5 rounded-lg text-sm shadow-lg shadow-emerald-500/20 transition-all font-mono"
                >
                  START FOCUS ASSAY
                </button>
              </div>
            </div>
          )}

          {gameState === 'result' && (
            <div className="absolute inset-0 bg-[#070b19]/95 flex flex-col items-center justify-center text-center space-y-4 p-6 rounded-xl border border-emerald-500/30">
              <span className="text-xs font-mono text-emerald-400 tracking-widest">DIAGNOSTIC FILE SUBMITTED</span>
              <div className="text-4xl font-extrabold tracking-tight">
                Vigilance: <span className="text-emerald-400 font-mono">{hits} / {hits + misses} Hits</span>
              </div>
              <div className="text-xs text-slate-400 space-y-1 font-mono">
                <div>Accuracy Ratio: {calculatedAccuracy}%</div>
                <div>False Click Count: {falseClicks}</div>
                <div>Average Hit Latency: {avgLatency} ms</div>
                <div>Attention Stability Index: {Math.round(Math.max(10, Math.min(100, calculatedAccuracy - (latencies.length > 4 ? (latencies[latencies.length-1].latency - latencies[0].latency)/latencies[0].latency * 100 : 15))))}%</div>
              </div>
              <button 
                onClick={startTest}
                className="bg-slate-900 border border-slate-800 hover:bg-slate-850 text-xs px-4 py-2 rounded font-mono text-slate-300 transition-colors"
              >
                RUN REPEAT ASSAY
              </button>
            </div>
          )}
        </div>

        {/* Real-time details */}
        <div className="grid grid-cols-3 gap-4 border-t border-slate-800/60 pt-4">
          <div className="bg-slate-900/60 rounded-lg p-3 border border-slate-850/60">
            <span className="text-[10px] text-slate-500 font-mono block">ATTENTION SCORE</span>
            <span className="text-xl font-bold font-mono text-emerald-400">{gameState === 'result' ? `${calculatedAccuracy}%` : '--'}</span>
          </div>
          <div className="bg-slate-900/60 rounded-lg p-3 border border-slate-850/60">
            <span className="text-[10px] text-slate-500 font-mono block">FALSE CLICKS</span>
            <span className="text-xl font-bold font-mono text-rose-400">{falseClicks}</span>
          </div>
          <div className="bg-slate-900/60 rounded-lg p-3 border border-slate-850/60">
            <span className="text-[10px] text-slate-500 font-mono block">LATENCY FREQ</span>
            <span className="text-xl font-bold font-mono text-cyan-400">{avgLatency ? `${avgLatency}ms` : '--'}</span>
          </div>
        </div>
      </GlassCard>

      {/* Scientific context card */}
      <GlassCard glowColor="purple" className="flex flex-col justify-between space-y-4 text-sm">
        <div className="space-y-3">
          <div className="flex items-center space-x-2 border-b border-slate-800 pb-2">
            <Brain className="h-5 w-5 text-purple-400" />
            <h3 className="font-bold">Continuous Vigilance</h3>
          </div>

          <div className="space-y-3 text-xs text-slate-300 leading-relaxed">
            <p>
              Maintaining focus over minutes is controlled by the **Reticular Activating System (RAS)** in the brainstem and the **Prefrontal Cortex (PFC)**.
            </p>
            <p>
              Under sustained attention, the brain runs two main challenges:
            </p>
            <div className="bg-slate-900/50 rounded p-2.5 border border-slate-850 font-mono text-[10px] text-slate-400 space-y-1">
              <div><b>Visual Salience:</b> Identifying green dots as relevant.</div>
              <div><b>Inhibitory Control:</b> Actively ignoring distracting purple dots.</div>
            </div>
            <p>
              As neurotransmitters (specifically dopamine and norepinephrine) deplete at active receptor junctions, the reaction latency rises. This increase is quantified as the **Fatigue Index**.
            </p>
          </div>
        </div>

        <div className="bg-slate-900/80 rounded border border-slate-800 p-3 flex items-start space-x-2 text-[10px] text-slate-500 font-mono">
          <Gauge className="h-4 w-4 text-emerald-400 shrink-0 mt-0.5" />
          <span>Lower fatigue index indicates high neurotransmitter retention and stable axonal transmission rates under high load.</span>
        </div>
      </GlassCard>
    </div>
  );
};
export default AssessmentCenter;
