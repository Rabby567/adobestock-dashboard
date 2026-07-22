export type LicensePlan =
  | "3_months"
  | "6_months"
  | "1_year"
  | "lifetime";

export type LicenseStatus =
  | "unused"
  | "active"
  | "suspended";

export interface License {
  id: string;

  licenseKey: string;

  customer: string;

  email: string;

  plan: LicensePlan;

  issueDate: string;

  expiry: string | null;

  device: string | null;

  status: LicenseStatus;

  lastCheck: string | null;

  notes: string;
}