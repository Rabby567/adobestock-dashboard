import { useEffect, useState } from "react";
import {
  useSearchParams,
  useNavigate,
} from "react-router-dom";

import CheckoutForm from "../components/checkout/CheckoutForm";
import OrderSummary from "../components/checkout/OrderSummary";

import type { Plan } from "../../types/plan";
import { checkout } from "../../services/checkoutService";
import { getPlanById } from "../../services/planService";
import {
  validatePromoCode,
  applyPromo as calculatePromo,
} from "../../services/promoService";

export default function Checkout() {

  const [searchParams] =
    useSearchParams();

    const navigate =
  useNavigate();

  // ------------------------------------
  // Plan
  // ------------------------------------

  const [plan, setPlan] =
    useState<Plan | null>(null);

  // ------------------------------------
  // Pricing
  // ------------------------------------

  const [discountAmount, setDiscountAmount] =
    useState(0);

  const [finalPrice, setFinalPrice] =
    useState(0);

  // ------------------------------------
  // Promo
  // ------------------------------------

  const [promoCode, setPromoCode] =
    useState("");

  const [promoApplied, setPromoApplied] =
    useState(false);

    // ------------------------------------
// Customer
// ------------------------------------

const [customerName, setCustomerName] =
  useState("");

const [email, setEmail] =
  useState("");

const [paymentMethod, setPaymentMethod] =
  useState("");

  // ------------------------------------
  // Load Selected Plan
  // ------------------------------------

  useEffect(() => {

    async function loadPlan() {

      const planId =
        searchParams.get("plan");

      if (!planId) {
        return;
      }

      try {

        const data =
          await getPlanById(planId);

        console.log("PLAN:", data);

        setPlan(data);

        setFinalPrice(data.price);

      } catch (error) {

        console.error(error);

      }

    }

    loadPlan();

  }, [searchParams]);

  // ------------------------------------
  // Apply Promo
  // ------------------------------------

async function applyPromo() {

  if (!plan) {
    return;
  }

  if (!promoCode.trim()) {

    alert("Enter promo code.");

    return;

  }

  try {

    const promo =
      await validatePromoCode(
        promoCode
      );



    // ------------------------------------
    // Promo Exists
    // ------------------------------------

    if (!promo) {

      alert("Invalid Promo Code");

      return;

    }

    // ------------------------------------
    // Promo Status
    // ------------------------------------

    if (promo.status !== "active") {

      alert(
        "This promo code is inactive."
      );

      return;

    }

    // ------------------------------------
    // Expiry Validation
    // ------------------------------------

    if (

      promo.expires_at &&

      new Date(promo.expires_at) < new Date()

    ) {

      alert(
        "This promo code has expired."
      );

      return;

    }

    // ------------------------------------
    // Usage Limit
    // ------------------------------------

    if (

      promo.max_usage &&

      promo.used_count >= promo.max_usage

    ) {

      alert(
        "Promo usage limit reached."
      );

      return;

    }

    // ------------------------------------
    // Plan Validation
    // ------------------------------------

    if (promo.plan_id !== plan.id) {

      alert(
        "This promo code is not valid for this plan."
      );

      return;

    }

    // ------------------------------------
    // Calculate Discount
    // ------------------------------------

    const pricing =
      calculatePromo(
        plan.price,
        promo.discount_value
      );

    setDiscountAmount(
      pricing.discountAmount
    );

    setFinalPrice(
      pricing.finalPrice
    );

    setPromoApplied(true);

    console.log(
      "PROMO APPLIED:",
      promo
    );

  } catch (error) {

    console.error(error);

    alert(
      "Unable to validate promo code."
    );

  }

}

      // ------------------------------------
// Complete Checkout
// ------------------------------------

async function handleCheckout() {

    // ------------------------------------
// Free Promo Checkout
// ------------------------------------

if (finalPrice > 0) {

  alert(
    "Online payment is not available yet."
  );

  return;

}

    if (!plan) {

  alert("Please select a plan.");

  return;

}

if (!customerName.trim()) {

  alert("Please enter your name.");

  return;

}

if (!email.trim()) {

  alert("Please enter your email.");

  return;

}

if (!paymentMethod) {

  alert("Please select a payment method.");

  return;

}

 try {

  const result =
  await checkout({

    customer_name:
      customerName,

    email,

    plan_id:
      plan.id,

    promo_code:
      promoCode || null,

    payment_method:
      paymentMethod,

});

navigate("/success", {

  state: result,

});

} catch (error) {

  console.error(error);

  alert("Checkout failed.");

}



}

  return (

    <section className="min-h-screen bg-slate-50 py-20">

      <div className="mx-auto grid max-w-7xl gap-10 px-6 lg:grid-cols-3">

        {/* Checkout Form */}

        <div className="lg:col-span-2">

<CheckoutForm
  customerName={customerName}
  setCustomerName={setCustomerName}

  email={email}
  setEmail={setEmail}

  paymentMethod={paymentMethod}
  setPaymentMethod={setPaymentMethod}

  promoCode={promoCode}
  setPromoCode={setPromoCode}

  applyPromo={applyPromo}

  onSubmit={handleCheckout}
/>

        </div>

        {/* Order Summary */}

        <div>

          <OrderSummary
  plan={plan}
  discountAmount={discountAmount}
  finalPrice={finalPrice}
  promoApplied={promoApplied}
/>

        </div>

      </div>

    </section>

  );

}