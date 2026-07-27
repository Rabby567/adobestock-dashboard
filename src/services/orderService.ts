// =====================================================
// SUPABASE
// =====================================================

import { supabase } from "../lib/supabase";

import type { Order } from "../types/order";

// ==============================================
// ORDER FORM TYPE
// ==============================================

type OrderFormValues = {
  customer_id: string;
  plan_id: string;
  promo_code_id: string | null;

  payment_method: string;
  payment_status: string;
  order_status: string;
};


// =====================================================
// GET ALL ORDERS
// =====================================================

export async function getOrders(): Promise<Order[]> {

  const { data, error } = await supabase

    .from("orders")

    .select(`
      *,
      customers (
        name,
        email
      ),
      plans (
        name
      ),
      promo_codes (
        code
      )
    `)

    .order("created_at", {
      ascending: false,
    });

  if (error) throw error;

  return (data ?? []) as Order[];
}


// =====================================================
// CREATE ORDER
// =====================================================

export async function createOrder(
  values: OrderFormValues
) {
  const dataToInsert = {
    ...values,
    order_number: `ORD-${Date.now()}`
  };

  console.log("ORDER VALUES:", dataToInsert);

  const { error } = await supabase
    .from("orders")
    .insert(dataToInsert);

  if (error) throw error;
}

// =====================================================
// CREATE CHECKOUT ORDER
// =====================================================

type CheckoutOrderValues = {

  customer_id: string;

  plan_id: string;

  promo_code_id: string | null;

  payment_method: string | null;

  original_price: number;

discount_amount: number;

final_price: number;

currency: string;

payment_status: string;

order_status: string;

};

export async function createCheckoutOrder(
  values: CheckoutOrderValues
) {

 
  // ------------------------------------
  // Generate Order Number
  // ------------------------------------

  const orderNumber =
    `ORD-${Date.now()}`;

  // ------------------------------------
  // Create Order
  // ------------------------------------

  const { data, error } =
    await supabase

      .from("orders")

.insert({

  order_number: orderNumber,

  customer_id: values.customer_id,

  plan_id: values.plan_id,

  promo_code_id: values.promo_code_id,

  payment_method: values.payment_method,

  original_price: values.original_price,

  discount_amount: values.discount_amount,

  final_price: values.final_price,

  currency: values.currency,

  payment_status: values.payment_status,

  order_status: values.order_status,

})

      .select()

      .single();

  if (error) {
    throw error;
  }

  return data;

}

// =====================================================
// UPDATE ORDER
// =====================================================

export async function updateOrder(
  id: string,
  values: Partial<OrderFormValues>
) {

  const { error } = await supabase
    .from("orders")
    .update(values)
    .eq("id", id);

  if (error) throw error;
}


// =====================================================
// DELETE ORDER
// =====================================================

export async function deleteOrder(
  id: string
) {

  const { error } = await supabase
    .from("orders")
    .delete()
    .eq("id", id);

  if (error) throw error;
}


// =====================================================
// GET CUSTOMERS
// =====================================================

export async function getCustomers() {

  const { data, error } = await supabase

    .from("customers")

    .select("id,name")

    .eq("status", "active")

    .order("name");

  if (error) throw error;

  return data;
}


// =====================================================
// GET PLANS
// =====================================================

export async function getPlans() {

  const { data, error } = await supabase

    .from("plans")

    .select("id,name")

    .eq("status", "active")

    .order("price");

  if (error) throw error;

  return data;
}


// =====================================================
// GET PROMO CODES
// =====================================================

export async function getPromoCodes() {

  const { data, error } = await supabase

    .from("promo_codes")

    .select("id,code")

    .eq("status", "active")

    .order("code");

  if (error) throw error;

  return data;
}