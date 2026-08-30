import React, { useState } from 'react';
import { Shield, ShieldAlert, Key, HardDrive, Cpu, Radio, ListFilter, UserCheck } from 'lucide-react';

interface AuditLog {
  timestamp: string;
  actor: string;
  action: string;
  status: 'Approved' | 'Blocked' | 'Warning';
  details: string;
}

export default function FounderSecurity() {
  const [role, setRole] = useState<'Founder' | 'Developer' | 'Guest'>('Founder');
  
  // Simulated audit logs
  const [logs, setLogs] = useState<AuditLog[]>([
    { timestamp: "11:24:02 AM", actor: "Founder Profile", action: "Hardware Key Signature Validated", status: 'Approved', details: "YubiKey 5C NFC signature validated for session elevation." },
    { timestamp: "11:28:15 AM", actor: "JARVIS Core", action: "Write Access to C:/Windows/", status: 'Blocked', details: "Write access blocked: directory protection policy active." },
    { timestamp: "11:32:44 AM", actor: "Developer Profile", action: "Sudo execution inside Linux VM", status: 'Approved', details: "Command: 'sudo apt install -y python3-pip' authorized by RBAC." },
    { timestamp: "11:34:01 AM", actor: "Guest Profile", action: "Request to read credentials vault", status: 'Blocked', details: "Unenrolled identity blocked from reading secrets keys." }
  ]);

  const [mfaStatus, setMfaStatus] = useState(true);

  return (
    <div className="space-y-6">
      
      {/* Security Status Panel */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        
        {/* Passkey authentication */}
        <div className="jarvis-panel p-6 rounded-2xl relative overflow-hidden flex flex-col justify-between">
          <div className="scanline-overlay"></div>
          <div className="flex justify-between items-center mb-4">
            <span className="text-xs uppercase tracking-widest text-slate-400 font-orbitron">Hardware Security</span>
            <Key className="w-5 h-5 text-jarvis-neonCyan" />
          </div>
          <div>
            <span className="text-2xl font-bold font-orbitron text-white text-shadow-glow">PASSKEY</span>
            <p className="text-[10px] text-slate-400 mt-2">Verified via biometrics & FIDO2 token.</p>
          </div>
          <div className="mt-4 pt-4 border-t border-slate-800 text-[10px] text-slate-400 flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-jarvis-neonGreen inline-block animate-pulse"></span>
            <span>Device Binding: Active</span>
          </div>
        </div>

        {/* MFA Key */}
        <div className="jarvis-panel p-6 rounded-2xl relative overflow-hidden flex flex-col justify-between">
          <div className="scanline-overlay"></div>
          <div className="flex justify-between items-center mb-4">
            <span className="text-xs uppercase tracking-widest text-slate-400 font-orbitron">MFA Clearance</span>
            <Shield className="w-5 h-5 text-jarvis-neonPurple" />
          </div>
          <div>
            <span className="text-2xl font-bold font-orbitron text-white text-shadow-glow">MFA ACTIVE</span>
            <p className="text-[10px] text-slate-400 mt-2">Biometrics validation loop active.</p>
          </div>
          <div className="mt-4 pt-4 border-t border-slate-800 text-[10px] text-slate-400 flex items-center justify-between">
            <span>Authentication status</span>
            <span className="font-semibold text-jarvis-neonGreen">Clear</span>
          </div>
        </div>

        {/* Credentials Vault */}
        <div className="jarvis-panel p-6 rounded-2xl relative overflow-hidden flex flex-col justify-between">
          <div className="scanline-overlay"></div>
          <div className="flex justify-between items-center mb-4">
            <span className="text-xs uppercase tracking-widest text-slate-400 font-orbitron">Encrypted Vault</span>
            <HardDrive className="w-5 h-5 text-jarvis-neonGreen" />
          </div>
          <div>
            <span className="text-2xl font-bold font-orbitron text-white text-shadow-glow">AES-256 GCM</span>
            <p className="text-[10px] text-slate-400 mt-2">Credentials stored in encrypted system vault.</p>
          </div>
          <div className="mt-4 pt-4 border-t border-slate-800 text-[10px] text-slate-400 flex items-center justify-between">
            <span>Secrets Rotated</span>
            <span className="text-jarvis-neonCyan font-orbitron font-semibold">12h ago</span>
          </div>
        </div>

        {/* Security Clearance level */}
        <div className="jarvis-panel p-6 rounded-2xl relative overflow-hidden flex flex-col justify-between">
          <div className="scanline-overlay"></div>
          <div className="flex justify-between items-center mb-4">
            <span className="text-xs uppercase tracking-widest text-slate-400 font-orbitron">Clearance Level</span>
            <Radio className="w-5 h-5 text-jarvis-neonRed animate-pulse" />
          </div>
          <div>
            <span className="text-2xl font-bold font-orbitron text-white text-shadow-glow">{role.toUpperCase()}</span>
            <p className="text-[10px] text-slate-400 mt-2">Highest level authority account active.</p>
          </div>
          <div className="mt-4 pt-4 border-t border-slate-800 text-[10px] text-slate-400 flex items-center justify-between">
            <span>System Access</span>
            <span className="text-jarvis-neonRed font-semibold">Full Privileges</span>
          </div>
        </div>

      </div>

      {/* Access Settings & Audit Log */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Role configuration and settings */}
        <div className="jarvis-panel p-6 rounded-2xl relative overflow-hidden flex flex-col justify-between">
          <div className="scanline-overlay"></div>
          <div>
            <h3 className="text-base font-semibold font-orbitron tracking-wider text-white mb-4 flex items-center gap-2">
              <UserCheck className="w-5 h-5 text-jarvis-neonCyan" />
              Access Control Gateway
            </h3>

            <p className="text-xs text-slate-400 mb-4">
              Toggle roles to simulate JARVIS's command validations based on Role-Based Access Control (RBAC):
            </p>

            <div className="space-y-3">
              {[
                { id: 'Founder', label: 'Founder Profile (Owner)', desc: 'Full privileges. Permanent authority. Authentication required.' },
                { id: 'Developer', label: 'Developer Profile', desc: 'Can run dev tools and scripts in VM. No credentials read access.' },
                { id: 'Guest', label: 'Guest Profile', desc: 'Read-only dashboard. All VM terminal commands blocked by default.' }
              ].map(r => (
                <button
                  key={r.id}
                  onClick={() => setRole(r.id as any)}
                  className={`w-full p-3 rounded-xl border text-left transition-all ${
                    role === r.id 
                      ? 'border-jarvis-neonCyan bg-jarvis-neonCyan/10' 
                      : 'border-slate-800 bg-slate-900/50 hover:border-slate-700'
                  }`}
                >
                  <span className={`text-xs font-bold font-orbitron block ${role === r.id ? 'text-jarvis-neonCyan' : 'text-white'}`}>{r.label}</span>
                  <span className="text-[10px] text-slate-500 mt-1 block">{r.desc}</span>
                </button>
              ))}
            </div>
          </div>

          <div className="mt-6 pt-4 border-t border-slate-800">
            <span className="text-xs text-slate-500">Security Rule: API Keys/Founder secrets are never stored in plain text configuration files.</span>
          </div>
        </div>

        {/* Security Audit Console Log */}
        <div className="jarvis-panel p-6 rounded-2xl lg:col-span-2 relative overflow-hidden flex flex-col justify-between min-h-[350px]">
          <div className="scanline-overlay"></div>
          
          <div className="flex justify-between items-center mb-4">
            <div className="flex items-center gap-2">
              <ShieldAlert className="w-5 h-5 text-jarvis-neonRed animate-pulse" />
              <h3 className="text-base font-semibold font-orbitron tracking-wider text-white">Security Audit Log Console</h3>
            </div>
            <span className="px-2 py-0.5 rounded text-[10px] bg-red-500/20 text-red-300 border border-red-500/30 font-orbitron">SEC-AUDIT ACTIVE</span>
          </div>

          {/* Terminal-like log table */}
          <div className="flex-1 bg-slate-950 p-4 rounded-xl border border-slate-900 font-mono text-xs overflow-y-auto space-y-3 max-h-[220px]">
            {logs.map((log, index) => (
              <div key={index} className="space-y-1">
                <div className="flex justify-between items-center text-[10px]">
                  <span className="text-slate-500">{log.timestamp} - {log.actor}</span>
                  <span className={`px-1.5 py-0.2 rounded font-semibold ${
                    log.status === 'Approved' ? 'bg-green-500/20 text-green-400' :
                    log.status === 'Blocked' ? 'bg-red-500/20 text-red-400 animate-pulse' :
                    'bg-amber-500/20 text-amber-400'
                  }`}>
                    {log.status}
                  </span>
                </div>
                <div className="text-white text-xs font-semibold">{log.action}</div>
                <div className="text-[11px] text-slate-400 pl-2 border-l border-slate-800">{log.details}</div>
              </div>
            ))}
          </div>

          <div className="mt-4 pt-4 border-t border-slate-800 text-[10px] text-slate-500 flex justify-between">
            <span>Identity verification audits run continuously.</span>
            <span>MFA validation signature: verified</span>
          </div>
        </div>

      </div>

    </div>
  );
}
