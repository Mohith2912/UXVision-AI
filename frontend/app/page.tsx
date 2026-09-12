"use client";
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Search, Sparkles, Shield, Zap, Globe, ArrowRight } from 'lucide-react';
import { useRouter } from 'next/navigation';

export default function LandingPage() {
  const [url, setUrl] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleAnalyze = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!url) return;
    
    setLoading(true);
    try {
      const response = await fetch('http://localhost:4000/analyze/url', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ url }),
      });
      
      if (!response.ok) throw new Error('Analysis failed');
      
      const data = await response.json();
      // Store data in sessionStorage to pass to dashboard
      sessionStorage.setItem('lastAnalysis', JSON.stringify(data));
      router.push('/dashboard');
    } catch (err) {
      console.error(err);
      alert('Failed to analyze URL. Make sure the backend is running at http://localhost:4000');
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-[#030712] text-slate-200 overflow-hidden relative">
      {/* Background Glows */}
      <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-cyan-500/10 rounded-full blur-[120px]" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-purple-500/10 rounded-full blur-[120px]" />

      <div className="max-w-7xl mx-auto px-6 pt-32 pb-20 relative z-10 flex flex-col items-center text-center">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center gap-2 mb-8"
        >
          <span className="px-3 py-1 bg-cyan-400/10 border border-cyan-400/20 rounded-full text-[10px] font-black text-cyan-400 tracking-widest uppercase">
            AI-Powered UX Audit
          </span>
        </motion.div>

        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="text-7xl md:text-8xl font-black text-white italic uppercase tracking-tighter mb-6"
        >
          VANTAGE <span className="text-cyan-400">PRO</span>
        </motion.h1>

        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-slate-400 text-xl md:text-2xl max-w-2xl font-medium leading-relaxed mb-12"
        >
          Revolutionize your web design with AI-driven vision analysis. Detect UX friction, accessibility gaps, and performance leaks in seconds.
        </motion.p>

        <motion.form 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.3 }}
          onSubmit={handleAnalyze}
          className="w-full max-w-2xl relative group"
        >
          <div className="absolute inset-0 bg-cyan-400/20 rounded-[2rem] blur-2xl group-hover:bg-cyan-400/30 transition-all duration-500" />
          <div className="relative bg-[#0f172a]/80 border border-[#1e293b] rounded-[2rem] p-2 flex items-center backdrop-blur-xl shadow-2xl">
            <div className="pl-6 text-slate-500">
              <Globe size={24} />
            </div>
            <input 
              type="url" 
              placeholder="Enter website URL (e.g., https://google.com)"
              required
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              className="flex-1 bg-transparent border-none outline-none px-4 py-4 text-lg font-bold text-white placeholder:text-slate-600"
            />
            <button 
              type="submit" 
              disabled={loading}
              className="bg-cyan-400 hover:bg-white text-black px-8 py-4 rounded-[1.5rem] font-black uppercase tracking-widest transition-all duration-300 flex items-center gap-2 disabled:opacity-50"
            >
              {loading ? (
                <div className="w-5 h-5 border-2 border-black border-t-transparent animate-spin rounded-full" />
              ) : (
                <>Analyze <ArrowRight size={18} /></>
              )}
            </button>
          </div>
        </motion.form>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-24 w-full">
          {[
            { icon: <Zap className="text-yellow-400" />, title: "Instant Vision", desc: "AI Vision simulates human attention patterns." },
            { icon: <Shield className="text-emerald-400" />, title: "WCAG Ready", desc: "Automated compliance checks for accessibility." },
            { icon: <Sparkles className="text-purple-400" />, title: "Auto-Remediate", desc: "Generated code patches to fix issues instantly." }
          ].map((feature, idx) => (
            <motion.div 
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 + (idx * 0.1) }}
              className="bg-[#0f172a]/50 border border-[#1e293b] p-8 rounded-[2rem] text-left hover:border-slate-700 transition-all"
            >
              <div className="mb-4">{feature.icon}</div>
              <h3 className="text-white font-black uppercase italic mb-2 tracking-tight">{feature.title}</h3>
              <p className="text-slate-500 text-sm font-bold leading-relaxed">{feature.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </main>
  );
}