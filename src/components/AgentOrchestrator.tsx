import React, { useState, useEffect } from 'react';
import { 
  Play, Pause, RotateCcw, ShieldAlert, Cpu, Terminal, CheckCircle2, 
  HelpCircle, ArrowRight, Eye, RefreshCw, Volume2, ShieldCheck, AlertCircle 
} from 'lucide-react';

interface TaskStep {
  id: number;
  description: string;
  model: string;
  status: 'pending' | 'running' | 'completed' | 'failed';
  log: string;
}

export default function AgentOrchestrator() {
  const [taskInput, setTaskInput] = useState("JARVIS, install Docker in Linux VM, pull the Redis image, create an API endpoint in a Python file, and test it.");
  const [isExecuting, setIsExecuting] = useState(false);
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [progress, setProgress] = useState(0);
  const [eta, setEta] = useState(0); // in seconds
  const [consoleLogs, setConsoleLogs] = useState<string[]>([]);
  const [showApprovalGate, setShowApprovalGate] = useState(false);
  const [showFailureModal, setShowFailureModal] = useState(false);
  const [isRollbackDone, setIsRollbackDone] = useState(false);
  const [voiceSynthesized, setVoiceSynthesized] = useState(false);

  // Pre-configured simulation scripts
  const sampleCommands = [
    { label: "Install Docker & Run Redis app in Linux VM", text: "JARVIS, install Docker in Linux VM, run a Redis container, create a Python test client, and verify connections." },
    { label: "Clean Desktop & Compress old media files", text: "JARVIS, clean my Windows desktop, move all media files to archive folder, compress files larger than 100MB, and delete duplicates." },
    { label: "Deploy Apache Airflow inside VM", text: "JARVIS, deploy an Apache Airflow environment inside the Linux VM, configure PostgreSQL metadata, and trigger validation DAG." }
  ];

  // The step planner
  const [steps, setSteps] = useState<TaskStep[]>([
    { id: 1, description: "Scan target system & retrieve VM details", model: "Gemini 3.5 Flash", status: 'pending', log: "Scanning Linux VM IP: 192.168.56.10, SSH Port: 22..." },
    { id: 2, description: "Translate natural language to Linux commands", model: "Gemini 3.5 Pro (Coder)", status: 'pending', log: "Command generated: 'sudo apt update && sudo apt install -y docker.io'" },
    { id: 3, description: "Validate command authorization & privileges", model: "Security Guard Engine", status: 'pending', log: "Verifying permissions for 'sudo apt install'. Access clear." },
    { id: 4, description: "Establish SSH session & execute Docker install", model: "SSH Command Executor", status: 'pending', log: "Connecting to VM... Executing apt install. Packages downloaded." },
    { id: 5, description: "Pull Redis docker image & start container", model: "Docker Integration tool", status: 'pending', log: "Running: 'docker run -d --name cache-redis -p 6379:6379 redis:alpine'" },
    { id: 6, description: "Verify application port binding and connections", model: "Gemini 3.5 Flash (Validation)", status: 'pending', log: "Probing port 6379. Connection established successfully. Running tests." }
  ]);

  const [activePlanText, setActivePlanText] = useState("");

  const startTaskSequence = () => {
    // Stop any active execution first
    setIsExecuting(false);
    setProgress(0);
    setCurrentStepIndex(0);
    setConsoleLogs(["[SYSTEM] Initializing Agent Orchestration Layer...", "[SYSTEM] Goal parsed successfully."]);
    setShowFailureModal(false);
    setIsRollbackDone(false);
    setVoiceSynthesized(false);
    
    // Set steps back to pending
    setSteps(steps.map(s => ({ ...s, status: 'pending' })));

    // Interactive Gate: Docker install is a privileged action, prompt user
    setShowApprovalGate(true);
  };

  const approvePlan = () => {
    setShowApprovalGate(false);
    setIsExecuting(true);
    setEta(18); // 18 seconds simulated time
    
    // Add logs
    setConsoleLogs(prev => [...prev, "[SYSTEM] Permission GRANTED by Founder. Commencing execution."]);
  };

  const cancelPlan = () => {
    setShowApprovalGate(false);
    setConsoleLogs(prev => [...prev, "[SYSTEM] Permission DENIED. Execution cancelled."]);
  };

  // Execution runner loop
  useEffect(() => {
    if (!isExecuting) return;

    const timer = setInterval(() => {
      setProgress(prev => {
        const nextProgress = prev + 5;
        if (nextProgress >= 100) {
          clearInterval(timer);
          setIsExecuting(false);
          setEta(0);
          
          // Let's simulate a success trigger with voice announce
          setSteps(prevSteps => prevSteps.map(s => ({ ...s, status: s.id === 6 ? 'completed' : s.status })));
          setConsoleLogs(logs => [...logs, "[JARVIS] ALL TASKS COMPLETED SUCCESSFULLY. Voice alert sent: 'Completed Successfully'."]);
          setVoiceSynthesized(true);
          return 100;
        }

        // Determine step index based on progress
        const stepIdx = Math.min(steps.length - 1, Math.floor((nextProgress / 100) * steps.length));
        setCurrentStepIndex(stepIdx);
        setEta(Math.max(0, Math.round((100 - nextProgress) * 0.18)));

        // Update step status
        setSteps(prevSteps => prevSteps.map((s, idx) => {
          if (idx < stepIdx) return { ...s, status: 'completed' };
          if (idx === stepIdx) return { ...s, status: 'running' };
          return s;
        }));

        // Add step logs to console logs
        const currentStep = steps[stepIdx];
        if (currentStep && nextProgress % 15 === 0) {
          setConsoleLogs(logs => {
            const hasLog = logs.includes(`[${currentStep.model}] ${currentStep.log}`);
            if (!hasLog) {
              return [...logs, `[EXECUTION ENGINE] Step ${currentStep.id}: ${currentStep.description}`, `[${currentStep.model}] ${currentStep.log}`];
            }
            return logs;
          });
        }

        // Mock a failure condition: If user types "Airflow" or we want to demonstrate the failure/recovery path, let's trigger it at 75%
        if (nextProgress === 80 && taskInput.toLowerCase().includes("airflow")) {
          clearInterval(timer);
          setIsExecuting(false);
          setSteps(prevSteps => prevSteps.map((s, idx) => {
            if (idx === 4) return { ...s, status: 'failed' };
            return s;
          }));
          setConsoleLogs(logs => [
            ...logs,
            "[EXECUTION ENGINE] ERROR: Step 5 execution failed. Exit code 1.",
            `[FATAL] Database connection to PostgreSQL failed. Port 5432 is blocked.`,
            "[JARVIS] Initiating failure recovery analysis..."
          ]);
          setShowFailureModal(true);
        }

        return nextProgress;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [isExecuting, steps, taskInput]);

  // Simulated Recovery action
  const runRecovery = (option: string) => {
    setShowFailureModal(false);
    setConsoleLogs(prev => [
      ...prev,
      `[JARVIS] Selected: ${option}.`,
      `[JARVIS] Restoring VM state to pre-execution checkpoint...`,
      `[RECOVERY ENGINE] Rollback completed. Status: Clean.`
    ]);
    setIsRollbackDone(true);
    setSteps(steps.map((s, idx) => {
      if (idx >= 4) return { ...s, status: 'pending' };
      return { ...s, status: 'completed' };
    }));
  };

  return (
    <div className="space-y-6">
      
      {/* Search Input Card */}
      <div className="jarvis-panel p-6 rounded-2xl relative overflow-hidden">
        <div className="scanline-overlay"></div>
        <h2 className="text-lg font-semibold font-orbitron tracking-wider text-white mb-4 flex items-center gap-2">
          <Terminal className="w-5 h-5 text-jarvis-neonCyan" />
          Agent Task Input Console
        </h2>

        <div className="space-y-4">
          <div className="flex flex-col md:flex-row gap-4">
            <textarea
              value={taskInput}
              onChange={(e) => setTaskInput(e.target.value)}
              className="flex-1 p-4 rounded-xl jarvis-input min-h-[80px] font-mono text-sm leading-relaxed"
              placeholder="Provide a command for JARVIS in natural language..."
            />
            <div className="flex md:flex-col justify-end gap-2">
              <button
                onClick={startTaskSequence}
                disabled={isExecuting}
                className="py-3 px-6 rounded-xl font-orbitron font-bold tracking-wider text-black bg-jarvis-neonCyan hover:bg-cyan-400 disabled:opacity-50 transition-all shadow-glow-cyan flex items-center justify-center gap-2"
              >
                <Play className="w-4 h-4 fill-current" />
                EXECUTE TASK
              </button>
              
              <button
                onClick={() => {
                  setIsExecuting(false);
                  setProgress(0);
                  setSteps(steps.map(s => ({ ...s, status: 'pending' })));
                  setConsoleLogs([]);
                  setVoiceSynthesized(false);
                }}
                className="py-3 px-4 rounded-xl border border-slate-800 hover:border-slate-600 text-slate-400 hover:text-white transition-all flex items-center justify-center gap-2"
              >
                <RotateCcw className="w-4 h-4" />
                RESET
              </button>
            </div>
          </div>

          <div>
            <span className="text-xs text-slate-400 font-semibold uppercase tracking-wider block mb-2">Simulate Recipes:</span>
            <div className="flex flex-wrap gap-2">
              {sampleCommands.map((sc, i) => (
                <button
                  key={i}
                  onClick={() => setTaskInput(sc.text)}
                  className="px-3 py-1.5 rounded-lg bg-slate-900 border border-slate-800 text-xs text-slate-300 hover:border-jarvis-neonCyan hover:text-white transition-all"
                >
                  {sc.label}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Progress & Live Logs */}
      { (isExecuting || progress > 0) && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          
          {/* Progress widget */}
          <div className="jarvis-panel p-6 rounded-2xl flex flex-col justify-between relative overflow-hidden">
            <div className="scanline-overlay"></div>
            <div>
              <div className="flex justify-between items-center mb-4">
                <span className="text-xs uppercase tracking-widest text-slate-400 font-orbitron">Task Status Monitor</span>
                <span className="flex items-center gap-1.5">
                  <span className={`w-2 h-2 rounded-full inline-block ${isExecuting ? 'bg-jarvis-neonCyan animate-ping' : 'bg-jarvis-neonGreen'}`}></span>
                  <span className="text-xs uppercase tracking-wider font-semibold font-orbitron" style={{ color: isExecuting ? '#00f0ff' : '#00ff66' }}>
                    {isExecuting ? 'Executing' : 'Success'}
                  </span>
                </span>
              </div>

              <div className="space-y-4">
                <div>
                  <div className="flex justify-between text-sm mb-1 font-orbitron">
                    <span className="text-slate-300 font-semibold">Progress</span>
                    <span className="text-white font-bold">{progress}%</span>
                  </div>
                  <div className="w-full bg-slate-900 h-3 rounded-full overflow-hidden border border-slate-800">
                    <div 
                      className="bg-gradient-to-r from-jarvis-neonCyan to-jarvis-neonPurple h-full rounded-full transition-all duration-300 shadow-glow-cyan"
                      style={{ width: `${progress}%` }}
                    ></div>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4 text-xs bg-slate-950/60 p-3 rounded-xl border border-slate-900">
                  <div>
                    <span className="text-slate-500">Current Step:</span>
                    <p className="font-semibold text-white mt-1 truncate">
                      {steps[currentStepIndex]?.description || "Finished"}
                    </p>
                  </div>
                  <div>
                    <span className="text-slate-500">Est. Remaining:</span>
                    <p className="font-semibold text-white mt-1 font-orbitron">
                      {eta} seconds
                    </p>
                  </div>
                </div>

                {voiceSynthesized && (
                  <div className="p-3 bg-jarvis-neonGreen/10 border border-jarvis-neonGreen/20 rounded-xl flex items-center justify-between text-xs">
                    <div className="flex items-center gap-2 text-jarvis-neonGreen">
                      <Volume2 className="w-5 h-5 animate-bounce" />
                      <span className="font-semibold">JARVIS Voice: "Completed Successfully"</span>
                    </div>
                    <span className="px-2 py-0.5 rounded text-[10px] bg-jarvis-neonGreen/20 text-jarvis-neonGreen font-semibold border border-jarvis-neonGreen/30 uppercase">Audio Out</span>
                  </div>
                )}

                {isRollbackDone && (
                  <div className="p-3 bg-jarvis-neonPurple/10 border border-jarvis-neonPurple/20 rounded-xl flex items-center gap-2 text-xs text-jarvis-neonPurple">
                    <ShieldCheck className="w-5 h-5" />
                    <span className="font-semibold">Rollback completed: VM sandbox state restored.</span>
                  </div>
                )}
              </div>
            </div>

            <div className="h-px bg-slate-800 my-4"></div>

            <div>
              <span className="text-xs uppercase tracking-widest text-slate-500 block mb-2 font-orbitron">Active Step Details</span>
              <div className="text-xs text-slate-300 bg-slate-950/80 p-3 rounded-xl border border-slate-900 font-mono space-y-1">
                <div><span className="text-jarvis-neonCyan">Model:</span> {steps[currentStepIndex]?.model}</div>
                <div><span className="text-jarvis-neonCyan">Engine:</span> Orchestration Layer v2.1</div>
                <div><span className="text-jarvis-neonCyan">Sandbox:</span> Linux-VM-Bridge</div>
              </div>
            </div>
          </div>

          {/* Console logs */}
          <div className="jarvis-panel p-6 rounded-2xl lg:col-span-2 relative flex flex-col justify-between overflow-hidden min-h-[300px]">
            <div className="scanline-overlay"></div>
            
            <div className="flex justify-between items-center mb-4">
              <span className="text-xs uppercase tracking-widest text-slate-400 font-orbitron">Execution Console Logs</span>
              <Terminal className="w-4 h-4 text-jarvis-neonCyan" />
            </div>

            <div className="flex-1 bg-slate-950 p-4 rounded-xl border border-slate-900 font-mono text-xs text-slate-300 overflow-y-auto space-y-2 max-h-[220px]">
              {consoleLogs.map((log, i) => (
                <div key={i} className={
                  log.includes('[SYSTEM]') ? 'text-cyan-400 font-semibold' :
                  log.includes('[FATAL]') || log.includes('ERROR') ? 'text-red-400' :
                  log.includes('[JARVIS]') ? 'text-purple-400 font-bold' :
                  'text-slate-300'
                }>
                  {log}
                </div>
              ))}
            </div>

            <div className="mt-4 pt-4 border-t border-slate-800 text-[10px] text-slate-500 flex justify-between">
              <span>Security Guard running validation rules.</span>
              <span>Memory buffer: cached</span>
            </div>
          </div>

        </div>
      )}

      {/* Model Routing Layer representation */}
      <div className="jarvis-panel p-6 rounded-2xl relative overflow-hidden">
        <div className="scanline-overlay"></div>
        <h2 className="text-lg font-semibold font-orbitron tracking-wider text-white mb-6 flex items-center gap-2">
          <Cpu className="w-5 h-5 text-jarvis-neonPurple" />
          Central Model Routing Layer
        </h2>
        
        <p className="text-xs text-slate-400 mb-4">
          JARVIS dynamically routes tasks to specific localized or API models based on cost, context weight, and intent capabilities:
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
          
          <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 flex flex-col justify-between">
            <div>
              <span className="text-xs text-jarvis-neonCyan font-semibold font-orbitron">LLM Core Routing</span>
              <p className="text-xs text-white font-bold mt-2">Gemini 3.5 Pro</p>
            </div>
            <span className="text-[10px] text-slate-500 mt-2 block">Handles complex architectural plans, software development, code generation, and multi-file dependencies.</span>
          </div>

          <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 flex flex-col justify-between">
            <div>
              <span className="text-xs text-jarvis-neonPurple font-semibold font-orbitron">Lighter Intent</span>
              <p className="text-xs text-white font-bold mt-2">Gemini 3.5 Flash</p>
            </div>
            <span className="text-[10px] text-slate-500 mt-2 block">Quick instructions, diagnostics analysis, script conversion, document scanning, and general queries.</span>
          </div>

          <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 flex flex-col justify-between">
            <div>
              <span className="text-xs text-jarvis-neonGreen font-semibold font-orbitron">Vision Model</span>
              <p className="text-xs text-white font-bold mt-2">Gemini 3.5 Flash (Vision)</p>
            </div>
            <span className="text-[10px] text-slate-500 mt-2 block">Processes screenshot validations, website layout analysis, UI/UX checks, and image formatting.</span>
          </div>

          <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 flex flex-col justify-between">
            <div>
              <span className="text-xs text-jarvis-neonAmber font-semibold font-orbitron">Speech-to-Text</span>
              <p className="text-xs text-white font-bold mt-2">Whisper Large v3 (Local)</p>
            </div>
            <span className="text-[10px] text-slate-500 mt-2 block">Transcribes voice commands and continuous meeting feeds with low latency and language detection.</span>
          </div>

          <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 flex flex-col justify-between">
            <div>
              <span className="text-xs text-jarvis-neonRed font-semibold font-orbitron">Diarization Model</span>
              <p className="text-xs text-white font-bold mt-2">PyAnnote / ECAPA-TDNN</p>
            </div>
            <span className="text-[10px] text-slate-500 mt-2 block">Generates real-time acoustic voice embeddings to identify enrolled speaker profiles and handle interjections.</span>
          </div>

        </div>
      </div>

      {/* Approval Confirmation Gate Modal */}
      {showApprovalGate && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="jarvis-panel max-w-lg w-full rounded-2xl p-6 border-jarvis-neonCyan shadow-glow-cyan animate-in fade-in zoom-in duration-200">
            <div className="flex items-center gap-3 text-jarvis-neonCyan mb-4">
              <ShieldAlert className="w-8 h-8" />
              <h3 className="text-lg font-semibold font-orbitron tracking-wider text-white">Founder Confirmation Required</h3>
            </div>
            
            <p className="text-xs text-slate-300 leading-relaxed">
              JARVIS has generated an execution plan for task: <strong className="text-white">"{taskInput}"</strong>.
              This requires executing commands in the Linux VM sandbox environment and pulling internet dependencies.
            </p>

            <div className="my-4 bg-slate-950 p-4 rounded-xl border border-slate-900 text-xs text-slate-400 space-y-2">
              <p className="font-semibold text-white font-orbitron">Plan Steps:</p>
              {steps.map((s, idx) => (
                <div key={s.id} className="flex gap-2">
                  <span className="text-jarvis-neonCyan font-bold">{idx + 1}.</span>
                  <span>{s.description} ({s.model})</span>
                </div>
              ))}
            </div>

            <div className="p-3 bg-cyan-950/40 border border-cyan-800/30 rounded-xl text-[11px] text-cyan-300 flex items-center gap-2">
              <ShieldCheck className="w-5 h-5 shrink-0" />
              <span>Identity Verified: Verified via Founder Hardware Security Key.</span>
            </div>

            <div className="mt-6 flex justify-end gap-3">
              <button 
                onClick={cancelPlan}
                className="py-2.5 px-4 rounded-lg text-xs font-orbitron font-semibold text-slate-400 hover:text-white hover:bg-slate-900 transition-all border border-slate-800"
              >
                DENY ACCESS
              </button>
              <button 
                onClick={approvePlan}
                className="py-2.5 px-5 rounded-lg text-xs font-orbitron font-bold text-black bg-jarvis-neonCyan hover:bg-cyan-400 shadow-glow-cyan transition-all"
              >
                GRANT PERMISSION & EXECUTE
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Failure & Options Modal */}
      {showFailureModal && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="jarvis-panel max-w-2xl w-full rounded-2xl p-6 border-jarvis-neonRed shadow-glow-red animate-in fade-in zoom-in duration-200">
            <div className="flex items-center gap-3 text-jarvis-neonRed mb-4">
              <AlertCircle className="w-8 h-8" />
              <h3 className="text-lg font-semibold font-orbitron tracking-wider text-white">Execution Failed</h3>
            </div>

            <div className="p-4 bg-red-950/20 border border-red-900/30 rounded-xl text-xs space-y-2 mb-6">
              <div><strong className="text-white">Failure Step:</strong> Step 5 - Pull Redis docker image & start container</div>
              <div><strong className="text-white">Root Cause:</strong> Docker daemon failed to bind port 6379 because it is already in use by a host service.</div>
              <div><strong className="text-white">Diagnostics:</strong> `bind: address already in use`.</div>
            </div>

            <h4 className="text-xs uppercase tracking-widest text-slate-400 font-orbitron mb-3 font-semibold">Select Recovery Option:</h4>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              
              <button 
                onClick={() => runRecovery("Option 1 - Fastest: Re-route container port to 6380")}
                className="p-4 rounded-xl bg-slate-900 border border-slate-800 hover:border-jarvis-neonCyan text-left transition-all"
              >
                <span className="text-xs font-bold text-jarvis-neonCyan font-orbitron">Option 1: Fastest Solution</span>
                <p className="text-[11px] text-slate-400 mt-1">Kill running task and start Redis container mapping port to 6380:6379 instead. Zero host interruption.</p>
              </button>

              <button 
                onClick={() => runRecovery("Option 2 - Safest: Stop local process occupying port 6379")}
                className="p-4 rounded-xl bg-slate-900 border border-slate-800 hover:border-jarvis-neonPurple text-left transition-all"
              >
                <span className="text-xs font-bold text-jarvis-neonPurple font-orbitron">Option 2: Safest Solution</span>
                <p className="text-[11px] text-slate-400 mt-1">Locate the host PID using port 6379, gracefully shutdown that service, and restart Docker container.</p>
              </button>

              <button 
                onClick={() => runRecovery("Option 3 - Alternative Method: Run Redis in background virtual Python script")}
                className="p-4 rounded-xl bg-slate-900 border border-slate-800 hover:border-jarvis-neonGreen text-left transition-all"
              >
                <span className="text-xs font-bold text-jarvis-neonGreen font-orbitron">Option 3: Alternative Method</span>
                <p className="text-[11px] text-slate-400 mt-1">Deploy Redis Mock module using a pure Python virtual script, avoiding Docker virtualization entirely.</p>
              </button>

              <button 
                onClick={() => runRecovery("Option 4 - Advanced: Open terminal console for manual binding")}
                className="p-4 rounded-xl bg-slate-900 border border-slate-800 hover:border-jarvis-neonAmber text-left transition-all"
              >
                <span className="text-xs font-bold text-jarvis-neonAmber font-orbitron">Option 4: Advanced Manual Method</span>
                <p className="text-[11px] text-slate-400 mt-1">Spawn a terminal console, elevate SSH permissions, configure custom IP bindings, and review configuration files.</p>
              </button>

            </div>

            <div className="mt-6 flex justify-end">
              <button 
                onClick={() => {
                  setShowFailureModal(false);
                  setIsExecuting(false);
                  setProgress(0);
                }}
                className="py-2 px-4 rounded-lg text-xs border border-slate-800 text-slate-400 hover:text-white"
              >
                Cancel Execution & Rollback
              </button>
            </div>

          </div>
        </div>
      )}

    </div>
  );
}
