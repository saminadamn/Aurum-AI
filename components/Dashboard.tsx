"use client";

import { RefObject } from "react";
import { BarChart3, CheckCircle2, Download, Globe, Landmark } from "lucide-react";
import { Finding, LedgerStats } from "@/lib/types";

const AGENT_COLORS: Record<string, string> = {
  "Spend Agent": "#003366",
  "SLA Agent": "#ED1C24",
  "Resource Agent": "#059669",
};

export default function Dashboard({
  insights,
  stats,
  resolved,
  onFix,
  onDownload,
  reportRef,
}: {
  insights: Finding[] | null;
  stats: LedgerStats;
  resolved: Set<number>;
  onFix: (index: number) => void;
  onDownload: () => void;
  reportRef: RefObject<HTMLDivElement | null>;
}) {
  return (
    <div className="lg:col-span-9" ref={reportRef}>
      <div className="bg-white border border-zinc-200 p-12 relative shadow-sm overflow-hidden min-h-[800px]">
        <div className="absolute top-0 right-0 p-6 opacity-5">
          <Globe size={180} />
        </div>

        <div className="flex justify-between items-end border-b-[3px] border-black pb-8 mb-10">
          <div>
            <h2 className="text-5xl font-black italic tracking-tighter mb-1 leading-none">Strategic Audit Ledger</h2>
            <p className="font-sans text-[11px] font-bold text-zinc-400 uppercase tracking-[0.2em]">
              Multi-Agent Cost Diagnostics &bull; Confidential Report
            </p>
          </div>
          {insights && (
            <button
              onClick={onDownload}
              className="bg-black text-white px-5 py-3 font-sans text-[10px] font-black uppercase flex items-center gap-2 hover:bg-[#ED1C24] transition-all shadow-xl shadow-zinc-200 active:scale-95"
            >
              <Download size={14} /> Download Executive Summary
            </button>
          )}
        </div>

        {insights && (
          <div className="mb-12 p-8 border-l-[6px] border-[#ED1C24] bg-zinc-50 shadow-sm">
            <div className="flex items-center gap-2 mb-6">
              <Landmark size={18} className="text-[#003366]" />
              <h3 className="text-sm font-sans font-black uppercase tracking-[0.2em] text-[#003366]">
                Strategic Impact Assessment
              </h3>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
              <div className="border-r border-zinc-200 pr-6">
                <p className="text-[10px] font-sans font-black text-zinc-400 uppercase tracking-widest mb-2">
                  Liquidity Extraction
                </p>
                <p className="text-sm font-medium leading-relaxed font-sans">
                  Flagged <strong>₹{stats.potentialSavings.toLocaleString("en-IN")}</strong> in recoverable spend from
                  redundant tools and unclaimed credits.
                </p>
              </div>
              <div className="border-r border-zinc-200 pr-6">
                <p className="text-[10px] font-sans font-black text-zinc-400 uppercase tracking-widest mb-2">
                  Governance &amp; Risk
                </p>
                <p className="text-sm font-medium leading-relaxed font-sans">
                  Reviewed {stats.totalRows.toLocaleString("en-IN")} line items for duplication and compliance
                  exposure.
                </p>
              </div>
              <div>
                <p className="text-[10px] font-sans font-black text-zinc-400 uppercase tracking-widest mb-2">
                  OpEx Efficiency
                </p>
                <p className="text-sm font-medium leading-relaxed font-sans">
                  {insights.length} distinct findings ranked by severity and ready for action.
                </p>
              </div>
            </div>
          </div>
        )}

        <div className="space-y-12">
          {insights ? (
            <div className="divide-y-2 divide-zinc-50">
              {insights.map((item, i) => {
                const isResolved = resolved.has(i);
                return (
                  <div
                    key={i}
                    className={`grid md:grid-cols-4 gap-8 py-10 first:pt-0 transition-opacity ${
                      isResolved ? "opacity-40" : ""
                    }`}
                  >
                    <div className="md:col-span-1 border-r border-zinc-100 pr-6 font-sans">
                      <p className="text-[9px] font-black uppercase tracking-widest text-zinc-400 mb-2">Agent Origin</p>
                      <span
                        className="text-[10px] font-bold px-3 py-1 text-white inline-block tracking-tighter"
                        style={{ backgroundColor: AGENT_COLORS[item.agent] || "#000" }}
                      >
                        {item.agent?.toUpperCase()}
                      </span>
                      <div className="mt-6">
                        <p className="text-[9px] font-black uppercase text-zinc-400 tracking-widest mb-1">Impact Quantified</p>
                        <p className="text-2xl font-black text-[#ED1C24]">
                          ₹{item.loss_inr?.toLocaleString("en-IN")}
                        </p>
                      </div>
                    </div>
                    <div className="md:col-span-3 pl-10">
                      <div className="flex items-center gap-3 mb-3">
                        <div
                          className={`text-[8px] font-sans font-black px-1.5 border ${
                            item.severity?.toLowerCase() === "high"
                              ? "border-[#ED1C24] text-[#ED1C24]"
                              : "border-zinc-800"
                          }`}
                        >
                          {item.severity?.toUpperCase()} SEVERITY
                        </div>
                        <h4 className="text-3xl font-black tracking-tighter leading-none">{item.issue}</h4>
                      </div>
                      <p className="text-zinc-600 text-lg font-medium leading-relaxed mb-8 italic">
                        &ldquo;{item.impact}&rdquo;
                      </p>

                      <div className="bg-zinc-50 border border-zinc-100 p-5 flex justify-between items-center group hover:bg-[#FDFCF8] transition-colors rounded-sm">
                        <div className="flex items-center gap-3 font-sans">
                          <CheckCircle2 size={18} className="text-[#003366]" />
                          <div>
                            <p className="text-[9px] font-black text-zinc-400 uppercase tracking-widest mb-0.5">
                              Recommended Fix
                            </p>
                            <p className="text-sm font-bold text-zinc-800">{item.action}</p>
                          </div>
                        </div>
                        <button
                          onClick={() => onFix(i)}
                          disabled={isResolved}
                          className="bg-black text-white text-[9px] font-sans font-black uppercase px-5 py-2 hover:bg-[#ED1C24] transition-all shadow-md active:scale-95 disabled:opacity-40"
                        >
                          {isResolved ? "Resolved" : "Execute Fix"}
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            <div className="py-40 text-center flex flex-col items-center border-2 border-dashed border-zinc-100 rounded-lg">
              <div className="w-20 h-20 bg-zinc-50 rounded-full flex items-center justify-center mb-6">
                <BarChart3 size={32} className="text-zinc-200" />
              </div>
              <p className="font-sans text-xs font-bold text-zinc-300 uppercase tracking-[0.4em]">
                Standing By For Ledger Data
              </p>
            </div>
          )}
        </div>

        {insights && (
          <div className="mt-16 pt-12 border-t-2 border-zinc-100 flex justify-between items-center opacity-60">
            <div className="flex items-center gap-6">
              <div className="w-14 h-14 border-2 border-black rounded-full flex items-center justify-center font-black text-[10px] leading-tight text-center bg-white shadow-inner">
                AURUM
                <br />
                VERIFIED
              </div>
              <div className="text-[9px] font-sans font-bold uppercase tracking-[0.2em] leading-tight text-zinc-500">
                Multi-Agent Audit Protocol
                <br />
                Generated: {new Date().toLocaleString("en-IN")}
              </div>
            </div>
            <div className="text-right font-sans">
              <p className="text-[10px] font-black uppercase text-black tracking-widest">Executive Copy</p>
              <p className="text-[9px] font-bold text-zinc-400 italic underline decoration-[#ED1C24]">DO NOT REDISTRIBUTE</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
