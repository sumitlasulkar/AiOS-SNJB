"use client";

import { useState, useRef, useEffect } from "react";
import { UserPlus, Camera, ShieldCheck, Terminal, Cpu, Fingerprint, ScanFace, Activity, Zap } from "lucide-react";
import { motion } from "framer-motion";

export default function AdminRegister() {
  // ==========================================
  // 🔒 LOGIC & STATE (STRICTLY UNTOUCHED)
  // ==========================================
  const [formData, setFormData] = useState({ email: "", password: "", username: "" });
  const [status, setStatus] = useState("INITIALIZING HARDWARE...");
  const [isLoading, setIsLoading] = useState(false);
  
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    navigator.mediaDevices.getUserMedia({ video: true })
      .then((stream) => { 
        if (videoRef.current) videoRef.current.srcObject = stream; 
        setStatus("HARDWARE READY. AWAITING INPUT."); 
      })
      .catch(() => setStatus("❌ CAMERA OFFLINE OR BLOCKED."));
  }, []);

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!videoRef.current || !canvasRef.current) return;

    setIsLoading(true);
    setStatus("📸 CAPTURING BIOMETRIC TOPOGRAPHY...");

    const context = canvasRef.current.getContext("2d");
    if (context) {
      context.drawImage(videoRef.current, 0, 0, 640, 480);
      const base64Image = canvasRef.current.toDataURL("image/jpeg", 0.9).split(",")[1];

      setStatus("☁️ UPLOADING TO SECURE NEURAL NET...");

      try {
        const res = await fetch("/api/admin/register", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ ...formData, imageBase64: base64Image }),
        });

        const data = await res.json();
        if (data.success) {
          setStatus(`✅ AGENT [${formData.username.toUpperCase()}] SUCCESSFULLY ENROLLED!`);
          setFormData({ email: "", password: "", username: "" });
        } else {
          setStatus(`❌ REGISTRATION FAILED: ${data.error}`);
        }
      } catch (error) {
        setStatus("❌ FATAL: SERVER COMMUNICATION BROKEN.");
      }
    }
    setIsLoading(false);
  };

  // ==========================================
  // 🎨 ULTRA-PREMIUM NEON UI (UPGRADED)
  // ==========================================
  return (
    <div className="min-h-screen bg-[#05050a] flex flex-col items-center justify-center p-6 text-white font-mono relative overflow-hidden">
      
      {/* 🌌 Animated Vibrant Background */}
      <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/stardust.png')] opacity-20 pointer-events-none mix-blend-screen"></div>
      
      {/* Massive Neon Glowing Orbs behind the UI */}
      <div className="absolute top-0 left-1/4 w-[600px] h-[600px] bg-fuchsia-600/20 blur-[150px] rounded-full pointer-events-none mix-blend-screen"></div>
      <div className="absolute bottom-0 right-1/4 w-[600px] h-[600px] bg-cyan-600/20 blur-[150px] rounded-full pointer-events-none mix-blend-screen"></div>

      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="w-full max-w-6xl relative z-10"
      >
        
        {/* 🏷️ AiOS ENTERPRISE HEADERS */}
        <div className="text-center mb-10">
          <div className="inline-flex items-center justify-center gap-2 bg-gradient-to-r from-fuchsia-500/10 to-cyan-500/10 border border-fuchsia-500/30 px-5 py-1.5 rounded-full mb-4 shadow-[0_0_20px_rgba(217,70,239,0.2)]">
            <Zap className="w-4 h-4 text-fuchsia-400" />
            <span className="text-[10px] font-black text-transparent bg-clip-text bg-gradient-to-r from-fuchsia-400 to-cyan-400 uppercase tracking-widest">
              AiOS High-Command Auth
            </span>
          </div>
          <h1 className="text-5xl md:text-6xl font-black text-white uppercase tracking-tighter italic drop-shadow-2xl">
            Neural Agent <span className="text-transparent bg-clip-text bg-gradient-to-r from-fuchsia-500 via-purple-500 to-cyan-500">Enrollment</span>
          </h1>
          <p className="text-slate-400 mt-3 text-xs md:text-sm tracking-widest uppercase font-bold">
            Biometric Registration & Access Credential Provisioning
          </p>
        </div>

        {/* 💻 MAIN COMMAND CONSOLE */}
        <div className="bg-white/[0.02] backdrop-blur-3xl border border-white/10 rounded-[2.5rem] shadow-[0_0_80px_rgba(0,0,0,1)] overflow-hidden flex flex-col lg:flex-row relative">
          
          {/* Subtle Inner Border Glow */}
          <div className="absolute inset-0 border border-white/5 rounded-[2.5rem] pointer-events-none"></div>

          {/* ⬅️ LEFT PANEL: ENROLLMENT FORM */}
          <div className="flex-1 p-8 md:p-12 border-b lg:border-b-0 lg:border-r border-white/10 relative z-10 flex flex-col justify-center bg-gradient-to-br from-black/40 to-transparent">
            
            <div className="flex items-center gap-4 mb-8">
              <div className="p-3 bg-gradient-to-br from-fuchsia-500/20 to-purple-500/20 rounded-2xl border border-fuchsia-500/30 shadow-[0_0_20px_rgba(217,70,239,0.2)]">
                <UserPlus className="w-7 h-7 text-fuchsia-400" />
              </div>
              <div>
                <h2 className="text-2xl font-black text-white tracking-widest uppercase">Identity Manifest</h2>
                <p className="text-[10px] text-fuchsia-400 font-bold tracking-[0.2em] uppercase mt-1 flex items-center gap-1">
                  <Terminal className="w-3 h-3" /> Awaiting Secure Input
                </p>
              </div>
            </div>

            <form onSubmit={handleRegister} className="space-y-6">
              
              {/* Alias Input */}
              <div className="space-y-2 group">
                <label className="text-[10px] text-slate-400 font-black tracking-widest uppercase flex items-center gap-2 transition-colors group-focus-within:text-fuchsia-400">
                  <Fingerprint className="w-4 h-4" /> Alias ID
                </label>
                <div className="relative">
                  <input type="text" placeholder="e.g. AGENT_PRATHAM" required 
                    className="w-full p-4 rounded-2xl bg-black/50 border border-white/10 text-white focus:border-fuchsia-500 focus:bg-fuchsia-950/10 outline-none transition-all focus:shadow-[0_0_25px_rgba(217,70,239,0.2)] font-mono text-sm tracking-widest placeholder-slate-700 uppercase"
                    value={formData.username} onChange={e => setFormData({...formData, username: e.target.value})} />
                </div>
              </div>

              {/* Email Input */}
              <div className="space-y-2 group">
                <label className="text-[10px] text-slate-400 font-black tracking-widest uppercase flex items-center gap-2 transition-colors group-focus-within:text-cyan-400">
                  <Activity className="w-4 h-4" /> Secure Comm Link
                </label>
                <div className="relative">
                  <input type="email" placeholder="agent@aios-shield.com" required 
                    className="w-full p-4 rounded-2xl bg-black/50 border border-white/10 text-white focus:border-cyan-500 focus:bg-cyan-950/10 outline-none transition-all focus:shadow-[0_0_25px_rgba(34,211,238,0.2)] font-mono text-sm tracking-widest placeholder-slate-700 uppercase"
                    value={formData.email} onChange={e => setFormData({...formData, email: e.target.value})} />
                </div>
              </div>

              {/* Password Input */}
              <div className="space-y-2 group">
                <label className="text-[10px] text-slate-400 font-black tracking-widest uppercase flex items-center gap-2 transition-colors group-focus-within:text-purple-400">
                  <Cpu className="w-4 h-4" /> Encryption Passkey
                </label>
                <div className="relative">
                  <input type="password" placeholder="••••••••••••" required 
                    className="w-full p-4 rounded-2xl bg-black/50 border border-white/10 text-white focus:border-purple-500 focus:bg-purple-950/10 outline-none transition-all focus:shadow-[0_0_25px_rgba(168,85,247,0.2)] font-mono text-lg tracking-[0.4em] placeholder-slate-700"
                    value={formData.password} onChange={e => setFormData({...formData, password: e.target.value})} />
                </div>
              </div>
              
              {/* Submit Button - Vibrant Gradient */}
              <button type="submit" disabled={isLoading} 
                className="relative w-full mt-8 group active:scale-95 transition-all duration-300 disabled:opacity-50 disabled:active:scale-100">
                <div className="absolute -inset-0.5 bg-gradient-to-r from-fuchsia-600 via-purple-600 to-cyan-600 rounded-2xl blur opacity-70 group-hover:opacity-100 transition duration-500"></div>
                <div className="relative w-full bg-black flex items-center justify-center gap-3 py-4 rounded-2xl font-black tracking-[0.2em] text-white uppercase text-xs border border-white/10">
                  {isLoading ? (
                    <><Activity className="w-5 h-5 animate-spin text-fuchsia-400" /> Processing Neural Data...</>
                  ) : (
                    <><ScanFace className="w-5 h-5 text-cyan-400" /> Initialize Agent</>
                  )}
                </div>
              </button>
            </form>
            
            {/* TERMINAL STATUS BAR */}
            <div className={`mt-8 p-5 bg-black/60 border rounded-2xl font-mono text-xs tracking-widest flex items-start gap-3 transition-all duration-300 ${status.includes('❌') ? 'border-rose-500/50 shadow-[0_0_20px_rgba(244,63,94,0.15)]' : 'border-white/10'}`}>
              <div className={`w-3 h-3 mt-0.5 rounded-full animate-pulse shrink-0 ${status.includes('❌') ? 'bg-rose-500 shadow-[0_0_10px_#f43f5e]' : 'bg-emerald-400 shadow-[0_0_10px_#34d399]'}`}></div>
              <span className={`leading-relaxed ${status.includes('❌') ? 'text-rose-400' : 'text-slate-300'}`}>
                {status}
              </span>
            </div>
          </div>

          {/* ➡️ RIGHT PANEL: BIOMETRIC HUD SCANNER */}
          <div className="w-full lg:w-[500px] p-8 md:p-12 relative z-10 flex flex-col justify-center bg-black/60">
            <div className="flex items-center justify-between mb-6">
              <span className="text-[10px] text-slate-400 font-bold tracking-[0.2em] flex items-center gap-2"><ScanFace className="w-4 h-4 text-fuchsia-500" /> LIVE OPTICAL FEED</span>
              <span className="text-[10px] text-emerald-400 font-black tracking-[0.2em] bg-emerald-500/10 border border-emerald-500/30 px-3 py-1.5 rounded-lg shadow-[0_0_10px_rgba(16,185,129,0.2)]">
                SYS.ONLINE
              </span>
            </div>

            <div className="w-full aspect-[4/3] bg-black border-2 border-white/10 rounded-[2rem] overflow-hidden relative shadow-[0_0_50px_rgba(0,0,0,0.8)] group">
              <video ref={videoRef} autoPlay muted className={`w-full h-full object-cover transform scale-x-[-1] transition-all duration-700 ${isLoading ? 'opacity-50 contrast-150 saturate-200 hue-rotate-[90deg]' : 'opacity-90 group-hover:opacity-100'}`} />
              <canvas ref={canvasRef} width="640" height="480" className="hidden" />
              
              {/* NO SIGNAL STATE */}
              {!videoRef.current && (
                <div className="absolute inset-0 flex flex-col items-center justify-center bg-[#05050a]">
                  <Camera className="text-white/10 mb-4 animate-pulse" size={72} />
                  <span className="text-white/30 font-black tracking-[0.4em] text-sm">AWAITING OPTICS</span>
                </div>
              )}

              {/* 🎯 ULTRA PREMIUM NEON HUD */}
              {/* Vibrant Corner Brackets */}
              <div className="absolute top-6 left-6 w-16 h-16 border-t-4 border-l-4 border-fuchsia-500 rounded-tl-2xl drop-shadow-[0_0_8px_#d946ef]"></div>
              <div className="absolute top-6 right-6 w-16 h-16 border-t-4 border-r-4 border-cyan-500 rounded-tr-2xl drop-shadow-[0_0_8px_#06b6d4]"></div>
              <div className="absolute bottom-6 left-6 w-16 h-16 border-b-4 border-l-4 border-cyan-500 rounded-bl-2xl drop-shadow-[0_0_8px_#06b6d4]"></div>
              <div className="absolute bottom-6 right-6 w-16 h-16 border-b-4 border-r-4 border-fuchsia-500 rounded-br-2xl drop-shadow-[0_0_8px_#d946ef]"></div>
              
              {/* Center Target (Multi-colored) */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-32 border border-white/20 rounded-full flex items-center justify-center pointer-events-none">
                <div className="absolute w-40 h-40 border-2 border-dashed border-fuchsia-500/30 rounded-full animate-[spin_12s_linear_infinite]"></div>
                <div className="absolute w-48 h-48 border border-cyan-500/20 rounded-full animate-[spin_8s_linear_infinite_reverse]"></div>
                <div className="absolute w-2 h-2 bg-white shadow-[0_0_20px_#fff] rounded-full"></div>
              </div>

              {/* Hexagonal Scan Overlay */}
              <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/honeycomb.png')] opacity-10 mix-blend-overlay pointer-events-none"></div>

              {/* Fake Data Metrics (Aesthetic) */}
              <div className="absolute left-4 top-1/2 -translate-y-1/2 flex flex-col gap-2 text-[8px] font-mono text-cyan-400/70 tracking-widest">
                <span>Y_AXIS: 42.9</span>
                <span>PITCH: -1.2</span>
                <span>YAW: 0.08</span>
              </div>

              {/* REC Indicator */}
              <div className="absolute top-8 right-8 flex items-center gap-2 bg-black/60 backdrop-blur-md px-3 py-1.5 rounded-full border border-white/10">
                <div className="w-2.5 h-2.5 rounded-full bg-rose-500 animate-pulse shadow-[0_0_12px_#f43f5e]"></div>
                <span className="text-[9px] font-black text-white tracking-[0.3em]">REC</span>
              </div>

              {/* Scanning Laser (Vibrant Gradient) */}
              {isLoading && (
                <motion.div 
                  initial={{ top: 0 }}
                  animate={{ top: "100%" }}
                  transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
                  className="absolute left-0 w-full h-[4px] bg-gradient-to-r from-transparent via-fuchsia-500 to-transparent shadow-[0_0_40px_#d946ef]"
                />
              )}
            </div>

            <div className="flex justify-between items-center mt-8 px-2">
              <p className="text-[10px] text-slate-500 font-black tracking-[0.4em] uppercase">
                <span className="text-fuchsia-500 mr-2">{"//"}</span>Facial Mapping
              </p>
              <p className={`text-[10px] font-mono tracking-[0.3em] font-bold ${isLoading ? 'text-fuchsia-400 animate-pulse' : 'text-slate-600'}`}>
                {isLoading ? "ANALYZING..." : "STANDBY"}
              </p>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}