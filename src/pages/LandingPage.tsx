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
      <section className="relative rounded-none overflow-hidden border-[3px] border-black bg-[#16161a] p-8 md:p-12 shadow-[6px_6px_0px_#00E5FF]">
        {/* Tech decorative overlay grid */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#00000018_1px,transparent_1px),linear-gradient(to_bottom,#00000018_1px,transparent_1px)] bg-[size:24px_24px] pointer-events-none" />

        <div className="relative z-10 max-w-3xl space-y-6">
          <div className="inline-flex items-center space-x-2 bg-[#00E5FF]/20 px-3 py-1.5 rounded-none border-[2px] border-black text-[#00E5FF] text-xs font-mono tracking-wider font-extrabold shadow-[2px_2px_0px_#000]">
            <Zap className="h-3.5 w-3.5" />
            <span>NEUROLOGICAL TESTING INTERFACE V1.0.0</span>
          </div>

          <h1 className="text-4xl md:text-5xl lg:text-6xl font-black tracking-tight leading-none uppercase text-white">
            Neurological Response <br />
            <span className="text-[#00E5FF]">
              Analysis System
            </span>
          </h1>

          <h3 className="text-xl md:text-2xl font-bold text-[#FFDE47] tracking-wider uppercase">
            Measure. Analyze. Improve.
          </h3>

          <p className="text-base text-slate-300 leading-relaxed max-w-2xl font-medium">
            Explore the biological mechanisms of human cognitive performance. NRAS provides high-fidelity diagnostic tools to measure sensory reflex latency, short-term spatial memory, and sustained attention endurance through neuroscience-inspired laboratory assays.
          </p>

          <div className="flex flex-wrap gap-4 pt-2">
            <button 
              onClick={() => setActiveTab('assessments')}
              className="neo-btn neo-btn-cyan px-6 py-3 flex items-center space-x-2 shadow-[4px_4px_0px_#000000] hover:shadow-[2px_2px_0px_#000000] active:shadow-none hover:translate-x-[2px] hover:translate-y-[2px] active:translate-x-[4px] active:translate-y-[4px]"
            >
              <span className="font-extrabold text-sm tracking-widest">Start Assessment</span>
              <ChevronRight className="h-5 w-5 stroke-[2.5px]" />
            </button>
          </div>
        </div>
      </section>

      {/* Dynamic NPI Status Widget */}
      <section className="space-y-4">
        <h2 className="text-xs font-mono font-black text-[#00E5FF] uppercase tracking-widest bg-black/40 inline-block px-2 py-0.5 border border-black rounded-none">Active Diagnostic File</h2>
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
      <section className="bg-[#16161a] rounded-none border-[3px] border-black p-8 flex flex-col lg:flex-row gap-8 items-center shadow-[6px_6px_0px_#000000]">
        <div className="flex-1 space-y-4">
          <div className="text-xs font-mono text-[#00E5FF] bg-[#00E5FF]/20 border-[2px] border-black px-2 py-1 rounded-none inline-block font-bold shadow-[2px_2px_0px_#000]">
            NEUROLOGICAL PATHWAY ANALYSIS
          </div>
          <h2 className="text-2xl font-extrabold tracking-tight text-white uppercase">How Reflex Speeds Are Processed</h2>
          <p className="text-sm text-slate-300 leading-relaxed font-medium">
            A standard reflex response utilizes a sensory neuron pathways bypassing higher-level cortical processing. This allows rapid response to threats. In contrast, complex tasks (such as color identification or direction choices) require signals to pass through the optical nerve, visual cortex, prefrontal cortex (for analysis), and motor cortex before reaching motor effectors. 
          </p>
          <p className="text-sm text-slate-400 leading-relaxed font-medium">
            By measuring millisecond-level variances under different cognitive conditions, NRAS maps the conduction speed and synapse efficiency in your nervous system.
          </p>
        </div>
        
        {/* Visual schematic diagram */}
        <div className="w-full lg:w-96 flex flex-col gap-3 shrink-0">
          <div className="bg-black border-[3px] border-black rounded-none p-4 font-mono text-[10px] text-slate-300 space-y-2 shadow-[4px_4px_0px_#000]">
            <div className="text-slate-400 uppercase tracking-widest text-center border-b-[2px] border-black pb-1.5 font-bold">Reaction Arc Map</div>
            
            <div className="flex items-center justify-between">
              <span className="bg-[#00E5FF]/20 text-[#00E5FF] border border-black px-1.5 py-0.5 rounded-none font-bold">Stimulus</span>
              <span>⟶ Photons Hit Retina</span>
              <span className="text-slate-400 font-bold">20-40ms</span>
            </div>
            
            <div className="flex items-center justify-between">
              <span className="bg-[#7C3AED]/20 text-[#A855F7] border border-black px-1.5 py-0.5 rounded-none font-bold">Afferent</span>
              <span>⟶ Optic Tract to Cortex</span>
              <span className="text-slate-400 font-bold">40-80ms</span>
            </div>
            
            <div className="flex items-center justify-between">
              <span className="bg-[#6366F1]/20 text-[#6366F1] border border-black px-1.5 py-0.5 rounded-none font-bold">Synthesis</span>
              <span>⟶ Decision / Motor Plan</span>
              <span className="text-slate-400 font-bold">60-150ms</span>
            </div>
            
            <div className="flex items-center justify-between">
              <span className="bg-[#00FF88]/20 text-[#00FF88] border border-black px-1.5 py-0.5 rounded-none font-bold">Efferent</span>
              <span>⟶ Motor Cortex to Hand</span>
              <span className="text-slate-400 font-bold">20-40ms</span>
            </div>
            
            <div className="flex items-center justify-between">
              <span className="bg-[#FF007F]/20 text-[#FF007F] border border-black px-1.5 py-0.5 rounded-none font-bold">Effector</span>
              <span>⟶ Muscle Contraction</span>
              <span className="text-slate-400 font-bold">10-20ms</span>
            </div>
            
            <div className="pt-2 border-t-[2px] border-black flex justify-between font-bold text-white">
              <span>TOTAL EXPECTED:</span>
              <span className="text-[#00E5FF] font-black">150ms - 330ms</span>
            </div>
          </div>
        </div>
      </section>

      {/* Overview of Modules */}
      <section className="space-y-6">
        <div className="flex justify-between items-end border-b-[2px] border-black pb-3">
          <div>
            <h2 className="text-2xl font-extrabold tracking-tight uppercase">Active Diagnostic Modules</h2>
            <p className="text-sm text-slate-400">Select an assessment to evaluate your neurological function.</p>
          </div>
          <button 
            onClick={() => setActiveTab('assessments')}
            className="hidden sm:flex items-center space-x-1 text-xs text-[#00E5FF] hover:text-[#00E5FF] font-mono tracking-wider font-extrabold"
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
                  <span className="text-[10px] text-slate-400 font-mono font-bold">MODULE {i + 1}</span>
                  <span className="text-[10px] text-slate-300 font-mono bg-black border border-black px-2 py-0.5 rounded-none font-bold">{mod.stat}</span>
                </div>
                <h3 className="text-base font-extrabold text-white">{mod.title}</h3>
                <p className="text-xs text-slate-400 leading-relaxed font-semibold">{mod.desc}</p>
              </div>
              <div className="pt-5">
                <button
                  onClick={() => setActiveTab('assessments')}
                  className="w-full text-center neo-btn neo-btn-cyan py-2 text-xs shadow-[3px_3px_0px_#000000]"
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
