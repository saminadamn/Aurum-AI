"use client";

import { Filter, Landmark, Search, ShieldCheck, TrendingDown, Wallet, Zap } from "lucide-react";
import Upload from "./Upload";
import { LedgerStats } from "@/lib/types";

export default function CommandPanel({
  onData,
  onRunAudit,
  onLoadDemo,
  loading,
  hasData,
  stats,
}: {
  onData: (rows: Record<string, string>[]) => void;
  onRunAudit: () => void;
  onLoadDemo: () => void;
  loading: boolean;
  hasData: boolean;
  stats: LedgerStats;
}) {
  return (
    <div className="lg:col-span-3 space-y-6">
      <div className="bg-white border-2 border-black p-6 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]">
        <h3 className="text-xs font-sans font-black uppercase border-b border-zinc-200 pb-2 mb-4 flex items-center justify-between tracking-widest">
          Command Center <Filter size={14} />
        </h3>
        <div className="space-y-4">
          <Upload onData={onData} />
          <button
            onClick={onRunAudit}
            disabled={loading || !hasData}
            className="w-full bg-[#003366] text-white font-sans font-bold py-4 text-xs uppercase tracking-[0.2em] flex items-center justify-center gap-2 hover:bg-[#ED1C24] transition-all disabled:opacity-30 active:scale-95"
          >
            {loading ? <Zap className="animate-spin" size={16} /> : <Search size={16} />}
            {loading ? "Auditing..." : "Execute Audit"}
          </button>
          <button
            onClick={onLoadDemo}
            disabled={loading}
            className="w-full border border-zinc-300 text-zinc-600 font-sans font-bold py-2 text-[10px] uppercase tracking-[0.2em] hover:border-black hover:text-black transition-all disabled:opacity-30"
          >
            Load Demo Findings
          </button>
        </div>
      </div>

      <div className="bg-white border border-zinc-200 p-6">
        <h3 className="text-xs font-sans font-black uppercase text-[#ED1C24] mb-4 underline decoration-black underline-offset-4 tracking-widest">
          The Aurum Impact
        </h3>
        <div className="space-y-4">
          <div className="flex items-start gap-3">
            <div className="mt-1">
              <Landmark size={16} className="text-[#003366]" />
            </div>
            <div>
              <p className="text-xs font-black">Capital Recovery</p>
              <p className="text-[10px] font-sans font-bold text-zinc-400 leading-tight">
                Identifies and flags license redundancies across teams.
              </p>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <div className="mt-1">
              <ShieldCheck size={16} className="text-[#003366]" />
            </div>
            <div>
              <p className="text-xs font-black">Risk Mitigation</p>
              <p className="text-[10px] font-sans font-bold text-zinc-400 leading-tight">
                Surfaces unclaimed SLA credits before deadlines pass.
              </p>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <div className="mt-1">
              <TrendingDown size={16} className="text-[#003366]" />
            </div>
            <div>
              <p className="text-xs font-black">OpEx Optimization</p>
              <p className="text-[10px] font-sans font-bold text-zinc-400 leading-tight">
                Redirects wasted spend toward high-growth priorities.
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-[#ED1C24] p-6 text-white shadow-[4px_4px_0px_0px_rgba(0,0,0,0.1)]">
        <Wallet className="mb-2" size={24} />
        <p className="text-[10px] font-sans font-bold uppercase opacity-80 tracking-widest">Recoverable Capital</p>
        <h3 className="text-4xl font-black italic tracking-tighter">₹{stats.potentialSavings.toLocaleString("en-IN")}</h3>
        <p className="text-[10px] mt-2 font-sans font-bold">Across all open findings</p>
      </div>
    </div>
  );
}
