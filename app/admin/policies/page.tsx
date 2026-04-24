"use client";
import { useState, useEffect } from "react";
import { db } from "@/lib/firebase-client";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { motion, AnimatePresence } from "framer-motion";
import { ShieldBan, Terminal, Activity, Zap, ServerCog, Globe, Trash2 } from "lucide-react";

export default function PolicyManager() {
  // ==========================================
  // 🔒 STRICTLY UNTOUCHED LOGIC & STATE
  // ==========================================
  const [websites, setWebsites] = useState<string[]>([]);
  const [newSite, setNewSite] = useState("");
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    const fetchPolicies = async () => {
      const docRef = doc(db, "system_config", "blocklists");
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        setWebsites(docSnap.data().websites || []);
      }
    };
    fetchPolicies();
  }, []);

  const handleSave = async (updatedList: string[]) => {
    setIsSaving(true);
    try {
      await setDoc(doc(db, "system_config", "blocklists"), {
        websites: updatedList
      }, { merge: true });
      setWebsites(updatedList);
      setNewSite("");
    } catch (err) {
      console.error("Failed to save policies");
    }
    setIsSaving(false);
  };

  const addWebsite = () => {
    if (!newSite) return;
    const cleanSite = newSite.toLowerCase().trim().replace(/^https?:\/\//, '');
    if (!websites.includes(cleanSite)) {
      handleSave([...websites, cleanSite]);
    }
  };

  const removeWebsite = (siteToRemove: string) => {
    handleSave(websites.filter(site => site !== siteToRemove));
  };

  // ==========================================
  // 🎨 AiOS ENTERPRISE UI (UPGRADED)
  // ==========================================
  return (
    <div className="min-h-screen bg-[#05050a] text-cyan-100 p-4 md:p-8 font-mono relative overflow-hidden flex flex-col items-center">
      
      {/* 🌌 Cyberpunk / Admin Background */}
      <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-20 pointer-events-none mix-blend-overlay"></div>
      <div className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] bg-amber-600/10 blur-[150px] rounded-full pointer-events-none"></div>
      <div className="absolute bottom-[-10%] right-[-10%] w-[500px] h-[500px] bg-purple-600/10 blur-[150px] rounded-full pointer-events-none"></div>

      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="relative z-10 w-full max-w-5xl"
      >
        
        {/* 🏷️ HEADER SECTION */}
        <div className="flex flex-col items-center justify-center mb-10 text-center">
          <div className="inline-flex items-center gap-2 bg-amber-500/10 border border-amber-500/30 px-4 py-1.5 rounded-full mb-4 shadow-[0_0_20px_rgba(245,158,11,0.2)]">
            <ServerCog className="w-4 h-4 text-amber-500 animate-spin-slow" />
            <span className="text-[10px] font-black text-amber-400 uppercase tracking-widest">Global Policy Sync: Active</span>
          </div>
          
          <h1 className="text-4xl md:text-5xl font-black text-white uppercase tracking-tighter italic drop-shadow-xl mb-3 flex items-center gap-4">
            Network <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 via-orange-500 to-rose-500">Defense Policies</span>
          </h1>
          <p className="text-slate-400 text-sm tracking-widest uppercase font-bold flex items-center justify-center gap-2">
            <Terminal className="w-4 h-4" /> Manage Zero-Trust Rules & Restrictions
          </p>
        </div>

        {/* 💻 MAIN POLICY CONSOLE */}
        <div className="bg-black/60 backdrop-blur-2xl border border-white/10 rounded-[2rem] shadow-[0_0_80px_rgba(0,0,0,0.8)] relative overflow-hidden">
          
          <div className="absolute inset-0 border border-amber-500/10 rounded-[2rem] pointer-events-none"></div>

          {/* Console Header */}
          <div className="bg-gradient-to-r from-amber-950/40 via-black to-rose-950/40 p-6 border-b border-white/10 flex items-center justify-between">
            <h2 className="text-sm font-black text-amber-500 tracking-[0.2em] uppercase flex items-center gap-3">
              <div className="w-2.5 h-2.5 bg-amber-400 shadow-[0_0_10px_#f59e0b] rounded-full animate-pulse"></div>
              Target Blacklist Rules
            </h2>
            <div className="text-[10px] text-slate-500 font-black tracking-widest uppercase bg-black/50 px-3 py-1.5 rounded-lg border border-white/5">
              Live Fleet Enforcement
            </div>
          </div>
          
          <div className="p-8">
            {/* Input Section */}
            <div className="flex flex-col md:flex-row gap-4 mb-8">
              <div className="relative flex-1 group">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <Globe className="w-5 h-5 text-slate-500 group-focus-within:text-cyan-400 transition-colors" />
                </div>
                <input 
                  type="text" 
                  value={newSite}
                  onChange={(e) => setNewSite(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && addWebsite()}
                  placeholder="TARGET URL (E.G., TORRENTZ.EU)"
                  className="w-full bg-black/50 border border-slate-700 rounded-xl pl-12 pr-6 py-4 text-white font-black tracking-widest uppercase outline-none focus:border-cyan-500 focus:bg-cyan-950/20 focus:shadow-[0_0_20px_rgba(34,211,238,0.2)] transition-all placeholder-slate-600"
                />
              </div>
              
              <button 
                onClick={addWebsite}
                disabled={isSaving}
                className="bg-gradient-to-r from-rose-600 to-red-600 hover:from-rose-500 hover:to-red-500 text-white border border-rose-400/50 px-10 py-4 rounded-xl font-black tracking-widest uppercase transition-all duration-300 shadow-[0_0_20px_rgba(225,29,72,0.3)] active:scale-95 disabled:opacity-50 disabled:active:scale-100 flex items-center justify-center gap-2 group"
              >
                {isSaving ? (
                  <><Activity className="w-5 h-5 animate-spin text-white" /> Syncing...</>
                ) : (
                  <><Zap className="w-5 h-5 group-hover:scale-125 transition-transform" /> Deploy Ban</>
                )}
              </button>
            </div>

            {/* Blocked Sites List */}
            <div className="bg-[#020617] border border-white/5 rounded-2xl p-6 h-[400px] overflow-y-auto custom-scrollbar relative">
              
              <AnimatePresence>
                {websites.length === 0 ? (
                  <motion.div 
                    initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                    className="absolute inset-0 flex flex-col items-center justify-center text-slate-600"
                  >
                    <ShieldBan className="w-16 h-16 mb-4 opacity-50" />
                    <p className="font-black tracking-[0.3em] uppercase">ALL SYSTEMS CLEAR. NO BANS ACTIVE.</p>
                  </motion.div>
                ) : (
                  websites.map((site) => (
                    <motion.div 
                      key={site} 
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: 20, scale: 0.9 }}
                      className="flex justify-between items-center bg-black/60 border border-rose-500/20 p-4 rounded-xl mb-3 group hover:border-rose-500/60 hover:shadow-[0_0_20px_rgba(244,63,94,0.15)] transition-all duration-300"
                    >
                      <span className="text-white font-black tracking-[0.2em] text-sm md:text-base flex items-center">
                        <span className="bg-rose-500/10 p-2 rounded-lg mr-4 border border-rose-500/20 text-rose-500 shadow-[0_0_10px_rgba(244,63,94,0.3)]">
                          <ShieldBan className="w-5 h-5" />
                        </span> 
                        {site}
                      </span>
                      
                      <button 
                        onClick={() => removeWebsite(site)}
                        className="text-rose-400 hover:text-white bg-rose-500/10 hover:bg-rose-600 border border-rose-500/30 px-5 py-2 rounded-lg font-black tracking-widest transition-all duration-300 active:scale-90 flex items-center gap-2"
                      >
                        <Trash2 className="w-4 h-4" /> <span className="hidden md:inline">Revoke</span>
                      </button>
                    </motion.div>
                  ))
                )}
              </AnimatePresence>

            </div>
          </div>
        </div>

      </motion.div>

      {/* Basic custom scrollbar styles injected safely */}
      <style dangerouslySetInnerHTML={{__html: `
        .custom-scrollbar::-webkit-scrollbar { width: 8px; }
        .custom-scrollbar::-webkit-scrollbar-track { background: rgba(0,0,0,0.3); border-radius: 10px; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: rgba(244,63,94,0.3); border-radius: 10px; }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover { background: rgba(244,63,94,0.6); }
      `}} />
    </div>
  );
}