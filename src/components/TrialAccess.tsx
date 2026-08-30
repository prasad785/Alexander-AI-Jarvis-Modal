import React, { useState, useEffect } from 'react';
import { ShieldCheck, User, GitBranch, Key, Cpu, HelpCircle, Clock } from 'lucide-react';

export default function TrialAccess() {
  const [isAuthenticated, setIsAuthenticated] = useState(true);
  const [authProvider, setAuthProvider] = useState<'Google' | 'GitHub'>('Google');
  const [countdown, setCountdown] = useState(86399); // 24 hours in seconds
  const [usageLimits, setUsageLimits] = useState({
    tasks: 12,
    tasksMax: 20,
    modelCalls: 280,
    modelCallsMax: 500,
    vmMinutes: 45,
    vmMinutesMax: 60
  });

  // Countdown timer simulation
  useEffect(() => {
    const timer = setInterval(() => {
      setCountdown(prev => {
        if (prev <= 0) return 0;
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const formatCountdown = (sec: number) => {
    const hrs = Math.floor(sec / 3600);
    const mins = Math.floor((sec % 3600) / 60);
    const secs = sec % 60;
    return `${hrs.toString().padStart(2, '0')}:${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const handleSignIn = (provider: 'Google' | 'GitHub') => {
    setAuthProvider(provider);
    setIsAuthenticated(true);
    setCountdown(86399);
    setUsageLimits({
      tasks: 0,
      tasksMax: 20,
      modelCalls: 0,
      modelCallsMax: 500,
      vmMinutes: 0,
      vmMinutesMax: 60
    });
  };

  const handleSignOut = () => {
    setIsAuthenticated(false);
  };

  return (
    <div className="space-y-6">
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Trial Status & Timer */}
        <div className="jarvis-panel p-6 rounded-2xl relative overflow-hidden flex flex-col justify-between">
          <div className="scanline-overlay"></div>
          <div>
            <h3 className="text-base font-semibold font-orbitron tracking-wider text-white mb-4 flex items-center gap-2">
              <Clock className="w-5 h-5 text-jarvis-neonCyan" />
              Trial Access Entitlement
            </h3>
            
            {isAuthenticated ? (
              <div className="space-y-4">
                <span className="text-xs text-slate-400">Remaining Trial Period:</span>
                <div className="text-3xl font-bold font-orbitron text-white text-shadow-glow tracking-widest animate-pulse">
                  {formatCountdown(countdown)}
                </div>
                <div className="p-3 bg-cyan-950/40 border border-cyan-800/30 rounded-xl text-[11px] text-cyan-300">
                  Authentication token: <code className="text-white bg-slate-950 px-1 py-0.5 rounded font-mono">jarvis_trial_tkn_81aefd39...</code>
                </div>
              </div>
            ) : (
              <div className="space-y-2">
                <p className="text-xs text-slate-400">Trial has expired or user is logged out.</p>
                <div className="text-xl font-bold font-orbitron text-red-400">00:00:00</div>
              </div>
            )}
          </div>

          <div className="mt-6 pt-4 border-t border-slate-800 flex justify-between items-center text-xs">
            <span className="text-slate-500">Access Entitlement:</span>
            <span className={isAuthenticated ? 'text-jarvis-neonGreen font-semibold' : 'text-red-400 font-semibold'}>
              {isAuthenticated ? '24-Hour Trial Active' : 'Expired'}
            </span>
          </div>
        </div>

        {/* User Identity Sign-in Simulation */}
        <div className="jarvis-panel p-6 rounded-2xl relative overflow-hidden flex flex-col justify-between lg:col-span-2">
          <div className="scanline-overlay"></div>
          <div>
            <h3 className="text-base font-semibold font-orbitron tracking-wider text-white mb-4 flex items-center gap-2">
              <User className="w-5 h-5 text-jarvis-neonPurple" />
              User Profile & Authentication
            </h3>

            {isAuthenticated ? (
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-full bg-slate-800 border border-slate-700 flex items-center justify-center font-bold text-white font-orbitron">
                    JD
                  </div>
                  <div>
                    <h4 className="text-sm font-semibold text-white">John Doe (Trial User)</h4>
                    <p className="text-xs text-slate-500">Authenticated via {authProvider}</p>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="p-3 bg-slate-900 border border-slate-800 rounded-xl text-xs space-y-1">
                    <span className="text-slate-500 font-orbitron block">Assigned Sandbox IP</span>
                    <span className="font-semibold text-white font-mono">192.168.56.10</span>
                  </div>
                  <div className="p-3 bg-slate-900 border border-slate-800 rounded-xl text-xs space-y-1">
                    <span className="text-slate-500 font-orbitron block">Token Tier</span>
                    <span className="font-semibold text-jarvis-neonPurple">Developer Tier Trial</span>
                  </div>
                </div>
              </div>
            ) : (
              <div className="space-y-4">
                <p className="text-xs text-slate-400">
                  JARVIS desktop agent secures your connections. Authentication required to request API allocations:
                </p>

                <div className="flex flex-col sm:flex-row gap-3">
                  <button
                    onClick={() => handleSignIn('Google')}
                    className="flex-1 py-3 px-4 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-700 hover:border-slate-500 text-white font-semibold transition-all flex items-center justify-center gap-2 text-xs"
                  >
                    <User className="w-4 h-4" />
                    Sign in with Google
                  </button>
                  <button
                    onClick={() => handleSignIn('GitHub')}
                    className="flex-1 py-3 px-4 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-700 hover:border-slate-500 text-white font-semibold transition-all flex items-center justify-center gap-2 text-xs"
                  >
                    <GitBranch className="w-4 h-4" />
                    Sign in with GitHub
                  </button>
                </div>
              </div>
            )}
          </div>

          <div className="mt-4 flex justify-end">
            {isAuthenticated && (
              <button
                onClick={handleSignOut}
                className="py-1.5 px-4 rounded-lg border border-slate-800 hover:border-red-500/30 text-xs text-slate-400 hover:text-red-400 transition-all font-semibold"
              >
                Sign Out / Expire Token
              </button>
            )}
          </div>
        </div>

      </div>

      {/* Trial Limits and Allocations */}
      {isAuthenticated && (
        <div className="jarvis-panel p-6 rounded-2xl relative overflow-hidden">
          <div className="scanline-overlay"></div>
          <h3 className="text-base font-semibold font-orbitron tracking-wider text-white mb-6 flex items-center gap-2">
            <Cpu className="w-5 h-5 text-jarvis-neonCyan" />
            Active Subscription Quotas & Limits
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            
            {/* Limit 1: Agent Tasks */}
            <div className="space-y-2">
              <div className="flex justify-between text-xs font-orbitron">
                <span className="text-slate-400">Agent tasks (24h)</span>
                <span className="text-white font-semibold">{usageLimits.tasks} / {usageLimits.tasksMax}</span>
              </div>
              <div className="w-full bg-slate-900 h-2.5 rounded-full overflow-hidden border border-slate-800">
                <div 
                  className="bg-jarvis-neonCyan h-full rounded-full transition-all duration-300"
                  style={{ width: `${(usageLimits.tasks / usageLimits.tasksMax) * 100}%` }}
                ></div>
              </div>
              <span className="text-[10px] text-slate-500 block">Maximum tasks allowed in active sandbox.</span>
            </div>

            {/* Limit 2: API Model Calls */}
            <div className="space-y-2">
              <div className="flex justify-between text-xs font-orbitron">
                <span className="text-slate-400">API Model Calls</span>
                <span className="text-white font-semibold">{usageLimits.modelCalls} / {usageLimits.modelCallsMax}</span>
              </div>
              <div className="w-full bg-slate-900 h-2.5 rounded-full overflow-hidden border border-slate-800">
                <div 
                  className="bg-jarvis-neonPurple h-full rounded-full transition-all duration-300"
                  style={{ width: `${(usageLimits.modelCalls / usageLimits.modelCallsMax) * 100}%` }}
                ></div>
              </div>
              <span className="text-[10px] text-slate-500 block">Total LLM query allocation for code generation.</span>
            </div>

            {/* Limit 3: Linux VM Sandbox Runtime */}
            <div className="space-y-2">
              <div className="flex justify-between text-xs font-orbitron">
                <span className="text-slate-400">VM Sandbox CPU runtime</span>
                <span className="text-white font-semibold">{usageLimits.vmMinutes}m / {usageLimits.vmMinutesMax}m</span>
              </div>
              <div className="w-full bg-slate-900 h-2.5 rounded-full overflow-hidden border border-slate-800">
                <div 
                  className="bg-jarvis-neonGreen h-full rounded-full transition-all duration-300"
                  style={{ width: `${(usageLimits.vmMinutes / usageLimits.vmMinutesMax) * 100}%` }}
                ></div>
              </div>
              <span className="text-[10px] text-slate-500 block">Computational execution limit for scripts inside VM.</span>
            </div>

          </div>

          <div className="mt-6 p-4 rounded-xl bg-slate-900/50 border border-slate-800 text-xs">
            <p className="font-semibold text-white">Upgrade to Pro Tier:</p>
            <p className="text-slate-400 mt-1">
              Remove all execution thresholds, enable persistent Linux environment sandboxes, sync unlimited external resources, and unlock premium custom voice configurations.
            </p>
          </div>
        </div>
      )}

    </div>
  );
}
