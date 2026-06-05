import React, { useState } from 'react';
import { 
  Grid3X3, 
  Info, 
  TrendingDown, 
  Activity, 
  Watch, 
  Calendar
} from 'lucide-react';
import { useProgress } from '../context/ProgressContext';
import GlassCard from '../components/GlassCard';

export const HeatmapPage: React.FC = () => {
  const { history } = useProgress();
  const [selectedDayIndex, setSelectedDayIndex] = useState<number | null>(null);

  // Filter out reflex test attempts
  const reflexAttempts = history.filter(
    (h) => h.module === 'visual-reflex' && h.responseTime
  );

  // 1. Math formulas: Standard Deviation of Reaction Latency
  const getStandardDeviation = () => {
    if (reflexAttempts.length <= 1) return 0;
    const latencies = reflexAttempts.map(h => h.responseTime!);
    const mean = latencies.reduce((a, b) => a + b, 0) / latencies.length;
    const variance = latencies.reduce((acc, v) => acc + Math.pow(v - mean, 2), 0) / latencies.length;
    return Math.round(Math.sqrt(variance));
  };

  // 2. Math formulas: Improvement Trend (%)
  const getImprovementTrend = () => {
    if (reflexAttempts.length < 4) return 0;
    
    // Chronological order (reverse history)
    const chrono = [...reflexAttempts].reverse();
    const splitCount = Math.floor(chrono.length / 2);
    
    const earlyAvg = chrono.slice(0, splitCount).reduce((acc, h) => acc + h.responseTime!, 0) / splitCount;
    const recentAvg = chrono.slice(-splitCount).reduce((acc, h) => acc + h.responseTime!, 0) / splitCount;

    // percentage reduction in latency (positive trend is good)
    const pct = ((earlyAvg - recentAvg) / earlyAvg) * 100;
    return Number(pct.toFixed(1));
  };

  // 3. Peak Efficiency Period (diurnal variation)
  const getPeakPeriod = () => {
    if (reflexAttempts.length === 0) return 'NO DATA';
    
    const periods = {
      morning: [] as number[],   // 5:00 - 12:00
      afternoon: [] as number[], // 12:00 - 17:00
      evening: [] as number[],   // 17:00 - 22:00
      night: [] as number[],     // 22:00 - 5:00
    };

    reflexAttempts.forEach((h) => {
      const hr = new Date(h.timestamp).getHours();
      const speed = h.responseTime!;
      if (hr >= 5 && hr < 12) periods.morning.push(speed);
      else if (hr >= 12 && hr < 17) periods.afternoon.push(speed);
      else if (hr >= 17 && hr < 22) periods.evening.push(speed);
      else periods.night.push(speed);
    });

    const getAvg = (list: number[]) => list.length === 0 ? Infinity : list.reduce((a,b)=>a+b,0) / list.length;
    const avgs = {
      'Morning (05:00-12:00)': getAvg(periods.morning),
      'Afternoon (12:00-17:00)': getAvg(periods.afternoon),
      'Evening (17:00-22:00)': getAvg(periods.evening),
      'Night (22:00-05:00)': getAvg(periods.night),
    };

    let bestPeriod = 'NO DATA';
    let bestSpeed = Infinity;
    Object.entries(avgs).forEach(([period, speed]) => {
      if (speed < bestSpeed) {
        bestSpeed = speed;
        bestPeriod = period;
      }
    });

    return bestSpeed === Infinity ? 'Insufficient Data' : bestPeriod;
  };

  // Generate last 28 days for the Heatmap grid
  const getHeatmapGridData = () => {
    const gridDays = [];
    const today = new Date();
    
    for (let i = 27; i >= 0; i--) {
      const d = new Date(today);
      d.setDate(today.getDate() - i);
      
      // Filter reflex attempts on this specific day
      const dayAttempts = reflexAttempts.filter((h) => {
        const attemptDate = new Date(h.timestamp);
        return (
          attemptDate.getDate() === d.getDate() &&
          attemptDate.getMonth() === d.getMonth() &&
          attemptDate.getFullYear() === d.getFullYear()
        );
      });

      const avgSpeed = dayAttempts.length > 0
        ? Math.round(dayAttempts.reduce((acc, h) => acc + h.responseTime!, 0) / dayAttempts.length)
        : null;

      // Color classification: green (<220ms), yellow (220-300ms), red (>300ms)
      let colorClass = 'bg-slate-900 border-slate-800 hover:border-slate-700';
      if (avgSpeed) {
        if (avgSpeed < 220) {
          colorClass = 'bg-emerald-500/30 border-emerald-400/60 shadow-[0_0_12px_rgba(16,185,129,0.15)] hover:border-emerald-300';
        } else if (avgSpeed <= 300) {
          colorClass = 'bg-amber-500/30 border-amber-400/60 shadow-[0_0_12px_rgba(245,158,11,0.15)] hover:border-amber-300';
        } else {
          colorClass = 'bg-rose-500/30 border-rose-400/60 shadow-[0_0_12px_rgba(239,68,68,0.15)] hover:border-rose-300';
        }
      }

      gridDays.push({
        date: d,
        attempts: dayAttempts,
        avgSpeed,
        colorClass
      });
    }

    return gridDays;
  };

  const gridData = getHeatmapGridData();
  const stdDev = getStandardDeviation();
  const improvement = getImprovementTrend();
  const peakTime = getPeakPeriod();

  const selectedDay = selectedDayIndex !== null ? gridData[selectedDayIndex] : null;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center border-b border-slate-800 pb-4 gap-4">
        <div>
          <h1 className="text-3xl font-extrabold tracking-tight">Reflex Heatmap</h1>
          <p className="text-sm text-slate-400">Map daily reaction times, neurological jitter, and improvement indexes.</p>
        </div>
      </div>

      {/* Heatmap Overview Grid */}
      <section className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <GlassCard glowColor="cyan" className="lg:col-span-2 flex flex-col justify-between space-y-6">
          <div className="flex justify-between items-center border-b border-slate-800 pb-3">
            <h2 className="text-base font-bold flex items-center space-x-2">
              <Grid3X3 className="h-4.5 w-4.5 text-cyan-400 animate-pulse" />
              <span>28-Day Temporal Reflex Matrix</span>
            </h2>
            <div className="flex space-x-3 text-[9px] font-mono">
              <div className="flex items-center space-x-1">
                <div className="w-2.5 h-2.5 bg-emerald-500/30 border border-emerald-400 rounded" />
                <span>FAST (&lt;220ms)</span>
              </div>
              <div className="flex items-center space-x-1">
                <div className="w-2.5 h-2.5 bg-amber-500/30 border border-amber-400 rounded" />
                <span>AVG (220-300ms)</span>
              </div>
              <div className="flex items-center space-x-1">
                <div className="w-2.5 h-2.5 bg-rose-500/30 border border-rose-400 rounded" />
                <span>SLOW (&gt;300ms)</span>
              </div>
            </div>
          </div>

          {/* Grid Render */}
          <div className="grid grid-cols-7 gap-3 py-2">
            {gridData.map((day, idx) => (
              <div
                key={idx}
                onClick={() => setSelectedDayIndex(idx)}
                className={`
                  aspect-square rounded-lg border-2 flex flex-col items-center justify-center cursor-pointer select-none transition-all duration-200
                  ${day.colorClass}
                  ${selectedDayIndex === idx ? 'ring-2 ring-cyan-400 scale-[0.98]' : ''}
                `}
              >
                <span className="text-[9px] text-slate-500 font-mono">
                  {day.date.getDate()}
                </span>
                {day.avgSpeed && (
                  <span className="text-[9px] font-mono font-bold mt-1 text-white">
                    {day.avgSpeed}ms
                  </span>
                )}
              </div>
            ))}
          </div>

          <div className="bg-slate-900/40 rounded border border-slate-850 p-3 flex items-start space-x-2 text-[10px] text-slate-400">
            <Info className="h-4 w-4 text-cyan-400 shrink-0 mt-0.5" />
            <span>Click any day card in the calendar matrix to retrieve specific micro-assay attempts and speed parameters.</span>
          </div>
        </GlassCard>

        {/* Sidebar Info - Day inspector */}
        <GlassCard glowColor="purple" className="flex flex-col justify-between space-y-4">
          <div className="space-y-4">
            <h3 className="text-base font-bold flex items-center space-x-2 border-b border-slate-800 pb-2">
              <Calendar className="h-4.5 w-4.5 text-purple-400" />
              <span>Session Inspector</span>
            </h3>

            {selectedDay ? (
              <div className="space-y-4 font-mono text-xs">
                <div>
                  <span className="text-slate-500 block">SELECTED DATE:</span>
                  <span className="text-white font-bold">{selectedDay.date.toLocaleDateString(undefined, { dateStyle: 'long' })}</span>
                </div>
                <div>
                  <span className="text-slate-500 block">DAILY RUN VOLUME:</span>
                  <span className="text-purple-400 font-bold">{selectedDay.attempts.length} attempts completed</span>
                </div>
                <div>
                  <span className="text-slate-500 block">AVERAGE LATENCY:</span>
                  <span className="text-cyan-400 font-bold">{selectedDay.avgSpeed ? `${selectedDay.avgSpeed} ms` : 'No logs recorded'}</span>
                </div>
                
                {selectedDay.attempts.length > 0 && (
                  <div className="space-y-2 border-t border-slate-800 pt-3">
                    <span className="text-slate-500 block text-[10px]">MICRO-LOGS:</span>
                    <div className="max-h-36 overflow-y-auto space-y-1 bg-slate-950 p-2 rounded border border-slate-850">
                      {selectedDay.attempts.map((att, i) => (
                        <div key={i} className="flex justify-between text-[10px]">
                          <span className="text-slate-500">{new Date(att.timestamp).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}</span>
                          <span className="text-cyan-400 font-bold">{att.responseTime} ms</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <div className="text-xs text-slate-500 font-mono text-center py-12 leading-relaxed">
                No active day segment selected. Highlight a calendar unit in the left panel to map micro-records.
              </div>
            )}
          </div>

          <div className="bg-slate-900 border border-slate-800 p-2.5 rounded text-[10px] text-slate-500">
            Select dates representing different training schedules to isolate fatigue triggers.
          </div>
        </GlassCard>
      </section>

      {/* Advanced Statistical Analysis Cards */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Latency Variability Card */}
        <GlassCard glowColor="cyan" className="flex flex-col justify-between space-y-3">
          <div className="space-y-1">
            <span className="text-[10px] font-mono text-cyan-400 uppercase tracking-widest block">Neural Pathway Jitter</span>
            <h3 className="text-lg font-bold text-white flex items-center space-x-1.5">
              <Activity className="h-4.5 w-4.5 text-cyan-400" />
              <span>Standard Deviation</span>
            </h3>
            <p className="text-xs text-slate-400 leading-relaxed pt-1">
              SD measures the variability in your reaction speed. Lower values (e.g. &lt;25ms) mean you trigger your visual-motor pathways with stable, consistent myelination efficiency.
            </p>
          </div>
          <div className="flex items-baseline space-x-1 pt-2 font-mono">
            <span className="text-3xl font-extrabold text-white">±{stdDev || '--'}</span>
            <span className="text-xs text-slate-400">ms</span>
          </div>
        </GlassCard>

        {/* Improvement index */}
        <GlassCard glowColor="green" className="flex flex-col justify-between space-y-3">
          <div className="space-y-1">
            <span className="text-[10px] font-mono text-emerald-400 uppercase tracking-widest block">Neuroplastic Shift</span>
            <h3 className="text-lg font-bold text-white flex items-center space-x-1.5">
              <TrendingDown className="h-4.5 w-4.5 text-emerald-400" />
              <span>Improvement Index</span>
            </h3>
            <p className="text-xs text-slate-400 leading-relaxed pt-1">
              Measures the reduction in visual reflex latency between early attempts and recent diagnostic runs. A positive percentage represents synaptic pathway refinement.
            </p>
          </div>
          <div className="flex items-baseline space-x-1 pt-2 font-mono">
            <span className={`text-3xl font-extrabold ${improvement >= 0 ? 'text-emerald-400' : 'text-rose-500'}`}>
              {improvement >= 0 ? `+${improvement}` : improvement}%
            </span>
          </div>
        </GlassCard>

        {/* Peak Efficiency Period */}
        <GlassCard glowColor="purple" className="flex flex-col justify-between space-y-3">
          <div className="space-y-1">
            <span className="text-[10px] font-mono text-purple-400 uppercase tracking-widest block">Circadian Synchronization</span>
            <h3 className="text-lg font-bold text-white flex items-center space-x-1.5">
              <Watch className="h-4.5 w-4.5 text-purple-400" />
              <span>Peak Efficiency Window</span>
            </h3>
            <p className="text-xs text-slate-400 leading-relaxed pt-1">
              Calculates the block of the day (morning, noon, evening) where your visual reflex latency reaches its absolute minimum, representing optimal motor arousal.
            </p>
          </div>
          <div className="text-sm font-bold font-mono text-purple-300 pt-2 border-t border-slate-800">
            {peakTime}
          </div>
        </GlassCard>
      </section>
    </div>
  );
};
export default HeatmapPage;
