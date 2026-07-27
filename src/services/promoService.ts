import { supabase } from "../lib/supabase";
import type { Promo } from "../types/promo";

const TABLE = "promo_codes";

/**
 * Get all promo codes
 */
export async function getPromos(): Promise<Promo[]> {
  const { data, error } = await supabase
    .from(TABLE)
    .select(`
      *,
      plans (
        id,
        name
      )
    `)
    .order("created_at", { ascending: false });

  if (error) throw error;

  return (data ?? []) as Promo[];
}

/**
 * Create promo
 */
export async function createPromo(values: Partial<Promo>) {
  const { data, error } = await supabase
    .from(TABLE)
    .insert(values)
    .select()
    .single();

  if (error) throw error;

  return data;
}

/**
 * Update promo
 */
export async function updatePromo(
  id: string,
  values: Partial<Promo>
) {
  const { data, error } = await supabase
    .from(TABLE)
    .update(values)
    .eq("id", id)
    .select()
    .single();

  if (error) throw error;

  return data;
}

/**
 * Delete promo
 */
export async function deletePromo(id: string) {
  const { error } = await supabase
    .from(TABLE)
    .delete()
    .eq("id", id);

  if (error) throw error;
}


export async function getPlans() {
  const { data, error } = await supabase
    .from("plans")
    .select("id, name")
    .eq("status", "active")
    .order("name");

  if (error) throw error;

  return data;
}

/* ========================================================= */
/* VALIDATE PROMO CODE */
/* ========================================================= */

export async function validatePromoCode(
  code: string
) {

  const { data, error } =
    await supabase

      .from("promo_codes")

      .select("*")

      .eq("code", code)

      .eq("status", "active")

      .maybeSingle();

  if (error) {
    throw error;
  }

  return data;

}


/* ========================================================= */
/* APPLY PROMO */
/* ========================================================= */

export function applyPromo(

  originalPrice: number,

  discountValue: number

) {

  const discountAmount =

    Math.min(
      originalPrice,
      discountValue
    );

  const finalPrice =

    originalPrice -
    discountAmount;

  return {

    discountAmount,

    finalPrice,

  };

}