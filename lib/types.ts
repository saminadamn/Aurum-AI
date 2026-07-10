export type Severity = "High" | "Medium" | "Low";

export type Agent = "Spend Agent" | "SLA Agent" | "Resource Agent";

export type Finding = {
  agent: Agent;
  issue: string;
  loss_inr: number;
  severity: Severity;
  impact: string;
  action: string;
};

export type LedgerStats = {
  totalRows: number;
  totalSpend: number;
  potentialSavings: number;
};
