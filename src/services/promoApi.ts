import { supabase } from "../lib/supabase";

import type { Promo } from "../types/promo";

const TABLE = "promo_codes";

export async function getPromos() {
  const { data, error } = await supabase
    .from(TABLE)
    .select("*")
    .order("created_at", { ascending: false });

  if (error) throw error;

  return (data ?? []) as Promo[];
}

export async function createPromo(
  promo: Omit<Promo, "created_at">
) {
  const { error } = await supabase
    .from(TABLE)
    .insert(promo);

  if (error) throw error;
}

export async function updatePromo(
  id: string,
  values: Partial<Promo>
) {
  const { error } = await supabase
    .from(TABLE)
    .update(values)
    .eq("id", id);

  if (error) throw error;
}

export async function deletePromo(id: string) {
  const { error } = await supabase
    .from(TABLE)
    .delete()
    .eq("id", id);

  if (error) throw error;
}