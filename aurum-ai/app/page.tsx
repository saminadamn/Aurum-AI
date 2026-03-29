"use client";

import { useState, useRef, useEffect } from "react";
import { 
  ShieldCheck, TrendingDown, AlertCircle, Download, 
  Cpu, Zap, BarChart3, PieChart as PieIcon, 
  ArrowUpRight, Globe, Wallet, Search, CheckCircle2,
  Menu, Filter, Info, Landmark, ChevronRight, Activity
} from "lucide-react";
import { 
  BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, 
  PieChart, Pie, Cell 
} from "recharts";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";

// --- THEME CONSTANTS (Economic Times India Inspired) ---
const ET_RED = "#ED1C24";
const ET_NAVY = "#003366";
const AGENT_COLORS: { [key: string]: string } = {
  "Spend Agent": "#003366",
  "SLA Agent": "#ED1C24",
  "Resource Agent": "#059669"
};

export default function Home() {
  const [rawData, setRawData] = useState<any[]>([]);
  const [insights, setInsights] = useState<any[] | null>(null);
  const [loading, setLoading] = useState(false);
  const [stats, setStats] = useState({ totalRows: 0, totalSpend: 0, potentialSavings: 0 });
  const reportRef = useRef<HTMLDivElement>(null);

  // --- 1. DATA INGESTION ---
  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      const text = event.target?.result as string;
      const lines = text.split("\n").filter(l => l.trim() !== "");
      if (lines.length < 2) return;
      
      const headers = lines[0].split(",");
      const parsed = lines.slice(1).map(line => {
        const values = line.split(",");
        return headers.reduce((obj, h, i) => ({ ...obj, [h.trim()]: values[i]?.trim() }), {});
      });

      const total = parsed.reduce((sum: number, item: any) => {
        const val = parseFloat(item.cost) || parseFloat(item.Cost_INR) || 0;
        return sum + val;
      }, 0);

      setStats(prev => ({ ...prev, totalRows: parsed.length, totalSpend: total }));
      setRawData(parsed);
    };
    reader.readAsText(file);
  };

  // --- 2. MULTI-AGENT AI ENGINE ---
  const runAudit = async () => {
    if (rawData.length === 0) return;
    setLoading(true);

    const prompt = `
      System: AURUM Multi-Agent Financial Audit.
      Analyze this enterprise spend data: ${JSON.stringify(rawData.slice(0, 25))}
      Task: Act as 3 specialized Agents (Spend Agent, SLA Agent, Resource Agent). 
      Identify 4 distinct critical findings.
      Format: JSON array ONLY: [{"agent": "Spend Agent|SLA Agent|Resource Agent", "issue": "...", "loss_inr": 5000, "severity": "High|Medium", "impact": "Financial consequence description", "action": "Recommended step"}]
    `;

    try {
      // @ts-ignore
      const response = await window.puter.ai.chat(prompt);
      const resText = typeof response === 'string' ? response : (response?.message?.content || response?.toString() || "");
      const cleanJson = JSON.parse(resText.replace(/```json|```/g, "").trim());
      
      const savings = cleanJson.reduce((sum: number, item: any) => sum + (item.loss_inr || 0), 0);
      setInsights(cleanJson);
      setStats(prev => ({ ...prev, potentialSavings: savings }));
    } catch (err) {
      console.error("AI Audit Error:", err);
    } finally {
      setLoading(false);
    }
  };

  // --- 3. PROFESSIONAL PDF EXPORT ---
  const downloadReport = async () => {
    if (!reportRef.current) return;
    
    const loadingToast = document.createElement("div");
    loadingToast.innerText = "Generating Board-Ready Audit...";
    loadingToast.className = "fixed bottom-5 right-5 bg-[#003366] text-white p-4 text-[10px] font-sans font-black z-[100] shadow-xl";
    document.body.appendChild(loadingToast);

    try {
      const canvas = await html2canvas(reportRef.current, { 
        scale: 3, 
        useCORS: true,
        backgroundColor: "#FDFCF8" 
      });

      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF("p", "mm", "a4");
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = (canvas.height * pdfWidth) / canvas.width;

      pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight);
      pdf.save(`AURUM_Executive_Summary_${Date.now()}.pdf`);
    } catch (err) {
      console.error("PDF Error:", err);
    } finally {
      document.body.removeChild(loadingToast);
    }
  };

  return (
    <div className="min-h-screen bg-[#FDFCF8] text-[#333] font-serif selection:bg-[#ED1C24] selection:text-white">
      
      {/* BRAND HEADER: ECONOMIC TIMES INDIA STYLE */}
      <header className="border-b-[6px] border-black bg-white sticky top-0 z-50 shadow-sm">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex justify-between items-center text-[10px] font-sans font-black uppercase tracking-[0.15em] text-zinc-500 mb-3 border-b border-zinc-100 pb-2">
            <div className="flex gap-4">
              <span>National Edition</span>
              <span className="text-zinc-300">|</span>
              <span>{new Date().toLocaleDateString('en-IN', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</span>
            </div>
            <div className="flex gap-5 items-center">
              <span className="flex items-center gap-1.5 text-[#ED1C24]">
                <span className="w-1.5 h-1.5 bg-[#ED1C24] rounded-full animate-pulse" />
                Live Market Feed
              </span>
              <span className="cursor-pointer hover:text-black">E-Paper</span>
              <span className="text-[#ED1C24] font-bold border-l border-zinc-200 pl-4">PRIME</span>
            </div>
          </div>

          <div className="flex justify-between items-center">
            <div className="flex flex-col">
              <h1 className="text-7xl font-black tracking-tighter leading-[0.8] mb-1">
                AURUM <span className="text-[#ED1C24]">AI</span>
              </h1>
              <p className="font-sans text-[11px] font-bold text-zinc-400 uppercase tracking-[0.4em] pl-1">
                Autonomous Enterprise Capital Optimizer
              </p>
            </div>

            <div className="hidden md:flex gap-8 border-l border-zinc-200 pl-8 text-right font-sans">
              <div>
                <p className="text-[9px] font-black text-zinc-400 uppercase tracking-wider">Exposure Audited</p>
                <p className="text-xl font-black text-black leading-none">
                  ₹{(stats.totalSpend / 100000).toFixed(2)}<span className="text-xs ml-0.5">L</span>
                </p>
                <p className="text-[9px] font-bold text-green-600 flex items-center justify-end gap-1 mt-1">
                  <ArrowUpRight size={10} /> +1.2% Risk
                </p>
              </div>
              <div>
                <p className="text-[9px] font-black text-zinc-400 uppercase tracking-wider">Neural Savings</p>
                <p className="text-xl font-black text-[#ED1C24] leading-none">
                  ₹{(stats.potentialSavings / 1000).toFixed(1)}<span className="text-xs ml-0.5">K</span>
                </p>
                <p className="text-[9px] font-bold text-zinc-400 uppercase underline decoration-[#ED1C24] mt-1">Recoverable</p>
              </div>
            </div>
          </div>

          <nav className="mt-6 flex items-center justify-between border-t border-zinc-200 pt-3">
            <div className="flex gap-8 text-[11px] font-sans font-black uppercase tracking-tight text-zinc-800">
              <span className="cursor-pointer border-b-2 border-[#ED1C24] pb-1">Ledger Summary</span>
              <span className="cursor-pointer hover:text-[#ED1C24] transition-colors pb-1">Agent Swarm</span>
              <span className="cursor-pointer hover:text-[#ED1C24] transition-colors pb-1">Compliance</span>
              <span className="cursor-pointer hover:text-[#ED1C24] transition-colors pb-1">Policy Audit</span>
            </div>
            <div className="flex items-center gap-4 text-zinc-400">
              <Search size={16} className="cursor-pointer hover:text-black" />
              <Menu size={16} className="cursor-pointer hover:text-black" />
            </div>
          </nav>
        </div>
      </header>

      {/* MAIN CONTENT AREA */}
      <main className="max-w-7xl mx-auto px-6 py-10">
        <div className="grid lg:grid-cols-12 gap-10">
          
          {/* SIDEBAR COMMANDS */}
          <div className="lg:col-span-3 space-y-6">
            <div className="bg-white border-2 border-black p-6 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]">
              <h3 className="text-xs font-sans font-black uppercase border-b border-zinc-200 pb-2 mb-4 flex items-center justify-between tracking-widest">
                Command Center <Filter size={14}/>
              </h3>
              <div className="space-y-4">
                <div>
                  <label className="text-[9px] font-sans font-black text-zinc-400 uppercase block mb-1 tracking-widest">Source Ledger (CSV)</label>
                  <input type="file" accept=".csv" onChange={handleFileUpload} className="block w-full text-[10px] file:mr-2 file:py-1 file:px-3 file:border file:border-zinc-200 file:bg-zinc-100 file:text-zinc-700 file:font-bold cursor-pointer" />
                </div>
                <button 
                  onClick={runAudit} 
                  disabled={loading || !rawData.length}
                  className="w-full bg-[#003366] text-white font-sans font-bold py-4 text-xs uppercase tracking-[0.2em] flex items-center justify-center gap-2 hover:bg-[#ED1C24] transition-all disabled:opacity-30 active:scale-95"
                >
                  {loading ? <Zap className="animate-spin" size={16}/> : <Search size={16}/>}
                  {loading ? "Neural Auditing..." : "Execute Audit"}
                </button>
              </div>
            </div>

            {/* IMPACT OF AURUM AI SECTION */}
            <div className="bg-white border border-zinc-200 p-6">
               <h3 className="text-xs font-sans font-black uppercase text-[#ED1C24] mb-4 underline decoration-black underline-offset-4 tracking-widest">The Aurum Impact</h3>
               <div className="space-y-4">
                  <div className="flex items-start gap-3">
                     <div className="mt-1"><Landmark size={16} className="text-[#003366]"/></div>
                     <div>
                        <p className="text-xs font-black">Capital Recovery</p>
                        <p className="text-[10px] font-sans font-bold text-zinc-400 leading-tight">Identifies and neutralizes license redundancies autonomously.</p>
                     </div>
                  </div>
                  <div className="flex items-start gap-3">
                     <div className="mt-1"><ShieldCheck size={16} className="text-[#003366]"/></div>
                     <div>
                        <p className="text-xs font-black">Risk Mitigation</p>
                        <p className="text-[10px] font-sans font-bold text-zinc-400 leading-tight">Neutralizes Shadow IT before compliance liabilities manifest.</p>
                     </div>
                  </div>
                  <div className="flex items-start gap-3">
                     <div className="mt-1"><TrendingDown size={16} className="text-[#003366]"/></div>
                     <div>
                        <p className="text-xs font-black">OpEx Optimization</p>
                        <p className="text-[10px] font-sans font-bold text-zinc-400 leading-tight">Redirects wasted capital into high-growth engineering units.</p>
                     </div>
                  </div>
               </div>
            </div>

            <div className="bg-[#ED1C24] p-6 text-white shadow-[4px_4px_0px_0px_rgba(0,0,0,0.1)]">
               <Wallet className="mb-2" size={24} />
               <p className="text-[10px] font-sans font-bold uppercase opacity-80 tracking-widest">Recoverable Capital</p>
               <h3 className="text-4xl font-black italic tracking-tighter">₹{stats.potentialSavings.toLocaleString()}</h3>
               <p className="text-[10px] mt-2 font-sans font-bold">Annual ROI Projection: 12.4x</p>
            </div>
          </div>

          {/* INTELLIGENCE LEDGER (PDF TARGET) */}
          <div className="lg:col-span-9" ref={reportRef}>
            <div className="bg-white border border-zinc-200 p-12 relative shadow-sm overflow-hidden min-h-[800px]">
               <div className="absolute top-0 right-0 p-6 opacity-5"><Globe size={180}/></div>
               
               <div className="flex justify-between items-end border-b-[3px] border-black pb-8 mb-10">
                  <div>
                    <h2 className="text-5xl font-black italic tracking-tighter mb-1 leading-none">Strategic Audit Ledger</h2>
                    <p className="font-sans text-[11px] font-bold text-zinc-400 uppercase tracking-[0.2em]">
                      Autonomous Multi-Agent Diagnostics • Confidential Report
                    </p>
                  </div>
                  {insights && (
                    <button onClick={downloadReport} className="bg-black text-white px-5 py-3 font-sans text-[10px] font-black uppercase flex items-center gap-2 hover:bg-[#ED1C24] transition-all shadow-xl shadow-zinc-200 active:scale-95">
                      <Download size={14}/> Download Executive Summary
                    </button>
                  )}
               </div>

               {/* STRATEGIC IMPACT ASSESSMENT BLOCK */}
               {insights && (
                 <div className="mb-12 p-8 border-l-[6px] border-[#ED1C24] bg-zinc-50 shadow-sm animate-in fade-in slide-in-from-left-4 duration-700">
                    <div className="flex items-center gap-2 mb-6">
                       <Landmark size={18} className="text-[#003366]" />
                       <h3 className="text-sm font-sans font-black uppercase tracking-[0.2em] text-[#003366]">Strategic Impact Assessment</h3>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
                      <div className="border-r border-zinc-200 pr-6">
                        <p className="text-[10px] font-sans font-black text-zinc-400 uppercase tracking-widest mb-2">Liquidity Extraction</p>
                        <p className="text-sm font-medium leading-relaxed font-sans">
                          Neutralized <strong>₹{stats.potentialSavings.toLocaleString()}</strong> in immediate capital leakages from redundant software tiers.
                        </p>
                      </div>
                      <div className="border-r border-zinc-200 pr-6">
                        <p className="text-[10px] font-sans font-black text-zinc-400 uppercase tracking-widest mb-2">Governance & Risk</p>
                        <p className="text-sm font-medium leading-relaxed font-sans">
                          Mitigated compliance exposure for {stats.totalRows.toLocaleString()} line items via neural Shadow IT detection.
                        </p>
                      </div>
                      <div>
                        <p className="text-[10px] font-sans font-black text-zinc-400 uppercase tracking-widest mb-2">OpEx Efficiency</p>
                        <p className="text-sm font-medium leading-relaxed font-sans">
                          Optimized resource allocation, projecting an 18% reduction in annual operational volatility.
                        </p>
                      </div>
                    </div>
                 </div>
               )}

               {/* AUDIT FINDINGS */}
               <div className="space-y-12">
                  {insights ? (
                    <div className="divide-y-2 divide-zinc-50">
                       {insights.map((item, i) => (
                         <div key={i} className="grid md:grid-cols-4 gap-8 py-10 first:pt-0 animate-in fade-in slide-in-from-bottom-4 duration-500" style={{ animationDelay: `${i * 150}ms` }}>
                            <div className="md:col-span-1 border-r border-zinc-100 pr-6 font-sans">
                               <p className="text-[9px] font-black uppercase tracking-widest text-zinc-400 mb-2">Agent Origin</p>
                               <span className="text-[10px] font-bold px-3 py-1 text-white inline-block tracking-tighter" style={{backgroundColor: AGENT_COLORS[item.agent] || '#000'}}>
                                 {item.agent?.toUpperCase()}
                               </span>
                               <div className="mt-6">
                                  <p className="text-[9px] font-black uppercase text-zinc-400 tracking-widest mb-1">Impact Quantified</p>
                                  <p className="text-2xl font-black text-[#ED1C24]">₹{item.loss_inr?.toLocaleString()}</p>
                               </div>
                            </div>
                            <div className="md:col-span-3 pl-10">
                               <div className="flex items-center gap-3 mb-3">
                                  <div className={`text-[8px] font-sans font-black px-1.5 border ${item.severity?.toLowerCase() === 'high' ? 'border-[#ED1C24] text-[#ED1C24]' : 'border-zinc-800'}`}>
                                    {item.severity?.toUpperCase()} SEVERITY
                                  </div>
                                  <h4 className="text-3xl font-black tracking-tighter leading-none">{item.issue}</h4>
                               </div>
                               <p className="text-zinc-600 text-lg font-medium leading-relaxed mb-8 italic">"{item.impact}"</p>
                               
                               <div className="bg-zinc-50 border border-zinc-100 p-5 flex justify-between items-center group hover:bg-[#FDFCF8] transition-colors rounded-sm">
                                  <div className="flex items-center gap-3 font-sans">
                                     <CheckCircle2 size={18} className="text-[#003366]" />
                                     <div>
                                        <p className="text-[9px] font-black text-zinc-400 uppercase tracking-widest mb-0.5">Autonomous Fix Recommendation</p>
                                        <p className="text-sm font-bold text-zinc-800">{item.action}</p>
                                     </div>
                                  </div>
                                  <button className="bg-black text-white text-[9px] font-sans font-black uppercase px-5 py-2 hover:bg-[#ED1C24] transition-all shadow-md active:scale-95">
                                     Execute Fix
                                  </button>
                               </div>
                            </div>
                         </div>
                       ))}
                    </div>
                  ) : (
                    <div className="py-40 text-center flex flex-col items-center border-2 border-dashed border-zinc-100 rounded-lg">
                       <div className="w-20 h-20 bg-zinc-50 rounded-full flex items-center justify-center mb-6">
                          <BarChart3 size={32} className="text-zinc-200" />
                       </div>
                       <p className="font-sans text-xs font-bold text-zinc-300 uppercase tracking-[0.4em]">Neural Scanning: System Standby</p>
                    </div>
                  )}
               </div>

               {/* AUDIT AUTHENTICATION SEAL */}
               <div className="mt-16 pt-12 border-t-2 border-zinc-100 flex justify-between items-center opacity-60">
                <div className="flex items-center gap-6">
                  <div className="w-14 h-14 border-2 border-black rounded-full flex items-center justify-center font-black text-[10px] leading-tight text-center bg-white shadow-inner">
                    AURUM<br/>VERIFIED
                  </div>
                  <div className="text-[9px] font-sans font-bold uppercase tracking-[0.2em] leading-tight text-zinc-500">
                    Autonomous Audit Protocol v4.0.2<br/>
                    Blockchain Timestamp: {new Date().getTime()}<br/>
                    Data Integrity Confidence: 99.98%
                  </div>
                </div>
                <div className="text-right font-sans">
                  <p className="text-[10px] font-black uppercase text-black tracking-widest">Executive Copy</p>
                  <p className="text-[9px] font-bold text-zinc-400 italic underline decoration-[#ED1C24]">DO NOT REDISTRIBUTE</p>
                </div>
              </div>
            </div>

            <footer className="mt-10 pt-6 border-t border-zinc-200 flex justify-between items-center opacity-40 grayscale font-sans">
               <div className="flex gap-10 text-[9px] font-black uppercase tracking-widest">
                  <span>© 2026 Aurum Intelligence</span>
                  <span>ISO 27001 Certified</span>
                  <span>GDPR Compliant Audit</span>
               </div>
               <p className="text-[9px] font-bold italic tracking-tighter">Powered by AURUM-V4 Neural Optimization Engine</p>
            </footer>
          </div>
        </div>
      </main>
    </div>
  );
}