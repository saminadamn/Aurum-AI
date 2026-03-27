"use client";
import Papa from "papaparse";

export default function Upload({ setData }: any) {
  const handleFile = (e: any) => {
    const file = e.target.files[0];

    if (!file) return;

    Papa.parse(file, {
      header: true,
      skipEmptyLines: true,
      complete: (results) => {
        console.log("Parsed Data:", results.data);
        setData(results.data);
      },
    });
  };

  return (
    <div className="mt-6">
      <input
        type="file"
        accept=".csv"
        onChange={handleFile}
        className="border p-2 rounded bg-white"
      />
    </div>
  );
}
