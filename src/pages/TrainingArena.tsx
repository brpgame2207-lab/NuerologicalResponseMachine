import React, { useState, useEffect, useRef } from 'react';
import { 
  RefreshCw, 
  Award, 
  Zap, 
  Target, 
  ShieldAlert
} from 'lucide-react';
import { useProgress } from '../context/ProgressContext';
import GlassCard from '../components/GlassCard';

type TrainingGame = 'game-pop' | 'game-direction' | 'game-stroop' | null;

export const TrainingArena: React.FC = () => {
  const [activeGame, setActiveGame] = useState<TrainingGame>(null);
  const { addAttempt } = useProgress();

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center border-b-[3px] border-black pb-4 gap-4">
        <div>
          <h1 className="text-3xl font-black tracking-tight uppercase">Training Arena</h1>
          <p className="text-sm text-slate-400 font-bold">Optimize synaptic plasticity, reflex efficiency, and executive control through training.</p>
        </div>
        {activeGame && (
          <button 
            onClick={() => setActiveGame(null)}
            className="neo-btn neo-btn-cyan px-3 py-1.5 text-xs font-mono flex items-center space-x-1.5 shadow-[2px_2px_0px_#000] hover:shadow-none hover:translate-x-[1px] hover:translate-y-[1px]"
          >
            <RefreshCw className="h-3.5 w-3.5" />
            <span>RETURN TO GAME SELECTOR</span>
          </button>
        )}
      </div>

      {!activeGame ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Game A: Target Pop */}
          <GlassCard glowColor="green" className="flex flex-col justify-between">
            <div className="space-y-3">
              <div className="flex justify-between items-start">
                <div className="bg-[#00FF88]/20 p-2 rounded-none border-2 border-black text-[#00FF88] shadow-[2px_2px_0px_#000]">
                  <Target className="h-5 w-5" />
                </div>
                <span className="text-[10px] text-[#00FF88] font-mono tracking-wider bg-black border-2 border-black px-2 py-0.5 rounded-none font-bold">
                  GAME A
                </span>
              </div>
              <h3 className="text-base font-extrabold text-white uppercase">High Speed Target Pop</h3>
              <p className="text-[11px] text-slate-400 font-semibold">
                Targets appear and expire quickly. Click fast for higher scores. Develops peripheral vision and visual-motor coordination.
              </p>
            </div>
            <button 
              onClick={() => setActiveGame('game-pop')}
              className="w-full text-center neo-btn neo-btn-green py-2 text-xs shadow-[3px_3px_0px_#000] hover:translate-x-[1px] hover:translate-y-[1px] mt-4"
            >
              LAUNCH GAME
            </button>
          </GlassCard>

          {/* Game B: Direction Challenge */}
          <GlassCard glowColor="purple" className="flex flex-col justify-between">
            <div className="space-y-3">
              <div className="flex justify-between items-start">
                <div className="bg-[#7C3AED]/20 p-2 rounded-none border-2 border-black text-[#A855F7] shadow-[2px_2px_0px_#000]">
                  <Zap className="h-5 w-5" />
                </div>
                <span className="text-[10px] text-[#A855F7] font-mono tracking-wider bg-black border-2 border-black px-2 py-0.5 rounded-none font-bold">
                  GAME B
                </span>
              </div>
              <h3 className="text-base font-extrabold text-white uppercase">Directional Decision Challenge</h3>
              <p className="text-[11px] text-slate-400 font-semibold">
                Press the arrow key matching the on-screen direction. Measures choice reaction latency and decision speed.
              </p>
            </div>
            <button 
              onClick={() => setActiveGame('game-direction')}
              className="w-full text-center neo-btn neo-btn-purple py-2 text-xs shadow-[3px_3px_0px_#000] hover:translate-x-[1px] hover:translate-y-[1px] mt-4"
            >
              LAUNCH GAME
            </button>
          </GlassCard>

          {/* Game C: Stroop Color Challenge */}
          <GlassCard glowColor="none" className="flex flex-col justify-between">
            <div className="space-y-3">
              <div className="flex justify-between items-start">
                <div className="bg-slate-800/40 p-2 rounded-none border-2 border-black text-slate-300 shadow-[2px_2px_0px_#000]">
                  <Award className="h-5 w-5" />
                </div>
                <span className="text-[10px] text-slate-400 font-mono tracking-wider bg-black border-2 border-black px-2 py-0.5 rounded-none font-bold">
                  GAME C
                </span>
              </div>
              <h3 className="text-base font-extrabold text-white uppercase">Stroop Color Interference</h3>
              <p className="text-[11px] text-slate-400 font-semibold">
                Identify the font color, not the written word. Tests prefrontal inhibition and cognitive flexibility under conflict.
              </p>
            </div>
            <button 
              onClick={() => setActiveGame('game-stroop')}
              className="w-full text-center neo-btn neo-btn-yellow py-2 text-xs shadow-[3px_3px_0px_#000] hover:translate-x-[1px] hover:translate-y-[1px] mt-4"
            >
              LAUNCH GAME
            </button>
          </GlassCard>
        </div>
      ) : (
        <div className="space-y-6">
          {activeGame === 'game-pop' && <TargetPopGame addAttempt={addAttempt} />}
          {activeGame === 'game-direction' && <DirectionChallengeGame addAttempt={addAttempt} />}
          {activeGame === 'game-stroop' && <StroopGame addAttempt={addAttempt} />}
        </div>
      )}
    </div>
  );
};


/* ==========================================
   GAME A: TARGET POP GAME
   ========================================== */
interface GameProps {
  addAttempt: (attempt: any) => void;
}

interface PopTarget {
  id: number;
  x: number; // percentage
  y: number; // percentage
  size: number;
  createdAt: number;
  lifespan: number;
}

const TargetPopGame: React.FC<GameProps> = ({ addAttempt }) => {
  const [gameState, setGameState] = useState<'idle' | 'playing' | 'result'>('idle');
  const [targets, setTargets] = useState<PopTarget[]>([]);
  const [popped, setPopped] = useState<number>(0);
  const [missed, setMissed] = useState<number>(0);
  const [latencies, setLatencies] = useState<number[]>([]);
  
  const timerRef = useRef<any>(null);
  const gameTimeLeftRef = useRef<number>(30); // 30 seconds game
  const [timeLeft, setTimeLeft] = useState<number>(30);
  const targetIdRef = useRef<number>(0);
  const spawnTimerRef = useRef<any>(null);

  const startGame = () => {
    setGameState('playing');
    setPopped(0);
    setMissed(0);
    setLatencies([]);
    setTargets([]);
    targetIdRef.current = 0;
    gameTimeLeftRef.current = 30;
    setTimeLeft(30);

    spawnTarget();

    timerRef.current = setInterval(() => {
      gameTimeLeftRef.current -= 1;
      setTimeLeft(gameTimeLeftRef.current);
      if (gameTimeLeftRef.current <= 0) {
        endGame();
      }
    }, 1000);
  };

  const spawnTarget = () => {
    if (gameTimeLeftRef.current <= 0) return;

    const newTarget: PopTarget = {
      id: targetIdRef.current++,
      x: Math.random() * 80 + 10,
      y: Math.random() * 80 + 10,
      size: 40, //px
      createdAt: performance.now(),
      lifespan: Math.random() * 500 + 700 // 0.7s - 1.2s lifespan
    };

    setTargets((prev) => [...prev, newTarget]);

    // Handle expiry (miss)
    setTimeout(() => {
      setTargets((prev) => {
        const exists = prev.find(t => t.id === newTarget.id);
        if (exists) {
          setMissed((m) => m + 1);
          return prev.filter(t => t.id !== newTarget.id);
        }
        return prev;
      });
    }, newTarget.lifespan);

    // Spawning frequency
    spawnTimerRef.current = setTimeout(spawnTarget, 450);
  };

  const handleTargetClick = (e: React.MouseEvent, target: PopTarget) => {
    e.stopPropagation();
    const hitTime = performance.now();
    const latency = hitTime - target.createdAt;
    
    setLatencies((prev) => [...prev, latency]);
    setPopped((p) => p + 1);
    setTargets((prev) => prev.filter(t => t.id !== target.id));
  };

  const endGame = () => {
    if (timerRef.current) clearInterval(timerRef.current);
    if (spawnTimerRef.current) clearTimeout(spawnTimerRef.current);
    setGameState('result');
  };

  useEffect(() => {
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
      if (spawnTimerRef.current) clearTimeout(spawnTimerRef.current);
    };
  }, []);

  // Save history on finish
  useEffect(() => {
    if (gameState === 'result') {
      const avgLatency = latencies.length > 0 ? Math.round(latencies.reduce((a, b) => a + b, 0) / latencies.length) : 0;
      const totalPresented = popped + missed;
      const acc = totalPresented > 0 ? Math.round((popped / totalPresented) * 100) : 0;
      
      // Calculate score (based on speed + pops volume: 30 pops = 90 pts)
      const score = Math.min(100, Math.round((popped / 30) * 90));

      addAttempt({
        module: 'game-pop',
        score,
        accuracy: acc,
        responseTime: avgLatency,
        rawMetrics: {
          targetsPopped: popped
        }
      });
    }
  }, [gameState]);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <GlassCard glowColor="green" className="lg:col-span-2 flex flex-col justify-between space-y-4">
        <div className="flex justify-between items-center border-b-[2px] border-black pb-2">
          <h2 className="text-base font-extrabold text-white uppercase">High Speed Target Calibrator</h2>
          {gameState === 'playing' && (
            <div className="flex space-x-4 text-xs font-mono font-bold bg-black px-2.5 py-1 border border-black shadow-[2px_2px_0px_#000]">
              <span className="text-[#00E5FF]">POPPED: {popped}</span>
              <span className="text-slate-400">TIME: {timeLeft}s</span>
            </div>
          )}
        </div>

        <div className="h-80 w-full relative bg-black border-[3px] border-black rounded-none overflow-hidden cursor-crosshair shadow-[4px_4px_0px_#000]">
          {gameState === 'playing' && targets.map((t) => (
            <div
              key={t.id}
              onClick={(e) => handleTargetClick(e, t)}
              style={{
                top: `${t.y}%`,
                left: `${t.x}%`,
                width: `${t.size}px`,
                height: `${t.size}px`,
              }}
              className="absolute rounded-full border-[2px] border-black bg-[#00FF88] cursor-pointer select-none flex items-center justify-center transform -translate-x-1/2 -translate-y-1/2 shadow-[2px_2px_0px_#000] active:scale-90"
            >
              <div className="w-2.5 h-2.5 bg-black rounded-full" />
            </div>
          ))}

          {gameState === 'idle' && (
            <div className="absolute inset-0 bg-[#0c0c0e]/95 flex flex-col items-center justify-center space-y-4 p-6 z-10">
              <span className="text-xs text-slate-400 font-mono tracking-widest block font-bold">RADIAL SPEED SENSOR DISENGAGED</span>
              <button
                onClick={startGame}
                className="neo-btn neo-btn-green px-6 py-2.5 shadow-[4px_4px_0px_#000000] text-xs font-bold font-mono"
              >
                INITIATE SPEED SCAN
              </button>
            </div>
          )}

          {gameState === 'result' && (
            <div className="absolute inset-0 bg-[#0c0c0e]/95 flex flex-col items-center justify-center space-y-4 text-center p-6 rounded-none border-[3px] border-black shadow-[4px_4px_0px_#000] z-10">
              <span className="text-xs text-[#00FF88] font-mono tracking-widest font-bold">BIOMETRIC COMPLIANCE DATA RECIEVED</span>
              <div className="text-3xl font-black text-white uppercase">Popped {popped} Targets</div>
              <div className="text-xs text-slate-300 space-y-1.5 font-mono font-bold bg-black p-3 border-2 border-black shadow-[2px_2px_0px_#000] inline-block">
                <div>Hit Accuracy: {Math.round((popped / (popped + missed)) * 100)}%</div>
                <div>Avg Click Latency: {latencies.length > 0 ? Math.round(latencies.reduce((a,b)=>a+b, 0) / latencies.length) : 0}ms</div>
              </div>
              <button 
                onClick={startGame}
                className="neo-btn neo-btn-green px-4 py-2 shadow-[3px_3px_0px_#000] text-xs font-bold font-mono"
              >
                RE-RUN ASSAY
              </button>
            </div>
          )}
        </div>
      </GlassCard>

      <GlassCard glowColor="cyan" className="flex flex-col justify-between space-y-4 text-xs">
        <div className="space-y-2">
          <h3 className="font-extrabold text-sm text-[#00E5FF] border-b-[2px] border-black pb-1.5 flex items-center space-x-1.5 uppercase">
            <Zap className="h-4 w-4" />
            <span>Peripheral Motor Synthesis</span>
          </h3>
          <p className="leading-relaxed text-slate-300 font-semibold">
            Clicking targets that spawn unpredictably trains visual scanning and peripheral saccadic eye movements. Your eyes must guide motor coordinates under tight speed caps.
          </p>
        </div>
        <div className="bg-[#1c1c24] border-2 border-black p-2.5 rounded-none text-[10px] text-slate-300 font-mono font-bold shadow-[2px_2px_0px_#000]">
          Tip: Popping targets within 200ms of birth awards the highest cognitive latency index.
        </div>
      </GlassCard>
    </div>
  );
};

/* ==========================================
   GAME C: DIRECTION CHALLENGE
   ========================================== */
const DirectionChallengeGame: React.FC<GameProps> = ({ addAttempt }) => {
  const [gameState, setGameState] = useState<'idle' | 'playing' | 'result'>('idle');
  const [currentArrow, setCurrentArrow] = useState<'↑' | '↓' | '←' | '→' | null>(null);
  
  const [correct, setCorrect] = useState<number>(0);
  const [totalKeys, setTotalKeys] = useState<number>(0);
  const [latencies, setLatencies] = useState<number[]>([]);
  
  const arrowStartTimeRef = useRef<number>(0);
  const roundCountRef = useRef<number>(0);
  const [roundCount, setRoundCount] = useState<number>(0);
  const delayTimerRef = useRef<any>(null);

  const arrows = ['↑', '↓', '←', '→'];
  const keyMap: { [key: string]: string } = {
    ArrowUp: '↑',
    ArrowDown: '↓',
    ArrowLeft: '←',
    ArrowRight: '→',
    w: '↑',
    s: '↓',
    a: '←',
    d: '→'
  };

  const startGame = () => {
    setGameState('playing');
    setCorrect(0);
    setTotalKeys(0);
    setLatencies([]);
    roundCountRef.current = 0;
    setRoundCount(0);
    
    nextRound();
  };

  const nextRound = () => {
    if (roundCountRef.current >= 20) {
      endGame();
      return;
    }
    
    setCurrentArrow(null);
    const randomDelay = Math.random() * 400 + 300; // 300ms - 700ms gap

    delayTimerRef.current = setTimeout(() => {
      const randomArrow = arrows[Math.floor(Math.random() * arrows.length)];
      setCurrentArrow(randomArrow as any);
      arrowStartTimeRef.current = performance.now();
      roundCountRef.current += 1;
      setRoundCount(roundCountRef.current);
    }, randomDelay);
  };

  const endGame = () => {
    setGameState('result');
  };

  // Listen to keyboard event
  useEffect(() => {
    if (gameState !== 'playing' || !currentArrow) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      const pressed = keyMap[e.key];
      if (!pressed) return; // ignore non-directional keys
      
      const reactionTime = performance.now() - arrowStartTimeRef.current;
      setLatencies((prev) => [...prev, reactionTime]);
      setTotalKeys((tk) => tk + 1);

      if (pressed === currentArrow) {
        setCorrect((c) => c + 1);
      }

      nextRound();
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [gameState, currentArrow]);

  useEffect(() => {
    return () => {
      if (delayTimerRef.current) clearTimeout(delayTimerRef.current);
    };
  }, []);

  // Save progress
  useEffect(() => {
    if (gameState === 'result') {
      const avgLatency = latencies.length > 0 ? Math.round(latencies.reduce((a,b)=>a+b, 0) / latencies.length) : 0;
      const acc = totalKeys > 0 ? Math.round((correct / totalKeys) * 100) : 0;
      
      // Calculate score relative to reaction times (e.g. <300ms = 95 score)
      const score = Math.max(10, Math.min(100, Math.round(100 - (avgLatency - 250) / 4.5)));

      addAttempt({
        module: 'game-direction',
        score,
        accuracy: acc,
        responseTime: avgLatency,
        rawMetrics: {
          correctKeys: correct,
          totalKeys
        }
      });
    }
  }, [gameState]);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <GlassCard glowColor="purple" className="lg:col-span-2 flex flex-col justify-between space-y-4">
        <div className="flex justify-between items-center border-b-[2px] border-black pb-2.5">
          <h2 className="text-base font-extrabold text-white uppercase">Directional Decision Hub</h2>
          {gameState === 'playing' && (
            <div className="text-xs font-mono font-bold bg-black px-2.5 py-1 border border-black shadow-[2px_2px_0px_#000]">
              ROUND: {roundCount} / 20 | CORRECT: {correct}
            </div>
          )}
        </div>

        <div className="h-80 w-full relative bg-black border-[3px] border-black rounded-none overflow-hidden flex items-center justify-center shadow-[4px_4px_0px_#000]">
          {gameState === 'playing' && currentArrow && (
            <div className="text-center space-y-4">
              <div className="text-8xl font-black text-[#A855F7] tracking-wide select-none">
                {currentArrow}
              </div>
              <p className="text-xs text-slate-400 font-mono font-bold">(Press matching arrow key on keyboard)</p>
            </div>
          )}

          {gameState === 'playing' && !currentArrow && (
            <div className="text-[#FFDE47] font-mono text-xs font-bold animate-pulse">
              PREPARING NEW ARROW SIGNAL...
            </div>
          )}

          {gameState === 'idle' && (
            <div className="absolute inset-0 bg-[#0c0c0e]/95 flex flex-col items-center justify-center space-y-4 p-6 z-20">
              <span className="text-xs text-slate-400 font-mono tracking-widest block font-bold">DECISION LATENCY ANALYZER LOADED</span>
              <button
                onClick={startGame}
                className="neo-btn neo-btn-purple px-6 py-2.5 shadow-[4px_4px_0px_#000000] text-xs font-bold font-mono"
              >
                START ASSAY ROUND
              </button>
            </div>
          )}

          {gameState === 'result' && (
            <div className="absolute inset-0 bg-[#0c0c0e]/95 flex flex-col items-center justify-center space-y-4 text-center p-6 border-[3px] border-black shadow-[4px_4px_0px_#000] z-20 rounded-none">
              <span className="text-xs text-purple-400 font-mono tracking-widest font-extrabold">DIAGNOSTIC REPORT FORWARDED</span>
              <div className="text-3xl font-black text-white uppercase">Correct Inputs: {correct} / {totalKeys}</div>
              <div className="text-xs text-slate-300 space-y-1.5 font-mono font-bold bg-black p-3 border-2 border-black shadow-[2px_2px_0px_#000] inline-block">
                <div>Accuracy Ratio: {totalKeys > 0 ? Math.round((correct / totalKeys) * 100) : 0}%</div>
                <div>Avg Choice Latency: {latencies.length > 0 ? Math.round(latencies.reduce((a,b)=>a+b, 0) / latencies.length) : 0}ms</div>
              </div>
              <button 
                onClick={startGame}
                className="neo-btn neo-btn-purple px-4 py-2 shadow-[3px_3px_0px_#000] text-xs font-bold font-mono"
              >
                RE-RUN ASSAY
              </button>
            </div>
          )}
        </div>
      </GlassCard>

      <GlassCard glowColor="green" className="flex flex-col justify-between space-y-4 text-xs">
        <div className="space-y-2">
          <h3 className="font-extrabold text-sm text-[#00FF88] border-b-[2px] border-black pb-1.5 flex items-center space-x-1.5 uppercase">
            <Zap className="h-4 w-4" />
            <span>Hemispheric Action Plan</span>
          </h3>
          <p className="leading-relaxed text-slate-300 font-semibold">
            Unlike simple reflex reaction, the **Choice Reaction** challenge forces the visual cortex to analyze shapes, match it with semantic definitions, and instruct the motor cortex to send commands to specific finger joints.
          </p>
        </div>
        <div className="bg-[#1c1c24] border-2 border-black p-2.5 rounded-none text-[10px] text-slate-300 font-mono font-bold shadow-[2px_2px_0px_#000]">
          Tip: You can use W, S, A, D keys or keyboard Arrow Keys to match the direction signals.
        </div>
      </GlassCard>
    </div>
  );
};

/* ==========================================
   GAME D: STROOP COLOR CHALLENGE
   ========================================== */
interface StroopChallenge {
  word: string;
  fontColor: string;
}

const StroopGame: React.FC<GameProps> = ({ addAttempt }) => {
  const [gameState, setGameState] = useState<'idle' | 'playing' | 'result'>('idle');
  const [challenge, setChallenge] = useState<StroopChallenge | null>(null);
  
  const [correct, setCorrect] = useState<number>(0);
  const [totalRounds, setTotalRounds] = useState<number>(0);
  const [latencies, setLatencies] = useState<number[]>([]);
  
  const challengeStartTimeRef = useRef<number>(0);
  const gameTimeLeftRef = useRef<number>(30); // 30 seconds game
  const [timeLeft, setTimeLeft] = useState<number>(30);
  const timerRef = useRef<any>(null);

  const colors = [
    { name: 'Red', hex: '#ef4444' },
    { name: 'Blue', hex: '#3b82f6' },
    { name: 'Green', hex: '#10b981' },
    { name: 'Yellow', hex: '#f59e0b' }
  ];

  const startGame = () => {
    setGameState('playing');
    setCorrect(0);
    setTotalRounds(0);
    setLatencies([]);
    gameTimeLeftRef.current = 30;
    setTimeLeft(30);

    nextChallenge();

    timerRef.current = setInterval(() => {
      gameTimeLeftRef.current -= 1;
      setTimeLeft(gameTimeLeftRef.current);
      if (gameTimeLeftRef.current <= 0) {
        endGame();
      }
    }, 1000);
  };

  const nextChallenge = () => {
    if (gameTimeLeftRef.current <= 0) return;
    
    // Choose written color word
    const wordIndex = Math.floor(Math.random() * colors.length);
    // Choose font color (sometimes match, sometimes mismatch)
    const fontIndex = Math.floor(Math.random() * colors.length);

    setChallenge({
      word: colors[wordIndex].name,
      fontColor: colors[fontIndex].name
    });
    
    challengeStartTimeRef.current = performance.now();
  };

  const handleChoice = (colorName: string) => {
    if (!challenge) return;
    
    const reactionTime = performance.now() - challengeStartTimeRef.current;
    setLatencies((prev) => [...prev, reactionTime]);
    setTotalRounds((tr) => tr + 1);

    if (colorName === challenge.fontColor) {
      setCorrect((c) => c + 1);
    }

    nextChallenge();
  };

  const endGame = () => {
    if (timerRef.current) clearInterval(timerRef.current);
    setGameState('result');
  };

  useEffect(() => {
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, []);

  // Save history on completion
  useEffect(() => {
    if (gameState === 'result') {
      const avgLatency = latencies.length > 0 ? Math.round(latencies.reduce((a, b) => a + b, 0) / latencies.length) : 0;
      const acc = totalRounds > 0 ? Math.round((correct / totalRounds) * 100) : 0;
      
      // Calculate score relative to correct volume under time pressure (e.g. 15 correct = 90 pts)
      const score = Math.min(100, Math.round((correct / 18) * 100));

      addAttempt({
        module: 'game-stroop',
        score,
        accuracy: acc,
        responseTime: avgLatency,
        rawMetrics: {
          conflictCorrect: correct,
          conflictTotal: totalRounds
        }
      });
    }
  }, [gameState]);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <GlassCard glowColor="none" className="lg:col-span-2 flex flex-col justify-between space-y-4">
        <div className="flex justify-between items-center border-b-[2px] border-black pb-2">
          <h2 className="text-base font-extrabold flex items-center space-x-2 text-white uppercase">
            <ShieldAlert className="h-4.5 w-4.5 text-[#A855F7]" />
            <span>Executive Interference Calibrator</span>
          </h2>
          {gameState === 'playing' && (
            <div className="flex space-x-4 text-xs font-mono font-bold bg-black px-2.5 py-1 border border-black shadow-[2px_2px_0px_#000]">
              <span className="text-[#00FF88]">CORRECT: {correct}</span>
              <span className="text-slate-400">TIME: {timeLeft}s</span>
            </div>
          )}
        </div>

        <div className="h-80 w-full relative bg-black border-[3px] border-black rounded-none overflow-hidden flex flex-col items-center justify-center p-6 space-y-6 shadow-[4px_4px_0px_#000]">
          {gameState === 'playing' && challenge && (
            <>
              {/* Stroop Word Display */}
              <div 
                style={{ color: colors.find(c => c.name === challenge.fontColor)?.hex }}
                className="text-6xl font-black tracking-widest uppercase select-none font-mono"
              >
                {challenge.word}
              </div>

              {/* Color Button Selections */}
              <div className="grid grid-cols-2 gap-3 w-full max-w-sm">
                {colors.map((c) => (
                  <button
                    key={c.name}
                    onClick={() => handleChoice(c.name)}
                    style={{ borderLeftColor: c.hex }}
                    className="bg-black hover:bg-white hover:text-black text-white text-xs font-mono py-2.5 px-4 border-2 border-black border-l-8 font-bold transition-all shadow-[2px_2px_0px_#000] hover:translate-x-[1px] hover:translate-y-[1px]"
                  >
                    {c.name.toUpperCase()}
                  </button>
                ))}
              </div>
            </>
          )}

          {gameState === 'idle' && (
            <div className="absolute inset-0 bg-[#0c0c0e]/95 flex flex-col items-center justify-center space-y-4 p-6 z-10">
              <span className="text-xs text-slate-400 font-mono tracking-widest block font-bold">COGNITIVE INTERFERENCE SENSOR DISENGAGED</span>
              <button
                onClick={startGame}
                className="neo-btn neo-btn-yellow px-6 py-2.5 shadow-[4px_4px_0px_#000000] text-xs font-bold font-mono"
              >
                INITIATE STROOP SCAN
              </button>
            </div>
          )}

          {gameState === 'result' && (
            <div className="absolute inset-0 bg-[#0c0c0e]/95 flex flex-col items-center justify-center space-y-4 text-center p-6 border-[3px] border-black shadow-[4px_4px_0px_#000] z-20 rounded-none">
              <span className="text-xs text-[#A855F7] font-mono tracking-widest font-extrabold">STROOP REPORT ARCHIVED</span>
              <div className="text-3xl font-black text-white uppercase">Conflict Score: {correct} / {totalRounds}</div>
              <div className="text-xs text-slate-300 space-y-1.5 font-mono font-bold bg-black p-3 border-2 border-black shadow-[2px_2px_0px_#000] inline-block">
                <div>Accuracy Index: {totalRounds > 0 ? Math.round((correct / totalRounds) * 100) : 0}%</div>
                <div>Cognitive Response Latency: {latencies.length > 0 ? Math.round(latencies.reduce((a,b)=>a+b, 0) / latencies.length) : 0}ms</div>
              </div>
              <button 
                onClick={startGame}
                className="neo-btn neo-btn-yellow px-4 py-2 shadow-[3px_3px_0px_#000] text-xs font-bold font-mono"
              >
                RE-RUN SCAN
              </button>
            </div>
          )}
        </div>
      </GlassCard>

      <GlassCard glowColor="purple" className="flex flex-col justify-between space-y-4 text-xs">
        <div className="space-y-2">
          <h3 className="font-extrabold text-sm text-[#A855F7] border-b-[2px] border-black pb-1.5 flex items-center space-x-1.5 uppercase">
            <Zap className="h-4 w-4" />
            <span>The Stroop Color Effect</span>
          </h3>
          <p className="leading-relaxed text-slate-300 font-semibold">
            The **Stroop Effect** demonstrates a delay in cognitive processing when color words do not match font colors. Read word text is automated inside the left hemisphere, introducing visual conflict.
          </p>
          <p className="leading-relaxed text-slate-400 font-semibold">
            Forcing selection of the font color engages the prefrontal cortex, which blocks default verbal signals in favor of selective chromatic targets.
          </p>
        </div>
        <div className="bg-[#1c1c24] border-2 border-black p-2.5 rounded-none text-[10px] text-slate-300 font-mono font-bold shadow-[2px_2px_0px_#000]">
          Tip: Prioritize selecting the font color (e.g. if BLUE is written in RED ink, click RED).
        </div>
      </GlassCard>
    </div>
  );
};
export default TrainingArena;
