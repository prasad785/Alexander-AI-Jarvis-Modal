import React, { useState, useEffect } from 'react';
import { 
  Activity, Terminal, MessageSquare, Cpu, Shield, Clock, 
  Volume2, VolumeX, Menu, X, CheckCircle2, UserCheck, AlertTriangle
} from 'lucide-react';

import Dashboard from './components/Dashboard';
import AgentOrchestrator from './components/AgentOrchestrator';
import VoiceMeetingIntelligence from './components/VoiceMeetingIntelligence';
import LinuxVMEnvironment from './components/LinuxVMEnvironment';
import FounderSecurity from './components/FounderSecurity';
import TrialAccess from './components/TrialAccess';

type ActiveTab = 'diagnostics' | 'orchestrator' | 'voice' | 'vm' | 'security' | 'trial';

export default function App() {
  const [activeTab, setActiveTab] = useState<ActiveTab>('diagnostics');
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [voiceSynthesized, setVoiceSynthesized] = useState(true); // Sound on by default
  const [systemAlertsCount, setSystemAlertsCount] = useState(2);
  const [currentTime, setCurrentTime] = useState(new Date());

  // Clock ticks
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const menuItems = [
    { id: 'diagnostics', label: 'Core Diagnostics', icon: Activity, desc: 'OS Health & Storage Analysis' },
    { id: 'orchestrator', label: 'Agent Planner', icon: Terminal, desc: 'Execution & Model Routing' },
    { id: 'voice', label: 'Voice & Meetings', icon: MessageSquare, desc: 'Speaker Diarization & Pipeline' },
    { id: 'vm', label: 'Linux VM Sandbox', icon: Cpu, desc: 'Command Translation Bridge' },
    { id: 'security', label: 'Founder Security', icon: Shield, desc: 'Hardware Key & MFA logs' },
    { id: 'trial', label: 'Subscription Trial', icon: Clock, desc: '24h Token Entitlements' }
  ];

  return (
    <div className="min-h-screen bg-slate-950 bg-grid text-slate-100 flex flex-col md:flex-row relative">
      
      {/* Scanline background overlay */}
      <div className="absolute inset-0 pointer-events-none z-40 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.15)_50%)] bg-[length:100%_4px]"></div>

      {/* Sidebar Navigation */}
      <aside className={`w-80 bg-slate-950/80 border-r border-slate-900 flex flex-col justify-between shrink-0 transition-all duration-300 relative z-30 ${
        sidebarOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'
      }`}>
        <div>
          {/* Header Branding */}
          <div className="p-6 border-b border-slate-900 flex items-center justify-between">
            <div className="flex items-center gap-3">
              {/* JARVIS logo arc-reactor-like element */}
              <div className="relative w-10 h-10 flex items-center justify-center">
                <div className="absolute inset-0 rounded-full border-2 border-dashed border-cyan-400 animate-spin-slow"></div>
                <div className="absolute w-6 h-6 rounded-full border border-purple-500 animate-ping"></div>
                <div className="w-4 h-4 rounded-full bg-cyan-400 glow-dot shadow-glow-cyan"></div>
              </div>
              <div>
                <h1 className="text-base font-orbitron font-extrabold tracking-widest text-white text-shadow-glow">JARVIS OS</h1>
                <span className="text-[9px] uppercase tracking-widest text-slate-500 font-semibold font-orbitron block">Agentic AI OS</span>
              </div>
            </div>
            
            <button 
              onClick={() => setSidebarOpen(false)}
              className="md:hidden p-1 rounded text-slate-400 hover:text-white"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Navigation Links */}
          <nav className="p-4 space-y-1">
            {menuItems.map(item => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => {
                    setActiveTab(item.id as ActiveTab);
                    if (window.innerWidth < 768) setSidebarOpen(false);
                  }}
                  className={`w-full p-3.5 rounded-xl border text-left transition-all duration-200 flex items-center gap-4 relative overflow-hidden group ${
                    isActive 
                      ? 'border-jarvis-neonCyan/30 bg-jarvis-neonCyan/5 text-white shadow-glow-cyan/5' 
                      : 'border-transparent text-slate-400 hover:text-slate-200 hover:bg-slate-900/40'
                  }`}
                >
                  {/* Left accent border */}
                  {isActive && (
                    <div className="absolute left-0 top-0 bottom-0 w-1 bg-jarvis-neonCyan"></div>
                  )}

                  <Icon className={`w-5 h-5 shrink-0 transition-transform group-hover:scale-110 ${
                    isActive ? 'text-jarvis-neonCyan' : 'text-slate-500 group-hover:text-slate-400'
                  }`} />
                  
                  <div>
                    <span className={`text-xs font-bold tracking-wider font-orbitron block ${
                      isActive ? 'text-white' : 'text-slate-300'
                    }`}>
                      {item.label}
                    </span>
                    <span className="text-[10px] text-slate-500 font-medium block mt-0.5">{item.desc}</span>
                  </div>
                </button>
              );
            })}
          </nav>
        </div>

        {/* Sidebar Footer Log Panel */}
        <div className="p-4 border-t border-slate-900 bg-slate-950 space-y-4">
          <div className="flex justify-between items-center text-[10px] text-slate-500">
            <span className="flex items-center gap-1"><span className="w-1.5 h-1.5 rounded-full bg-jarvis-neonGreen inline-block"></span> CORE ACTIVE</span>
            <span>v2.4.0</span>
          </div>

          <div className="bg-slate-900/40 p-3 rounded-lg border border-slate-900 text-xs flex justify-between items-center">
            <span className="text-slate-400 font-semibold font-orbitron">FOUNDER SECURE</span>
            <span className="px-2 py-0.5 rounded text-[9px] bg-jarvis-neonGreen/10 text-jarvis-neonGreen border border-jarvis-neonGreen/30 uppercase font-semibold">VERIFIED</span>
          </div>

          <div className="flex items-center justify-between text-xs">
            <button
              onClick={() => setVoiceSynthesized(!voiceSynthesized)}
              className="text-slate-500 hover:text-white transition-colors flex items-center gap-1.5"
            >
              {voiceSynthesized ? <Volume2 className="w-4 h-4 text-jarvis-neonCyan" /> : <VolumeX className="w-4 h-4" />}
              <span>Voice Feedback</span>
            </button>
            <span className="text-slate-500 font-mono">
              {currentTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
            </span>
          </div>
        </div>
      </aside>

      {/* Main Workspace */}
      <main className="flex-1 flex flex-col min-w-0 z-10 relative">
        
        {/* Workspace Header */}
        <header className="h-16 border-b border-slate-900 bg-slate-950/80 backdrop-blur-md flex items-center justify-between px-6 shrink-0 relative z-20">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setSidebarOpen(true)}
              className="md:hidden p-2 rounded text-slate-400 hover:text-white"
            >
              <Menu className="w-5 h-5" />
            </button>
            <h2 className="text-sm font-semibold font-orbitron tracking-widest text-slate-300 uppercase">
              {menuItems.find(item => item.id === activeTab)?.label}
            </h2>
          </div>

          {/* Header Diagnostics summary */}
          <div className="flex items-center gap-4 text-xs font-orbitron">
            
            <div className="hidden sm:flex items-center gap-2 text-slate-400">
              <span>LATENCY:</span>
              <span className="text-jarvis-neonCyan font-semibold">12ms</span>
            </div>

            <div className="hidden sm:flex items-center gap-2 text-slate-400">
              <span>SANDBOX VM:</span>
              <span className="text-jarvis-neonPurple font-semibold">192.168.56.10</span>
            </div>

            <div className="flex items-center gap-1 bg-amber-500/10 border border-amber-500/20 text-amber-300 text-[10px] px-2 py-0.5 rounded">
              <AlertTriangle className="w-3.5 h-3.5" />
              <span>2 WARNINGS</span>
            </div>

          </div>
        </header>

        {/* Content Container */}
        <div className="flex-1 overflow-y-auto p-6 md:p-8 space-y-6">
          {activeTab === 'diagnostics' && <Dashboard />}
          {activeTab === 'orchestrator' && <AgentOrchestrator />}
          {activeTab === 'voice' && <VoiceMeetingIntelligence />}
          {activeTab === 'vm' && <LinuxVMEnvironment />}
          {activeTab === 'security' && <FounderSecurity />}
          {activeTab === 'trial' && <TrialAccess />}
        </div>
      </main>

    </div>
  );
}
