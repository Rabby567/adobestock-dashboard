import { supabase } from "../lib/supabase";

export async function getCustomers() {
  const { data, error } = await supabase
    .from("customers")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) throw error;

  return data;
}

export async function createCustomer(values: {
  name: string;
  email: string;
  status: "active" | "inactive";
  email_verified: boolean;
}) {
  const { error } = await supabase
    .from("customers")
    .insert(values);

  if (error) throw error;
}

/* ========================================================= */
/* FIND OR CREATE CUSTOMER */
/* ========================================================= */
export async function findOrCreateCustomer(
  name: string,
  email: string
) {

  // ------------------------------------
  // Find Existing Customer
  // ------------------------------------

  const { data: existingCustomer, error: findError } =
    await supabase

      .from("customers")

      .select("*")

      .eq("email", email)

      .maybeSingle();

  if (findError) {
    throw findError;
  }

  // ------------------------------------
  // Customer Already Exists
  // ------------------------------------

  if (existingCustomer) {
    return existingCustomer;
  }

  // ------------------------------------
  // Create New Customer
  // ------------------------------------

  const { data: newCustomer, error: createError } =
    await supabase

      .from("customers")

      .insert({

        name,

        email,

        status: "active",

        email_verified: false,

      })

      .select()

      .single();

  if (createError) {
    throw createError;
  }

  // ------------------------------------
  // Return Customer
  // ------------------------------------

  return newCustomer;

}


export async function updateCustomer(
  id: string,
  values: {
    name: string;
    email: string;
    status: "active" | "inactive";
    email_verified: boolean;
  }
) {
  const { error } = await supabase
    .from("customers")
    .update(values)
    .eq("id", id);

  if (error) throw error;
}

export async function deleteCustomer(id: string) {
  const { error } = await supabase
    .from("customers")
    .delete()
    .eq("id", id);

  if (error) throw error;
}