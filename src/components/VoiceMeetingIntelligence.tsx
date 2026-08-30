import React, { useState, useEffect } from 'react';
import { 
  Mic, MicOff, Users, Play, Pause, RefreshCw, Volume2, 
  MessageSquare, Brain, HelpCircle, Layers, ArrowRight, ShieldCheck 
} from 'lucide-react';

interface DialogLine {
  speaker: string;
  avatarColor: string;
  time: string;
  text: string;
  detectedLanguage: string;
  actionItem?: string;
}

export default function VoiceMeetingIntelligence() {
  const [isRecording, setIsRecording] = useState(false);
  const [voiceProfile, setVoiceProfile] = useState<'Male' | 'Female' | 'Premium'>('Male');
  const [selectedLanguage, setSelectedLanguage] = useState('Auto-Detect');
  
  // Real-time diarization timeline simulation
  const [meetingTranscript, setMeetingTranscript] = useState<DialogLine[]>([
    { speaker: "Male (User 1 - Founder)", avatarColor: "bg-cyan-500", time: "10:14:02 AM", text: "We need to index the repository in development VM and identify where the memory leaks are happening.", detectedLanguage: "English" },
    { speaker: "Female (User 2 - Lead)", avatarColor: "bg-purple-500", time: "10:14:15 AM", text: "కచ్చితంగా, నేను ఒక టెస్ట్ స్క్రిప్ట్ సిద్ధం చేస్తాను మరియు రిపోర్ట్‌ని జార్విస్‌కు పంపుతాను.", detectedLanguage: "Telugu" }
  ]);

  const [activeInterruptionState, setActiveInterruptionState] = useState<'idle' | 'primary_active' | 'paused_caching' | 'sub_context_active' | 'resumed'>('idle');
  const [diarizationLogs, setDiarizationLogs] = useState<string[]>([]);
  const [currentTranscriptionFeed, setCurrentTranscriptionFeed] = useState("");

  const triggerInterruptionDemo = () => {
    setActiveInterruptionState('primary_active');
    setDiarizationLogs(["[SPEECH-ENGINE] Streaming primary meeting audio feed..."]);
    
    // Step 1: User 1 is speaking
    setTimeout(() => {
      setMeetingTranscript(prev => [
        ...prev,
        { speaker: "Male (User 1 - Founder)", avatarColor: "bg-cyan-500", time: "10:14:30 AM", text: "JARVIS, begin scanning the dev folder and compile the code changes...", detectedLanguage: "English" }
      ]);
      setDiarizationLogs(prev => [...prev, "[DIARIZATION] Speaker shift detected: User 1 (Male Profile ID: M-01) active."]);
    }, 1500);

    // Step 2: Guest interrupts
    setTimeout(() => {
      setActiveInterruptionState('paused_caching');
      setDiarizationLogs(prev => [
        ...prev, 
        "[SPEECH-ENGINE] INTERRUPTING dialogue detected!", 
        "[CONTEXT-MANAGER] CACHING active task context (Scan & Compile code)...",
        "[CONTEXT-MANAGER] Active workflow state saved in short-term Memory."
      ]);
    }, 3500);

    // Step 3: Guest asks questions in sub-context
    setTimeout(() => {
      setActiveInterruptionState('sub_context_active');
      setMeetingTranscript(prev => [
        ...prev,
        { speaker: "Guest (Interrupter)", avatarColor: "bg-amber-500", time: "10:14:38 AM", text: "Is the development virtual environment running on port 8000?", detectedLanguage: "English" }
      ]);
      setDiarizationLogs(prev => [
        ...prev,
        "[DIARIZATION] Unenrolled speaker profile active. Guest ID: G-99.",
        "[ORCHESTRATOR] Spawning isolated sub-context to answer Interrupter.",
        "[JARVIS Voice Response] 'Guest, the virtual environment is running on port 8080. Port 8000 is inactive.'"
      ]);
    }, 6000);

    // Step 4: Resume original task
    setTimeout(() => {
      setActiveInterruptionState('resumed');
      setDiarizationLogs(prev => [
        ...prev,
        "[CONTEXT-MANAGER] Guest idle. Restoring main task context from short-term memory...",
        "[ORCHESTRATOR] Resumed main task execution (Scan & Compile) at previous state (45% complete)."
      ]);
      setMeetingTranscript(prev => [
        ...prev,
        { speaker: "Male (User 1 - Founder)", avatarColor: "bg-cyan-500", time: "10:14:48 AM", text: "...and make sure to commit the fixes after compiling.", detectedLanguage: "English", actionItem: "Compile code fixes and commit changes" }
      ]);
    }, 9000);
  };

  const handleMicToggle = () => {
    setIsRecording(!isRecording);
    if(!isRecording) {
      setCurrentTranscriptionFeed("Listening to microphone audio feed...");
    } else {
      setCurrentTranscriptionFeed("");
    }
  };

  return (
    <div className="space-y-6">
      
      {/* Voice Configuration Card */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Voice Selectors */}
        <div className="jarvis-panel p-6 rounded-2xl relative overflow-hidden flex flex-col justify-between">
          <div className="scanline-overlay"></div>
          <div>
            <h3 className="text-base font-semibold font-orbitron tracking-wider text-white mb-4 flex items-center gap-2">
              <Volume2 className="w-5 h-5 text-jarvis-neonCyan" />
              Voice Selection & TTS
            </h3>

            <div className="space-y-4">
              <div>
                <span className="text-xs text-slate-400 block mb-2">Voice Avatar Profile:</span>
                <div className="grid grid-cols-3 gap-2">
                  {[
                    { id: 'Male', label: 'Male (Base)', desc: 'Standard JARVIS' },
                    { id: 'Female', label: 'Female', desc: 'Standard FRIDAY' },
                    { id: 'Premium', label: 'Premium', desc: 'Custom Voice' }
                  ].map(v => (
                    <button
                      key={v.id}
                      onClick={() => setVoiceProfile(v.id as any)}
                      className={`p-2 rounded-xl text-left border transition-all ${
                        voiceProfile === v.id 
                          ? 'border-jarvis-neonCyan bg-jarvis-neonCyan/10 text-white' 
                          : 'border-slate-800 bg-slate-900/50 text-slate-400 hover:border-slate-700'
                      }`}
                    >
                      <span className="text-xs font-bold font-orbitron block">{v.label}</span>
                      <span className="text-[9px] text-slate-500">{v.desc}</span>
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <span className="text-xs text-slate-400 block mb-2">Language Input Detection:</span>
                <select
                  value={selectedLanguage}
                  onChange={(e) => setSelectedLanguage(e.target.value)}
                  className="w-full p-2.5 rounded-xl bg-slate-950 border border-slate-800 text-xs text-white outline-none focus:border-jarvis-neonCyan"
                >
                  <option>Auto-Detect Language</option>
                  <option>English</option>
                  <option>Telugu (తెలుగు)</option>
                  <option>Hindi (हिन्दी)</option>
                  <option>Tamil (தமிழ்)</option>
                  <option>Kannada (ಕನ್ನಡ)</option>
                </select>
              </div>
            </div>
          </div>

          <div className="mt-6 pt-4 border-t border-slate-800 flex justify-between items-center text-xs">
            <span className="text-slate-500">Multilingual STT model:</span>
            <span className="font-semibold text-jarvis-neonCyan font-orbitron">Active</span>
          </div>
        </div>

        {/* Live Audio Input Visualizer */}
        <div className="jarvis-panel p-6 rounded-2xl relative overflow-hidden flex flex-col justify-between lg:col-span-2">
          <div className="scanline-overlay"></div>
          <div>
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-base font-semibold font-orbitron tracking-wider text-white flex items-center gap-2">
                <Mic className="w-5 h-5 text-jarvis-neonCyan" />
                Live Voice Stream
              </h3>
              {isRecording && (
                <span className="px-2 py-0.5 rounded text-[10px] bg-red-500/20 text-red-300 border border-red-500/30 animate-pulse font-semibold">STREAMING</span>
              )}
            </div>

            <div className="h-24 bg-slate-950/60 rounded-xl border border-slate-900 flex items-center justify-center gap-1.5 p-4 overflow-hidden relative">
              {isRecording ? (
                <>
                  <span className="voice-bar voice-wave-1 h-12"></span>
                  <span className="voice-bar voice-wave-2 h-16"></span>
                  <span className="voice-bar voice-wave-3 h-8"></span>
                  <span className="voice-bar voice-wave-4 h-14"></span>
                  <span className="voice-bar voice-wave-5 h-10"></span>
                  <span className="voice-bar voice-wave-6 h-15"></span>
                  <span className="voice-bar voice-wave-3 h-7"></span>
                  <span className="voice-bar voice-wave-1 h-11"></span>
                  <span className="voice-bar voice-wave-2 h-16"></span>
                  <span className="voice-bar voice-wave-5 h-9"></span>
                  <span className="voice-bar voice-wave-4 h-15"></span>
                  <span className="voice-bar voice-wave-6 h-12"></span>
                </>
              ) : (
                <span className="text-xs text-slate-500 italic">Microphone idle. Click "Start Recording" to test language detection.</span>
              )}
            </div>
            {currentTranscriptionFeed && (
              <p className="text-xs font-mono text-jarvis-neonCyan mt-3 animate-pulse">{currentTranscriptionFeed}</p>
            )}
          </div>

          <div className="mt-4 flex gap-3">
            <button
              onClick={handleMicToggle}
              className={`flex-1 py-2.5 px-4 rounded-xl text-xs font-orbitron font-bold tracking-wider transition-all flex items-center justify-center gap-2 ${
                isRecording 
                  ? 'bg-red-500 hover:bg-red-600 text-white shadow-glow-red border-none' 
                  : 'bg-jarvis-neonCyan hover:bg-cyan-400 text-black shadow-glow-cyan'
              }`}
            >
              {isRecording ? <MicOff className="w-4 h-4" /> : <Mic className="w-4 h-4" />}
              {isRecording ? 'PAUSE STREAM' : 'START RECORDING'}
            </button>
            
            <button
              onClick={() => {
                setIsRecording(true);
                setCurrentTranscriptionFeed("JARVIS, check the database configuration for system variables...");
                setMeetingTranscript(prev => [
                  ...prev,
                  { speaker: "Male (User 1 - Founder)", avatarColor: "bg-cyan-500", time: "10:14:55 AM", text: "JARVIS, check the database configuration for system variables...", detectedLanguage: "English" }
                ]);
              }}
              className="py-2.5 px-4 rounded-xl border border-slate-800 text-slate-400 hover:text-white text-xs font-orbitron"
            >
              Simulate Speak
            </button>
          </div>
        </div>

      </div>

      {/* Live Meeting transcription and Diarization timelines */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Transcript dialogue timeline */}
        <div className="jarvis-panel p-6 rounded-2xl lg:col-span-2 relative flex flex-col justify-between overflow-hidden">
          <div className="scanline-overlay"></div>
          <div>
            <h3 className="text-base font-semibold font-orbitron tracking-wider text-white mb-4 flex items-center gap-2">
              <MessageSquare className="w-5 h-5 text-jarvis-neonPurple" />
              Live Meeting Transcription Feed
            </h3>

            <div className="space-y-4 max-h-[300px] overflow-y-auto pr-2">
              {meetingTranscript.map((line, idx) => (
                <div key={idx} className="p-3 bg-slate-900/60 border border-slate-800 rounded-xl space-y-2">
                  <div className="flex justify-between items-center text-[10px]">
                    <div className="flex items-center gap-1.5 font-semibold text-slate-300">
                      <span className={`w-2.5 h-2.5 rounded-full ${line.avatarColor}`}></span>
                      <span>{line.speaker}</span>
                    </div>
                    <div className="flex gap-2 text-slate-500">
                      <span>{line.time}</span>
                      <span className="text-jarvis-neonCyan bg-slate-950 px-1 rounded">{line.detectedLanguage}</span>
                    </div>
                  </div>
                  <p className="text-xs text-white leading-relaxed">{line.text}</p>
                  
                  {line.actionItem && (
                    <div className="p-2 bg-jarvis-neonPurple/10 border border-jarvis-neonPurple/20 rounded-lg text-[11px] text-purple-300 flex items-center gap-1.5">
                      <Brain className="w-4 h-4 shrink-0 text-jarvis-neonPurple animate-pulse" />
                      <span>Action Item Extracted: <strong className="text-white">{line.actionItem}</strong></span>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          <div className="mt-4 pt-4 border-t border-slate-800 text-[10px] text-slate-500">
            Meeting transcription saves periodically to database index.
          </div>
        </div>

        {/* Diarization & Interruption visualizer */}
        <div className="jarvis-panel p-6 rounded-2xl flex flex-col justify-between relative overflow-hidden">
          <div className="scanline-overlay"></div>
          <div>
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-base font-semibold font-orbitron tracking-wider text-white flex items-center gap-2">
                <Users className="w-5 h-5 text-jarvis-neonPurple" />
                Interruption & Diarization
              </h3>
              
              <button
                onClick={triggerInterruptionDemo}
                className="py-1 px-2.5 rounded text-[10px] bg-jarvis-neonPurple/20 text-jarvis-neonPurple border border-jarvis-neonPurple/30 font-orbitron font-semibold uppercase hover:bg-jarvis-neonPurple/30 transition-all"
              >
                RUN SIMULATION
              </button>
            </div>

            <div className="space-y-4">
              
              {/* Animation of Context States */}
              <div className="space-y-2 text-xs">
                <span className="text-slate-400 block uppercase tracking-wider text-[10px]">Context State Visualizer:</span>
                
                <div className="grid grid-cols-1 gap-2">
                  <div className={`p-2 rounded-lg border text-[11px] transition-all flex items-center justify-between ${
                    activeInterruptionState === 'primary_active' 
                      ? 'border-jarvis-neonCyan bg-jarvis-neonCyan/10 text-white font-bold' 
                      : 'border-slate-800 bg-slate-950 text-slate-500'
                  }`}>
                    <span>1. Active Main Context (Scan Repo)</span>
                    {activeInterruptionState === 'primary_active' && <span className="w-2 h-2 rounded-full bg-jarvis-neonCyan animate-ping"></span>}
                  </div>

                  <div className={`p-2 rounded-lg border text-[11px] transition-all flex items-center justify-between ${
                    activeInterruptionState === 'paused_caching' 
                      ? 'border-jarvis-neonAmber bg-jarvis-neonAmber/10 text-white font-bold' 
                      : 'border-slate-800 bg-slate-950 text-slate-500'
                  }`}>
                    <span>2. Pause & Cache (Save active context)</span>
                    {activeInterruptionState === 'paused_caching' && <span className="w-2 h-2 rounded-full bg-jarvis-neonAmber animate-ping"></span>}
                  </div>

                  <div className={`p-2 rounded-lg border text-[11px] transition-all flex items-center justify-between ${
                    activeInterruptionState === 'sub_context_active' 
                      ? 'border-jarvis-neonPurple bg-jarvis-neonPurple/10 text-white font-bold' 
                      : 'border-slate-800 bg-slate-950 text-slate-500'
                  }`}>
                    <span>3. Isolated Sub-Context (Guest query)</span>
                    {activeInterruptionState === 'sub_context_active' && <span className="w-2 h-2 rounded-full bg-jarvis-neonPurple animate-ping"></span>}
                  </div>

                  <div className={`p-2 rounded-lg border text-[11px] transition-all flex items-center justify-between ${
                    activeInterruptionState === 'resumed' 
                      ? 'border-jarvis-neonGreen bg-jarvis-neonGreen/10 text-white font-bold' 
                      : 'border-slate-800 bg-slate-950 text-slate-500'
                  }`}>
                    <span>4. Restore & Resume Main Task</span>
                    {activeInterruptionState === 'resumed' && <span className="text-jarvis-neonGreen font-semibold">Done</span>}
                  </div>
                </div>
              </div>

              {/* Logs */}
              <div className="h-32 bg-slate-950/80 rounded-xl border border-slate-900 p-3 font-mono text-[10px] text-slate-400 overflow-y-auto space-y-1.5">
                {diarizationLogs.length === 0 ? (
                  <span className="italic text-slate-600 block">Click "RUN SIMULATION" to view live acoustic tracking.</span>
                ) : (
                  diarizationLogs.map((log, i) => (
                    <div key={i} className={
                      log.includes('[CONTEXT-MANAGER]') ? 'text-jarvis-neonAmber' :
                      log.includes('[DIARIZATION]') ? 'text-jarvis-neonPurple' :
                      log.includes('JARVIS Voice') ? 'text-jarvis-neonGreen font-semibold' :
                      'text-slate-400'
                    }>
                      {log}
                    </div>
                  ))
                )}
              </div>

            </div>
          </div>

          <div className="mt-4 pt-4 border-t border-slate-800 text-[10px] text-slate-500 flex justify-between">
            <span>Acoustic model: ECAPA-TDNN</span>
            <span>Latency: ~40ms</span>
          </div>
        </div>

      </div>

    </div>
  );
}
