"use client";

import { ArrowUpRight, Menu, Search } from "lucide-react";
import { LedgerStats } from "@/lib/types";

export default function Masthead({ stats }: { stats: LedgerStats }) {
  return (
    <header className="border-b-[6px] border-black bg-white sticky top-0 z-50 shadow-sm">
      <div className="max-w-7xl mx-auto px-6 py-4">
        <div className="flex justify-between items-center text-[10px] font-sans font-black uppercase tracking-[0.15em] text-zinc-500 mb-3 border-b border-zinc-100 pb-2">
          <div className="flex gap-4">
            <span>National Edition</span>
            <span className="text-zinc-300">|</span>
            <span>
              {new Date().toLocaleDateString("en-IN", {
                weekday: "long",
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </span>
          </div>
          <div className="flex gap-5 items-center">
            <span className="flex items-center gap-1.5 text-[#ED1C24]">
              <span className="w-1.5 h-1.5 bg-[#ED1C24] rounded-full animate-pulse" />
              Live Ledger Feed
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
              Autonomous Enterprise Cost Intelligence
            </p>
          </div>

          <div className="hidden md:flex gap-8 border-l border-zinc-200 pl-8 text-right font-sans">
            <div>
              <p className="text-[9px] font-black text-zinc-400 uppercase tracking-wider">Exposure Audited</p>
              <p className="text-xl font-black text-black leading-none">
                ₹{(stats.totalSpend / 100000).toFixed(2)}
                <span className="text-xs ml-0.5">L</span>
              </p>
              <p className="text-[9px] font-bold text-green-600 flex items-center justify-end gap-1 mt-1">
                <ArrowUpRight size={10} /> {stats.totalRows} line items
              </p>
            </div>
            <div>
              <p className="text-[9px] font-black text-zinc-400 uppercase tracking-wider">Flagged Savings</p>
              <p className="text-xl font-black text-[#ED1C24] leading-none">
                ₹{(stats.potentialSavings / 1000).toFixed(1)}
                <span className="text-xs ml-0.5">K</span>
              </p>
              <p className="text-[9px] font-bold text-zinc-400 uppercase underline decoration-[#ED1C24] mt-1">Recoverable</p>
            </div>
          </div>
        </div>

        <nav className="mt-6 flex items-center justify-between border-t border-zinc-200 pt-3">
          <div className="flex gap-8 text-[11px] font-sans font-black uppercase tracking-tight text-zinc-800">
            <span className="cursor-pointer border-b-2 border-[#ED1C24] pb-1">Ledger Summary</span>
            <span className="cursor-pointer hover:text-[#ED1C24] transition-colors pb-1">Agent Desk</span>
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
  );
}
