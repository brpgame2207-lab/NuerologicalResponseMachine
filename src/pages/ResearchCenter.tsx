import React, { useState } from 'react';
import { 
  Network, 
  ChevronRight,
  Play,
  RotateCcw,
  BookOpenCheck
} from 'lucide-react';
import { researchArticles } from '../data/researchData';
import type { ResearchArticle } from '../data/researchData';
import GlassCard from '../components/GlassCard';

export const ResearchCenter: React.FC = () => {
  const [selectedArticle, setSelectedArticle] = useState<ResearchArticle>(researchArticles[0]);
  const [simStep, setSimStep] = useState<'idle' | 'firing' | 'cleft' | 'binding' | 'complete'>('idle');
  const [synapseDelay, setSynapseDelay] = useState<number>(0);

  const runSynapseSimulation = () => {
    setSimStep('firing');
    setSynapseDelay(0);

    // Step 1: Axon Action Potential (0 - 1000ms)
    setTimeout(() => {
      setSimStep('cleft');
      
      // Step 2: Vesicles fuse and neurotransmitters diffuse (1000 - 2500ms)
      setTimeout(() => {
        setSimStep('binding');
        
        // Step 3: Receptors bind (2500 - 3800ms)
        setTimeout(() => {
          setSimStep('complete');
          setSynapseDelay(Number((Math.random() * 0.4 + 0.6).toFixed(2))); // typical 0.6 - 1.0 ms synaptic delay
        }, 1300);
      }, 1500);
    }, 1000);
  };

  const resetSimulation = () => {
    setSimStep('idle');
    setSynapseDelay(0);
  };

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="border-b border-slate-800 pb-4">
        <h1 className="text-3xl font-extrabold tracking-tight">Neuroscience Research Center</h1>
        <p className="text-sm text-slate-400">Explore the biological foundations of neural transmission, reflexes, and cognitive learning.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Left Column: Article Directory */}
        <div className="space-y-4">
          <h3 className="text-xs font-mono text-cyan-400 uppercase tracking-widest border-b border-slate-850 pb-2">Academic Papers</h3>
          <nav className="space-y-2">
            {researchArticles.map((article) => {
              const active = selectedArticle.id === article.id;
              return (
                <button
                  key={article.id}
                  onClick={() => setSelectedArticle(article)}
                  className={`
                    w-full text-left p-4 rounded-xl border transition-all flex flex-col justify-between space-y-2 group
                    ${active 
                      ? 'bg-cyan-500/10 border-cyan-500/30 text-white shadow-[0_0_15px_rgba(0,229,255,0.05)]' 
                      : 'bg-slate-900/50 border-slate-800/80 text-slate-400 hover:text-slate-200 hover:bg-slate-900/80'
                    }
                  `}
                >
                  <div className="flex justify-between items-start w-full">
                    <span className="text-[10px] font-mono text-cyan-500/80 uppercase tracking-wider">{article.category}</span>
                    <ChevronRight className={`h-4 w-4 text-cyan-400 transition-transform ${active ? 'translate-x-1' : 'opacity-0 group-hover:opacity-100'}`} />
                  </div>
                  <h4 className="text-sm font-bold tracking-tight text-white">{article.title}</h4>
                  <p className="text-[11px] text-slate-400 leading-normal line-clamp-2">{article.summary}</p>
                </button>
              );
            })}
          </nav>

          {/* Interactive Synapse Simulator Widget */}
          <h3 className="text-xs font-mono text-emerald-400 uppercase tracking-widest border-b border-slate-850 pb-2 pt-2">Active Simulator</h3>
          <GlassCard glowColor="green" className="p-4 space-y-4">
            <div className="flex justify-between items-center border-b border-slate-800 pb-2">
              <span className="text-xs font-bold font-mono text-white flex items-center space-x-1.5">
                <Network className="h-4 w-4 text-emerald-400 animate-pulse" />
                <span>Synaptic Gap Simulator</span>
              </span>
              <span className="text-[9px] text-slate-500 font-mono">CHEM-DELAY ASSAY</span>
            </div>

            {/* Micro visual animation panel */}
            <div className="h-44 w-full bg-slate-950 rounded-lg relative overflow-hidden border border-slate-850 flex flex-col justify-between p-2">
              
              {/* Presynaptic membrane boundary */}
              <div className="h-8 border-b-2 border-dashed border-cyan-500/30 w-full relative bg-slate-900/40 rounded-t flex items-center justify-center">
                <span className="text-[8px] text-cyan-400 font-mono tracking-widest">PRE-SYNAPTIC AXON TERMINAL</span>
                
                {/* Synaptic Vesicles */}
                <div className="absolute bottom-1.5 left-4 flex space-x-2">
                  <div className={`w-3.5 h-3.5 rounded-full border border-teal-400/80 bg-teal-500/20 flex items-center justify-center text-[7px] ${simStep === 'cleft' || simStep === 'binding' || simStep === 'complete' ? 'translate-y-4 opacity-0 transition-all duration-1000' : ''}`}>
                    🟢
                  </div>
                  <div className={`w-3.5 h-3.5 rounded-full border border-teal-400/80 bg-teal-500/20 flex items-center justify-center text-[7px] ${simStep === 'cleft' || simStep === 'binding' || simStep === 'complete' ? 'translate-y-3 opacity-0 transition-all duration-700' : ''}`}>
                    🟢
                  </div>
                  <div className={`w-3.5 h-3.5 rounded-full border border-teal-400/80 bg-teal-500/20 flex items-center justify-center text-[7px] ${simStep === 'cleft' || simStep === 'binding' || simStep === 'complete' ? 'translate-y-4 opacity-0 transition-all duration-800' : ''}`}>
                    🟢
                  </div>
                </div>
              </div>

              {/* Cleft gap / diffusion zone */}
              <div className="flex-1 relative flex items-center justify-center">
                
                {/* Electrical Spark action potential */}
                {simStep === 'firing' && (
                  <div className="absolute top-0 w-1 bg-yellow-400 h-10 animate-bounce shadow-[0_0_10px_#facc15]" />
                )}

                {/* Floating neurotransmitters */}
                {simStep === 'cleft' && (
                  <div className="flex space-x-8 animate-pulse text-xs">
                    <span className="animate-bounce">🟢</span>
                    <span className="animate-ping">🟢</span>
                    <span className="animate-bounce">🟢</span>
                  </div>
                )}

                {/* Neurotransmitters landing */}
                {simStep === 'binding' && (
                  <div className="flex space-x-6 text-[8px] absolute bottom-1.5">
                    <span className="animate-pulse">🟢 receptor bound</span>
                    <span className="animate-pulse">🟢 receptor bound</span>
                  </div>
                )}

                {simStep === 'idle' && (
                  <span className="text-[9px] text-slate-600 font-mono uppercase tracking-widest text-center">SYSTEM IDLE - INITIATE WAVE</span>
                )}
                {simStep === 'complete' && (
                  <div className="text-center font-mono text-[9px] text-emerald-400 space-y-1">
                    <div>POST-SYNAPTIC MEMBRANE DEPOLARIZED</div>
                    <div className="text-white font-bold">Latency: {synapseDelay} ms</div>
                  </div>
                )}
              </div>

              {/* Postsynaptic membrane boundary */}
              <div className="h-8 border-t-2 border-dashed border-purple-500/30 w-full relative bg-slate-900/40 rounded-b flex items-center justify-center">
                <span className="text-[8px] text-purple-400 font-mono tracking-widest">POST-SYNAPTIC DENDRITE RECEPTORS</span>
                {/* Receptors */}
                <div className="absolute top-0 left-4 flex space-x-4">
                  <div className="w-3.5 h-1.5 bg-purple-500/30 border border-purple-500/50 rounded-b" />
                  <div className="w-3.5 h-1.5 bg-purple-500/30 border border-purple-500/50 rounded-b" />
                  <div className="w-3.5 h-1.5 bg-purple-500/30 border border-purple-500/50 rounded-b" />
                </div>
              </div>

            </div>

            {/* Sim actions */}
            <div className="flex space-x-2">
              {simStep === 'idle' || simStep === 'complete' ? (
                <button
                  onClick={runSynapseSimulation}
                  className="flex-1 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold py-2 rounded text-xs flex items-center justify-center space-x-1 font-mono transition-colors"
                >
                  <Play className="h-3.5 w-3.5" />
                  <span>FIRE IMPULSE</span>
                </button>
              ) : (
                <button
                  disabled
                  className="flex-1 bg-slate-900 text-slate-500 border border-slate-850 font-bold py-2 rounded text-xs flex items-center justify-center space-x-1 font-mono"
                >
                  <span className="h-3 w-3 rounded-full border-2 border-t-emerald-400 animate-spin mr-1.5" />
                  <span>TRANSMITTING...</span>
                </button>
              )}
              
              <button
                onClick={resetSimulation}
                className="bg-slate-900 border border-slate-800 hover:bg-slate-800 text-slate-400 p-2 rounded transition-colors"
              >
                <RotateCcw className="h-4 w-4" />
              </button>
            </div>
          </GlassCard>
        </div>

        {/* Right Column: Article Reader */}
        <div className="lg:col-span-2 space-y-6">
          <GlassCard glowColor="cyan" className="p-6 md:p-8 space-y-6">
            {/* Header info */}
            <div className="border-b border-slate-800 pb-4 space-y-3">
              <div className="flex items-center space-x-2">
                <BookOpenCheck className="h-5 w-5 text-cyan-400" />
                <span className="text-xs text-slate-400 font-mono tracking-wider">{selectedArticle.category.toUpperCase()} // DIAGNOSTIC BRIEFING</span>
              </div>
              <h2 className="text-2xl font-black text-white">{selectedArticle.title}</h2>
              <p className="text-sm text-slate-300 leading-relaxed italic">{selectedArticle.summary}</p>
            </div>

            {/* Main Article Body */}
            <div className="space-y-6 text-sm text-slate-300 leading-relaxed">
              {selectedArticle.content.map((p, i) => (
                <p key={i}>{p}</p>
              ))}

              {/* Sub-sections */}
              {selectedArticle.sections.map((sect, i) => (
                <div key={i} className="space-y-3 pt-2">
                  <h3 className="text-base font-bold text-white tracking-wide border-l-2 border-cyan-400 pl-3">
                    {sect.heading}
                  </h3>
                  {sect.paragraphs.map((p, pi) => (
                    <p key={pi} className="text-slate-300 text-xs md:text-sm">
                      {p}
                    </p>
                  ))}
                </div>
              ))}
            </div>

            {/* Keyword tags */}
            <div className="pt-6 border-t border-slate-800/60 flex flex-wrap gap-2">
              {selectedArticle.keywords.map((kw) => (
                <span 
                  key={kw} 
                  className="text-[9px] font-mono text-cyan-400 bg-cyan-500/5 border border-cyan-500/20 px-2.5 py-1 rounded-full uppercase"
                >
                  #{kw}
                </span>
              ))}
            </div>
          </GlassCard>
        </div>

      </div>
    </div>
  );
};
export default ResearchCenter;
