import React, { useState } from 'react';
import { Terminal, ShieldCheck, Play, Trash2, Cpu, FileCode, CheckSquare, AlertTriangle } from 'lucide-react';

interface ShellLog {
  type: 'cmd' | 'stdout' | 'stderr' | 'warn' | 'success';
  text: string;
}

export default function LinuxVMEnvironment() {
  const [terminalLogs, setTerminalLogs] = useState<ShellLog[]>([
    { type: 'stdout', text: 'Welcome to JARVIS Ubuntu VM Dev Environment.' },
    { type: 'stdout', text: 'SSH Tunnel Established. IP: 192.168.56.10' },
    { type: 'stdout', text: 'System status: Active. Docker: Running. Airflow: Idle.' },
  ]);

  const [inputCommand, setInputCommand] = useState("");
  const [isVerifying, setIsVerifying] = useState(false);

  const recipes = [
    { label: "Install Docker", command: "sudo apt update && sudo apt install -y docker.io" },
    { label: "Check Airflow Logs", command: "cat /var/log/airflow/scheduler.log | tail -n 20" },
    { label: "Run Python App", command: "python3 src/main.py --env development" },
    { label: "Kill Web Server", command: "sudo systemctl stop nginx" },
    { label: "Destructive Command", command: "rm -rf /etc/configs" },
  ];

  const handleRunCommand = (cmd: string) => {
    if (!cmd.trim()) return;

    // 1. Log command input
    setTerminalLogs(prev => [...prev, { type: 'cmd', text: `jarvis-agent@ubuntu-vm:~$ ${cmd}` }]);
    setIsVerifying(true);

    // 2. Command Validation and Security Gate
    setTimeout(() => {
      setIsVerifying(false);
      const isDangerous = cmd.includes('rm -rf') || cmd.includes('fdisk') || cmd.includes('mkfs');
      
      if (isDangerous) {
        setTerminalLogs(prev => [
          ...prev,
          { type: 'warn', text: `[SECURITY AUDIT] WARNING: Destructive operation detected.` },
          { type: 'stderr', text: `Error: command execution BLOCKED. Founder approval required for destructive commands: "${cmd}"` }
        ]);
        return;
      }

      // Safe commands mock outputs
      if (cmd.includes('apt install')) {
        setTerminalLogs(prev => [
          ...prev,
          { type: 'stdout', text: "Reading package lists... Done" },
          { type: 'stdout', text: "Building dependency tree... Done" },
          { type: 'stdout', text: "docker.io is already the newest version (24.0.7-0ubuntu1)." },
          { type: 'success', text: "[VERIFIED] Package check complete." }
        ]);
      } else if (cmd.includes('airflow/scheduler.log')) {
        setTerminalLogs(prev => [
          ...prev,
          { type: 'stdout', text: "[2026-08-29 11:36:01] INFO - Scheduler loop iteration started." },
          { type: 'stdout', text: "[2026-08-29 11:36:02] INFO - Executing DAG: validate_pipeline_integration" },
          { type: 'stdout', text: "[2026-08-29 11:36:04] INFO - Task instance: run_tests - State: SUCCESS" },
          { type: 'success', text: "[VERIFIED] Log parse complete. 0 errors detected." }
        ]);
      } else if (cmd.includes('main.py')) {
        setTerminalLogs(prev => [
          ...prev,
          { type: 'stdout', text: "Starting application server..." },
          { type: 'stdout', text: "Database Connected: postgres://localhost:5432/jarvis_dev" },
          { type: 'stdout', text: "Cache Connected: redis://localhost:6379" },
          { type: 'stdout', text: "Server running on http://127.0.0.1:8080" },
          { type: 'success', text: "[VERIFIED] App is online and healthy." }
        ]);
      } else if (cmd.includes('nginx')) {
        setTerminalLogs(prev => [
          ...prev,
          { type: 'stdout', text: "Stopping nginx.service..." },
          { type: 'stdout', text: "nginx.service stopped." },
          { type: 'success', text: "[VERIFIED] Service nginx disabled." }
        ]);
      } else {
        // Generic command
        setTerminalLogs(prev => [
          ...prev,
          { type: 'stdout', text: `Executing: ${cmd}` },
          { type: 'stdout', text: `Exit code: 0` }
        ]);
      }

    }, 1200);

    setInputCommand("");
  };

  return (
    <div className="space-y-6">
      
      {/* Dev Architecture Mapping */}
      <div className="jarvis-panel p-6 rounded-2xl relative overflow-hidden">
        <div className="scanline-overlay"></div>
        <h3 className="text-base font-semibold font-orbitron tracking-wider text-white mb-4 flex items-center gap-2">
          <Cpu className="w-5 h-5 text-jarvis-neonCyan" />
          Windows → JARVIS → Linux VM execution flow
        </h3>

        <div className="flex flex-col md:flex-row items-center justify-between gap-4 p-4 bg-slate-950/60 rounded-xl border border-slate-900 text-xs">
          
          <div className="flex flex-col items-center text-center p-3 bg-slate-900 border border-slate-800 rounded-lg w-full md:w-1/4">
            <span className="text-[10px] text-slate-500 font-orbitron uppercase">Host Platform</span>
            <span className="font-semibold text-white mt-1">Windows OS / IDE</span>
          </div>

          <ArrowRightIcon className="w-5 h-5 text-slate-600 rotate-90 md:rotate-0" />

          <div className="flex flex-col items-center text-center p-3 bg-jarvis-neonCyan/10 border border-jarvis-neonCyan/30 rounded-lg w-full md:w-1/4">
            <span className="text-[10px] text-jarvis-neonCyan font-orbitron uppercase">Agent Control</span>
            <span className="font-semibold text-white mt-1">JARVIS Planner</span>
          </div>

          <ArrowRightIcon className="w-5 h-5 text-slate-600 rotate-90 md:rotate-0" />

          <div className="flex flex-col items-center text-center p-3 bg-jarvis-neonPurple/10 border border-jarvis-neonPurple/30 rounded-lg w-full md:w-1/4">
            <span className="text-[10px] text-jarvis-neonPurple font-orbitron uppercase">Secure Bridge</span>
            <span className="font-semibold text-white mt-1">SSH/API Tunnel</span>
          </div>

          <ArrowRightIcon className="w-5 h-5 text-slate-600 rotate-90 md:rotate-0" />

          <div className="flex flex-col items-center text-center p-3 bg-slate-900 border border-slate-800 rounded-lg w-full md:w-1/4">
            <span className="text-[10px] text-slate-500 font-orbitron uppercase">Target Host</span>
            <span className="font-semibold text-white mt-1">Ubuntu VM Sandbox</span>
          </div>

        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Pre-made recipes and command validators */}
        <div className="jarvis-panel p-6 rounded-2xl relative overflow-hidden flex flex-col justify-between">
          <div className="scanline-overlay"></div>
          <div>
            <h3 className="text-base font-semibold font-orbitron tracking-wider text-white mb-4 flex items-center gap-2">
              <CheckSquare className="w-5 h-5 text-jarvis-neonPurple" />
              Dev Environment Tools
            </h3>
            
            <p className="text-xs text-slate-400 mb-4">
              Select one of the pre-made recipes to translate normal language goals into secure Linux commands executed inside VM:
            </p>

            <div className="space-y-2">
              {recipes.map((recipe, index) => (
                <button
                  key={index}
                  onClick={() => handleRunCommand(recipe.command)}
                  className="w-full p-3 rounded-xl bg-slate-900 border border-slate-800 hover:border-jarvis-neonCyan text-left transition-all flex items-center justify-between"
                >
                  <div>
                    <span className="text-xs font-semibold text-white block">{recipe.label}</span>
                    <code className="text-[10px] text-slate-500 font-mono mt-1 block truncate max-w-[200px]">{recipe.command}</code>
                  </div>
                  <Play className="w-3.5 h-3.5 text-slate-400 fill-current shrink-0" />
                </button>
              ))}
            </div>
          </div>

          <div className="mt-6 pt-4 border-t border-slate-800">
            <div className="p-3 bg-slate-950 rounded-xl border border-slate-900 text-xs flex items-center gap-2">
              <ShieldCheck className="w-5 h-5 text-jarvis-neonGreen" />
              <span className="text-slate-400">Command verification rules: <strong className="text-white">Enabled</strong></span>
            </div>
          </div>
        </div>

        {/* Linux VM Terminal Screen */}
        <div className="jarvis-panel p-6 rounded-2xl lg:col-span-2 relative flex flex-col justify-between overflow-hidden min-h-[400px]">
          <div className="scanline-overlay"></div>
          
          <div className="flex justify-between items-center mb-4">
            <div className="flex items-center gap-2">
              <Terminal className="w-5 h-5 text-jarvis-neonCyan" />
              <h3 className="text-base font-semibold font-orbitron tracking-wider text-white">Ubuntu VM Sandbox Terminal</h3>
            </div>
            <span className="px-2 py-0.5 rounded text-[10px] bg-cyan-500/20 text-cyan-300 border border-cyan-500/30 font-orbitron">SSH CLEAR</span>
          </div>

          {/* Terminal Screen */}
          <div className="flex-1 bg-slate-950 p-4 rounded-xl border border-slate-900 font-mono text-xs overflow-y-auto space-y-2 max-h-[300px]">
            {terminalLogs.map((log, index) => (
              <div 
                key={index}
                className={
                  log.type === 'cmd' ? 'text-white font-bold' :
                  log.type === 'stderr' ? 'text-red-400' :
                  log.type === 'warn' ? 'text-amber-400 font-semibold' :
                  log.type === 'success' ? 'text-green-400' :
                  'text-slate-400'
                }
              >
                {log.text}
              </div>
            ))}
            {isVerifying && (
              <div className="text-jarvis-neonCyan animate-pulse flex items-center gap-1.5">
                <span>[SECURITY-GATE] Verifying command syntax...</span>
              </div>
            )}
          </div>

          {/* Terminal Input */}
          <div className="mt-4 pt-4 border-t border-slate-800 flex gap-2">
            <div className="flex-1 relative flex items-center">
              <span className="absolute left-3 text-slate-500 font-mono text-xs font-bold">~$</span>
              <input
                type="text"
                value={inputCommand}
                onChange={(e) => setInputCommand(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleRunCommand(inputCommand)}
                placeholder="Type Linux command (e.g. docker ps)..."
                className="w-full pl-9 pr-4 py-2.5 rounded-xl jarvis-input font-mono text-xs"
              />
            </div>
            <button
              onClick={() => handleRunCommand(inputCommand)}
              className="py-2 px-5 rounded-xl font-orbitron font-bold text-black bg-jarvis-neonCyan hover:bg-cyan-400 shadow-glow-cyan text-xs transition-all"
            >
              RUN
            </button>
          </div>

        </div>

      </div>

    </div>
  );
}

function ArrowRightIcon({ className }: { className?: string }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2.5" stroke="currentColor" className={className}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
    </svg>
  );
}
