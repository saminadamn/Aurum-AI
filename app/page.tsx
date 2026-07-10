"use client";

import { useMemo, useRef, useState } from "react";
import { AlertCircle } from "lucide-react";
import Masthead from "@/components/Masthead";
import CommandPanel from "@/components/CommandPanel";
import Dashboard from "@/components/Dashboard";
import Footer from "@/components/Footer";
import { Finding } from "@/lib/types";
import { SAMPLE_FINDINGS, SAMPLE_TOTAL_ROWS, SAMPLE_TOTAL_SPEND } from "@/lib/sample-data";

function parseCost(row: Record<string, string>): number {
  const key = Object.keys(row).find((k) => /cost/i.test(k));
  if (!key) return 0;
  const val = parseFloat(row[key]);
  return Number.isFinite(val) ? val : 0;
}

export default function Home() {
  const [rawData, setRawData] = useState<Record<string, string>[]>([]);
  const [insights, setInsights] = useState<Finding[] | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [resolved, setResolved] = useState<Set<number>>(new Set());
  const [demoMode, setDemoMode] = useState(false);
  const reportRef = useRef<HTMLDivElement>(null);

  const uploadedSpend = useMemo(
    () => rawData.reduce((sum, row) => sum + parseCost(row), 0),
    [rawData]
  );

  const potentialSavings = useMemo(() => {
    if (!insights) return 0;
    return insights.reduce((sum, item, i) => (resolved.has(i) ? sum : sum + (item.loss_inr || 0)), 0);
  }, [insights, resolved]);

  const stats = {
    totalRows: demoMode ? SAMPLE_TOTAL_ROWS : rawData.length,
    totalSpend: demoMode ? SAMPLE_TOTAL_SPEND : uploadedSpend,
    potentialSavings,
  };

  const handleData = (rows: Record<string, string>[]) => {
    setRawData(rows);
    setInsights(null);
    setResolved(new Set());
    setError(null);
    setDemoMode(false);
  };

  const runAudit = async () => {
    if (rawData.length === 0) return;
    setLoading(true);
    setError(null);
    try {
      const res = await fetch("/api/analyze", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ data: rawData }),
      });
      const body = await res.json();
      if (!res.ok || body.error) {
        throw new Error(body.error || "Analysis failed.");
      }
      setInsights(body.findings);
      setResolved(new Set());
      setDemoMode(false);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Analysis failed.");
    } finally {
      setLoading(false);
    }
  };

  const loadDemo = () => {
    setError(null);
    setInsights(SAMPLE_FINDINGS);
    setResolved(new Set());
    setDemoMode(true);
  };

  const handleFix = (index: number) => {
    setResolved((prev) => new Set(prev).add(index));
  };

  const downloadReport = async () => {
    if (!reportRef.current) return;
    const [{ default: jsPDF }, { default: html2canvas }] = await Promise.all([
      import("jspdf"),
      import("html2canvas"),
    ]);

    const canvas = await html2canvas(reportRef.current, {
      scale: 3,
      useCORS: true,
      backgroundColor: "#FDFCF8",
    });

    const imgData = canvas.toDataURL("image/png");
    const pdf = new jsPDF("p", "mm", "a4");
    const pdfWidth = pdf.internal.pageSize.getWidth();
    const pdfHeight = (canvas.height * pdfWidth) / canvas.width;

    pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight);
    pdf.save(`AURUM_Executive_Summary_${Date.now()}.pdf`);
  };

  return (
    <div className="min-h-screen bg-[#FDFCF8] text-[#333] font-serif selection:bg-[#ED1C24] selection:text-white">
      <Masthead stats={stats} />

      <main className="max-w-7xl mx-auto px-6 py-10">
        {error && (
          <div className="mb-8 flex items-start gap-3 border-l-[6px] border-[#ED1C24] bg-red-50 p-5 font-sans">
            <AlertCircle size={18} className="text-[#ED1C24] mt-0.5 shrink-0" />
            <div>
              <p className="text-xs font-black uppercase tracking-widest text-[#ED1C24] mb-1">Audit Failed</p>
              <p className="text-sm text-zinc-700">{error}</p>
            </div>
          </div>
        )}

        <div className="grid lg:grid-cols-12 gap-10">
          <CommandPanel
            onData={handleData}
            onRunAudit={runAudit}
            onLoadDemo={loadDemo}
            loading={loading}
            hasData={rawData.length > 0}
            stats={stats}
          />

          <Dashboard
            insights={insights}
            stats={stats}
            resolved={resolved}
            onFix={handleFix}
            onDownload={downloadReport}
            reportRef={reportRef}
          />
        </div>
        <Footer />
      </main>
    </div>
  );
}
