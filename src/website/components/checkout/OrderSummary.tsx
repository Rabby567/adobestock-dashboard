import type { Plan } from "../../../types/plan";

interface OrderSummaryProps {

  plan: Plan | null;

  discountAmount: number;

  finalPrice: number;

  promoApplied: boolean;

}

export default function OrderSummary({

  plan,

  discountAmount,

  finalPrice,

  promoApplied,

}: OrderSummaryProps) {

  return (

    <div className="sticky top-24 rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">

      {/* Header */}

      <h2 className="text-2xl font-bold text-slate-900">

        Order Summary

      </h2>

      <div className="mt-8 space-y-6">

        {/* Selected Plan */}

        <div>

          <p className="text-sm text-slate-500">

            Selected Plan

          </p>

          <h3 className="mt-1 text-xl font-semibold text-slate-900">

            {plan?.name ?? "-"}

          </h3>

        </div>

        {/* Original Price */}

        <div className="flex items-center justify-between">

          <span className="text-slate-600">

            Price

          </span>

          <span className="font-semibold">

            USD {plan?.price.toFixed(2) ?? "0.00"}

          </span>

        </div>

        {/* Discount */}

        {promoApplied && (

          <div className="flex items-center justify-between">

            <span className="text-green-600">

              Discount

            </span>

            <span className="font-semibold text-green-600">

              -USD {discountAmount.toFixed(2)}

            </span>

          </div>

        )}

        {/* Duration */}

        <div className="flex items-center justify-between">

          <span className="text-slate-600">

            Duration

          </span>

          <span>

            {plan?.duration_days
              ? `${plan.duration_days} Days`
              : "Lifetime Access"}

          </span>

        </div>

        <hr />

        {/* Total */}

        <div className="flex items-center justify-between text-lg font-bold">

          <span>

            Total

          </span>

          <span>

            USD {finalPrice.toFixed(2)}

          </span>

        </div>

      </div>

    </div>

  );

}