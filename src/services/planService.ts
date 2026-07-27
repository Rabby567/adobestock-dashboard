import { supabase } from "../lib/supabase";
import type { Plan } from "../types/plan";

export async function getActivePlans() {

  const { data, error } =
    await supabase

      .from("plans")

      .select("*")

      .eq("status", "active")

      .order("price", {
        ascending: true,
      });

  if (error) {
    throw error;
  }

  return data ?? [];

}

/* ========================================================= */
/* GET PLAN BY ID */
/* ========================================================= */


export async function getPlanById(
  id: string
): Promise<Plan> {

  const { data, error } =
    await supabase

      .from("plans")

      .select("*")

      .eq("id", id)

      .single();

  if (error) {
    throw error;
  }

  return data as Plan;

}