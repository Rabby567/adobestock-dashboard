export function generateLicenseKey() {

  const chars =
    "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";

  const random = () =>

    Array.from(
      { length: 4 },
      () =>
        chars[
          Math.floor(
            Math.random() * chars.length
          )
        ]
    ).join("");

  return `${random()}-${random()}-${random()}-${random()}`;

}

export function calculateExpiry(plan: string): string | null {
  if (plan === "lifetime") {
    return null;
  }

  const date = new Date();

  switch (plan) {
    case "1_year":
      date.setFullYear(date.getFullYear() + 1);
      break;

    case "6_months":
      date.setMonth(date.getMonth() + 6);
      break;

    case "3_months":
      date.setMonth(date.getMonth() + 3);
      break;

    default:
      return null;
  }

  return date.toISOString().split("T")[0];
}


export function formatPlan(plan: string) {
  switch (plan) {
    case "lifetime":
      return "Lifetime";

    case "1_year":
      return "1 Year";

    case "6_months":
      return "6 Months";

    case "3_months":
      return "3 Months";

    default:
      return plan;
  }
}

export function formatStatus(status: string) {
  switch (status) {
    case "unused":
      return "Unused";

    case "active":
      return "Active";

    case "suspended":
      return "Suspended";

    default:
      return status;
  }
}

/* ========================================================= */
/* MAP PLAN NAME */
/* ========================================================= */

import type { LicensePlan } from "../types/license";

export function mapPlanName(
  name: string
): LicensePlan {

  switch (name) {

    case "Lifetime":
      return "lifetime";

    case "1 Year":
      return "1_year";

    case "6 Months":
      return "6_months";

    case "3 Months":
      return "3_months";

    default:
      throw new Error(
        `Unknown plan: ${name}`
      );

  }

}