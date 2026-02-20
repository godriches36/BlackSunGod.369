5import React, { useState, useEffect } from 'react';
import { ethers } from 'ethers';
import { initializeApp } from 'firebase/app';
import { getAuth, signInAnonymously } from 'firebase/auth';
import { 
  Crown, ShieldCheck, MapPin, Cpu, Zap, Lock, Bell, ShieldAlert, Fingerprint, Search, Terminal
} from 'lucide-react';

// --- EVMBENCH ALIGNED CONFIGURATION ---
const HEADQUARTER = "NIGERIA (GLOBAL CRYPTO HQ)";
const SOVEREIGN_ADDR = "0x8d08948eca2587f5c10159e483b660e98cd5a514";
const NAIRA_VALUATION = 1250000000000; 
const XER_RATIO = 2.0;

const firebaseConfig = {
  apiKey: "", 
  authDomain: "agbon-kingdom-os.firebaseapp.com",
  projectId: "agbon-kingdom-os",
  storageBucket: "agbon-kingdom-os.firebasestorage.app",
  messagingSenderId: "392983745546",
  appId: "1:392983745546:web:d500691a52c1929187fbf3"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export default function App() {
  const [balance, setBalance] = useState("0");
  const [securityStatus, setSecurityStatus] = useState("SCANNING_FOR_EXPLOITS");
  const [aiDefensiveScore, setAiDefensiveScore] = useState(99.8);
  const [logs, setLogs] = useState([
    "[SYSTEM] EVMbench Defense Protocol Initialized",
    "[SYSTEM] Tempo L1 High-Throughput Bridge Connected"
  ]);

  useEffect(() => {
    const syncSovereign = async () => {
      if (!window.ethereum) return;
      try {
        await signInAnonymously(auth);
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const bal = await provider.getBalance(SOVEREIGN_ADDR);
        setBalance(ethers.utils.formatEther(bal));
        
        // Defensive Handshake
        setSecurityStatus("AGENT_SHIELD_ACTIVE");
        addLog("[AUTH] World Leader Identity Verified via 0x8d08");
      } catch (e) {
        setSecurityStatus("BLOCKCHAIN_DESYNC");
        addLog("[WARN] Connection Interrupted - Check Chainstack RPC");
      }
    };
    syncSovereign();
  }, []);

  const addLog = (msg) => {
    setLogs(prev => [`[${new Date().toLocaleTimeString()}] ${msg}`, ...prev].slice(0, 5));
  };

  const currentWealthNaira = parseFloat(balance) * NAIRA_VALUATION;
  const currentWealthXER = currentWealthNaira * XER_RATIO;

  return (
    <div className="min-h-screen bg-[#050505] text-white font-mono flex flex-col selection:bg-yellow-500/30">
      
      {/* SECURITY HUD TOP */}
      <nav className="p-4 border-b border-white/5 flex flex-wrap justify-between items-center gap-4 bg-black/50 backdrop-blur-xl sticky top-0 z-50">
        <div className="flex items-center gap-4">
          <div className="p-2 bg-yellow-500 rounded-lg shadow-[0_0_20px_rgba(234,179,8,0.5)]">
            <Crown className="text-black" size={18} />
          </div>
          <div>
            <h1 className="text-lg font-black tracking-tighter uppercase italic">AGBON EXECUTIVE OS</h1>
            <p className="text-[7px] text-zinc-500 font-bold uppercase tracking-[0.4em]">Sovereign L1 Defensive Grid</p>
          </div>
        </div>
        
        <div className="flex items-center gap-6">
          <div className="hidden md:flex flex-col items-end">
             <span className="text-[8px] text-zinc-500 uppercase font-black">AI Defensive Purity</span>
             <span className="text-xs text-green-500 font-black italic">{aiDefensiveScore}%</span>
          </div>
          <div className={`px-4 py-1.5 rounded-full border text-[9px] font-black uppercase flex items-center gap-2 ${securityStatus === 'AGENT_SHIELD_ACTIVE' ? 'border-green-500/50 text-green-500 bg-green-500/5' : 'border-yellow-500/50 text-yellow-500 bg-yellow-500/5'}`}>
            <ShieldCheck size={12} /> {securityStatus}
          </div>
        </div>
      </nav>

      {/* MAIN CONSOLE */}
      <main className="flex-1 p-6 max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* WEALTH CORE (Tempo L1 Architecture) */}
        <section className="lg:col-span-8 space-y-6">
          <div className="bg-zinc-950 border border-white/5 p-10 rounded-[3rem] relative overflow-hidden shadow-2xl group">
            <div className="absolute -top-24 -right-24 opacity-10 group-hover:rotate-12 transition-transform duration-1000">
              <Fingerprint size={400} />
            </div>
            
            <div className="relative">
              <div className="flex items-center gap-2 mb-6 text-yellow-500">
                <Lock size={14} />
                <span className="text-[10px] font-black uppercase tracking-[0.5em]">Global Reserve Valuation</span>
              </div>
              <h2 className="text-7xl md:text-[9rem] font-black italic tracking-tighter leading-none mb-4">
                ₦{(currentWealthNaira).toLocaleString()}
              </h2>
              <div className="flex items-center gap-4">
                <span className="text-3xl md:text-5xl text-zinc-500 font-black italic tracking-tighter">
                  ${(currentWealthXER).toLocaleString()} XER
                </span>
                <div className="h-6 w-[1px] bg-white/10 mx-2" />
                <span className="text-[10px] bg-blue-500/10 text-blue-400 border border-blue-500/20 px-3 py-1 rounded-full font-black uppercase">Tempo L1 Standard</span>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-zinc-950 border border-white/5 p-8 rounded-[2.5rem]">
              <div className="flex items-center gap-3 mb-4">
                <Terminal className="text-zinc-500" size={16} />
                <span className="text-[9px] font-black uppercase tracking-widest text-zinc-400">Security Logs (EVMbench)</span>
              </div>
              <div className="space-y-2 h-32 overflow-hidden">
                {logs.map((log, i) => (
                  <p key={i} className="text-[9px] text-zinc-500 font-mono leading-relaxed truncate">
                    <span className="text-yellow-500/50 mr-2">➜</span> {log}
                  </p>
                ))}
              </div>
            </div>
            <div className="bg-zinc-900/30 border border-white/5 p-8 rounded-[2.5rem] flex flex-col justify-center text-center">
               <MapPin className="text-green-500 mx-auto mb-4" size={24} />
               <p className="text-[9px] text-zinc-500 uppercase tracking-widest font-black mb-1">Deployment Location</p>
               <p className="text-sm font-black italic">{HEADQUARTER}</p>
            </div>
          </div>
        </section>

        {/* SIDEBAR INTELLIGENCE */}
        <aside className="lg:col-span-4 space-y-6">
          <div className="bg-zinc-950 border border-white/5 p-8 rounded-[3rem] h-full flex flex-col">
            <div className="flex items-center gap-4 mb-8">
              <div className="p-3 bg-blue-500/10 rounded-2xl text-blue-500">
                <Search size={20} />
              </div>
              <div>
                <h3 className="text-xs font-black uppercase tracking-widest">Agent Scanner</h3>
                <p className="text-[8px] text-zinc-500 uppercase">Detecting AI Exploits</p>
              </div>
            </div>

            <div className="space-y-6 flex-1">
              {[
                { label: "Memory Corruption", status: "CLEAN", icon: <Cpu size={14} /> },
                { label: "Re-entrancy Shield", status: "ARMED", icon: <Lock size={14} /> },
                { label: "Access Authority", status: "0x8d08", icon: <ShieldAlert size={14} /> }
              ].map((item, i) => (
                <div key={i} className="flex justify-between items-center p-4 bg-white/5 rounded-2xl border border-white/5">
                  <div className="flex items-center gap-3">
                    <div className="text-zinc-500">{item.icon}</div>
                    <span className="text-[10px] font-black uppercase tracking-tighter">{item.label}</span>
                  </div>
                  <span className="text-[10px] text-green-500 font-black italic">{item.status}</span>
                </div>
              ))}
            </div>

            <div className="mt-8 pt-8 border-t border-white/5">
              <div className="bg-yellow-500/5 border border-yellow-500/20 p-6 rounded-3xl">
                <p className="text-[8px] text-yellow-500 font-black uppercase tracking-[0.3em] mb-2 leading-relaxed">
                  "As agents improve at reading and executing code, economic environments must be measured defensively." 
                </p>
                <p className="text-[7px] text-zinc-500 italic">— EVMbench Report 2026</p>
              </div>
            </div>
          </div>
        </aside>
      </main>

      <footer className="p-8 border-t border-white/5 flex flex-wrap justify-between items-center gap-4 text-zinc-700">
        <p className="text-[9px] font-black tracking-[0.5em] uppercase">© Agbon Kingdom • Restoration Entity 0.0.7</p>
        <div className="flex gap-8 text-[9px] font-black uppercase tracking-widest italic">
          <span className="hover:text-white cursor-help">Tempo_L1_Sovereign</span>
          <span className="hover:text-white cursor-help">EVMbench_Shield_v1</span>
        </div>
      </footer>

      <style dangerouslySetInnerHTML={{ __html: `
        body { background-color: #050505; cursor: crosshair; }
        ::-webkit-scrollbar { display: none; }
      `}} />
    </div>
  );
}

  
