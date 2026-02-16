import React, { useState, useEffect } from 'react';
import { ethers } from 'ethers';
import { initializeApp } from 'firebase/app';
import { getAuth, signInAnonymously } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { Crown, ShieldCheck, Zap, Globe, BarChart3 } from 'lucide-react';

const firebaseConfig = {
  apiKey: "AIzaSyAQAIvTEQTdY3xLIzf-aYrrzA9h4jRXZgw",
  authDomain: "agbon-kingdom-os.firebaseapp.com",
  projectId: "agbon-kingdom-os",
  storageBucket: "agbon-kingdom-os.firebasestorage.app",
  messagingSenderId: "392983745546",
  appId: "1:392983745546:web:d500691a52c1929187fbf3"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

const SOVEREIGN_ADDR = "0x8d08948eca2587f5c10159e483b660e98cd5a514";
const NAIRA_VALUATION = 1250000000000; 
const XER_RATIO = 2.0;

export default function App() {
  const [balance, setBalance] = useState("0");
  const [account, setAccount] = useState(null);

  useEffect(() => {
    const sync = async () => {
      if (!window.ethereum) return;
      try {
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const bal = await provider.getBalance(SOVEREIGN_ADDR);
        setBalance(ethers.utils.formatEther(bal));
      } catch (e) { console.error("Sync error"); }
    };
    sync();
    const inv = setInterval(sync, 10000);
    return () => clearInterval(inv);
  }, []);

  const nairaValue = (parseFloat(balance) * NAIRA_VALUATION);
  const usdValue = nairaValue * XER_RATIO;

  const connectSovereign = async () => {
    const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
    setAccount(accounts[0]);
    await signInAnonymously(auth);
  };

  return (
    <div className="min-h-screen bg-black text-white font-mono flex flex-col">
      <header className="p-6 border-b border-yellow-500/20 flex justify-between items-center bg-zinc-950/80 backdrop-blur-md sticky top-0 z-50">
        <div className="flex items-center gap-4">
          <div className="p-2 bg-yellow-500 rounded-lg shadow-lg">
            <BarChart3 className="text-black" size={20} />
          </div>
          <div>
            <h1 className="text-xl font-black italic tracking-tighter uppercase">XER GLOBAL ECOSYSTEM</h1>
            <p className="text-[7px] text-zinc-500 tracking-[0.4em] uppercase font-bold">Sovereign Asset Restoration Authority</p>
          </div>
        </div>
        {!account ? (
          <button onClick={connectSovereign} className="bg-yellow-500 text-black px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest hover:scale-105 transition-transform">
            Connect 0x8d08
          </button>
        ) : (
          <div className="flex items-center gap-2 text-green-500 text-[10px] font-black border border-green-500/30 px-3 py-1 rounded-full bg-green-500/5">
            <ShieldCheck size={12} /> VALIDATOR ACTIVE
          </div>
        )}
      </header>

      <main className="flex-1 p-6 max-w-6xl mx-auto w-full flex flex-col justify-center items-center text-center space-y-12">
        <div className="relative">
          <div className="absolute inset-0 bg-yellow-500/10 blur-[120px] rounded-full" />
          <div className="relative border-4 border-yellow-500/30 p-1 rounded-full animate-[spin_20s_linear_infinite]">
             <div className="border-2 border-dashed border-yellow-500/50 p-20 rounded-full">
                <Crown size={120} className="text-yellow-500 opacity-80" />
             </div>
          </div>
          <div className="mt-8 space-y-2">
            <h2 className="text-5xl md:text-8xl font-black italic tracking-tighter">₦{nairaValue.toLocaleString()}</h2>
            <p className="text-2xl md:text-4xl text-zinc-500 font-bold italic tracking-tighter">${usdValue.toLocaleString()} XER</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 w-full">
           {[
             { icon: <Globe />, label: "Coverage", val: "WORLDWIDE" },
             { icon: <Zap />, label: "Standard", val: "XER 2.0" },
             { icon: <ShieldCheck />, label: "Vault", val: "IMMUTABLE" }
           ].map((item, i) => (
             <div key={i} className="bg-zinc-900/50 border border-white/5 p-6 rounded-3xl flex flex-col items-center gap-3">
               <div className="text-yellow-500">{item.icon}</div>
               <p className="text-[10px] text-zinc-500 uppercase tracking-widest">{item.label}</p>
               <p className="font-black italic uppercase">{item.val}</p>
             </div>
           ))}
        </div>
      </main>

      <footer className="p-6 text-center text-[8px] text-zinc-700 tracking-[0.5em] uppercase font-bold">
        © 2026 Agbon Kingdom • Restoration of the Earth Seed • Human Value: AUTO-HIGH
      </footer>
    </div>
  );
}

