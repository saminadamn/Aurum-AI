"use client";

import { useState } from "react";
import Upload from "../components/Upload";
import Dashboard from "../components/Dashboard";

export default function Home() {
  const [data, setData] = useState<any>(null);
  const [insights, setInsights] = useState<any>(null);

  const analyze = async () => {
    if (!data) return;

    const prompt = `
You are AURUM AI — an enterprise cost intelligence system.

Analyze this data:
${JSON.stringify(data)}

Find:
- cost leakages
- duplicate tools
- inefficiencies

Return JSON:
[
  {
    "issue": "",
    "impact": "",
    "severity": "",
    "action": ""
  }
]
`;

    try {
      // @ts-ignore
      const response = await window.puter.ai.chat(prompt);

      setInsights(JSON.parse(response));
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <main className="p-10 min-h-screen bg-gray-50">
      <h1 className="text-4xl font-bold mb-6">
        AURUM AI — Autonomous Cost Intelligence
      </h1>

      <Upload setData={setData} />

      <button
        onClick={analyze}
        className="mt-5 bg-blue-600 text-white px-6 py-2 rounded"
      >
        Analyze Data
      </button>

      <Dashboard insights={insights} />
    </main>
  );
}