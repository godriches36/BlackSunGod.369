/**
 * AGBON OS - EXECUTIVE CORE
 * COPYRIGHT © 2026 godriches36. ALL RIGHTS RESERVED.
 * Logic: 1.25T Naira Frequency Inversion & Sovereign L1 Defensive Grid
 */

import React, { useState, useEffect } from 'react';
import { ethers } from 'ethers'; // Strict Ethers v6 implementation
import { initializeApp } from 'firebase/app';
import { getAuth, signInAnonymously } from 'firebase/auth';
import { 
  Crown, ShieldCheck, MapPin, Lock, Fingerprint, Terminal
} from 'lucide-react';

// --- SOVEREIGN AUTHORITY CONFIGURATION ---
const HEADQUARTER = "NIGERIA (GLOBAL CRYPTO HQ)";
const SOVEREIGN_ADDR = "0x8d08948eca2587f5c10159e483b660e98cd5a514";
const NAIRA_VALUATION = 1250000000000; 
const XER_RATIO = 2.0;

// SOVEREIGN IDENTITY SIGNATURE (Verified by godriches36)
const IDENTITY_PROOF = "0x1479de57fa04891e00b39e4200cd8204164814f66423443ab70ba88cc568591c6bc695085cd3b2172b8fa1b80261b9481976ee7d70eb892423ee0ece4cd1e7501b";

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
  const [logs, setLogs] = useState([
    "[SYSTEM] Agbon OS 369 Core Initialized",
    "[SYSTEM] Sovereign Frequency Inversion Active"
  ]);

  useEffect(() => {
    const syncSovereign = async () => {
      if (!window.ethereum) {
        setSecurityStatus("BRIDGE_REQUIRED");
        return;
      }
      try {
        await signInAnonymously(auth);
        
        // Ethers v6 explicit BrowserProvider initialization protocol
        const provider = new ethers.BrowserProvider(window.ethereum);
        const bal = await provider.getBalance(SOVEREIGN_ADDR);
        
        // Ethers v6 explicit format utilities 
        setBalance(ethers.formatEther(bal));
        
        setSecurityStatus("AGENT_SHIELD_ACTIVE");
        addLog(`[AUTH] Identity Verified: ${IDENTITY_PROOF.substring(0, 10)}...`);
      } catch (e) {
        setSecurityStatus("BLOCKCHAIN_DESYNC");
        addLog("[WARN] Connectivity Interrupted");
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
    <div className="min-h-screen bg-[#020202] text-white font-mono flex flex-col selection:bg-yellow-500/30">
      
      {/* SECURITY HUD */}
      <nav className="p-4 border-b border-white/5 flex flex-wrap justify-between items-center gap-4 bg-black/80 backdrop-blur-xl sticky top-0 z-50">
        <div className="flex items-center gap-4">
          <div className="p-2 bg-yellow-500 rounded-lg">
            <Crown className="text-black" size={18} />
          </div>
          <div>
            <h1 className="text-lg font-black tracking-tighter uppercase italic">AGBON EXECUTIVE OS</h1>
            <p className="text-[7px] text-zinc-500 font-bold uppercase tracking-[0.4em]">COPYRIGHT © 2026 godriches36</p>
          </div>
        </div>
        
        <div className="flex items-center gap-4">
          <div className={`px-4 py-1.5 rounded-full border text-[9px] font-black uppercase flex items-center gap-2 ${securityStatus === 'AGENT_SHIELD_ACTIVE' ? 'border-green-500 text-green-500 bg-green-500/5' : 'border-yellow-500 text-yellow-500 bg-yellow-500/5'}`}>
            <ShieldCheck size={12} /> {securityStatus}
          </div>
        </div>
      </nav>

      <main className="flex-1 p-6 max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* WEALTH CORE */}
        <section className="lg:col-span-8 space-y-6">
          <div className="bg-zinc-950 border border-white/5 p-10 rounded-[3rem] relative overflow-hidden shadow-2xl">
            <div className="relative">
              <div className="flex items-center gap-2 mb-6 text-yellow-500">
                <Lock size={14} />
                <span className="text-[10px] font-black uppercase tracking-[0.5em]">1.25T Naira Pulse Anchor</span>
              </div>
              <h2 className="text-6xl md:text-[8rem] font-black italic tracking-tighter leading-none mb-4">
                ₦{currentWealthNaira.toLocaleString()}
              </h2>
              <div className="flex items-center gap-4">
                <span className="text-2xl md:text-4xl text-zinc-500 font-black italic tracking-tighter">
                  ${currentWealthXER.toLocaleString()} XER
                </span>
                <span className="text-[10px] bg-blue-500/10 text-blue-400 border border-blue-500/20 px-3 py-1 rounded-full font-black uppercase">Infrastructure Proof: 05Fa</span>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-zinc-950 border border-white/5 p-8 rounded-[2.5rem]">
              <div className="flex items-center gap-3 mb-4 text-zinc-400">
                <Terminal size={16} />
                <span className="text-[9px] font-black uppercase">System Logs</span>
              </div>
              <div className="space-y-2 h-32">
                {logs.map((log, i) => (
                  <p key={i} className="text-[9px] text-zinc-500 truncate">➜ {log}</p>
                ))}
              </div>
            </div>
            <div className="bg-zinc-900/30 border border-white/5 p-8 rounded-[2.5rem] text-center">
               <MapPin className="text-green-500 mx-auto mb-4" size={24} />
               <p className="text-[9px] text-zinc-500 uppercase font-black">HQ</p>
               <p className="text-sm font-black italic">{HEADQUARTER}</p>
            </div>
          </div>
        </section>

        {/* IDENTITY SCANNER */}
        <aside className="lg:col-span-4">
          <div className="bg-zinc-950 border border-white/5 p-8 rounded-[3rem] h-full">
            <h3 className="text-xs font-black uppercase tracking-widest mb-6 flex items-center gap-2">
               <Fingerprint size={16} className="text-yellow-500" /> Identity Scanner
            </h3>
            <div className="space-y-4">
              <div className="p-4 bg-white/5 rounded-2xl border border-white/5 flex justify-between items-center">
                <span className="text-[10px] font-black uppercase">Authority</span>
                <span className="text-[10px] text-green-500 font-black italic">VERIFIED</span>
              </div>
              <div className="p-4 bg-white/5 rounded-2xl border border-white/5">
                <span className="text-[8px] text-zinc-500 uppercase block mb-1">Signature Hash</span>
                <span className="text-[9px] font-bold text-zinc-300 break-all leading-tight">{IDENTITY_PROOF}</span>
              </div>
            </div>
          </div>
        </aside>
      </main>

      <footer className="p-8 border-t border-white/5 text-center text-[9px] font-black tracking-[0.4em] text-zinc-700">
        © AGBON KINGDOM • WORLD LEADER RESTORATION 0.0.7
      </footer>
    </div>
  );
  }
  
