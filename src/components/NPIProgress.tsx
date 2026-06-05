import React, { useEffect, useState } from 'react';
import { useProgress } from '../context/ProgressContext';
import { Brain, Info } from 'lucide-react';
import GlassCard from './GlassCard';

export const NPIProgress: React.FC = () => {
  const { scores, getPerformanceCategory } = useProgress();
  const [animatedNpi, setAnimatedNpi] = useState(0);

  useEffect(() => {
    const timer = setTimeout(() => {
      setAnimatedNpi(scores.npi);
    }, 100);
    return () => clearTimeout(timer);
  }, [scores.npi]);

  const category = getPerformanceCategory(scores.npi);

  const getColorClass = (cat: string) => {
    switch (cat) {
      case 'Elite':
        return 'text-cyan-400 stroke-cyan-400 bg-cyan-500/10 border-cyan-500/30';
      case 'Excellent':
        return 'text-emerald-400 stroke-emerald-400 bg-emerald-500/10 border-emerald-500/30';
      case 'Good':
        return 'text-indigo-400 stroke-indigo-400 bg-indigo-500/10 border-indigo-500/30';
      case 'Average':
        return 'text-amber-400 stroke-amber-400 bg-amber-500/10 border-amber-500/30';
      default:
        return 'text-rose-500 stroke-rose-500 bg-rose-500/10 border-rose-500/30';
    }
  };

  const radius = 70;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (animatedNpi / 100) * circumference;

  return (
    <GlassCard glowColor={scores.npi >= 80 ? 'cyan' : 'purple'} className="flex flex-col md:flex-row items-center md:items-stretch gap-6">
      
      {/* Circle Gauge Graphic */}
      <div className="flex flex-col items-center justify-center relative w-48 h-48 shrink-0">
        <svg className="w-full h-full transform -rotate-90">
          {/* Inner ring */}
          <circle
            cx="96"
            cy="96"
            r={radius}
            className="stroke-slate-800 fill-none"
            strokeWidth="12"
          />
          {/* Active colored path */}
          <circle
            cx="96"
            cy="96"
            r={radius}
            className={`fill-none transition-all duration-1000 ease-out ${getColorClass(category).split(' ')[1]}`}
            strokeWidth="12"
            strokeDasharray={circumference}
            strokeDashoffset={strokeDashoffset}
            strokeLinecap="round"
          />
        </svg>
        {/* Core Value Label */}
        <div className="absolute flex flex-col items-center justify-center text-center">
          <Brain className="h-6 w-6 text-slate-400 mb-1" />
          <span className="text-4xl font-extrabold tracking-tight font-mono text-white">
            {scores.npi}
          </span>
          <span className="text-[10px] text-slate-400 tracking-wider font-mono">INDEX RATIO</span>
        </div>
      </div>

      {/* Information Side */}
      <div className="flex-1 flex flex-col justify-between space-y-4">
        <div>
          <div className="flex items-center space-x-2.5">
            <span className="text-xs font-mono px-2 py-0.5 rounded border tracking-wider bg-slate-900 border-slate-800 text-slate-400">
              METRIC SUMMARY
            </span>
            <span className={`text-xs font-mono font-bold tracking-widest px-2.5 py-0.5 rounded border ${getColorClass(category).split(' ')[2]} ${getColorClass(category).split(' ')[3]} ${getColorClass(category).split(' ')[0]}`}>
              {category.toUpperCase()}
            </span>
          </div>
          
          <h3 className="text-xl font-bold mt-2 tracking-wide text-white">Neural Performance Index</h3>
          <p className="text-sm text-slate-300 mt-1 leading-relaxed">
            The NPI is a unified metric calculated by analyzing response speed, recall accuracy, focus endurance, cognitive resolution, and overall test correctness.
          </p>
        </div>

        {/* Breakdown of NPI Sub-Scores */}
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
          {[
            { label: 'Reflex (25%)', val: scores.reflex, col: 'text-cyan-400' },
            { label: 'Memory (20%)', val: scores.memory, col: 'text-purple-400' },
            { label: 'Focus (20%)', val: scores.focus, col: 'text-emerald-400' },
            { label: 'Endurance (20%)', val: scores.endurance, col: 'text-amber-400' },
            { label: 'Cognitive (15%)', val: scores.cognitive, col: 'text-indigo-400' },
            { label: 'Avg Accuracy', val: scores.accuracy, col: 'text-pink-400' },
          ].map((item, i) => (
            <div key={i} className="bg-slate-900/60 rounded-lg p-2.5 border border-slate-800/50 flex flex-col justify-between">
              <span className="text-[10px] text-slate-500 font-mono tracking-wider">{item.label}</span>
              <div className="flex justify-between items-baseline mt-0.5">
                <span className={`text-base font-bold font-mono ${item.col}`}>{item.val}</span>
                <span className="text-[9px] text-slate-500">/ 100</span>
              </div>
            </div>
          ))}
        </div>

        {/* Info formula caption */}
        <div className="flex items-center space-x-2 text-[10px] text-slate-500 font-mono bg-slate-900/30 p-2 rounded border border-slate-800/40">
          <Info className="h-3.5 w-3.5 text-cyan-400 shrink-0" />
          <span>NPI = 25% Reflex + 20% Memory + 20% Focus + 20% Endurance + 15% Cognitive</span>
        </div>
      </div>

    </GlassCard>
  );
};
export default NPIProgress;
