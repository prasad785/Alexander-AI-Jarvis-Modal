import React, { useState, useEffect } from 'react';
import { 
  Activity, Database, Cpu, HardDrive, Shield, AlertTriangle, 
  Trash2, Copy, FileText, Settings, RefreshCw, Layers, CheckCircle2, AlertOctagon
} from 'lucide-react';
import { 
  AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer, 
  PieChart, Pie, Cell, BarChart, Bar 
} from 'recharts';

export default function Dashboard() {
  const [currentTime, setCurrentTime] = useState(new Date());
  
  // Real-time system performance stats
  const [metrics, setMetrics] = useState({
    cpu: 32,
    ram: 58,
    gpu: 18,
    temp: 45,
    netSpeed: 124.5,
    diskUsed: 712, // GB
    diskTotal: 1024,
  });

  // History for charts
  const [history, setHistory] = useState<{ time: string; cpu: number; ram: number; gpu: number }[]>([]);

  // Simulation updates
  useEffect(() => {
    // Fill historical data initially
    const initHistory = [];
    for (let i = 15; i >= 0; i--) {
      const d = new Date(Date.now() - i * 3000);
      initHistory.push({
        time: d.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' }),
        cpu: Math.floor(Math.random() * 20) + 20,
        ram: Math.floor(Math.random() * 5) + 55,
        gpu: Math.floor(Math.random() * 15) + 10,
      });
    }
    setHistory(initHistory);

    const interval = setInterval(() => {
      setCurrentTime(new Date());
      setMetrics(prev => {
        const nextCpu = Math.max(10, Math.min(99, prev.cpu + (Math.random() * 12 - 6)));
        const nextRam = Math.max(40, Math.min(95, prev.ram + (Math.random() * 4 - 2)));
        const nextGpu = Math.max(5, Math.min(95, prev.gpu + (Math.random() * 10 - 5)));
        const nextTemp = Math.max(35, Math.min(85, 38 + nextCpu * 0.2 + nextGpu * 0.1));
        const nextNet = Math.max(10, Math.min(500, prev.netSpeed + (Math.random() * 40 - 20)));
        
        // Add to history
        setHistory(hist => {
          const newHist = [...hist.slice(1)];
          newHist.push({
            time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' }),
            cpu: Math.round(nextCpu),
            ram: Math.round(nextRam),
            gpu: Math.round(nextGpu),
          });
          return newHist;
        });

        return {
          cpu: Math.round(nextCpu),
          ram: Math.round(nextRam),
          gpu: Math.round(nextGpu),
          temp: Math.round(nextTemp),
          netSpeed: Math.round(nextNet * 10) / 10,
          diskUsed: prev.diskUsed,
          diskTotal: prev.diskTotal,
        };
      });
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  // System score metrics
  const scores = {
    health: 94,
    performance: 88,
    security: 96,
  };

  // Storage breakdown
  const storageData = [
    { name: 'System & OS', value: 180, color: '#3b82f6' },
    { name: 'Source Code', value: 92, color: '#00f0ff' },
    { name: 'Media (Video/Audio)', value: 240, color: '#d946ef' },
    { name: 'Documents & PDFs', value: 85, color: '#10b981' },
    { name: 'Archives (ZIP/RAR)', value: 65, color: '#f59e0b' },
    { name: 'Temp & Cache Files', value: 50, color: '#ef4444' },
  ];

  // Simulated process list
  const [processes, setProcesses] = useState([
    { id: 1042, name: 'chrome.exe', cpu: 12.4, memory: '1.2 GB', type: 'Application', status: 'Running', suspicious: false },
    { id: 2840, name: 'node.exe', cpu: 4.8, memory: '340 MB', type: 'Service', status: 'Running', suspicious: false },
    { id: 4912, name: 'docker-desktop.exe', cpu: 8.2, memory: '2.1 GB', type: 'Application', status: 'Running', suspicious: false },
    { id: 7712, name: 'unrecognized_daemon.exe', cpu: 18.5, memory: '850 MB', type: 'Background Process', status: 'Suspicious Activity', suspicious: true },
    { id: 1844, name: 'teams.exe', cpu: 1.1, memory: '412 MB', type: 'Startup Program', status: 'Idle', suspicious: false },
    { id: 3120, name: 'python_worker.py', cpu: 22.1, memory: '520 MB', type: 'Background Process', status: 'Running', suspicious: false },
    { id: 9110, name: 'spooler.exe', cpu: 0.1, memory: '15 MB', type: 'System Service', status: 'Running', suspicious: false }
  ]);

  const [filterType, setFilterType] = useState('All');
  const [showDuplicates, setShowDuplicates] = useState(false);

  const killProcess = (id: number) => {
    setProcesses(processes.filter(p => p.id !== id));
  };

  const cleanTempFiles = () => {
    alert("JARVIS: Cleaning cache and temporary files. 50 GB storage reclaimed.");
  };

  const optimizeSystem = () => {
    alert("JARVIS: Optimizing background tasks. Reduced RAM usage by 18% and stopped unrecognized daemon processes.");
    setProcesses(processes.filter(p => !p.suspicious));
  };

  return (
    <div className="space-y-6">
      {/* Top Banner with scores */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        
        {/* Health score Dial */}
        <div className="jarvis-panel p-6 rounded-2xl relative overflow-hidden flex flex-col items-center justify-between">
          <div className="scanline-overlay"></div>
          <div className="flex justify-between w-full mb-4">
            <span className="text-xs uppercase tracking-widest text-slate-400 font-orbitron">System Health Score</span>
            <Shield className="w-5 h-5 text-jarvis-neonGreen" />
          </div>
          <div className="relative flex items-center justify-center h-32 w-32">
            {/* SVG circular progress */}
            <svg className="w-full h-full transform -rotate-90">
              <circle cx="64" cy="64" r="50" stroke="#1e293b" strokeWidth="8" fill="transparent" />
              <circle cx="64" cy="64" r="50" stroke="#00ff66" strokeWidth="8" fill="transparent" 
                strokeDasharray={314}
                strokeDashoffset={314 - (314 * scores.health) / 100}
                strokeLinecap="round"
                className="transition-all duration-1000 ease-out"
              />
            </svg>
            <div className="absolute flex flex-col items-center">
              <span className="text-3xl font-bold font-orbitron text-white text-shadow-glow">{scores.health}%</span>
              <span className="text-[10px] uppercase text-jarvis-neonGreen tracking-widest font-semibold mt-1">Excellent</span>
            </div>
          </div>
          <div className="text-xs text-slate-400 text-center mt-4">
            All primary components online. Temperatures optimal at {metrics.temp}°C.
          </div>
        </div>

        {/* Performance Score Dial */}
        <div className="jarvis-panel p-6 rounded-2xl relative overflow-hidden flex flex-col items-center justify-between">
          <div className="scanline-overlay"></div>
          <div className="flex justify-between w-full mb-4">
            <span className="text-xs uppercase tracking-widest text-slate-400 font-orbitron">Performance Index</span>
            <Cpu className="w-5 h-5 text-jarvis-neonCyan" />
          </div>
          <div className="relative flex items-center justify-center h-32 w-32">
            <svg className="w-full h-full transform -rotate-90">
              <circle cx="64" cy="64" r="50" stroke="#1e293b" strokeWidth="8" fill="transparent" />
              <circle cx="64" cy="64" r="50" stroke="#00f0ff" strokeWidth="8" fill="transparent" 
                strokeDasharray={314}
                strokeDashoffset={314 - (314 * scores.performance) / 100}
                strokeLinecap="round"
                className="transition-all duration-1000 ease-out"
              />
            </svg>
            <div className="absolute flex flex-col items-center">
              <span className="text-3xl font-bold font-orbitron text-white text-shadow-glow">{scores.performance}%</span>
              <span className="text-[10px] uppercase text-jarvis-neonCyan tracking-widest font-semibold mt-1">Optimal</span>
            </div>
          </div>
          <div className="text-xs text-slate-400 text-center mt-4">
            CPU: {metrics.cpu}%, RAM: {metrics.ram}%. 1 service requires optimization.
          </div>
        </div>

        {/* Security Score Dial */}
        <div className="jarvis-panel p-6 rounded-2xl relative overflow-hidden flex flex-col items-center justify-between">
          <div className="scanline-overlay"></div>
          <div className="flex justify-between w-full mb-4">
            <span className="text-xs uppercase tracking-widest text-slate-400 font-orbitron">Security Clearance</span>
            <Shield className="w-5 h-5 text-jarvis-neonPurple" />
          </div>
          <div className="relative flex items-center justify-center h-32 w-32">
            <svg className="w-full h-full transform -rotate-90">
              <circle cx="64" cy="64" r="50" stroke="#1e293b" strokeWidth="8" fill="transparent" />
              <circle cx="64" cy="64" r="50" stroke="#d946ef" strokeWidth="8" fill="transparent" 
                strokeDasharray={314}
                strokeDashoffset={314 - (314 * scores.security) / 100}
                strokeLinecap="round"
                className="transition-all duration-1000 ease-out"
              />
            </svg>
            <div className="absolute flex flex-col items-center">
              <span className="text-3xl font-bold font-orbitron text-white text-shadow-glow">{scores.security}%</span>
              <span className="text-[10px] uppercase text-jarvis-neonPurple tracking-widest font-semibold mt-1">Secured</span>
            </div>
          </div>
          <div className="text-xs text-slate-400 text-center mt-4">
            Firewall active. MFA enabled. Founder identity verified.
          </div>
        </div>

      </div>

      {/* Main Charts & Diagnostics */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Real-time system chart */}
        <div className="jarvis-panel p-6 rounded-2xl lg:col-span-2 relative">
          <div className="flex justify-between items-center mb-6">
            <div className="flex items-center gap-2">
              <Activity className="w-5 h-5 text-jarvis-neonCyan animate-pulse" />
              <h2 className="text-lg font-semibold font-orbitron tracking-wider text-white">System Diagnostics (Live)</h2>
            </div>
            <div className="flex items-center gap-3 text-xs">
              <span className="flex items-center gap-1"><span className="w-2.5 h-2.5 rounded-full bg-jarvis-neonCyan inline-block glow-dot"></span> CPU</span>
              <span className="flex items-center gap-1"><span className="w-2.5 h-2.5 rounded-full bg-slate-400 inline-block"></span> RAM</span>
              <span className="flex items-center gap-1"><span className="w-2.5 h-2.5 rounded-full bg-jarvis-neonPurple inline-block glow-dot"></span> GPU</span>
            </div>
          </div>
          
          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={history} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorCpu" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#00f0ff" stopOpacity={0.2}/>
                    <stop offset="95%" stopColor="#00f0ff" stopOpacity={0}/>
                  </linearGradient>
                  <linearGradient id="colorGpu" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#d946ef" stopOpacity={0.2}/>
                    <stop offset="95%" stopColor="#d946ef" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <XAxis dataKey="time" stroke="#475569" tick={{ fontSize: 9 }} />
                <YAxis stroke="#475569" domain={[0, 100]} tick={{ fontSize: 10 }} />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#0b1329', border: '1px solid rgba(0,240,255,0.3)', borderRadius: '8px' }}
                  labelStyle={{ color: '#94a3b8' }}
                  itemStyle={{ color: '#fff' }}
                />
                <Area type="monotone" dataKey="cpu" stroke="#00f0ff" strokeWidth={2} fillOpacity={1} fill="url(#colorCpu)" />
                <Area type="monotone" dataKey="gpu" stroke="#d946ef" strokeWidth={2} fillOpacity={1} fill="url(#colorGpu)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-6 pt-4 border-t border-slate-800 text-center">
            <div>
              <p className="text-xs text-slate-400">CPU Clock Temp</p>
              <p className="text-xl font-orbitron font-semibold text-white mt-1">{metrics.temp}°C</p>
            </div>
            <div>
              <p className="text-xs text-slate-400">Memory Consumed</p>
              <p className="text-xl font-orbitron font-semibold text-white mt-1">{(metrics.ram * 16 / 100).toFixed(1)} / 16 GB</p>
            </div>
            <div>
              <p className="text-xs text-slate-400">Network Usage</p>
              <p className="text-xl font-orbitron font-semibold text-white mt-1">{metrics.netSpeed} Mbps</p>
            </div>
            <div>
              <p className="text-xs text-slate-400">Available Storage</p>
              <p className="text-xl font-orbitron font-semibold text-white mt-1">{metrics.diskTotal - metrics.diskUsed} GB</p>
            </div>
          </div>
        </div>

        {/* Live System Alerts */}
        <div className="jarvis-panel p-6 rounded-2xl flex flex-col justify-between">
          <div>
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-base font-semibold font-orbitron tracking-wider text-white flex items-center gap-2">
                <AlertTriangle className="w-5 h-5 text-jarvis-neonAmber" />
                Alerts & Actions
              </h2>
              <span className="px-2 py-0.5 rounded text-[10px] bg-amber-500/20 text-amber-300 border border-amber-500/30">Action Required</span>
            </div>

            <div className="space-y-4">
              
              {/* Alert 1 */}
              <div className="p-3 bg-red-500/10 border border-red-500/20 rounded-lg flex items-start gap-3">
                <AlertOctagon className="w-5 h-5 text-jarvis-neonRed shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-xs font-semibold text-white">Suspicious Process Found</h4>
                  <p className="text-[11px] text-slate-400 mt-0.5">"unrecognized_daemon.exe" is active and consuming high RAM/CPU resources.</p>
                </div>
              </div>

              {/* Alert 2 */}
              <div className="p-3 bg-amber-500/10 border border-amber-500/20 rounded-lg flex items-start gap-3">
                <AlertTriangle className="w-5 h-5 text-jarvis-neonAmber shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-xs font-semibold text-white">Cache and Temp Logs Accumulating</h4>
                  <p className="text-[11px] text-slate-400 mt-0.5">50 GB of temporary system cache and duplicate media files detected.</p>
                </div>
              </div>

              {/* Alert 3 */}
              <div className="p-3 bg-slate-800/40 border border-slate-700/30 rounded-lg flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-jarvis-neonGreen shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-xs font-semibold text-white">Founder Authentication Intact</h4>
                  <p className="text-[11px] text-slate-400 mt-0.5">Secure device keys loaded correctly. Biometric MFA validated.</p>
                </div>
              </div>

            </div>
          </div>

          <div className="mt-6 flex gap-3">
            <button 
              onClick={optimizeSystem}
              className="flex-1 py-2 px-3 rounded-lg text-xs font-orbitron tracking-wider text-black bg-jarvis-neonCyan hover:bg-cyan-400 transition-colors shadow-glow-cyan font-bold"
            >
              OPTIMIZE NOW
            </button>
            <button 
              onClick={cleanTempFiles}
              className="py-2 px-3 rounded-lg text-xs font-orbitron tracking-wider border border-slate-700 hover:border-slate-500 text-slate-300 hover:text-white transition-colors"
            >
              CLEAN TEMP
            </button>
          </div>
        </div>

      </div>

      {/* Storage Breakdown & Long Unused Files */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        
        {/* Storage analyzer */}
        <div className="jarvis-panel p-6 rounded-2xl relative">
          <h3 className="text-base font-semibold font-orbitron tracking-wider text-white mb-6 flex items-center gap-2">
            <Database className="w-5 h-5 text-jarvis-neonCyan" />
            Storage Analysis Report
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-center">
            
            {/* Recharts Pie Chart */}
            <div className="h-48 relative flex items-center justify-center">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={storageData}
                    cx="50%"
                    cy="50%"
                    innerRadius={50}
                    outerRadius={70}
                    paddingAngle={4}
                    dataKey="value"
                  >
                    {storageData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                </PieChart>
              </ResponsiveContainer>
              <div className="absolute flex flex-col items-center">
                <span className="text-xl font-bold font-orbitron text-white">712 GB</span>
                <span className="text-[10px] text-slate-400 uppercase tracking-widest">Occupied</span>
              </div>
            </div>

            {/* Storage details */}
            <div className="space-y-2">
              {storageData.map((category) => (
                <div key={category.name} className="flex justify-between items-center text-xs">
                  <div className="flex items-center gap-2 text-slate-300">
                    <span className="w-2.5 h-2.5 rounded-sm inline-block" style={{ backgroundColor: category.color }}></span>
                    <span>{category.name}</span>
                  </div>
                  <span className="font-semibold text-white font-orbitron">{category.value} GB</span>
                </div>
              ))}
              <div className="h-px bg-slate-800 my-2"></div>
              <div className="flex justify-between items-center text-xs font-semibold text-slate-400">
                <span>Free Space</span>
                <span className="text-jarvis-neonGreen font-orbitron">312 GB</span>
              </div>
            </div>

          </div>

          <div className="mt-6 p-4 rounded-xl bg-slate-900/50 border border-slate-800 text-xs">
            <p className="font-semibold text-white">JARVIS Analysis Recommendation:</p>
            <ul className="list-disc list-inside text-slate-400 space-y-1 mt-2">
              <li>Reclaim <strong className="text-white">50 GB</strong> of Temporary Logs and Duplicate downloads safely.</li>
              <li>Source Code repositories in <code className="text-jarvis-neonCyan bg-slate-950 px-1 py-0.5 rounded">C:/Dev/</code> haven't been accessed in 120+ days. Recommended for archival.</li>
              <li>Backup target: <strong className="text-white">12 GB of essential Documents</strong> should be synced to Google Drive / OneDrive.</li>
            </ul>
          </div>
        </div>

        {/* Running Services and Processes */}
        <div className="jarvis-panel p-6 rounded-2xl flex flex-col justify-between">
          <div>
            <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-3 mb-6">
              <h3 className="text-base font-semibold font-orbitron tracking-wider text-white flex items-center gap-2">
                <Layers className="w-5 h-5 text-jarvis-neonPurple" />
                Active Processes & Services
              </h3>
              
              <div className="flex gap-1 text-[11px]">
                {['All', 'Application', 'Service', 'Suspicious'].map((type) => (
                  <button
                    key={type}
                    onClick={() => setFilterType(type)}
                    className={`px-2 py-0.5 rounded transition-colors ${
                      filterType === type 
                        ? 'bg-jarvis-neonPurple/20 text-jarvis-neonPurple border border-jarvis-neonPurple/30' 
                        : 'text-slate-400 hover:text-white border border-transparent'
                    }`}
                  >
                    {type}
                  </button>
                ))}
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs text-slate-300">
                <thead>
                  <tr className="border-b border-slate-800 text-slate-400 uppercase tracking-widest text-[10px]">
                    <th className="pb-2 font-medium">PID</th>
                    <th className="pb-2 font-medium">Process Name</th>
                    <th className="pb-2 font-medium">Type</th>
                    <th className="pb-2 font-medium text-right">CPU</th>
                    <th className="pb-2 font-medium text-right">Memory</th>
                    <th className="pb-2 font-medium text-center">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/50">
                  {processes
                    .filter(p => {
                      if (filterType === 'All') return true;
                      if (filterType === 'Suspicious') return p.suspicious;
                      return p.type === filterType;
                    })
                    .map((proc) => (
                      <tr key={proc.id} className={`hover:bg-slate-900/40 transition-colors ${proc.suspicious ? 'bg-red-500/5' : ''}`}>
                        <td className="py-2 text-slate-500 font-orbitron">{proc.id}</td>
                        <td className="py-2 font-semibold text-white">
                          <span className="flex items-center gap-1.5">
                            {proc.name}
                            {proc.suspicious && (
                              <span className="w-1.5 h-1.5 rounded-full bg-red-500 inline-block animate-ping"></span>
                            )}
                          </span>
                        </td>
                        <td className="py-2 text-slate-400">{proc.type}</td>
                        <td className="py-2 text-right font-orbitron text-slate-200">{proc.cpu}%</td>
                        <td className="py-2 text-right font-orbitron text-slate-200">{proc.memory}</td>
                        <td className="py-2 text-center">
                          <button
                            onClick={() => killProcess(proc.id)}
                            className="p-1 rounded text-red-400 hover:bg-red-500/20 hover:text-red-300 transition-colors"
                            title="Kill Process"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </td>
                      </tr>
                    ))}
                </tbody>
              </table>
            </div>
          </div>

          <div className="mt-4 pt-4 border-t border-slate-800 text-[10px] text-slate-500 flex justify-between">
            <span>Total Tasks: {processes.length} running</span>
            <span>Security scan active (updated every 3s)</span>
          </div>
        </div>

      </div>
    </div>
  );
}
