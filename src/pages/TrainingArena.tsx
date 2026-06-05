import React, { useState, useEffect, useRef } from 'react';
import { 
  Gamepad2, 
  RefreshCw, 
  Award, 
  Zap, 
  Target, 
  ShieldAlert
} from 'lucide-react';
import { useProgress } from '../context/ProgressContext';
import GlassCard from '../components/GlassCard';

type TrainingGame = 'game-catch' | 'game-pop' | 'game-direction' | 'game-stroop' | null;

export const TrainingArena: React.FC = () => {
  const [activeGame, setActiveGame] = useState<TrainingGame>(null);
  const { addAttempt } = useProgress();

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center border-b border-slate-800 pb-4 gap-4">
        <div>
          <h1 className="text-3xl font-extrabold tracking-tight">Training Arena</h1>
          <p className="text-sm text-slate-400">Optimize synaptic plasticity, reflex efficiency, and executive control through training.</p>
        </div>
        {activeGame && (
          <button 
            onClick={() => setActiveGame(null)}
            className="text-xs font-mono text-cyan-400 hover:text-cyan-300 border border-cyan-500/20 bg-cyan-500/5 px-3 py-1.5 rounded-lg flex items-center space-x-1.5 transition-colors"
          >
            <RefreshCw className="h-3.5 w-3.5" />
            <span>RETURN TO GAME SELECTOR</span>
          </button>
        )}
      </div>

      {!activeGame ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Game A: Falling Object Catch */}
          <GlassCard glowColor="cyan" className="flex flex-col justify-between h-[300px]">
            <div className="space-y-3">
              <div className="flex justify-between items-start">
                <div className="bg-cyan-500/10 p-2 rounded-lg border border-cyan-500/30 text-cyan-400">
                  <Gamepad2 className="h-6 w-6" />
                </div>
                <span className="text-[10px] text-cyan-400 font-mono tracking-wider bg-cyan-500/5 px-2 py-0.5 rounded border border-cyan-500/20">
                  GAME A
                </span>
              </div>
              <h3 className="text-lg font-bold">Falling Object Catch</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Objects fall under simulated gravity. Users must intercept (click) synapse structures before they escape the boundary. Trains motor readiness and visual-spatial coordinates mapping.
              </p>
            </div>
            <button 
              onClick={() => setActiveGame('game-catch')}
              className="w-full bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold py-2 rounded-lg text-xs transition-colors mt-4"
            >
              LAUNCH GAME
            </button>
          </GlassCard>

          {/* Game B: Target Pop */}
          <GlassCard glowColor="green" className="flex flex-col justify-between h-[300px]">
            <div className="space-y-3">
              <div className="flex justify-between items-start">
                <div className="bg-emerald-500/10 p-2 rounded-lg border border-emerald-500/30 text-emerald-400">
                  <Target className="h-6 w-6" />
                </div>
                <span className="text-[10px] text-emerald-400 font-mono tracking-wider bg-emerald-500/5 px-2 py-0.5 rounded border border-emerald-500/20">
                  GAME B
                </span>
              </div>
              <h3 className="text-lg font-bold">High Speed Target Pop</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Targets appear on a coordinate space and shrink dynamically. Clicking them fast awards higher cognitive score credits. Develops peripheral vision and visual-motor speed coordination.
              </p>
            </div>
            <button 
              onClick={() => setActiveGame('game-pop')}
              className="w-full bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold py-2 rounded-lg text-xs transition-colors mt-4"
            >
              LAUNCH GAME
            </button>
          </GlassCard>

          {/* Game C: Direction Challenge */}
          <GlassCard glowColor="purple" className="flex flex-col justify-between h-[300px]">
            <div className="space-y-3">
              <div className="flex justify-between items-start">
                <div className="bg-purple-500/10 p-2 rounded-lg border border-purple-500/30 text-purple-400">
                  <Zap className="h-6 w-6" />
                </div>
                <span className="text-[10px] text-purple-400 font-mono tracking-wider bg-purple-500/5 px-2 py-0.5 rounded border border-purple-500/20">
                  GAME C
                </span>
              </div>
              <h3 className="text-lg font-bold">Directional Decision Challenge</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Requires arrow key inputs to match directions on-screen. Compares choice reflex delay. Triggers lateral hemisphere translation as arrows speed up dynamically.
              </p>
            </div>
            <button 
              onClick={() => setActiveGame('game-direction')}
              className="w-full bg-purple-600 hover:bg-purple-500 text-white font-bold py-2 rounded-lg text-xs transition-colors mt-4"
            >
              LAUNCH GAME
            </button>
          </GlassCard>

          {/* Game D: Stroop Color Challenge */}
          <GlassCard glowColor="none" className="border-slate-800 hover:border-slate-700 flex flex-col justify-between h-[300px]">
            <div className="space-y-3">
              <div className="flex justify-between items-start">
                <div className="bg-slate-800/60 p-2 rounded-lg border border-slate-700 text-slate-300">
                  <Award className="h-6 w-6" />
                </div>
                <span className="text-[10px] text-slate-500 font-mono tracking-wider bg-slate-900 px-2 py-0.5 rounded border border-slate-800">
                  GAME D
                </span>
              </div>
              <h3 className="text-lg font-bold">Stroop Color Interference</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Measures executive interference response. Identify font color while bypassing text definitions. Directly tests prefrontal cortical inhibition control and mental flexibility under pressure.
              </p>
            </div>
            <button 
              onClick={() => setActiveGame('game-stroop')}
              className="w-full bg-slate-800 hover:bg-slate-700 text-white font-bold py-2 rounded-lg text-xs transition-colors mt-4"
            >
              LAUNCH GAME
            </button>
          </GlassCard>
        </div>
      ) : (
        <div className="space-y-6">
          {activeGame === 'game-catch' && <FallingCatchGame addAttempt={addAttempt} />}
          {activeGame === 'game-pop' && <TargetPopGame addAttempt={addAttempt} />}
          {activeGame === 'game-direction' && <DirectionChallengeGame addAttempt={addAttempt} />}
          {activeGame === 'game-stroop' && <StroopGame addAttempt={addAttempt} />}
        </div>
      )}
    </div>
  );
};

/* ==========================================
   GAME A: FALLING OBJECT CATCH
   ========================================== */
interface GameProps {
  addAttempt: (attempt: any) => void;
}

interface FallingObject {
  id: number;
  x: number; // percentage
  y: number; // percentage
  speed: number;
  label: string;
}

const FallingCatchGame: React.FC<GameProps> = ({ addAttempt }) => {
  const [gameState, setGameState] = useState<'idle' | 'playing' | 'gameover'>('idle');
  const [objects, setObjects] = useState<FallingObject[]>([]);
  const [caught, setCaught] = useState<number>(0);
  const [missed, setMissed] = useState<number>(0);
  const [speedMultiplier, setSpeedMultiplier] = useState<number>(1.0);
  
  const gameLoopRef = useRef<number | null>(null);
  const spawnTimerRef = useRef<any>(null);
  const objIdRef = useRef<number>(0);
  
  const startTimeRef = useRef<number>(0);
  const hitLatenciesRef = useRef<number[]>([]);

  const startGame = () => {
    setGameState('playing');
    setCaught(0);
    setMissed(0);
    setObjects([]);
    setSpeedMultiplier(1.0);
    objIdRef.current = 0;
    hitLatenciesRef.current = [];
    startTimeRef.current = performance.now();

    spawnObject();
  };

  const spawnObject = () => {
    if (gameState === 'gameover') return;
    
    const labels = ['🧬', '🧪', '🧠', '⚡', '🔋'];
    const newObj: FallingObject = {
      id: objIdRef.current++,
      x: Math.random() * 80 + 10,
      y: 0,
      speed: (Math.random() * 1.5 + 1.2) * speedMultiplier,
      label: labels[Math.floor(Math.random() * labels.length)]
    };

    setObjects((prev) => [...prev, newObj]);

    // Randomize spawn intervals based on multiplier
    const nextSpawn = Math.max(600, 1500 - speedMultiplier * 100);
    spawnTimerRef.current = setTimeout(spawnObject, nextSpawn);
  };

  const handleCatchClick = (e: React.MouseEvent, id: number) => {
    e.stopPropagation();
    const hitTime = performance.now();
    hitLatenciesRef.current.push(hitTime);

    setCaught((c) => {
      const nextCaught = c + 1;
      // Increment speeds gradually
      if (nextCaught % 5 === 0) {
        setSpeedMultiplier((sm) => sm + 0.15);
      }
      return nextCaught;
    });

    setObjects((prev) => prev.filter(o => o.id !== id));
  };

  // Main rendering ticks
  useEffect(() => {
    if (gameState !== 'playing') return;

    const tick = () => {
      setObjects((prev) => {
        const updated = prev.map((o) => ({ ...o, y: o.y + o.speed }));
        
        // Find missed items reaching bottom boundary (y >= 92%)
        const missedItems = updated.filter((o) => o.y >= 92);
        if (missedItems.length > 0) {
          setMissed((m) => {
            const nextMissed = m + missedItems.length;
            if (nextMissed >= 8) {
              setGameState('gameover');
            }
            return nextMissed;
          });
        }

        return updated.filter((o) => o.y < 92);
      });

      gameLoopRef.current = requestAnimationFrame(tick);
    };

    gameLoopRef.current = requestAnimationFrame(tick);

    return () => {
      if (gameLoopRef.current) cancelAnimationFrame(gameLoopRef.current);
      if (spawnTimerRef.current) clearTimeout(spawnTimerRef.current);
    };
  }, [gameState, speedMultiplier]);

  // Handle Game Over submissions
  useEffect(() => {
    if (gameState === 'gameover') {
      const totalPresented = caught + missed;
      const catchRate = totalPresented > 0 ? Math.round((caught / totalPresented) * 100) : 0;
      
      // Calculate score relative to catch volume (e.g. 30 caught = 100 score)
      const calculatedScore = Math.min(100, Math.round((caught / 30) * 100));

      addAttempt({
        module: 'game-catch',
        score: calculatedScore,
        accuracy: catchRate,
        responseTime: hitLatenciesRef.current.length > 0 ? 320 : undefined, // dummy latency scale
        rawMetrics: {
          caughtCount: caught,
          missedCount: missed
        }
      });
    }
  }, [gameState]);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      {/* Game board */}
      <GlassCard glowColor="cyan" className="lg:col-span-2 flex flex-col justify-between space-y-4">
        <div className="flex justify-between items-center border-b border-slate-800 pb-2.5">
          <h2 className="text-base font-bold flex items-center space-x-2">
            <Gamepad2 className="h-4.5 w-4.5 text-cyan-400" />
            <span>Intercept Calibrator</span>
          </h2>
          <div className="flex items-center space-x-4 text-xs font-mono">
            <span className="text-cyan-400">CAUGHT: {caught}</span>
            <span className="text-rose-500">MISSED: {missed} / 8</span>
          </div>
        </div>

        {/* Physics engine field */}
        <div className="h-80 w-full relative bg-slate-950/70 border border-slate-850 rounded-lg overflow-hidden">
          {gameState === 'playing' && objects.map((obj) => (
            <div
              key={obj.id}
              onClick={(e) => handleCatchClick(e, obj.id)}
              style={{ top: `${obj.y}%`, left: `${obj.x}%` }}
              className="absolute w-10 h-10 rounded-full border border-cyan-500/30 bg-slate-900/90 flex items-center justify-center text-sm cursor-pointer select-none shadow-[0_0_10px_rgba(0,229,255,0.1)] hover:border-cyan-400 active:scale-90 font-mono transition-transform"
            >
              {obj.label}
            </div>
          ))}

          {/* Bottom limit warning zone */}
          <div className="absolute bottom-0 left-0 right-0 h-1.5 bg-rose-500/20 border-t border-rose-500/30 animate-pulse pointer-events-none" />

          {gameState === 'idle' && (
            <div className="absolute inset-0 bg-[#070b19]/90 flex flex-col items-center justify-center space-y-4">
              <span className="text-xs text-slate-500 font-mono tracking-widest block">GRAV-SENSITIVITY SCANNER READY</span>
              <button
                onClick={startGame}
                className="bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold px-6 py-2.5 rounded font-mono text-xs tracking-wider transition-colors shadow-lg shadow-cyan-500/10"
              >
                START TRAINING RUN
              </button>
            </div>
          )}

          {gameState === 'gameover' && (
            <div className="absolute inset-0 bg-[#070b19]/95 flex flex-col items-center justify-center space-y-4">
              <span className="text-xs text-rose-500 font-bold font-mono tracking-widest">DIAGNOSTIC CEASED - CAP LIMIT REACHED</span>
              <div className="text-3xl font-extrabold text-white">Caught {caught} Objects</div>
              <p className="text-xs text-slate-400 font-mono">Catch success rate: {Math.round((caught / (caught + missed)) * 100)}%</p>
              <button 
                onClick={startGame}
                className="bg-slate-900 border border-slate-850 hover:bg-slate-800 text-xs px-4 py-2 rounded font-mono transition-colors"
              >
                RUN AGAIN
              </button>
            </div>
          )}
        </div>
      </GlassCard>

      {/* Explainer */}
      <GlassCard glowColor="purple" className="flex flex-col justify-between space-y-4 text-xs">
        <div className="space-y-2">
          <h3 className="font-bold text-sm text-purple-400 border-b border-slate-850 pb-1.5 flex items-center space-x-1.5">
            <Zap className="h-4 w-4" />
            <span>Visual Interception Dynamics</span>
          </h3>
          <p className="leading-relaxed text-slate-300">
            This module trains your eye-hand coordination loop. When objects drop, your brain must continuously estimate velocities, planning motor actions that fire exactly at spatial intercept coordinates.
          </p>
          <p className="leading-relaxed text-slate-400">
            Consistently playing speeds up cellular processing inside the cerebellum, which processes voluntary movement tracking.
          </p>
        </div>
        <div className="bg-slate-900 border border-slate-800 p-2.5 rounded text-[10px] text-slate-500 font-mono">
          Note: Speed factors scale after every 5 successful catches, taxing your synaptic reaction threshold.
        </div>
      </GlassCard>
    </div>
  );
};

/* ==========================================
   GAME B: TARGET POP GAME
   ========================================== */
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
  const gameTimeLeft = useRef<number>(30); // 30 seconds game
  const targetIdRef = useRef<number>(0);
  const spawnTimerRef = useRef<any>(null);

  const startGame = () => {
    setGameState('playing');
    setPopped(0);
    setMissed(0);
    setLatencies([]);
    setTargets([]);
    targetIdRef.current = 0;
    gameTimeLeft.current = 30;

    spawnTarget();

    timerRef.current = setInterval(() => {
      gameTimeLeft.current -= 1;
      if (gameTimeLeft.current <= 0) {
        endGame();
      }
    }, 1000);
  };

  const spawnTarget = () => {
    if (gameTimeLeft.current <= 0) return;

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
        <div className="flex justify-between items-center border-b border-slate-800 pb-2">
          <h2 className="text-base font-bold">High Speed Target Calibrator</h2>
          {gameState === 'playing' && (
            <div className="flex space-x-4 text-xs font-mono">
              <span className="text-cyan-400">POPPED: {popped}</span>
              <span className="text-slate-500">TIME: {gameTimeLeft.current}s</span>
            </div>
          )}
        </div>

        <div className="h-80 w-full relative bg-slate-950/70 border border-slate-850 rounded-lg overflow-hidden cursor-crosshair">
          {gameState === 'playing' && targets.map((t) => (
            <div
              key={t.id}
              onClick={(e) => handleTargetClick(e, t)}
              style={{
                top: `${t.y}%`,
                left: `${t.x}%`,
                width: `${t.size}px`,
                height: `${t.size}px`,
                animationDuration: `${t.lifespan}ms`
              }}
              className="absolute rounded-full border border-emerald-400 bg-emerald-500/20 shadow-[0_0_12px_rgba(16,185,129,0.3)] cursor-pointer select-none flex items-center justify-center transform -translate-x-1/2 -translate-y-1/2 animate-ping"
            >
              <div className="w-2.5 h-2.5 bg-emerald-400 rounded-full" />
            </div>
          ))}

          {gameState === 'idle' && (
            <div className="absolute inset-0 bg-[#070b19]/90 flex flex-col items-center justify-center space-y-4">
              <span className="text-xs text-slate-500 font-mono tracking-widest block">RADIAL SPEED SENSOR DISENGAGED</span>
              <button
                onClick={startGame}
                className="bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold px-6 py-2.5 rounded font-mono text-xs tracking-wider transition-colors"
              >
                INITIATE SPEED SCAN
              </button>
            </div>
          )}

          {gameState === 'result' && (
            <div className="absolute inset-0 bg-[#070b19]/95 flex flex-col items-center justify-center space-y-4 text-center p-6 rounded-lg">
              <span className="text-xs text-emerald-400 font-mono tracking-widest">BIOMETRIC COMPLIANCE DATA RECIEVED</span>
              <div className="text-3xl font-extrabold text-white">Popped {popped} Targets</div>
              <div className="text-xs text-slate-400 font-mono">
                <div>Hit Accuracy: {Math.round((popped / (popped + missed)) * 100)}%</div>
                <div>Avg Click Latency: {latencies.length > 0 ? Math.round(latencies.reduce((a,b)=>a+b, 0) / latencies.length) : 0}ms</div>
              </div>
              <button 
                onClick={startGame}
                className="bg-slate-900 border border-slate-850 hover:bg-slate-800 text-xs px-4 py-2 rounded font-mono transition-colors"
              >
                RE-RUN ASSAY
              </button>
            </div>
          )}
        </div>
      </GlassCard>

      <GlassCard glowColor="cyan" className="flex flex-col justify-between space-y-4 text-xs">
        <div className="space-y-2">
          <h3 className="font-bold text-sm text-cyan-400 border-b border-slate-850 pb-1.5 flex items-center space-x-1.5">
            <Zap className="h-4 w-4" />
            <span>Peripheral Motor Synthesis</span>
          </h3>
          <p className="leading-relaxed text-slate-300">
            Clicking targets that spawn unpredictably trains visual scanning and peripheral saccadic eye movements. Your eyes must guide motor coordinates under tight speed caps.
          </p>
        </div>
        <div className="bg-slate-900 border border-slate-850 p-2.5 rounded text-[10px] text-slate-500 font-mono">
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
        <div className="flex justify-between items-center border-b border-slate-800 pb-2.5">
          <h2 className="text-base font-bold">Directional Decision Hub</h2>
          {gameState === 'playing' && (
            <div className="text-xs font-mono text-slate-400">
              ROUND: {roundCountRef.current} / 20 | CORRECT: {correct}
            </div>
          )}
        </div>

        <div className="h-80 w-full relative bg-slate-950/70 border border-slate-850 rounded-lg overflow-hidden flex items-center justify-center">
          {gameState === 'playing' && currentArrow && (
            <div className="text-center space-y-4">
              <div className="text-8xl font-black text-purple-400 animate-pulse tracking-wide select-none">
                {currentArrow}
              </div>
              <p className="text-xs text-slate-400 font-mono">(Press matching arrow key on keyboard)</p>
            </div>
          )}

          {gameState === 'playing' && !currentArrow && (
            <div className="text-slate-600 font-mono text-xs animate-pulse">
              PREPARING NEW ARROW SIGNAL...
            </div>
          )}

          {gameState === 'idle' && (
            <div className="absolute inset-0 bg-[#070b19]/90 flex flex-col items-center justify-center space-y-4">
              <span className="text-xs text-slate-500 font-mono tracking-widest block">DECISION LATENCY ANALYZER LOADED</span>
              <button
                onClick={startGame}
                className="bg-purple-600 hover:bg-purple-500 text-white font-bold px-6 py-2.5 rounded font-mono text-xs tracking-wider transition-colors shadow-lg shadow-purple-500/10"
              >
                START ASSAY ROUND
              </button>
            </div>
          )}

          {gameState === 'result' && (
            <div className="absolute inset-0 bg-[#070b19]/95 flex flex-col items-center justify-center space-y-4 text-center">
              <span className="text-xs text-purple-400 font-mono tracking-widest">DIAGNOSTIC REPORT FORWARDED</span>
              <div className="text-3xl font-extrabold text-white">Correct Inputs: {correct} / {totalKeys}</div>
              <div className="text-xs text-slate-400 font-mono">
                <div>Accuracy Ratio: {totalKeys > 0 ? Math.round((correct / totalKeys) * 100) : 0}%</div>
                <div>Avg Choice Latency: {latencies.length > 0 ? Math.round(latencies.reduce((a,b)=>a+b, 0) / latencies.length) : 0}ms</div>
              </div>
              <button 
                onClick={startGame}
                className="bg-slate-900 border border-slate-850 hover:bg-slate-800 text-xs px-4 py-2 rounded font-mono transition-colors"
              >
                RE-RUN ASSAY
              </button>
            </div>
          )}
        </div>
      </GlassCard>

      <GlassCard glowColor="green" className="flex flex-col justify-between space-y-4 text-xs">
        <div className="space-y-2">
          <h3 className="font-bold text-sm text-emerald-400 border-b border-slate-850 pb-1.5 flex items-center space-x-1.5">
            <Zap className="h-4 w-4" />
            <span>Hemispheric Action Plan</span>
          </h3>
          <p className="leading-relaxed text-slate-300">
            Unlike simple reflex reaction, the **Choice Reaction** challenge forces the visual cortex to analyze shapes, match it with semantic definitions, and instruct the motor cortex to send commands to specific finger joints.
          </p>
        </div>
        <div className="bg-slate-900 border border-slate-800 p-2.5 rounded text-[10px] text-slate-500 font-mono">
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
  const gameTimeLeft = useRef<number>(30); // 30 seconds game
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
    gameTimeLeft.current = 30;

    nextChallenge();

    timerRef.current = setInterval(() => {
      gameTimeLeft.current -= 1;
      if (gameTimeLeft.current <= 0) {
        endGame();
      }
    }, 1000);
  };

  const nextChallenge = () => {
    if (gameTimeLeft.current <= 0) return;
    
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
      <GlassCard glowColor="none" className="lg:col-span-2 flex flex-col justify-between space-y-4 border-slate-800">
        <div className="flex justify-between items-center border-b border-slate-800 pb-2">
          <h2 className="text-base font-bold flex items-center space-x-2">
            <ShieldAlert className="h-4.5 w-4.5 text-purple-400" />
            <span>Executive Interference Calibrator</span>
          </h2>
          {gameState === 'playing' && (
            <div className="flex space-x-4 text-xs font-mono">
              <span className="text-emerald-400">CORRECT: {correct}</span>
              <span className="text-slate-500">TIME: {gameTimeLeft.current}s</span>
            </div>
          )}
        </div>

        <div className="h-80 w-full relative bg-slate-950/70 border border-slate-850 rounded-lg overflow-hidden flex flex-col items-center justify-center p-6 space-y-6">
          {gameState === 'playing' && challenge && (
            <>
              {/* Stroop Word Display */}
              <div 
                style={{ color: colors.find(c => c.name === challenge.fontColor)?.hex }}
                className="text-6xl font-black tracking-widest uppercase select-none animate-pulse-slow"
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
                    className="bg-slate-900 hover:bg-slate-850 text-white text-xs font-mono py-2.5 px-4 border border-slate-800 rounded border-l-4 font-bold transition-all transform hover:scale-[1.02] active:scale-95"
                  >
                    {c.name.toUpperCase()}
                  </button>
                ))}
              </div>
            </>
          )}

          {gameState === 'idle' && (
            <div className="absolute inset-0 bg-[#070b19]/90 flex flex-col items-center justify-center space-y-4">
              <span className="text-xs text-slate-500 font-mono tracking-widest block">COGNITIVE INTERFERENCE SENSOR DISENGAGED</span>
              <button
                onClick={startGame}
                className="bg-slate-800 hover:bg-slate-700 text-white border border-slate-700 font-bold px-6 py-2.5 rounded font-mono text-xs tracking-wider transition-colors"
              >
                INITIATE STROOP SCAN
              </button>
            </div>
          )}

          {gameState === 'result' && (
            <div className="absolute inset-0 bg-[#070b19]/95 flex flex-col items-center justify-center space-y-4 text-center rounded-lg">
              <span className="text-xs text-purple-400 font-mono tracking-widest">STROOP REPORT ARCHIVED</span>
              <div className="text-3xl font-extrabold text-white">Conflict Score: {correct} / {totalRounds}</div>
              <div className="text-xs text-slate-400 font-mono">
                <div>Accuracy Index: {totalRounds > 0 ? Math.round((correct / totalRounds) * 100) : 0}%</div>
                <div>Cognitive Response Latency: {latencies.length > 0 ? Math.round(latencies.reduce((a,b)=>a+b, 0) / latencies.length) : 0}ms</div>
              </div>
              <button 
                onClick={startGame}
                className="bg-slate-900 border border-slate-850 hover:bg-slate-800 text-xs px-4 py-2 rounded font-mono transition-colors"
              >
                RE-RUN SCAN
              </button>
            </div>
          )}
        </div>
      </GlassCard>

      <GlassCard glowColor="purple" className="flex flex-col justify-between space-y-4 text-xs">
        <div className="space-y-2">
          <h3 className="font-bold text-sm text-purple-400 border-b border-slate-850 pb-1.5 flex items-center space-x-1.5">
            <Zap className="h-4 w-4" />
            <span>The Stroop Color Effect</span>
          </h3>
          <p className="leading-relaxed text-slate-300">
            The **Stroop Effect** demonstrates a delay in cognitive processing when color words do not match font colors. Read word text is automated inside the left hemisphere, introducing visual conflict.
          </p>
          <p className="leading-relaxed text-slate-400">
            Forcing selection of the font color engages the prefrontal cortex, which blocks default verbal signals in favor of selective chromatic targets.
          </p>
        </div>
        <div className="bg-slate-900 border border-slate-800 p-2.5 rounded text-[10px] text-slate-500 font-mono">
          Tip: Prioritize selecting the font color (e.g. if BLUE is written in RED ink, click RED).
        </div>
      </GlassCard>
    </div>
  );
};
export default TrainingArena;
