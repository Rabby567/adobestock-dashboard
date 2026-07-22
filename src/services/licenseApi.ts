import { supabase } from "../lib/supabase";
import type { License } from "../types/license";

function mapLicense(item: any): License {
  return {
    id: item.id,
    licenseKey: item.license_key,
    customer: item.customer_name,
    email: item.email ?? "",
    plan: item.plan,
    issueDate: item.issue_date,
    expiry: item.expiry_date,
    device: item.device_id,
    status: item.status,
    lastCheck: item.last_check,
    notes: item.notes ?? "",
  };
}

// ===============================
// Get All Licenses
// ===============================

export async function getLicenses(): Promise<License[]> {
  const { data, error } = await supabase
    .from("licenses")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) {
  console.error("Supabase Insert Error:", error);
  throw error;
}

  return (data ?? []).map(mapLicense);
}

// ===============================
// Create License
// ===============================

export async function createLicense(data: License) {
  const { error } = await supabase.from("licenses").insert({
    license_key: data.licenseKey,
    customer_name: data.customer,
    email: data.email,
    plan: data.plan,
    issue_date: data.issueDate,
    expiry_date: data.expiry,
    device_id: data.device,
    status: data.status,
    last_check: data.lastCheck,
    notes: data.notes,
  });

  if (error) throw error;

  return { success: true };
}

// ===============================
// Update License
// ===============================

export async function updateLicense(
  id: string,
  data: Partial<License>
) {
  const payload: any = {};

  if (data.customer !== undefined)
    payload.customer_name = data.customer;

  if (data.email !== undefined)
    payload.email = data.email;

  if (data.plan !== undefined)
    payload.plan = data.plan;

  if (data.expiry !== undefined)
    payload.expiry_date = data.expiry;

  if (data.notes !== undefined)
    payload.notes = data.notes;

  if (data.status !== undefined)
  payload.status = data.status;

  const { error } = await supabase
    .from("licenses")
    .update(payload)
    .eq("id", id);

  if (error) throw error;

  return { success: true };
}

// ===============================
// Delete License
// ===============================

export async function deleteLicense(id: string) {
  const { error } = await supabase
    .from("licenses")
    .delete()
    .eq("id", id);

  if (error) throw error;

  return { success: true };
}