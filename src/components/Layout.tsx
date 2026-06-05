import React, { useState } from 'react';
import { 
  Activity, 
  BrainCircuit, 
  LineChart, 
  Menu, 
  X, 
  Cpu, 
  Atom,
  ArrowLeft
} from 'lucide-react';
import { useProgress } from '../context/ProgressContext';

interface LayoutProps {
  children: React.ReactNode;
  activeTab: string;
  setActiveTab: (tab: string) => void;
  onBack?: () => void;
}

export const Layout: React.FC<LayoutProps> = ({ children, activeTab, setActiveTab, onBack }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { scores } = useProgress();

  const navItems = [
    { id: 'landing', label: 'NRAS Core', icon: Atom },
    { id: 'assessments', label: 'Assessment Center', icon: Activity },
    { id: 'training', label: 'Training Arena', icon: BrainCircuit },
    { id: 'analytics', label: 'Analytics', icon: LineChart },
  ];

  return (
    <div className="min-h-screen bg-[#0c0c0e] text-white flex flex-col font-sans relative selection:bg-cyan-500 selection:text-black">
      {/* Tech decorative overlay grid for brutalist visual texture */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff02_1px,transparent_1px),linear-gradient(to_bottom,#ffffff02_1px,transparent_1px)] bg-[size:24px_24px] pointer-events-none z-0" />

      {/* Main Container */}
      <div className="flex flex-1 z-10">
        
        {/* Sidebar Desktop */}
        <aside className="hidden lg:flex flex-col w-64 bg-[#121216] border-r-[3px] border-black p-5 shrink-0 justify-between">
          <div className="space-y-6">
            {/* Logo Header */}
            <div className="flex items-center space-x-3 pb-5 border-b-[2px] border-black cursor-pointer" onClick={() => setActiveTab('landing')}>
              <div className="bg-[#00E5FF] p-2 rounded-none border-[2px] border-black shadow-[2px_2px_0px_#000] text-black">
                <Cpu className="h-6 w-6" />
              </div>
              <div>
                <h1 className="font-extrabold tracking-wider text-sm text-[#00E5FF]">NRAS</h1>
                <p className="text-[10px] text-slate-400 tracking-widest font-mono font-bold">LAB CONTROL</p>
              </div>
            </div>

            {/* Scientific Performance Index Summary */}
            <div className="bg-[#1c1c24] rounded-none p-3.5 border-[3px] border-black shadow-[4px_4px_0px_#00E5FF]">
              <div className="flex justify-between items-center text-[10px] text-slate-400 font-mono tracking-wider mb-1">
                <span className="font-bold">NEURAL PERFORMANCE</span>
                <span className={`h-2.5 w-2.5 rounded-full border border-black ${scores.npi > 70 ? 'bg-[#00FF88]' : 'bg-[#FFDE47]'}`}></span>
              </div>
              <div className="flex items-baseline space-x-2">
                <span className="text-3xl font-black font-mono tracking-tight text-[#00E5FF]">
                  {scores.npi}
                </span>
                <span className="text-[10px] text-slate-400 font-mono font-bold">NPI / 100</span>
              </div>
              {/* Progress bar */}
              <div className="w-full bg-black h-3 border border-black mt-2 overflow-hidden">
                <div 
                  className="bg-[#00E5FF] h-full transition-all duration-1000 border-r border-black"
                  style={{ width: `${scores.npi}%` }}
                />
              </div>
            </div>

            {/* Sidebar Nav */}
            <nav className="space-y-2">
              {navItems.map((item) => {
                const Icon = item.icon;
                const active = activeTab === item.id;
                return (
                  <button
                    key={item.id}
                    onClick={() => setActiveTab(item.id)}
                    className={`
                      w-full flex items-center space-x-3 px-4 py-3 rounded-none text-xs tracking-wider transition-all duration-100 group uppercase font-bold
                      ${active 
                        ? 'bg-[#FFDE47] text-black border-[3px] border-black shadow-[4px_4px_0px_#000] scale-[1.02]' 
                        : 'text-slate-300 hover:text-black hover:bg-white border-[3px] border-transparent hover:border-black'
                      }
                    `}
                  >
                    <Icon className={`h-4 w-4 shrink-0 transition-transform duration-200 group-hover:scale-110 ${active ? 'text-black' : 'text-slate-400 group-hover:text-black'}`} />
                    <span className="whitespace-nowrap">{item.label}</span>
                  </button>
                );
              })}
            </nav>
          </div>

          {/* Project Details Panel */}
          <div className="pt-4 border-t-[2px] border-black text-[10px] text-slate-400 font-mono space-y-1 font-bold">
            <div className="flex justify-between">
              <span>PROJECT CODE:</span>
              <span className="text-[#00E5FF]">BIO-INF-2026</span>
            </div>
            <div className="flex justify-between">
              <span>SYSTEM STATE:</span>
              <span className="text-[#00FF88] animate-pulse">ONLINE</span>
            </div>
          </div>
        </aside>

        {/* Mobile Sidebar (Slide Over) */}
        {sidebarOpen && (
          <div className="fixed inset-0 z-50 lg:hidden flex">
            {/* Backdrop */}
            <div className="fixed inset-0 bg-black/80" onClick={() => setSidebarOpen(false)} />
            
            <aside className="relative flex flex-col w-64 bg-[#121216] border-r-[3px] border-black p-5 h-full z-10">
              <button 
                className="absolute top-4 right-4 text-slate-400 hover:text-white border-2 border-black bg-[#1c1c24] p-1"
                onClick={() => setSidebarOpen(false)}
              >
                <X className="h-5 w-5" />
              </button>

              <div className="space-y-6 mt-4 flex-1 flex flex-col justify-between">
                <div className="space-y-6">
                  <div className="flex items-center space-x-3 pb-5 border-b border-black" onClick={() => { setActiveTab('landing'); setSidebarOpen(false); }}>
                    <div className="bg-[#00E5FF] p-2 rounded-none border-[2px] border-black text-black">
                      <Cpu className="h-6 w-6" />
                    </div>
                    <div>
                      <h1 className="font-extrabold tracking-wider text-sm text-[#00E5FF]">NRAS</h1>
                      <p className="text-[10px] text-slate-400 tracking-widest font-mono font-bold">LAB CONTROL</p>
                    </div>
                  </div>

                  <div className="bg-[#1c1c24] rounded-none p-3.5 border-[3px] border-black shadow-[4px_4px_0px_#00E5FF]">
                    <div className="flex justify-between items-center text-[10px] text-slate-400 font-mono mb-1">
                      <span className="font-bold">NEURAL INDEX</span>
                      <span className="h-2 w-2 rounded-full bg-[#00FF88] animate-pulse"></span>
                    </div>
                    <div className="text-2xl font-black text-[#00E5FF] font-mono">{scores.npi} <span className="text-xs text-slate-400">/ 100</span></div>
                  </div>

                  <nav className="space-y-2">
                    {navItems.map((item) => {
                      const Icon = item.icon;
                      const active = activeTab === item.id;
                      return (
                        <button
                          key={item.id}
                          onClick={() => {
                            setActiveTab(item.id);
                            setSidebarOpen(false);
                          }}
                          className={`
                            w-full flex items-center space-x-3 px-4 py-3 rounded-none text-xs tracking-wider transition-all duration-100 group uppercase font-bold
                            ${active 
                              ? 'bg-[#FFDE47] text-black border-[3px] border-black shadow-[4px_4px_0px_#000]' 
                              : 'text-slate-300 hover:text-black hover:bg-white border-[3px] border-transparent hover:border-black'
                            }
                          `}
                        >
                          <Icon className="h-4 w-4 shrink-0" />
                          <span className="whitespace-nowrap">{item.label}</span>
                        </button>
                      );
                    })}
                  </nav>
                </div>

                <div className="text-[10px] text-slate-400 font-mono pt-4 border-t border-black space-y-1 font-bold">
                  <div>SYSTEM STATE: <span className="text-[#00FF88]">ONLINE</span></div>
                  <div>VERSION: <span className="text-slate-300">1.0.0</span></div>
                </div>
              </div>
            </aside>
          </div>
        )}

        {/* Content Area */}
        <div className="flex-1 flex flex-col min-w-0">
          {/* Header */}
          <header className="h-16 border-b-[3px] border-black bg-[#121216] flex items-center justify-between px-6 sticky top-0 z-30">
            <div className="flex items-center space-x-4">
              <button 
                className="lg:hidden text-slate-400 hover:text-white border-2 border-black bg-[#1c1c24] p-1.5"
                onClick={() => setSidebarOpen(true)}
              >
                <Menu className="h-5 w-5" />
              </button>
              
              <div className="hidden sm:flex items-center space-x-2 text-xs text-slate-300 font-mono bg-[#1c1c24] px-3 py-1.5 rounded-none border-2 border-black font-bold">
                <span className="h-2 w-2 rounded-full bg-[#00FF88] animate-pulse" />
                <span>NEURO-METRICS SCANNER ACTIVE</span>
              </div>
            </div>

            {/* Quick stats on Header */}
            <div className="flex items-center space-x-6">
              <div className="hidden md:flex space-x-6 text-xs font-mono font-bold bg-[#1c1c24] p-2 border-2 border-black">
                <div>
                  <span className="text-slate-400 mr-2">AVG REFLEX:</span>
                  <span className="text-[#00E5FF] font-black">{scores.reflex} ms</span>
                </div>
                <div className="border-l-2 border-black pl-6">
                  <span className="text-slate-400 mr-2">MEMORY ACC:</span>
                  <span className="text-[#00FF88] font-black">{scores.memory}%</span>
                </div>
              </div>

              {/* Lab Title */}
              <div className="text-right">
                <span className="text-[9px] text-slate-400 tracking-widest font-mono block font-bold">NRAS LABORATORY</span>
                <span className="text-xs text-[#00E5FF] font-extrabold tracking-wider">NEURO-ANALYSIS PORTAL</span>
              </div>
            </div>
          </header>

          {/* Main Viewport */}
          <main className="flex-1 p-6 lg:p-8 max-w-7xl w-full mx-auto relative">
            {onBack && (
              <button 
                onClick={onBack}
                className="mb-6 inline-flex items-center gap-2 px-4 py-2 border-[3px] border-black bg-[#FFDE47] hover:bg-[#ffe460] text-black font-extrabold uppercase tracking-widest shadow-[4px_4px_0px_#000000] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[2px_2px_0px_#000000] active:translate-x-[4px] active:translate-y-[4px] active:shadow-none transition-all text-xs cursor-pointer select-none"
              >
                <ArrowLeft className="h-4 w-4 stroke-[3px]" />
                Back to Previous Page
              </button>
            )}
            {children}
          </main>

          {/* Scientific Project Footer */}
          <footer className="border-t-[3px] border-black bg-[#121216] py-6 px-6 text-center text-xs text-slate-400 font-mono font-bold">
            <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
              <div>
                <span className="text-[#00E5FF]">Neurological Response Analysis System (NRAS)</span> — Core Dashboard
              </div>
              <div className="flex space-x-6">
                <span>Biology Section: Reflex Arc & Cognition</span>
                <span className="border-l-2 border-black pl-6">Info Science Section: Human Performance Analytics</span>
              </div>
              <div>
                © 2026 Academic Research Project
              </div>
            </div>
          </footer>
        </div>

      </div>
    </div>
  );
};
export default Layout;
