/* ========================================================= */
/* SUPABASE */
/* ========================================================= */

import { supabase } from "../lib/supabase";

import type { License } from "../types/license";
import {
  generateLicenseKey,
  calculateExpiry,
} from "../utils/license";

/* ========================================================= */
/* CREATE LICENSE TYPE */
/* ========================================================= */

/* ========================================================= */
/* CREATE LICENSE DATA */
/* ========================================================= */

export interface CreateLicenseData {

  customer_name: string;

  email: string;

  plan: License["plan"];

  customer_id: string | null;

  plan_id: string | null;

  order_id: string | null;

  notes: string;

}



/* ========================================================= */
/* GET LICENSES */
/* ========================================================= */

export async function getLicenses(): Promise<License[]> {

  const { data, error } = await supabase

    .from("licenses")

    .select("*")

    .order("created_at", {
      ascending: false,
    });

  if (error) {
    throw error;
  }

  return (data ?? []) as License[];

}

/* ========================================================= */
/* CREATE LICENSE */
/* ========================================================= */

export async function createLicense(
  values: CreateLicenseData
): Promise<License> {

  // ------------------------------------
  // Generate License Key
  // ------------------------------------

  const license_key =
    generateLicenseKey();

  // ------------------------------------
  // Calculate Expiry
  // ------------------------------------

  const expiry_date =
    calculateExpiry(values.plan);

  // ------------------------------------
  // Issue Date
  // ------------------------------------

  const issue_date =
    new Date()
      .toISOString()
      .slice(0, 10);

  // ------------------------------------
  // Create Payload
  // ------------------------------------

  const payload = {

    license_key,

    customer_name:
      values.customer_name,

    email:
      values.email,

    customer_id:
      values.customer_id,

    plan:
      values.plan,

    plan_id:
      values.plan_id,

    order_id:
      values.order_id,

    issue_date,

    expiry_date,

    device_id: null,

    status: "unused" as const,

    last_check: null,

    notes:
      values.notes,

  };

  // ------------------------------------
  // Insert Database
  // ------------------------------------

  const { data, error } =
    await supabase

      .from("licenses")

      .insert(payload)

      .select()

      .single();

  if (error) {
    throw error;
  }

  // ------------------------------------
  // Return Created License
  // ------------------------------------

  return data as License;

}
/* ========================================================= */
/* UPDATE LICENSE */
/* ========================================================= */

export async function updateLicense(
  id: string,
  values: Partial<License>
) {

  const { error } = await supabase

    .from("licenses")

    .update(values)

    .eq("id", id);

  if (error) {
    throw error;
  }

}

/* ========================================================= */
/* DELETE LICENSE */
/* ========================================================= */

export async function deleteLicense(
  id: string
) {

  const { error } = await supabase

    .from("licenses")

    .delete()

    .eq("id", id);

  if (error) {
    throw error;
  }

}