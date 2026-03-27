import { openai } from "@/lib/openai";

export async function POST(req: Request) {
  try {
    const { data } = await req.json();

    const prompt = `
You are AURUM AI — an enterprise cost intelligence system.

Analyze this data:
${JSON.stringify(data)}

Tasks:
1. Detect cost leakages
2. Find duplicate tools/vendors
3. Identify inefficiencies

For each issue:
- issue
- financial impact (₹)
- severity (High/Medium/Low)
- actionable fix

Return STRICT JSON:
[
  {
    "issue": "",
    "impact": "",
    "severity": "",
    "action": ""
  }
]
`;

    const response = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [{ role: "user", content: prompt }],
    });

    return Response.json({
      result: response.choices[0].message.content,
    });

  } catch (error: any) {
  console.error("FULL ERROR:", error);
  return Response.json({ error: error.message });
}
}