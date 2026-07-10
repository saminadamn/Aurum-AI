import { Finding } from "./types";

export const SAMPLE_FINDINGS: Finding[] = [
  {
    agent: "Spend Agent",
    issue: "Duplicate analytics subscriptions across two business units",
    loss_inr: 412000,
    severity: "High",
    impact:
      "Marketing and Product teams independently pay for overlapping analytics suites, with 80% feature overlap and no shared licensing agreement.",
    action: "Consolidate into a single enterprise license and cancel the redundant contract before the next renewal date.",
  },
  {
    agent: "Resource Agent",
    issue: "40% of provisioned cloud compute sits idle outside business hours",
    loss_inr: 268500,
    severity: "High",
    impact:
      "Staging and QA environments remain fully provisioned around the clock despite being used only during working hours in one time zone.",
    action: "Apply an auto-scaling schedule to non-production environments to shut down idle compute overnight and on weekends.",
  },
  {
    agent: "SLA Agent",
    issue: "Vendor SLA breach penalties not being claimed",
    loss_inr: 156000,
    severity: "Medium",
    impact:
      "Three vendor contracts include uptime guarantees with credit clauses that have been triggered but never invoiced back to the vendor.",
    action: "File retroactive SLA credit claims for the last two quarters and set up automated uptime monitoring against contract terms.",
  },
  {
    agent: "Spend Agent",
    issue: "Unused seats on a company-wide productivity suite",
    loss_inr: 94000,
    severity: "Low",
    impact:
      "22 licensed seats show zero login activity in the last 90 days, indicating over-provisioning during the last headcount cycle.",
    action: "Downgrade to actual active-user count and introduce a quarterly seat-utilization review before renewal.",
  },
];

export const SAMPLE_TOTAL_ROWS = 8;
export const SAMPLE_TOTAL_SPEND = 1896500;

export const SAMPLE_CSV = `Vendor,Tool,Department,Cost_INR,Licenses_Purchased,Licenses_Active,Renewal_Date
Adobe,Creative Cloud,Design,185000,40,22,2026-09-15
Amplitude,Product Analytics,Product,212000,15,14,2026-11-01
Mixpanel,Product Analytics,Marketing,200000,10,9,2026-08-20
AWS,EC2 Staging,Engineering,268500,1,1,2026-12-31
Zendesk,Support Suite,Support,145000,25,24,2026-10-05
Slack,Enterprise Grid,Company-wide,320000,300,278,2027-01-15
Salesforce,Sales Cloud,Sales,410000,60,57,2026-09-30
CloudVendorX,Managed Hosting,Engineering,156000,1,1,2026-07-01
`;
