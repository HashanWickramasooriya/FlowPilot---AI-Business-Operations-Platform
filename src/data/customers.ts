export type CustomerStatus = "Active" | "Onboarding" | "At Risk" | "Churned";

export interface Customer {
  id: string;
  company: string;
  contact: string;
  email: string;
  status: CustomerStatus;
  revenue: number;
  lastActivity: string;
  industry: string;
}

export const initialCustomers: Customer[] = [
  { id: "c1", company: "Brightline Studio", contact: "Nora Fields", email: "nora@brightlinestudio.demo", status: "Active", revenue: 48200, lastActivity: "2026-08-12", industry: "Creative Agency" },
  { id: "c2", company: "Northstar Media", contact: "Owen Blake", email: "owen@northstarmedia.demo", status: "Active", revenue: 62500, lastActivity: "2026-08-11", industry: "Media" },
  { id: "c3", company: "Greenfield Consulting", contact: "Ivy Chapman", email: "ivy@greenfieldconsulting.demo", status: "At Risk", revenue: 19800, lastActivity: "2026-07-29", industry: "Consulting" },
  { id: "c4", company: "Vertex Labs", contact: "Marcus Webb", email: "marcus@vertexlabs.demo", status: "Onboarding", revenue: 8400, lastActivity: "2026-08-10", industry: "Software" },
  { id: "c5", company: "Oak & Co.", contact: "Delia Grant", email: "delia@oakandco.demo", status: "Onboarding", revenue: 5200, lastActivity: "2026-08-13", industry: "Retail" },
  { id: "c6", company: "Summit Digital", contact: "Ravi Kapoor", email: "ravi@summitdigital.demo", status: "Active", revenue: 71300, lastActivity: "2026-08-09", industry: "Digital Marketing" },
  { id: "c7", company: "Cedar & Finch", contact: "Wren Halsey", email: "wren@cedarfinch.demo", status: "Churned", revenue: 0, lastActivity: "2026-06-02", industry: "Hospitality" },
  { id: "c8", company: "Lumen Analytics", contact: "Priya Deshmukh", email: "priya@lumenanalytics.demo", status: "Active", revenue: 39600, lastActivity: "2026-08-08", industry: "Data & Analytics" },
  { id: "c9", company: "Harbor & Stone", contact: "Colin Ashford", email: "colin@harborstone.demo", status: "At Risk", revenue: 14200, lastActivity: "2026-07-25", industry: "Real Estate" },
  { id: "c10", company: "Willow Health Group", contact: "Faye Nakamura", email: "faye@willowhealth.demo", status: "Active", revenue: 55700, lastActivity: "2026-08-12", industry: "Healthcare" },
];

export const customerStatuses: CustomerStatus[] = ["Active", "Onboarding", "At Risk", "Churned"];
