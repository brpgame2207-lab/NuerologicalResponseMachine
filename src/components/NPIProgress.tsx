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
        return 'text-[#00E5FF] stroke-[#00E5FF] bg-[#00E5FF]/20 border-black';
      case 'Excellent':
        return 'text-[#00FF88] stroke-[#00FF88] bg-[#00FF88]/20 border-black';
      case 'Good':
        return 'text-[#7C3AED] stroke-[#7C3AED] bg-[#7C3AED]/20 border-black';
      case 'Average':
        return 'text-[#FFDE47] stroke-[#FFDE47] bg-[#FFDE47]/20 border-black';
      default:
        return 'text-[#FF007F] stroke-[#FF007F] bg-[#FF007F]/20 border-black';
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
          {/* Black outline outer circle for brutalist depth */}
          <circle
            cx="96"
            cy="96"
            r={radius}
            className="stroke-black fill-none"
            strokeWidth="18"
          />
          {/* Inner ring */}
          <circle
            cx="96"
            cy="96"
            r={radius}
            className="stroke-[#27272a] fill-none"
            strokeWidth="10"
          />
          {/* Active colored path */}
          <circle
            cx="96"
            cy="96"
            r={radius}
            className={`fill-none transition-all duration-1000 ease-out ${getColorClass(category).split(' ')[1]}`}
            strokeWidth="10"
            strokeDasharray={circumference}
            strokeDashoffset={strokeDashoffset}
            strokeLinecap="square"
          />
        </svg>
        {/* Core Value Label */}
        <div className="absolute flex flex-col items-center justify-center text-center">
          <Brain className="h-6 w-6 text-slate-400 mb-1" />
          <span className="text-4xl font-black tracking-tight font-mono text-white">
            {scores.npi}
          </span>
          <span className="text-[10px] text-slate-400 tracking-wider font-mono font-bold">INDEX RATIO</span>
        </div>
      </div>

      {/* Information Side */}
      <div className="flex-1 flex flex-col justify-between space-y-4">
        <div>
          <div className="flex items-center space-x-2.5">
            <span className="text-[10px] font-mono font-bold px-2.5 py-0.5 rounded-none border-[2px] border-black bg-black text-slate-400 tracking-wider">
              METRIC SUMMARY
            </span>
            <span className={`text-[10px] font-mono font-black tracking-widest px-2.5 py-0.5 rounded-none border-[2px] ${getColorClass(category).split(' ')[3]} ${getColorClass(category).split(' ')[2]} ${getColorClass(category).split(' ')[0]}`}>
              {category.toUpperCase()}
            </span>
          </div>
          
          <h3 className="text-xl font-extrabold mt-2 tracking-wide text-white">Neural Performance Index</h3>
          <p className="text-sm text-slate-300 mt-1 leading-relaxed">
            The NPI is a unified metric calculated by analyzing response speed, recall accuracy, focus endurance, cognitive resolution, and overall test correctness.
          </p>
        </div>

        {/* Breakdown of NPI Sub-Scores */}
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
          {[
            { label: 'Reflex (25%)', val: scores.reflex, col: 'text-[#00E5FF]' },
            { label: 'Memory (20%)', val: scores.memory, col: 'text-[#A855F7]' },
            { label: 'Focus (20%)', val: scores.focus, col: 'text-[#00FF88]' },
            { label: 'Endurance (20%)', val: scores.endurance, col: 'text-[#FFDE47]' },
            { label: 'Cognitive (15%)', val: scores.cognitive, col: 'text-[#6366F1]' },
            { label: 'Avg Accuracy', val: scores.accuracy, col: 'text-[#FF007F]' },
          ].map((item, i) => (
            <div key={i} className="bg-[#1c1c24] rounded-none p-2.5 border-[2px] border-black shadow-[3px_3px_0px_#000000] flex flex-col justify-between">
              <span className="text-[10px] text-slate-400 font-mono tracking-wider font-bold">{item.label}</span>
              <div className="flex justify-between items-baseline mt-0.5">
                <span className={`text-base font-black font-mono ${item.col}`}>{item.val}</span>
                <span className="text-[9px] text-slate-500">/ 100</span>
              </div>
            </div>
          ))}
        </div>

        {/* Info formula caption */}
        <div className="flex items-center space-x-2 text-[10px] text-slate-300 font-mono bg-black p-2 border-[2px] border-black shadow-[3px_3px_0px_#000] rounded-none">
          <Info className="h-3.5 w-3.5 text-[#00E5FF] shrink-0" />
          <span>NPI = 25% Reflex + 20% Memory + 20% Focus + 20% Endurance + 15% Cognitive</span>
        </div>
      </div>

    </GlassCard>
  );
};
export default NPIProgress;
