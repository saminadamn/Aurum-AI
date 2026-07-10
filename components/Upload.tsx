"use client";

import Papa from "papaparse";

export default function Upload({ onData }: { onData: (rows: Record<string, string>[]) => void }) {
  const handleFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    Papa.parse<Record<string, string>>(file, {
      header: true,
      skipEmptyLines: true,
      complete: (results) => onData(results.data),
    });
  };

  return (
    <div>
      <label className="text-[9px] font-sans font-black text-zinc-400 uppercase block mb-1 tracking-widest">
        Source Ledger (CSV)
      </label>
      <input
        type="file"
        accept=".csv"
        onChange={handleFile}
        className="block w-full text-[10px] file:mr-2 file:py-1 file:px-3 file:border file:border-zinc-200 file:bg-zinc-100 file:text-zinc-700 file:font-bold cursor-pointer"
      />
      <a
        href="/sample-cost-data.csv"
        download
        className="mt-2 inline-block text-[9px] font-sans font-bold text-[#003366] underline decoration-dotted hover:text-[#ED1C24]"
      >
        Download sample ledger
      </a>
    </div>
  );
}
