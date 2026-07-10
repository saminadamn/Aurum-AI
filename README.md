# AURUM AI — Autonomous Cost Intelligence System

> Enterprise-grade AI system that detects cost inefficiencies, quantifies their financial impact, and recommends actionable fixes — going beyond static dashboards to autonomous decision support.

**Live demo:** [aurum-ai-eight.vercel.app](https://aurum-ai-eight.vercel.app)

---

## Overview

Organizations routinely lose money to duplicate tools and subscriptions, inefficient resource allocation, and poor cost visibility across teams. AURUM AI addresses this by ingesting operational data, using AI to identify cost leakages, estimating their financial impact, and surfacing prioritized, actionable recommendations — turning raw spend data into decisions.

## Features

- **CSV Data Upload** — Bring your own operational/cost data directly into the app
- **Multi-Agent AI Analysis** — a single audit call is framed as three specialized reviewers (Spend Agent, SLA Agent, Resource Agent), each surfacing a different class of cost leakage
- **Financial Impact Estimation** — Quantified cost impact (₹) for each identified issue
- **Insight Ledger Dashboard** — Economic Times–inspired newspaper layout with severity-ranked findings, live exposure/savings tickers, and a per-finding resolve action
- **Executive PDF Export** — one-click export of the audit ledger to a shareable PDF
- **Demo Mode** — explore the full dashboard with sample findings, no API key required
- **Actionable Recommendations** — concrete next steps rather than raw metrics

## System Design Architecture
<img width="8192" height="1122" alt="Client-Driven API Graph-2026-07-10-083843" src="https://github.com/user-attachments/assets/ca0601d4-cade-4c84-a7e0-593be398eb7c" />

## Tech Stack

| Layer | Technology |
|---|---|
| Framework | [Next.js](https://nextjs.org/) 16 (App Router) |
| UI | React 19, [Tailwind CSS](https://tailwindcss.com/) 4 |
| Language | TypeScript |
| AI Engine | [OpenAI API](https://platform.openai.com/) (`gpt-4o-mini`, JSON mode) |
| Data Processing | [PapaParse](https://www.papaparse.com/) (CSV parsing) |
| PDF Export | jsPDF + html2canvas |
| Icons | lucide-react |
| Deployment | Vercel |

## Project Structure

```
Aurum-AI/
├── app/
│   ├── api/
│   │   └── analyze/route.ts   # API route for AI-driven multi-agent cost analysis
│   ├── layout.tsx
│   ├── page.tsx                # Orchestrates upload -> audit -> ledger -> fix -> PDF export
│   └── globals.css
├── components/
│   ├── Masthead.tsx            # Newspaper-style header with live exposure/savings stats
│   ├── CommandPanel.tsx        # Upload + run-audit + demo-mode sidebar
│   ├── Upload.tsx               # CSV upload interface
│   ├── Dashboard.tsx           # Renders AI-generated findings (agent, issue, impact, severity, action)
│   └── Footer.tsx
├── lib/
│   ├── openai.ts                # OpenAI client factory
│   ├── types.ts                 # Shared Finding / LedgerStats types
│   └── sample-data.ts          # Demo-mode sample findings and CSV
└── public/
    └── sample-cost-data.csv    # Downloadable sample ledger
```

## Getting Started

### Prerequisites

- Node.js 18+
- An [OpenAI API key](https://platform.openai.com/api-keys)

### Installation

```bash
git clone https://github.com/saminadamn/Aurum-AI.git
cd Aurum-AI
npm install
```

### Environment Variables

Create a `.env.local` file in the project root:

```
OPENAI_API_KEY=your_openai_api_key_here
```

### Run Locally

```bash
npm run dev
```

Visit [http://localhost:3000](http://localhost:3000) to view the app.

### Build for Production

```bash
npm run build
npm start
```

## How It Works

1. Upload a CSV of operational or spend data via the **Upload** component, or click **Load Demo Findings** to explore the dashboard with sample data.
2. The `/api/analyze` route sends the parsed ledger to the OpenAI API, prompted to review the data as three specialized agents — Spend Agent, SLA Agent, and Resource Agent.
3. The model returns structured findings — agent, issue, financial impact (₹), severity, and recommended action — as strict JSON.
4. The **Dashboard** renders these findings as a newspaper-style audit ledger, ranked by severity, with a live "Recoverable Capital" total.
5. Mark a finding **Resolved** to remove it from the outstanding total, or export the whole ledger as a PDF via **Download Executive Summary**.

## Impact

- Potential to reduce enterprise costs by an estimated 20–30%
- Improves decision-making speed by surfacing prioritized, quantified insights
- Reduces manual effort spent auditing spend across tools and teams

## Roadmap

- [ ] Real-time integrations with ERP and SaaS platforms
- [ ] Automated workflow execution for approved recommendations
- [ ] Continuous, autonomous monitoring instead of on-demand audits
