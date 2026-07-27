import type { Dispatch, SetStateAction } from "react";

interface CheckoutFormProps {

  customerName: string;

  setCustomerName: Dispatch<
    SetStateAction<string>
  >;

  email: string;

  setEmail: Dispatch<
    SetStateAction<string>
  >;

  paymentMethod: string;

  setPaymentMethod: Dispatch<
    SetStateAction<string>
  >;

  promoCode: string;

  setPromoCode: Dispatch<
    SetStateAction<string>
  >;

  applyPromo: () => void;
  onSubmit: () => void;

}

export default function CheckoutForm({

  customerName,

  setCustomerName,

  email,

  setEmail,

  paymentMethod,

  setPaymentMethod,

  promoCode,

  setPromoCode,

applyPromo,

onSubmit,

}: CheckoutFormProps) {

  return (

    <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">

      {/* ========================================= */}
      {/* Header */}
      {/* ========================================= */}

      <h2 className="text-3xl font-bold text-slate-900">

        Checkout

      </h2>

      <p className="mt-2 text-slate-500">

        Complete your purchase securely.

      </p>

      <div className="mt-8 space-y-6">

        {/* ========================================= */}
        {/* Full Name */}
        {/* ========================================= */}

        <div>

          <label className="mb-2 block text-sm font-medium text-slate-700">

            Full Name

          </label>

         <input
  type="text"
  value={customerName}
  onChange={(e) =>
    setCustomerName(e.target.value)
  }
  placeholder="John Smith"
  className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none transition focus:border-blue-600"
/>

        </div>

        {/* ========================================= */}
        {/* Email */}
        {/* ========================================= */}

        <div>

          <label className="mb-2 block text-sm font-medium text-slate-700">

            Email Address

          </label>

          <input
  type="email"
  value={email}
  onChange={(e) =>
    setEmail(e.target.value)
  }
  placeholder="john@email.com"
  className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none transition focus:border-blue-600"
/>

        </div>

        {/* ========================================= */}
        {/* Promo Code */}
        {/* ========================================= */}

        <div>

          <label className="mb-2 block text-sm font-medium text-slate-700">

            Promo Code

          </label>

          <div className="flex gap-3">

            <input
              type="text"
              value={promoCode}
              onChange={(e) =>
                setPromoCode(
                  e.target.value.toUpperCase()
                )
              }
              placeholder="WELCOME100"
              className="flex-1 rounded-xl border border-slate-300 px-4 py-3 outline-none transition focus:border-blue-600"
            />

            <button
              type="button"
              onClick={applyPromo}
              className="rounded-xl bg-slate-900 px-6 font-semibold text-white transition hover:bg-slate-700"
            >

              Apply

            </button>

          </div>

        </div>

        {/* ========================================= */}
        {/* Payment Method */}
        {/* ========================================= */}

        <div>

          <label className="mb-2 block text-sm font-medium text-slate-700">

            Payment Method

          </label>

          <select
  value={paymentMethod}
  onChange={(e) =>
    setPaymentMethod(e.target.value)
  }
  className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none transition focus:border-blue-600"
>

  <option value="">

    Select Payment Method

  </option>

  <option value="bkash">

    bKash

  </option>

  <option value="nagad">

    Nagad

  </option>

  <option value="stripe">

    Stripe

  </option>

</select>

        </div>

        {/* ========================================= */}
        {/* Checkout Button */}
        {/* ========================================= */}

       <button
  type="button"
  onClick={onSubmit}
  className="w-full rounded-xl bg-blue-600 py-4 font-semibold text-white transition hover:bg-blue-700"
>

  Complete Purchase

</button>

      </div>

    </div>

  );

}