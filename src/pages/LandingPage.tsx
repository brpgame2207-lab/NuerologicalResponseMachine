import React from 'react';
import { 
  BrainCircuit, 
  LineChart, 
  ChevronRight, 
  Zap, 
  Eye
} from 'lucide-react';
import GlassCard from '../components/GlassCard';
import NPIProgress from '../components/NPIProgress';

interface LandingPageProps {
  setActiveTab: (tab: string) => void;
}

export const LandingPage: React.FC<LandingPageProps> = ({ setActiveTab }) => {
  return (
    <div className="space-y-12">
      {/* Hero Section */}
      <section className="relative rounded-2xl overflow-hidden border border-cyan-500/20 bg-gradient-to-br from-[#0c142c] via-[#090e21] to-[#050813] p-8 md:p-12 shadow-[0_0_30px_rgba(0,229,255,0.05)]">
        {/* Tech decorative overlay grid */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#00e5ff03_1px,transparent_1px),linear-gradient(to_bottom,#00e5ff05_1px,transparent_1px)] bg-[size:24px_24px] pointer-events-none" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-cyan-500/5 rounded-full blur-[80px] pointer-events-none" />

        <div className="relative z-10 max-w-3xl space-y-6">
          <div className="inline-flex items-center space-x-2 bg-cyan-500/10 px-3 py-1.5 rounded-full border border-cyan-500/30 text-cyan-400 text-xs font-mono tracking-wider">
            <Zap className="h-3.5 w-3.5 animate-pulse" />
            <span>NEUROLOGICAL TESTING INTERFACE V1.0.0</span>
          </div>

          <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight">
            Neurological Response <br />
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 via-teal-300 to-emerald-400">
              Analysis System
            </span>
          </h1>

          <h3 className="text-xl md:text-2xl font-semibold text-slate-300 tracking-wide">
            Measure. Analyze. Improve.
          </h3>

          <p className="text-base text-slate-400 leading-relaxed max-w-2xl">
            Explore the biological mechanisms of human cognitive performance. NRAS provides high-fidelity diagnostic tools to measure sensory reflex latency, short-term spatial memory, and sustained attention endurance through neuroscience-inspired laboratory assays.
          </p>

          <div className="flex flex-wrap gap-4 pt-2">
            <button 
              onClick={() => setActiveTab('assessments')}
              className="bg-gradient-to-r from-cyan-500 to-teal-400 hover:from-cyan-400 hover:to-teal-300 text-slate-950 font-bold px-6 py-3 rounded-lg flex items-center space-x-2 transition-all shadow-[0_0_20px_rgba(0,229,255,0.3)] hover:shadow-[0_0_25px_rgba(0,229,255,0.5)] transform hover:-translate-y-0.5 active:translate-y-0"
            >
              <span>Start Assessment</span>
              <ChevronRight className="h-5 w-5" />
            </button>
          </div>
        </div>
      </section>

      {/* Dynamic NPI Status Widget */}
      <section className="space-y-4">
        <h2 className="text-xs font-mono text-cyan-400 uppercase tracking-widest">Active Diagnostic File</h2>
        <NPIProgress />
      </section>

      {/* Overview & Features Section */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <GlassCard glowColor="cyan" className="flex flex-col justify-between space-y-4">
          <div className="space-y-2">
            <div className="h-10 w-10 bg-cyan-500/10 rounded-lg border border-cyan-500/30 flex items-center justify-center text-cyan-400">
              <Eye className="h-5 w-5" />
            </div>
            <h3 className="text-lg font-bold">Scientific Assessment</h3>
            <p className="text-sm text-slate-400 leading-relaxed">
              Diagnostic assays designed to measure specific neurological functions: signal latency in the reflex arc, spatial patterns in working memory, and vigilance indices under stress.
            </p>
          </div>
          <button 
            onClick={() => setActiveTab('assessments')}
            className="text-xs font-semibold text-cyan-400 font-mono tracking-wider flex items-center space-x-1 group hover:text-cyan-300 mt-2"
          >
            <span>ACCESS MODULES</span>
            <ChevronRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
          </button>
        </GlassCard>

        <GlassCard glowColor="green" className="flex flex-col justify-between space-y-4">
          <div className="space-y-2">
            <div className="h-10 w-10 bg-emerald-500/10 rounded-lg border border-emerald-500/30 flex items-center justify-center text-emerald-400">
              <BrainCircuit className="h-5 w-5" />
            </div>
            <h3 className="text-lg font-bold">Synaptic Training</h3>
            <p className="text-sm text-slate-400 leading-relaxed">
              Repeated cognitive stimulation exercises targeting neuroplastic adaptations. Train motor efficiency, conflict inhibition control, decision speeds, and eye-hand reflexes.
            </p>
          </div>
          <button 
            onClick={() => setActiveTab('training')}
            className="text-xs font-semibold text-emerald-400 font-mono tracking-wider flex items-center space-x-1 group hover:text-emerald-300 mt-2"
          >
            <span>ENTER TRAINING ARENA</span>
            <ChevronRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
          </button>
        </GlassCard>

        <GlassCard glowColor="purple" className="flex flex-col justify-between space-y-4">
          <div className="space-y-2">
            <div className="h-10 w-10 bg-purple-500/10 rounded-lg border border-purple-500/30 flex items-center justify-center text-purple-400">
              <LineChart className="h-5 w-5" />
            </div>
            <h3 className="text-lg font-bold">Biometric Analytics</h3>
            <p className="text-sm text-slate-400 leading-relaxed">
              Track improvement trends with high-resolution scientific dashboards. Visualize reaction latency standard deviation, focus fatigue curves, and temporal performance consistency.
            </p>
          </div>
          <button 
            onClick={() => setActiveTab('analytics')}
            className="text-xs font-semibold text-purple-400 font-mono tracking-wider flex items-center space-x-1 group hover:text-purple-300 mt-2"
          >
            <span>DASHBOARD METRICS</span>
            <ChevronRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
          </button>
        </GlassCard>
      </section>

      {/* Scientific Foundation Section */}
      <section className="bg-slate-950/40 rounded-xl border border-slate-800/80 p-8 flex flex-col lg:flex-row gap-8 items-center">
        <div className="flex-1 space-y-4">
          <div className="text-xs font-mono text-cyan-400 bg-cyan-500/10 border border-cyan-500/20 px-2 py-1 rounded inline-block">
            NEUROLOGICAL PATHWAY ANALYSIS
          </div>
          <h2 className="text-2xl font-bold tracking-tight text-white">How Reflex Speeds Are Processed</h2>
          <p className="text-sm text-slate-300 leading-relaxed">
            A standard reflex response utilizes a sensory neuron pathways bypassing higher-level cortical processing. This allows rapid response to threats. In contrast, complex tasks (such as color identification or direction choices) require signals to pass through the optical nerve, visual cortex, prefrontal cortex (for analysis), and motor cortex before reaching motor effectors. 
          </p>
          <p className="text-sm text-slate-400 leading-relaxed">
            By measuring millisecond-level variances under different cognitive conditions, NRAS maps the conduction speed and synapse efficiency in your nervous system.
          </p>
        </div>
        
        {/* Visual schematic diagram */}
        <div className="w-full lg:w-96 flex flex-col gap-3 shrink-0">
          <div className="bg-slate-900 border border-slate-800 rounded-lg p-4 font-mono text-[10px] text-slate-400 space-y-2">
            <div className="text-slate-500 uppercase tracking-widest text-center border-b border-slate-800 pb-1.5 font-bold">Reaction Arc Map</div>
            
            <div className="flex items-center justify-between">
              <span className="bg-cyan-500/10 text-cyan-400 border border-cyan-500/20 px-1.5 py-0.5 rounded">Stimulus</span>
              <span>⟶ Photons Hit Retina</span>
              <span className="text-slate-500">20-40ms</span>
            </div>
            
            <div className="flex items-center justify-between">
              <span className="bg-purple-500/10 text-purple-400 border border-purple-500/20 px-1.5 py-0.5 rounded">Afferent</span>
              <span>⟶ Optic Tract to Cortex</span>
              <span className="text-slate-500">40-80ms</span>
            </div>
            
            <div className="flex items-center justify-between">
              <span className="bg-indigo-500/10 text-indigo-400 border border-indigo-500/20 px-1.5 py-0.5 rounded">Synthesis</span>
              <span>⟶ Decision / Motor Plan</span>
              <span className="text-slate-500">60-150ms</span>
            </div>
            
            <div className="flex items-center justify-between">
              <span className="bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 px-1.5 py-0.5 rounded">Efferent</span>
              <span>⟶ Motor Cortex to Hand</span>
              <span className="text-slate-500">20-40ms</span>
            </div>
            
            <div className="flex items-center justify-between">
              <span className="bg-pink-500/10 text-pink-400 border border-pink-500/20 px-1.5 py-0.5 rounded">Effector</span>
              <span>⟶ Muscle Contraction</span>
              <span className="text-slate-500">10-20ms</span>
            </div>
            
            <div className="pt-2 border-t border-slate-800 flex justify-between font-bold text-white">
              <span>TOTAL EXPECTED LATENCY:</span>
              <span className="text-cyan-400">150ms - 330ms</span>
            </div>
          </div>
        </div>
      </section>

      {/* Overview of Modules */}
      <section className="space-y-6">
        <div className="flex justify-between items-end border-b border-slate-800 pb-3">
          <div>
            <h2 className="text-2xl font-bold tracking-tight">Active Diagnostic Modules</h2>
            <p className="text-sm text-slate-400">Select an assessment to evaluate your neurological function.</p>
          </div>
          <button 
            onClick={() => setActiveTab('assessments')}
            className="hidden sm:flex items-center space-x-1 text-xs text-cyan-400 hover:text-cyan-300 font-mono tracking-wider font-semibold"
          >
            <span>ALL MODULES</span>
            <ChevronRight className="h-3.5 w-3.5" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            {
              title: 'Visual Reflex Checker',
              desc: 'Measure pure signal response latency in visual-motor pathways. Displays simple reaction speed in milliseconds.',
              id: 'visual-reflex',
              color: 'cyan',
              stat: 'Target range: <220ms'
            },
            {
              title: 'Color Tile Memory Challenge',
              desc: 'Evaluate working memory capacity and recall speed using active colored grid targets.',
              id: 'memory-tile',
              color: 'purple',
              stat: 'Spatial-color association'
            },
            {
              title: 'Focus Endurance Test',
              desc: 'Analyze attention stability, cognitive fatigue levels, and distraction filtration over extended time periods.',
              id: 'focus-endurance',
              color: 'green',
              stat: 'Continuous vigilance test'
            }
          ].map((mod, i) => (
            <GlassCard key={i} glowColor={mod.color as any} className="flex flex-col justify-between">
              <div className="space-y-3">
                <div className="flex justify-between items-start">
                  <span className="text-[10px] text-slate-500 font-mono">MODULE {i + 1}</span>
                  <span className="text-[10px] text-slate-400 font-mono bg-slate-900 border border-slate-850 px-2 py-0.5 rounded">{mod.stat}</span>
                </div>
                <h3 className="text-base font-bold text-white">{mod.title}</h3>
                <p className="text-xs text-slate-400 leading-relaxed">{mod.desc}</p>
              </div>
              <div className="pt-5">
                <button
                  onClick={() => setActiveTab('assessments')}
                  className="w-full text-center bg-slate-900 hover:bg-slate-850 border border-slate-800 text-xs font-semibold py-2 rounded transition-colors text-slate-300"
                >
                  Configure & Start
                </button>
              </div>
            </GlassCard>
          ))}
        </div>
      </section>
    </div>
  );
};
export default LandingPage;
