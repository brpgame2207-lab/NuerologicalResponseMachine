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

export const AnalyticsPage: React.FC = () => {
  const { history, scores, clearHistory } = useProgress();

  // 1. Map scores to radar chart dimensions
  const radarData = [
    { subject: 'Reflex Speed', value: scores.reflex, fullMark: 100 },
    { subject: 'Memory Recall', value: scores.memory, fullMark: 100 },
    { subject: 'Focus Vigilance', value: scores.focus, fullMark: 100 },
    { subject: 'Attention Endur', value: scores.endurance, fullMark: 100 },
    { subject: 'Cognitive Resol', value: scores.cognitive, fullMark: 100 },
    { subject: 'Accuracy Ratio', value: scores.accuracy, fullMark: 100 },
  ];

  // 2. Prepare reaction time trends data (only visual-reflex, newest to oldest -> reverse it for chronlogical trend)
  const speedTrendData = [...history]
    .filter((h) => h.module === 'visual-reflex' && h.responseTime)
    .slice(0, 10)
    .reverse()
    .map((h, index) => ({
      attempt: `Assay ${index + 1}`,
      latency: h.responseTime,
      score: h.score,
      date: new Date(h.timestamp).toLocaleDateString(undefined, { month: 'short', day: 'numeric' })
    }));

  // 3. Focus test data (hits vs misses vs false clicks)
  const focusEnduranceHistory = [...history]
    .filter((h) => h.module === 'focus-endurance')
    .slice(0, 5)
    .reverse()
    .map((h, index) => ({
      test: `Test ${index + 1}`,
      hits: h.rawMetrics.hits || 0,
      misses: h.rawMetrics.misses || 0,
      falseClicks: h.rawMetrics.falseClicks || 0,
    }));

  const getPerformanceClass = (npiValue: number) => {
    if (npiValue >= 90) return 'text-cyan-400 border-cyan-500/20 bg-cyan-500/5';
    if (npiValue >= 80) return 'text-emerald-400 border-emerald-500/20 bg-emerald-500/5';
    if (npiValue >= 70) return 'text-indigo-400 border-indigo-500/20 bg-indigo-500/5';
    if (npiValue >= 50) return 'text-amber-400 border-amber-500/20 bg-amber-500/5';
    return 'text-rose-500 border-rose-500/20 bg-rose-500/5';
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

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center border-b border-slate-800 pb-4 gap-4">
        <div>
          <h1 className="text-3xl font-extrabold tracking-tight">Biometric Analytics</h1>
          <p className="text-sm text-slate-400">View diagnostic trends, neural performance matrices, and clinical history.</p>
        </div>
        {history.length > 0 && (
          <button 
            onClick={clearHistory}
            className="text-xs font-mono text-rose-500 hover:text-rose-400 hover:bg-rose-500/10 border border-rose-500/20 px-3 py-1.5 rounded-lg flex items-center space-x-1.5 transition-colors"
          >
            <Trash2 className="h-3.5 w-3.5" />
            <span>WIPE BIO-DATABASE</span>
          </button>
        )}
      </div>

      {history.length === 0 ? (
        <GlassCard glowColor="purple" className="flex flex-col items-center justify-center py-12 text-center">
          <AlertCircle className="h-12 w-12 text-purple-400 animate-pulse mb-3" />
          <h3 className="text-lg font-bold">No Diagnostic Logs Found</h3>
          <p className="text-sm text-slate-400 mt-1 max-w-sm">
            Complete assessment modules or practice in the training arena to populate biometric datasets.
          </p>
        </GlassCard>
      ) : (
        <div className="space-y-6">
          {/* Top Stats Overview */}
          <section className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { label: 'Neural Index (NPI)', val: `${scores.npi}%`, col: 'text-cyan-400' },
              { label: 'Avg Latency', val: `${scores.reflex} ms`, col: 'text-purple-400' },
              { label: 'Precision Index', val: `${scores.accuracy}%`, col: 'text-emerald-400' },
              { label: 'Assay Runs', val: history.length, col: 'text-amber-400' },
            ].map((item, i) => (
              <GlassCard key={i} hoverEffect={false} className="p-4 flex flex-col justify-between">
                <span className="text-[10px] text-slate-500 font-mono tracking-wider">{item.label.toUpperCase()}</span>
                <span className={`text-2xl font-bold font-mono mt-1 ${item.col}`}>{item.val}</span>
              </GlassCard>
            ))}
          </section>

          {/* Visualizations Grid */}
          <section className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Radar Neuro Profile */}
            <GlassCard glowColor="purple" className="h-[380px] flex flex-col justify-between">
              <div className="border-b border-slate-800 pb-2 mb-2 flex justify-between items-center">
                <span className="text-xs font-bold font-mono tracking-wider flex items-center space-x-2">
                  <BrainCircuit className="h-4 w-4 text-purple-400" />
                  <span>Neuro-Profile Vector Mapping</span>
                </span>
                <span className="text-[10px] text-slate-500 font-mono">CALIBRATION VECTOR</span>
              </div>
              <div className="flex-1 w-full min-h-0">
                <ResponsiveContainer width="100%" height="100%">
                  <RadarChart cx="50%" cy="50%" outerRadius="70%" data={radarData}>
                    <PolarGrid stroke="#1e293b" />
                    <PolarAngleAxis dataKey="subject" stroke="#94a3b8" fontSize={9} tickLine={false} />
                    <PolarRadiusAxis angle={30} domain={[0, 100]} stroke="#475569" fontSize={8} tickLine={false} />
                    <Radar
                      name="Neural Index Score"
                      dataKey="value"
                      stroke="#8b5cf6"
                      fill="#8b5cf6"
                      fillOpacity={0.25}
                    />
                  </RadarChart>
                </ResponsiveContainer>
              </div>
            </GlassCard>

            {/* Reaction Speed Latency Trends */}
            <GlassCard glowColor="cyan" className="h-[380px] flex flex-col justify-between">
              <div className="border-b border-slate-800 pb-2 mb-2 flex justify-between items-center">
                <span className="text-xs font-bold font-mono tracking-wider flex items-center space-x-2">
                  <TrendingDown className="h-4 w-4 text-cyan-400" />
                  <span>Reaction Latency Trend (ms)</span>
                </span>
                <span className="text-[10px] text-slate-500 font-mono">LOWER LATENCY IS BETTER</span>
              </div>
              <div className="flex-1 w-full min-h-0">
                {speedTrendData.length === 0 ? (
                  <div className="h-full flex items-center justify-center text-xs text-slate-500 font-mono">
                    Run visual reflex tests to populate speed metrics
                  </div>
                ) : (
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={speedTrendData} margin={{ top: 10, right: 10, left: -25, bottom: 0 }}>
                      <defs>
                        <linearGradient id="colorLatency" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="#00e5ff" stopOpacity={0.2}/>
                          <stop offset="95%" stopColor="#00e5ff" stopOpacity={0}/>
                        </linearGradient>
                      </defs>
                      <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
                      <XAxis dataKey="attempt" stroke="#64748b" fontSize={9} />
                      <YAxis stroke="#64748b" fontSize={9} domain={[120, 'auto']} />
                      <ChartTooltip 
                        contentStyle={{ backgroundColor: '#0f172a', borderColor: '#1e293b', color: '#fff' }}
                        labelStyle={{ color: '#00e5ff', fontSize: '10px', fontFamily: 'monospace' }}
                      />
                      <Area 
                        type="monotone" 
                        dataKey="latency" 
                        stroke="#00e5ff" 
                        fillOpacity={1} 
                        fill="url(#colorLatency)" 
                        strokeWidth={2}
                      />
                    </AreaChart>
                  </ResponsiveContainer>
                )}
              </div>
            </GlassCard>

            {/* Attention Endurance Breakdown */}
            <GlassCard glowColor="green" className="h-[380px] flex flex-col lg:col-span-2 justify-between">
              <div className="border-b border-slate-800 pb-2 mb-2 flex justify-between items-center">
                <span className="text-xs font-bold font-mono tracking-wider flex items-center space-x-2">
                  <TrendingDown className="h-4 w-4 text-emerald-400" />
                  <span>Vigilance Stability Assay</span>
                </span>
                <span className="text-[10px] text-slate-500 font-mono">Hits vs Misses vs Errors</span>
              </div>
              <div className="flex-1 w-full min-h-0">
                {focusEnduranceHistory.length === 0 ? (
                  <div className="h-full flex items-center justify-center text-xs text-slate-500 font-mono">
                    Run focus endurance tests to populate attention curves
                  </div>
                ) : (
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={focusEnduranceHistory} margin={{ top: 10, right: 10, left: -25, bottom: 0 }}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
                      <XAxis dataKey="test" stroke="#64748b" fontSize={9} />
                      <YAxis stroke="#64748b" fontSize={9} />
                      <ChartTooltip 
                        contentStyle={{ backgroundColor: '#0f172a', borderColor: '#1e293b', color: '#fff' }}
                      />
                      <Legend verticalAlign="top" height={36} wrapperStyle={{ fontSize: '10px', fontFamily: 'monospace' }} />
                      <Bar dataKey="hits" fill="#10b981" name="Correct Hits" radius={[4, 4, 0, 0]} />
                      <Bar dataKey="misses" fill="#ef4444" name="Unclicked Targets" radius={[4, 4, 0, 0]} />
                      <Bar dataKey="falseClicks" fill="#8b5cf6" name="False Clicks" radius={[4, 4, 0, 0]} />
                    </BarChart>
                  </ResponsiveContainer>
                )}
              </div>
            </GlassCard>
          </section>

          {/* Historical Attempts Table */}
          <section className="space-y-3">
            <div className="border-b border-slate-800 pb-2 flex justify-between items-end">
              <div>
                <h3 className="text-lg font-bold">Diagnostic Dossier</h3>
                <p className="text-xs text-slate-400">Chronological history of all neurological assessments.</p>
              </div>
              <span className="text-[10px] text-slate-500 font-mono">DATASET ENTRIES: {history.length}</span>
            </div>

            <div className="overflow-x-auto rounded-lg border border-slate-800 bg-slate-900/30">
              <table className="w-full text-left border-collapse text-xs font-mono">
                <thead>
                  <tr className="bg-slate-900/80 border-b border-slate-800 text-slate-400">
                    <th className="p-3">Module Name</th>
                    <th className="p-3">Execution Date</th>
                    <th className="p-3 text-right">Reaction (ms)</th>
                    <th className="p-3 text-right">Precision (%)</th>
                    <th className="p-3 text-right">NPI Score</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-850">
                  {history.map((row) => (
                    <tr key={row.id} className="hover:bg-slate-900/40 transition-colors">
                      <td className="p-3 font-semibold text-slate-200">
                        {getModuleLabel(row.module)}
                      </td>
                      <td className="p-3 text-slate-500 flex items-center space-x-1">
                        <Calendar className="h-3.5 w-3.5 shrink-0" />
                        <span>{new Date(row.timestamp).toLocaleString(undefined, { dateStyle: 'short', timeStyle: 'short' })}</span>
                      </td>
                      <td className="p-3 text-right font-semibold text-cyan-400">
                        {row.responseTime ? `${row.responseTime} ms` : 'N/A'}
                      </td>
                      <td className="p-3 text-right font-semibold text-emerald-400">
                        {row.accuracy}%
                      </td>
                      <td className="p-3 text-right">
                        <span className={`px-2 py-0.5 rounded border ${getPerformanceClass(row.score)} font-bold`}>
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
