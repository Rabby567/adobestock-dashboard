/* ========================================================= */
/* CHECKOUT SERVICE */
/* ========================================================= */

import { supabase } from "../lib/supabase";

import { findOrCreateCustomer } from "./customerService";

import { createCheckoutOrder } from "./orderService";

import { createLicense } from "./licenseService";

import { sendLicenseEmail } from "./emailService";

import { mapPlanName, } from "../utils/license";
import { validatePromoCode, applyPromo, } from "./promoService";

/* ========================================================= */
/* TYPES */
/* ========================================================= */

export interface CheckoutData {

  customer_name: string;

  email: string;

  plan_id: string;

  promo_code: string | null;

  payment_method: string | null;

}

/* ========================================================= */
/* RESULT */
/* ========================================================= */

export interface CheckoutResult {

  success: boolean;

  message: string;

}

/* ========================================================= */
/* CHECKOUT */
/* ========================================================= */

export async function checkout(
  data: CheckoutData
): Promise<CheckoutResult> {

    // ------------------------------------
  // Customer
  // ------------------------------------

  const customer =
    await findOrCreateCustomer(
      data.customer_name,
      data.email
    );


    // ------------------------------------
// Promo
// ------------------------------------

let promo = null;

if (data.promo_code) {

  promo =
    await validatePromoCode(
      data.promo_code
    );

}

// ------------------------------------
// Plan
// ------------------------------------

const {
  data: planData,
  error: planPriceError,
} = await supabase

  .from("plans")

  .select("*")

  .eq("id", data.plan_id)

  .single();

if (planPriceError) {
  throw planPriceError;
}

// ------------------------------------
// Pricing
// ------------------------------------

let discountAmount = 0;

let finalPrice =
  planData.price;

if (promo) {

  const pricing =
    applyPromo(

      planData.price,

      promo.discount_value

    );

  discountAmount =
    pricing.discountAmount;

  finalPrice =
    pricing.finalPrice;

}

// ------------------------------------
// Payment Validation
// ------------------------------------

if (

  finalPrice > 0 &&

  !data.payment_method

) {

  throw new Error(
    "Please select a payment method."
  );

}

// ------------------------------------
// Payment Gateway
// ------------------------------------

if (

  finalPrice > 0

) {

  throw new Error(
    "Online payment gateway is not available yet."
  );

}

  // ------------------------------------
  // Create Order
  // ------------------------------------

const order =
  await createCheckoutOrder({

    customer_id: customer.id,

    plan_id: data.plan_id,

    promo_code_id:
  promo?.id ?? null,

    payment_method:
      data.payment_method,

    original_price:
      planData.price,

    discount_amount:
      discountAmount,

    final_price:
      finalPrice,

    currency:
      "USD",

    payment_status:
  finalPrice === 0
    ? "completed"
    : "pending",

    order_status:
  finalPrice === 0
    ? "completed"
    : "pending",

  });

  // ------------------------------------
  // Get Plan
  // ------------------------------------

  const {
    data: plan,
    error: planError,
  } = await supabase

    .from("plans")

    .select("name")

    .eq("id", data.plan_id)

    .single();

  if (planError) {
    throw planError;
  }

  // ------------------------------------
  // Create License
  // ------------------------------------

const license =

  await createLicense({

    customer_name:
      customer.name,

    email:
      customer.email,

    plan:
      mapPlanName(plan.name),

    customer_id:
      customer.id,

    plan_id:
      data.plan_id,

    order_id:
      order.id,

    notes: "",

  });


  // ------------------------------------
// Send License Email
// ------------------------------------

await sendLicenseEmail({

  customerName:

    customer.name,

  email:

    customer.email,

  licenseKey:

  license.license_key,

  plan:

    mapPlanName(plan.name),

  issueDate:

  license.issue_date,

  expiryDate:

  license.expiry_date,

});


  // ------------------------------------
  // Success
  // ------------------------------------

  return {

    success: true,

    message:
      "Checkout completed.",

  };

}