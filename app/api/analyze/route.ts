import { getAIClient, AI_MODEL } from "@/lib/ai";

export async function POST(req: Request) {
  try {
    const { data } = await req.json();

    if (!Array.isArray(data) || data.length === 0) {
      return Response.json({ error: "No ledger data provided." }, { status: 400 });
    }

    const ai = getAIClient();

    const prompt = `
You are AURUM AI, an enterprise cost intelligence system operating as three specialized agents:
Spend Agent (duplicate tools, subscriptions, licensing waste), SLA Agent (vendor SLA and contract
credit exposure), and Resource Agent (idle or over-provisioned infrastructure).

Analyze this operational/spend data:
${JSON.stringify(data.slice(0, 40))}

Identify 3 to 6 distinct, concrete findings across the three agents. For each finding, quantify the
financial impact in Indian Rupees.

Return STRICT JSON with this exact shape and no additional commentary:
{
  "findings": [
    {
      "agent": "Spend Agent" | "SLA Agent" | "Resource Agent",
      "issue": "short headline of the problem",
      "loss_inr": 123456,
      "severity": "High" | "Medium" | "Low",
      "impact": "one to two sentence explanation of the financial/operational consequence",
      "action": "concrete recommended fix"
    }
  ]
}
`;

    const response = await ai.chat.completions.create({
      model: AI_MODEL,
      response_format: { type: "json_object" },
      messages: [{ role: "user", content: prompt }],
    });

    const raw = response.choices[0].message.content ?? "{}";
    const parsed = JSON.parse(raw);

    return Response.json({ findings: parsed.findings ?? [] });
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : "Unknown error during analysis.";
    console.error("AURUM analyze error:", message);
    return Response.json({ error: message }, { status: 500 });
  }
}
