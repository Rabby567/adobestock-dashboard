import { useEffect, useState } from "react";

import type { Plan } from "../../types/plan";

import { getActivePlans } from "../../services/planService";
import { useNavigate } from "react-router-dom";

export default function Pricing() {

  const navigate =
    useNavigate();

  const [plans, setPlans] =

  useState<Plan[]>([]);

async function loadPlans() {

  try {

    const data =
      await getActivePlans();

    setPlans(data);

  } catch (error) {

    console.error(error);

  }

}

useEffect(() => {

  loadPlans();

}, []);

 return (

  <section className="bg-white py-24">

    <div className="mx-auto max-w-7xl px-6">

      {/* Header */}

      <div className="mx-auto mb-16 max-w-3xl text-center">

        <h2 className="text-4xl font-bold text-slate-900">

          Choose Your Perfect Plan

        </h2>

        <p className="mt-4 text-lg text-slate-500">

          Simple pricing. Secure activation.
          Instant license delivery.

        </p>

      </div>

      {/* Plans */}

      <div className="grid gap-8 md:grid-cols-2 xl:grid-cols-3">

        {plans.map((plan) => (

          <div
            key={plan.id}
            className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
          >

            <div className="mb-8">

  <h3 className="text-2xl font-bold text-slate-900">

    {plan.name}

  </h3>

  <p className="mt-2 text-slate-500">

    {plan.duration_days
      ? `${plan.duration_days} Days`
      : "Lifetime Access"}

  </p>

</div>

<div className="mb-8">

  <span className="text-5xl font-bold text-slate-900">

    ${plan.price}

  </span>

</div>

<ul className="mb-10 space-y-4">

  <li>✓ Instant License Delivery</li>

  <li>✓ Secure Device Activation</li>

  <li>✓ Email Support</li>

  <li>✓ Free Updates</li>

</ul>

<button
  onClick={() =>
    navigate(
      `/checkout?plan=${plan.id}`
    )
  }
  className="w-full rounded-xl bg-blue-600 py-3 font-semibold text-white transition hover:bg-blue-700"
>

  {plan.price === 0
    ? "Get Started"
    : "Buy Now"}

</button>

          </div>

        ))}

      </div>

    </div>

  </section>

);

}