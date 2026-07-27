/* ========================================================= */
/* LICENSE PLAN */
/* ========================================================= */

export type LicensePlan =
  | "3_months"
  | "6_months"
  | "1_year"
  | "lifetime";

/* ========================================================= */
/* LICENSE STATUS */
/* ========================================================= */

export type LicenseStatus =
  | "unused"
  | "active"
  | "suspended"
  | "expired"
  | "revoked";

/* ========================================================= */
/* LICENSE */
/* ========================================================= */

export interface License {

  /* ---------- Primary ---------- */

  id: string;

  /* ---------- License ---------- */

  license_key: string;

  /* ---------- Customer ---------- */

  customer_name: string;

  email: string;

  customer_id: string | null;

  /* ---------- Plan ---------- */

  plan: LicensePlan;

  plan_id: string | null;

  /* ---------- Order ---------- */

  order_id: string | null;

  /* ---------- Dates ---------- */

  issue_date: string;

  expiry_date: string | null;

  /* ---------- Device ---------- */

  device_id: string | null;

  /* ---------- Status ---------- */

  status: LicenseStatus;

  last_check: string | null;

  /* ---------- Notes ---------- */

  notes: string;

  /* ---------- System ---------- */

  created_at: string;

  updated_at: string;
}