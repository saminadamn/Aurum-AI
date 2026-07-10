# AURUM AI — Autonomous Cost Intelligence System

> Enterprise-grade AI system that detects cost inefficiencies, quantifies their financial impact, and recommends actionable fixes — going beyond static dashboards to autonomous decision support.

**Live demo:** [aurum-ai-eight.vercel.app](https://aurum-ai-eight.vercel.app)

---

## Overview

Organizations routinely lose money to duplicate tools and subscriptions, inefficient resource allocation, and poor cost visibility across teams. AURUM AI addresses this by ingesting operational data, using AI to identify cost leakages, estimating their financial impact, and surfacing prioritized, actionable recommendations — turning raw spend data into decisions.

## Features

- **CSV Data Upload** — Bring your own operational/cost data directly into the app
- **AI-Powered Analysis** — LLM-driven detection of inefficiencies, duplication, and waste in spending patterns
- **Financial Impact Estimation** — Quantified cost impact for each identified issue
- **Insight Dashboard** — Clear, severity-ranked view of issues, their impact, and recommended actions
- **Actionable Recommendations** — Concrete next steps rather than raw metrics

## System Design Architecture
<img width="8192" height="1122" alt="Client-Driven API Graph-2026-07-10-083843" src="https://github.com/user-attachments/assets/ca0601d4-cade-4c84-a7e0-593be398eb7c" />

## Tech Stack

| Layer | Technology |
|---|---|
| Framework | [Next.js](https://nextjs.org/) 16 (App Router) |
| UI | React 19, [Tailwind CSS](https://tailwindcss.com/) 4 |
| Language | TypeScript |
| AI Engine | [OpenAI API](https://platform.openai.com/) |
| Data Processing | [PapaParse](https://www.papaparse.com/) (CSV parsing) |
| Deployment | Vercel |

## Project Structure

```
aurum-ai/
├── app/
│   ├── api/
│   │   └── analyze/       # API route for AI-driven cost analysis
│   └── ...                # App Router pages, layout, styles
├── components/
│   ├── Dashboard.tsx      # Renders AI-generated insights (issue, impact, severity, action)
│   └── Upload.tsx         # CSV upload interface
├── lib/
│   └── openai.ts          # OpenAI client configuration
└── public/
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

1. Upload a CSV of operational or spend data via the **Upload** component.
2. The `/api/analyze` route sends the parsed data to the OpenAI API for analysis.
3. The model returns structured insights — issue, estimated financial impact, severity, and recommended action.
4. The **Dashboard** component renders these insights, ranked and ready to act on.

## Impact

- Potential to reduce enterprise costs by an estimated 20–30%
- Improves decision-making speed by surfacing prioritized, quantified insights
- Reduces manual effort spent auditing spend across tools and teams

## Roadmap

- [ ] Real-time integrations with ERP and SaaS platforms
- [ ] Automated workflow execution for approved recommendations
- [ ] Multi-agent architecture for continuous, autonomous financial monitoring
