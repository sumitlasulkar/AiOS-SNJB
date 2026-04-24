"use client";
import { useEffect, useState } from "react";
import { db } from "@/lib/firebase-client"; 
import { collection, query, orderBy, onSnapshot, limit } from "firebase/firestore";
import { motion, AnimatePresence } from "framer-motion";
import { Activity, ShieldCheck, Terminal, Radio } from "lucide-react";

export default function AdminDashboard() {
  // ==========================================
  // 🔒 STRICTLY UNTOUCHED LOGIC & STATE
  // ==========================================
  const [logs, setLogs] = useState<any[]>([]);

  useEffect(() => {
    const q = collection(db, "security_logs");
    
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const logsArray: any[] = [];
      querySnapshot.forEach((doc) => {
        logsArray.push({ id: doc.id, ...doc.data() });
      });
      setLogs(logsArray);
    }, (error) => {
      console.error("Firebase Snapshot Error:", error); // 🟢 Agar Rules block karenge toh yahan dikhega
    });

    return () => unsubscribe();
  }, []);

  // ==========================================
  // 🎨 AiOS ENTERPRISE UI (UPGRADED)
  // ==========================================
  return (
    <div className="min-h-screen bg-[#05050a] text-cyan-100 p-4 md:p-8 font-mono relative overflow-hidden">
      
      {/* 🌌 Cyberpunk Background & Scanlines */}
      <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-20 pointer-events-none mix-blend-overlay"></div>
      <div className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] bg-cyan-600/20 blur-[150px] rounded-full pointer-events-none"></div>
      <div className="absolute bottom-[-10%] right-[-10%] w-[500px] h-[500px] bg-fuchsia-600/10 blur-[150px] rounded-full pointer-events-none"></div>
      <div className="absolute inset-0 pointer-events-none bg-[linear-gradient(rgba(0,0,0,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] bg-[length:100%_4px,3px_100%] z-50 opacity-20"></div>

      <div className="max-w-7xl mx-auto relative z-10">
        
        {/* 🏷️ SYSTEM HEADER */}
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8 flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-white/10 pb-6"
        >
          <div className="flex items-center gap-5">
            <div className="relative">
              <div className="absolute inset-0 bg-cyan-500 blur-md opacity-40 animate-pulse"></div>
              <div className="w-14 h-14 bg-black/80 border border-cyan-500/50 rounded-2xl flex items-center justify-center relative z-10 shadow-[inset_0_0_15px_rgba(34,211,238,0.3)]">
                <Radio className="w-7 h-7 text-cyan-400" />
              </div>
            </div>
            <div>
              <div className="flex items-center gap-3 mb-1">
                <h1 className="text-3xl font-black tracking-widest uppercase text-white drop-shadow-[0_0_10px_rgba(255,255,255,0.3)]">
                  System <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">Telemetry</span>
                </h1>
                <span className="flex items-center gap-2 bg-emerald-500/10 border border-emerald-500/30 px-2 py-0.5 rounded text-[9px] font-black tracking-widest text-emerald-400 uppercase">
                  <div className="w-1.5 h-1.5 bg-emerald-400 rounded-full animate-ping"></div> Live
                </span>
              </div>
              <p className="text-cyan-500/60 text-xs tracking-[0.2em] uppercase font-bold flex items-center gap-2">
                <Terminal className="w-3 h-3" /> Live network & agent tracking logs.
              </p>
            </div>
          </div>
          
          <div className="bg-black/40 border border-white/5 backdrop-blur-md px-4 py-2 rounded-xl flex items-center gap-3 shadow-lg">
            <ShieldCheck className="w-5 h-5 text-fuchsia-400" />
            <div className="text-right">
              <p className="text-[9px] text-slate-500 uppercase tracking-widest font-bold">Total Intercepts</p>
              <p className="text-sm font-black text-white">{logs.length}</p>
            </div>
          </div>
        </motion.div>

        {/* 💻 MAIN TERMINAL CONSOLE */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.1 }}
          className="bg-black/60 backdrop-blur-2xl border border-white/10 rounded-[2rem] overflow-hidden shadow-[0_0_50px_rgba(0,0,0,0.8)] relative"
        >
          {/* Table Header */}
          <div className="bg-gradient-to-r from-cyan-950/40 via-black/40 to-fuchsia-950/40 p-5 border-b border-white/10 grid grid-cols-12 font-black text-cyan-500/70 text-[10px] tracking-[0.2em] uppercase">
            <div className="col-span-2">Time (SYS)</div>
            <div className="col-span-2">Protocol Action</div>
            <div className="col-span-3">Target / DNS / Hash</div>
            <div className="col-span-5">Network Route (IP ➔ IP)</div>
          </div>
          
          {/* Logs Container */}
          <div className="divide-y divide-white/5 h-[65vh] overflow-y-auto font-mono text-sm custom-scrollbar relative">
            <AnimatePresence>
              {logs.length === 0 ? (
                <motion.div 
                  initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                  className="absolute inset-0 flex flex-col items-center justify-center text-cyan-500/50"
                >
                  <Activity className="w-12 h-12 mb-4 animate-pulse opacity-50" />
                  <p className="tracking-[0.3em] text-xs font-bold uppercase animate-pulse">Awaiting signal from deployed agents...</p>
                </motion.div>
              ) : (
                logs.map((log, index) => (
                  <motion.div 
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.05 }}
                    key={log.id} 
                    className="p-5 grid grid-cols-12 items-center hover:bg-white/[0.02] transition-colors group cursor-crosshair"
                  >
                    {/* Timestamp */}
                    <div className="col-span-2 text-slate-500 text-xs font-bold tracking-wider group-hover:text-cyan-400/70 transition-colors">
                      {new Date(log.timestamp).toLocaleTimeString()}
                    </div>
                    
                    {/* Action Pill (Exactly matching your conditions, just upgraded CSS) */}
                    <div className="col-span-2">
                      <span className={`px-3 py-1 rounded-md text-[9px] font-black tracking-[0.2em] uppercase border shadow-lg
                        ${log.action === 'LOGIN' ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30 shadow-emerald-500/20' : 
                          log.action === 'LOGOUT' ? 'bg-slate-800/50 text-slate-400 border-slate-700 shadow-none' : 
                          log.action === 'NETWORK_BLOCKED' ? 'bg-rose-500/10 text-rose-400 border-rose-500/30 shadow-rose-500/20' : 
                          log.action === 'KILL_PROCESS' ? 'bg-amber-500/10 text-amber-400 border-amber-500/30 shadow-amber-500/20' : 
                          'bg-cyan-500/10 text-cyan-400 border-cyan-500/30 shadow-cyan-500/20'}`}>
                        {log.action}
                      </span>
                    </div>
                    
                    {/* Target / Email */}
                    <div className="col-span-3 pr-4">
                      <div className={`font-bold truncate text-sm tracking-wide ${['NETWORK_BLOCKED', 'KILL_PROCESS'].includes(log.action) ? 'text-rose-400 drop-shadow-[0_0_5px_rgba(244,63,94,0.5)]' : 'text-slate-200 group-hover:text-white transition-colors'}`}>
                        {log.target}
                      </div>
                      {log.agentEmail && (
                        <div className="text-cyan-600/60 text-[9px] tracking-widest mt-1 font-bold uppercase">
                          {log.agentEmail}
                        </div>
                      )}
                    </div>
                    
                    {/* 🟢 EXACT REQUIREMENT: IP -> IP aur Protocol Detail (Logic untouched, pure CSS upgrade) */}
                    <div className="col-span-5 text-slate-400 text-xs truncate flex items-center">
                      {log.reason.includes('Route:') ? (
                        <span className="flex items-center gap-3 bg-black/40 border border-white/5 px-3 py-1.5 rounded-lg w-fit">
                          <span className="text-cyan-400 font-bold drop-shadow-[0_0_5px_rgba(34,211,238,0.5)]">{log.reason.split('|')[0]}</span>
                          <span className="text-slate-600 text-[10px]">{'>>>'}</span>
                          <span className="text-fuchsia-400 font-bold drop-shadow-[0_0_5px_rgba(217,70,239,0.5)]">{log.reason.split('|')[1]}</span>
                        </span>
                      ) : (
                        <span className="text-slate-500 group-hover:text-slate-300 transition-colors">
                          {log.reason}
                        </span>
                      )}
                    </div>
                  </motion.div>
                ))
              )}
            </AnimatePresence>
          </div>
        </motion.div>
      </div>

      {/* Basic custom scrollbar styles injected safely */}
      <style dangerouslySetInnerHTML={{__html: `
        .custom-scrollbar::-webkit-scrollbar { width: 6px; }
        .custom-scrollbar::-webkit-scrollbar-track { background: rgba(0,0,0,0.2); }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: rgba(34,211,238,0.2); border-radius: 10px; }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover { background: rgba(34,211,238,0.5); }
      `}} />
    </div>
  );
}