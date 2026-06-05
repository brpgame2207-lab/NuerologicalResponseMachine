import React from 'react';
import { 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip as ChartTooltip, 
  ResponsiveContainer,
  RadarChart, 
  PolarGrid, 
  PolarAngleAxis, 
  PolarRadiusAxis, 
  Radar,
  BarChart,
  Bar,
  Legend
} from 'recharts';
import { 
  TrendingDown, 
  BrainCircuit, 
  Trash2, 
  AlertCircle,
  Calendar
} from 'lucide-react';
import { useProgress } from '../context/ProgressContext';
import GlassCard from '../components/GlassCard';

const getPerformanceClass = (npiValue: number) => {
  if (npiValue >= 90) return 'text-[#00E5FF] border-black bg-[#00E5FF]/20';
  if (npiValue >= 80) return 'text-[#00FF88] border-black bg-[#00FF88]/20';
  if (npiValue >= 70) return 'text-[#7C3AED] border-black bg-[#7C3AED]/20';
  if (npiValue >= 50) return 'text-[#FFDE47] border-black bg-[#FFDE47]/20';
  return 'text-[#FF007F] border-black bg-[#FF007F]/20';
};

const getModuleLabel = (mod: string) => {
  switch (mod) {
    case 'visual-reflex': return 'Visual Reflex';
    case 'memory-tile': return 'Memory Tiles';
    case 'focus-endurance': return 'Focus Endurance';
    case 'game-catch': return 'Synapse Catch';
    case 'game-pop': return 'Target Pop';
    case 'game-direction': return 'Direction Key';
    case 'game-stroop': return 'Stroop Conflict';
    default: return mod;
  }
};

export const AnalyticsPage: React.FC = () => {
  const { history, scores, clearHistory } = useProgress();

  // 1. Radar: map each sub-score (all already 0–100 from useMemo)
  //    reflex score is 0-100; convert avg reflex ms to 0-100 scale for display
  const reflexMs = (() => {
    const reflexAttempts = history.filter(h => h.responseTime && (
      h.module === 'visual-reflex' || h.module === 'game-pop' ||
      h.module === 'game-direction' || h.module === 'game-stroop'
    ));
    if (reflexAttempts.length === 0) return 0;
    const avg = reflexAttempts.reduce((s, h) => s + (h.responseTime ?? 0), 0) / reflexAttempts.length;
    // Normalize: 150ms = 100 score, 600ms+ = 0 score
    return Math.max(0, Math.min(100, Math.round(((600 - avg) / 450) * 100)));
  })();

  const radarData = [
    { subject: 'Reflex Speed', value: reflexMs, fullMark: 100 },
    { subject: 'Memory Recall', value: scores.memory, fullMark: 100 },
    { subject: 'Focus Vigilance', value: scores.focus, fullMark: 100 },
    { subject: 'Attention Endur', value: scores.endurance, fullMark: 100 },
    { subject: 'Cognitive Resol', value: scores.cognitive, fullMark: 100 },
    { subject: 'Accuracy Ratio', value: scores.accuracy, fullMark: 100 },
  ];

  // 2. Latency trend: ALL modules that recorded a responseTime, chronological
  const speedTrendData = [...history]
    .filter(h => h.responseTime != null && h.responseTime > 0)
    .reverse()                    // oldest first
    .slice(-12)                   // last 12 across all modules
    .map((h, index) => ({
      attempt: `#${index + 1}`,
      latency: h.responseTime,
      score: h.score,
      module: getModuleLabel(h.module),
      date: new Date(h.timestamp).toLocaleDateString(undefined, { month: 'short', day: 'numeric' })
    }));

  // 3. Vigilance: all sessions mapped to hits / total / accuracy per attempt
  const focusEnduranceHistory = [...history]
    .reverse()
    .slice(-8)
    .map((h, index) => {
      // Derive "hits" from whichever metric the module provides
      const hits = h.rawMetrics.hits ?? h.rawMetrics.targetsPopped ??
        h.rawMetrics.caughtCount ?? h.rawMetrics.correctKeys ??
        h.rawMetrics.conflictCorrect ?? h.rawMetrics.correctTilesCount ?? h.score;
      const misses = h.rawMetrics.misses ?? h.rawMetrics.missedCount ??
        h.rawMetrics.totalKeys != null ? (h.rawMetrics.totalKeys ?? 0) - (h.rawMetrics.correctKeys ?? h.rawMetrics.totalKeys ?? 0) :
        h.rawMetrics.conflictTotal != null ? (h.rawMetrics.conflictTotal ?? 0) - (h.rawMetrics.conflictCorrect ?? 0) : 0;
      const falseClicks = h.rawMetrics.falseClicks ?? 0;
      return {
        test: `S${index + 1}`,
        label: getModuleLabel(h.module),
        hits: Number(hits) || 0,
        misses: Number(misses) || 0,
        falseClicks: Number(falseClicks) || 0,
        accuracy: h.accuracy,
      };
    });


  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center border-b-[3px] border-black pb-4 gap-4">
        <div>
          <h1 className="text-3xl font-black tracking-tight uppercase">Biometric Analytics</h1>
          <p className="text-sm text-slate-400 font-bold">View diagnostic trends, neural performance matrices, and clinical history.</p>
        </div>
        {history.length > 0 && (
          <button 
            onClick={clearHistory}
            className="neo-btn px-3 py-1.5 text-xs font-mono flex items-center space-x-1.5 shadow-[2px_2px_0px_#000] hover:shadow-none hover:translate-x-[1px] hover:translate-y-[1px] bg-[#FF007F] text-white"
          >
            <Trash2 className="h-3.5 w-3.5" />
            <span>WIPE BIO-DATABASE</span>
          </button>
        )}
      </div>

      {history.length === 0 ? (
        <GlassCard glowColor="purple" className="flex flex-col items-center justify-center py-12 text-center">
          <AlertCircle className="h-12 w-12 text-[#A855F7] animate-pulse mb-3" />
          <h3 className="text-lg font-extrabold uppercase">No Diagnostic Logs Found</h3>
          <p className="text-sm text-slate-400 mt-1 max-w-sm font-semibold">
            Complete assessment modules or practice in the training arena to populate biometric datasets.
          </p>
        </GlassCard>
      ) : (
        <div className="space-y-6">
          {/* Top Stats Overview */}
          <section className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { label: 'Neural Index (NPI)', val: `${scores.npi}%`, col: 'text-[#00E5FF]' },
              { label: 'Avg Latency', val: `${scores.reflex} ms`, col: 'text-[#A855F7]' },
              { label: 'Precision Index', val: `${scores.accuracy}%`, col: 'text-[#00FF88]' },
              { label: 'Assay Runs', val: history.length, col: 'text-[#FFDE47]' },
            ].map((item, i) => (
              <GlassCard key={i} hoverEffect={false} className="p-4 flex flex-col justify-between">
                <span className="text-[10px] text-slate-400 font-mono tracking-wider font-bold">{item.label.toUpperCase()}</span>
                <span className={`text-2xl font-black font-mono mt-1 ${item.col}`}>{item.val}</span>
              </GlassCard>
            ))}
          </section>

          {/* Visualizations Grid */}
          <section className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Radar Neuro Profile */}
            <GlassCard glowColor="purple" className="flex flex-col gap-3">
              <div className="border-b-[2px] border-black pb-2 flex justify-between items-center">
                <span className="text-xs font-bold font-mono tracking-wider flex items-center space-x-2 text-white">
                  <BrainCircuit className="h-4 w-4 text-[#A855F7]" />
                  <span className="font-extrabold uppercase">Neuro-Profile Vector Mapping</span>
                </span>
                <span className="text-[10px] text-slate-400 font-mono font-bold">CALIBRATION VECTOR</span>
              </div>
              <div style={{ width: '100%', height: 288 }}>
                <ResponsiveContainer width="100%" height="100%">
                  <RadarChart cx="50%" cy="50%" outerRadius="70%" data={radarData}>
                    <PolarGrid stroke="#000000" strokeWidth={2} />
                    <PolarAngleAxis dataKey="subject" stroke="#94a3b8" fontSize={9} tickLine={false} />
                    <PolarRadiusAxis angle={30} domain={[0, 100]} stroke="#475569" fontSize={8} tickLine={false} />
                    <Radar
                      name="Neural Index Score"
                      dataKey="value"
                      stroke="#7C3AED"
                      fill="#7C3AED"
                      fillOpacity={0.4}
                      strokeWidth={2}
                    />
                  </RadarChart>
                </ResponsiveContainer>
              </div>
            </GlassCard>

            {/* Reaction Speed Latency Trends */}
            <GlassCard glowColor="cyan" className="flex flex-col gap-3">
              <div className="border-b-[2px] border-black pb-2 flex justify-between items-center">
                <span className="text-xs font-bold font-mono tracking-wider flex items-center space-x-2 text-white">
                  <TrendingDown className="h-4 w-4 text-[#00E5FF]" />
                  <span className="font-extrabold uppercase">Reaction Latency Trend (ms)</span>
                </span>
                <span className="text-[10px] text-slate-400 font-mono font-bold">LOWER LATENCY IS BETTER</span>
              </div>
              <div style={{ width: '100%', height: 288 }}>
                {speedTrendData.length === 0 ? (
                  <div className="h-full flex items-center justify-center text-xs text-slate-400 font-mono font-bold">
                    Complete any assessment or game to see latency trends
                  </div>
                ) : (
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={speedTrendData} margin={{ top: 10, right: 10, left: -25, bottom: 0 }}>
                      <defs>
                        <linearGradient id="colorLatency" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="#00e5ff" stopOpacity={0.3}/>
                          <stop offset="95%" stopColor="#00e5ff" stopOpacity={0}/>
                        </linearGradient>
                      </defs>
                      <CartesianGrid strokeDasharray="3 3" stroke="#000000" strokeWidth={1.5} />
                      <XAxis dataKey="attempt" stroke="#94a3b8" fontSize={9} />
                      <YAxis stroke="#94a3b8" fontSize={9} domain={['auto', 'auto']} />
                      <ChartTooltip 
                        contentStyle={{ backgroundColor: '#16161a', borderColor: '#000000', borderWidth: '3px', borderRadius: '0px', color: '#fff', fontFamily: 'monospace' }}
                        labelStyle={{ color: '#00e5ff', fontSize: '10px', fontFamily: 'monospace', fontWeight: 'bold' }}
                      />
                      <Area 
                        type="monotone" 
                        dataKey="latency" 
                        stroke="#00e5ff" 
                        fillOpacity={1} 
                        fill="url(#colorLatency)" 
                        strokeWidth={3}
                      />
                    </AreaChart>
                  </ResponsiveContainer>
                )}
              </div>
            </GlassCard>

            {/* Attention Endurance Breakdown */}
            <GlassCard glowColor="green" className="flex flex-col gap-3 lg:col-span-2">
              <div className="border-b-[2px] border-black pb-2 flex justify-between items-center">
                <span className="text-xs font-bold font-mono tracking-wider flex items-center space-x-2 text-white">
                  <TrendingDown className="h-4 w-4 text-[#00FF88]" />
                  <span className="font-extrabold uppercase">Vigilance Stability Assay</span>
                </span>
                <span className="text-[10px] text-slate-400 font-mono font-bold">Hits vs Misses vs Errors</span>
              </div>
              <div style={{ width: '100%', height: 288 }}>
                {focusEnduranceHistory.length === 0 ? (
                  <div className="h-full flex items-center justify-center text-xs text-slate-400 font-mono font-bold">
                    Complete any assessment or game to see session metrics
                  </div>
                ) : (
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={focusEnduranceHistory} margin={{ top: 10, right: 10, left: -25, bottom: 0 }}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#000000" strokeWidth={1.5} />
                      <XAxis dataKey="test" stroke="#94a3b8" fontSize={9} />
                      <YAxis stroke="#94a3b8" fontSize={9} />
                      <ChartTooltip 
                        contentStyle={{ backgroundColor: '#16161a', borderColor: '#000000', borderWidth: '3px', borderRadius: '0px', color: '#fff', fontFamily: 'monospace' }}
                      />
                      <Legend verticalAlign="top" height={36} wrapperStyle={{ fontSize: '10px', fontFamily: 'monospace', fontWeight: 'bold' }} />
                      <Bar dataKey="hits" fill="#00FF88" stroke="#000000" strokeWidth={2} name="Correct Hits" radius={[0, 0, 0, 0]} />
                      <Bar dataKey="misses" fill="#FF007F" stroke="#000000" strokeWidth={2} name="Unclicked Targets" radius={[0, 0, 0, 0]} />
                      <Bar dataKey="falseClicks" fill="#7C3AED" stroke="#000000" strokeWidth={2} name="False Clicks" radius={[0, 0, 0, 0]} />
                    </BarChart>
                  </ResponsiveContainer>
                )}
              </div>
            </GlassCard>
          </section>

          {/* Historical Attempts Table */}
          <section className="space-y-3">
            <div className="border-b-[2px] border-black pb-2 flex justify-between items-end">
              <div>
                <h3 className="text-lg font-extrabold uppercase">Diagnostic Dossier</h3>
                <p className="text-xs text-slate-400 font-bold">Chronological history of all neurological assessments.</p>
              </div>
              <span className="text-[10px] text-slate-400 font-mono font-bold">DATASET ENTRIES: {history.length}</span>
            </div>

            <div className="overflow-x-auto rounded-none border-[3px] border-black bg-black shadow-[4px_4px_0px_#000]">
              <table className="w-full text-left border-collapse text-xs font-mono">
                <thead>
                  <tr className="bg-[#1c1c24] border-b-[3px] border-black text-slate-300 font-bold">
                    <th className="p-3">Module Name</th>
                    <th className="p-3">Execution Date</th>
                    <th className="p-3 text-right">Reaction (ms)</th>
                    <th className="p-3 text-right">Precision (%)</th>
                    <th className="p-3 text-right">NPI Score</th>
                  </tr>
                </thead>
                <tbody className="divide-y-2 divide-black">
                  {history.map((row) => (
                    <tr key={row.id} className="hover:bg-slate-800/40 transition-colors">
                      <td className="p-3 font-extrabold text-[#00E5FF] uppercase">
                        {getModuleLabel(row.module)}
                      </td>
                      <td className="p-3 text-slate-300 flex items-center space-x-1 font-bold">
                        <Calendar className="h-3.5 w-3.5 shrink-0" />
                        <span>{new Date(row.timestamp).toLocaleString(undefined, { dateStyle: 'short', timeStyle: 'short' })}</span>
                      </td>
                      <td className="p-3 text-right font-black text-[#00E5FF]">
                        {row.responseTime ? `${row.responseTime} ms` : 'N/A'}
                      </td>
                      <td className="p-3 text-right font-black text-[#00FF88]">
                        {row.accuracy}%
                      </td>
                      <td className="p-3 text-right">
                        <span className={`px-2 py-0.5 rounded-none border-2 font-black ${getPerformanceClass(row.score)}`}>
                          {row.score}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>
        </div>
      )}
    </div>
  );
};
export default AnalyticsPage;
