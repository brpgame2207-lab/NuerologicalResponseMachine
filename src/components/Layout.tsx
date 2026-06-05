import React, { useState } from 'react';
import { 
  Activity, 
  BrainCircuit, 
  LineChart, 
  Menu, 
  X, 
  Cpu, 
  Atom
} from 'lucide-react';
import { useProgress } from '../context/ProgressContext';

interface LayoutProps {
  children: React.ReactNode;
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

export const Layout: React.FC<LayoutProps> = ({ children, activeTab, setActiveTab }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { scores } = useProgress();

  const navItems = [
    { id: 'landing', label: 'NRAS Core', icon: Atom },
    { id: 'assessments', label: 'Assessment Center', icon: Activity },
    { id: 'training', label: 'Training Arena', icon: BrainCircuit },
    { id: 'analytics', label: 'Analytics Dashboard', icon: LineChart },
  ];

  return (
    <div className="min-h-screen bg-[#070b19] text-white flex flex-col font-sans relative selection:bg-cyan-500/30 selection:text-cyan-200">
      {/* Background visual graphics */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#00e5ff05_1px,transparent_1px),linear-gradient(to_bottom,#00e5ff05_1px,transparent_1px)] bg-[size:32px_32px] pointer-events-none z-0" />
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-cyan-500/5 rounded-full blur-[120px] pointer-events-none z-0" />
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-purple-500/5 rounded-full blur-[120px] pointer-events-none z-0" />

      {/* Main Container */}
      <div className="flex flex-1 z-10">
        
        {/* Sidebar Desktop */}
        <aside className="hidden lg:flex flex-col w-64 bg-[#0a0f24]/90 border-r border-slate-800/80 p-5 backdrop-blur-md shrink-0 justify-between">
          <div className="space-y-6">
            {/* Logo Header */}
            <div className="flex items-center space-x-3 pb-5 border-b border-slate-800/60 cursor-pointer" onClick={() => setActiveTab('landing')}>
              <div className="bg-cyan-500/10 p-2 rounded-lg border border-cyan-500/30 shadow-[0_0_15px_rgba(0,229,255,0.2)]">
                <Cpu className="h-6 w-6 text-cyan-400 animate-pulse" />
              </div>
              <div>
                <h1 className="font-bold tracking-wider text-sm text-cyan-300">NRAS</h1>
                <p className="text-[10px] text-slate-400 tracking-widest font-mono">LAB CONTROL</p>
              </div>
            </div>

            {/* Scientific Performance Index Summary */}
            <div className="bg-slate-900/50 rounded-lg p-3.5 border border-slate-800/60 shadow-[inset_0_1px_3px_rgba(0,0,0,0.4)]">
              <div className="flex justify-between items-center text-[10px] text-slate-400 font-mono tracking-wider mb-1">
                <span>NEURAL PERFORMANCE</span>
                <span className={`h-2 w-2 rounded-full animate-ping ${scores.npi > 70 ? 'bg-emerald-400' : 'bg-amber-400'}`}></span>
              </div>
              <div className="flex items-baseline space-x-2">
                <span className="text-2xl font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-emerald-400">
                  {scores.npi}
                </span>
                <span className="text-[10px] text-slate-400 font-mono">NPI / 100</span>
              </div>
              {/* Progress bar */}
              <div className="w-full bg-slate-800 h-1.5 rounded-full mt-2 overflow-hidden">
                <div 
                  className="bg-gradient-to-r from-cyan-500 to-emerald-400 h-full rounded-full transition-all duration-1000"
                  style={{ width: `${scores.npi}%` }}
                />
              </div>
            </div>

            {/* Sidebar Nav */}
            <nav className="space-y-1">
              {navItems.map((item) => {
                const Icon = item.icon;
                const active = activeTab === item.id;
                return (
                  <button
                    key={item.id}
                    onClick={() => setActiveTab(item.id)}
                    className={`
                      w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-sm font-medium tracking-wide transition-all duration-200 group
                      ${active 
                        ? 'bg-cyan-500/10 text-cyan-400 border border-cyan-500/20 shadow-[0_0_10px_rgba(0,229,255,0.05)]' 
                        : 'text-slate-400 hover:text-white hover:bg-slate-900/40 border border-transparent'
                      }
                    `}
                  >
                    <Icon className={`h-4.5 w-4.5 transition-transform duration-300 group-hover:scale-110 ${active ? 'text-cyan-400' : 'text-slate-400 group-hover:text-cyan-300'}`} />
                    <span>{item.label}</span>
                  </button>
                );
              })}
            </nav>
          </div>

          {/* Project Details Panel */}
          <div className="pt-4 border-t border-slate-800/60 text-[10px] text-slate-500 font-mono space-y-1">
            <div className="flex justify-between">
              <span>PROJECT CODE:</span>
              <span className="text-cyan-500/70">BIO-INF-2026</span>
            </div>
            <div className="flex justify-between">
              <span>SYSTEM STATE:</span>
              <span className="text-emerald-500 animate-pulse">ONLINE</span>
            </div>
          </div>
        </aside>

        {/* Mobile Sidebar (Slide Over) */}
        {sidebarOpen && (
          <div className="fixed inset-0 z-50 lg:hidden flex">
            {/* Backdrop */}
            <div className="fixed inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setSidebarOpen(false)} />
            
            <aside className="relative flex flex-col w-64 bg-[#0a0f24] border-r border-slate-800 p-5 h-full z-10">
              <button 
                className="absolute top-4 right-4 text-slate-400 hover:text-white"
                onClick={() => setSidebarOpen(false)}
              >
                <X className="h-6 w-6" />
              </button>

              <div className="space-y-6 mt-4 flex-1 flex flex-col justify-between">
                <div className="space-y-6">
                  <div className="flex items-center space-x-3 pb-5 border-b border-slate-800/60" onClick={() => { setActiveTab('landing'); setSidebarOpen(false); }}>
                    <div className="bg-cyan-500/10 p-2 rounded-lg border border-cyan-500/30">
                      <Cpu className="h-6 w-6 text-cyan-400" />
                    </div>
                    <div>
                      <h1 className="font-bold tracking-wider text-sm text-cyan-300">NRAS</h1>
                      <p className="text-[10px] text-slate-400 tracking-widest font-mono">LAB CONTROL</p>
                    </div>
                  </div>

                  <div className="bg-slate-900/50 rounded-lg p-3.5 border border-slate-800/60">
                    <div className="flex justify-between items-center text-[10px] text-slate-400 font-mono mb-1">
                      <span>NEURAL INDEX</span>
                      <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse"></span>
                    </div>
                    <div className="text-2xl font-bold text-cyan-400">{scores.npi} <span className="text-xs text-slate-400">/ 100</span></div>
                  </div>

                  <nav className="space-y-1">
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
                            w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-sm font-medium transition-all
                            ${active 
                              ? 'bg-cyan-500/10 text-cyan-400 border border-cyan-500/20' 
                              : 'text-slate-400 hover:text-white hover:bg-slate-900/40'
                            }
                          `}
                        >
                          <Icon className="h-5 w-5 text-cyan-400" />
                          <span>{item.label}</span>
                        </button>
                      );
                    })}
                  </nav>
                </div>

                <div className="text-[10px] text-slate-500 font-mono pt-4 border-t border-slate-800/60 space-y-1">
                  <div>SYSTEM STATE: <span className="text-emerald-500">ONLINE</span></div>
                  <div>VERSION: <span className="text-slate-400">1.0.0</span></div>
                </div>
              </div>
            </aside>
          </div>
        )}

        {/* Content Area */}
        <div className="flex-1 flex flex-col min-w-0">
          {/* Header */}
          <header className="h-16 border-b border-slate-800/80 bg-[#070b19]/90 backdrop-blur-md flex items-center justify-between px-6 sticky top-0 z-30">
            <div className="flex items-center space-x-4">
              <button 
                className="lg:hidden text-slate-400 hover:text-white"
                onClick={() => setSidebarOpen(true)}
              >
                <Menu className="h-6 w-6" />
              </button>
              
              <div className="hidden sm:flex items-center space-x-2 text-xs text-slate-400 font-mono bg-slate-900/40 px-3 py-1.5 rounded-full border border-slate-800/60">
                <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
                <span>NEURO-METRICS SCANNER ACTIVE</span>
              </div>
            </div>

            {/* Quick stats on Header */}
            <div className="flex items-center space-x-6">
              <div className="hidden md:flex space-x-6 text-xs font-mono">
                <div>
                  <span className="text-slate-500 mr-2">AVG REFLEX:</span>
                  <span className="text-cyan-400 font-bold">{scores.reflex} ms</span>
                </div>
                <div className="border-l border-slate-800 pl-6">
                  <span className="text-slate-500 mr-2">MEMORY ACC:</span>
                  <span className="text-emerald-400 font-bold">{scores.memory}%</span>
                </div>
              </div>

              {/* Lab Title */}
              <div className="text-right">
                <span className="text-[9px] text-slate-400 tracking-widest font-mono block">NRAS LABORATORY</span>
                <span className="text-xs text-cyan-300 font-semibold tracking-wider">NEURO-ANALYSIS PORTAL</span>
              </div>
            </div>
          </header>

          {/* Main Viewport */}
          <main className="flex-1 p-6 lg:p-8 max-w-7xl w-full mx-auto relative">
            {children}
          </main>

          {/* Scientific Project Footer */}
          <footer className="border-t border-slate-800/50 bg-[#050711]/90 py-6 px-6 text-center text-xs text-slate-500 font-mono">
            <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
              <div>
                <span className="text-cyan-400">Neurological Response Analysis System (NRAS)</span> — Core Dashboard
              </div>
              <div className="flex space-x-6">
                <span>Biology Section: Reflex Arc & Cognition</span>
                <span className="border-l border-slate-800 pl-6">Info Science Section: Human Performance Analytics</span>
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
