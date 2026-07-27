// =====================================================
// IMPORTS
// =====================================================

import { useEffect, useState } from "react";

import Modal from "../ui/Modal";
import Button from "../ui/Button";

import {
  getCustomers,
  getPlans,
  getPromoCodes,
} from "../../services/orderService";

import type { Order } from "../../types/order";


// =====================================================
// TYPES
// =====================================================

interface OrderModalProps {

  open: boolean;

  order?: Order | null;

  onClose: () => void;

  onSave: (values: {

    customer_id: string;

    plan_id: string;

    promo_code_id: string | null;

    payment_method: string;

    payment_status: string;

    order_status: string;

  }) => Promise<void>;

}


// =====================================================
// COMPONENT
// =====================================================

export default function OrderModal({

  open,
  order,
  onClose,
  onSave,

}: OrderModalProps) {


// =====================================================
// STATES
// =====================================================

const [customerId, setCustomerId] =
useState("");

const [planId, setPlanId] =
useState("");

const [promoCodeId, setPromoCodeId] =
useState("");

const [paymentMethod, setPaymentMethod] =
useState("manual");

const [paymentStatus, setPaymentStatus] =
useState("pending");

const [orderStatus, setOrderStatus] =
useState("pending");


// =====================================================
// DROPDOWNS
// =====================================================

const [customers, setCustomers] = useState<
{ id: string; name: string }[]
>([]);

const [plans, setPlans] = useState<
{ id: string; name: string }[]
>([]);

const [promoCodes, setPromoCodes] =
useState<
{ id: string; code: string }[]
>([]);



// =====================================================
// LOAD DROPDOWN DATA
// =====================================================

useEffect(() => {

  async function loadData() {

    const customerData =
      await getCustomers();

    const planData =
      await getPlans();

    const promoData =
      await getPromoCodes();

    setCustomers(customerData ?? []);

    setPlans(planData ?? []);

    setPromoCodes(promoData ?? []);

  }

  void loadData();

}, []);



// =====================================================
// LOAD ORDER WHEN EDIT
// =====================================================

useEffect(() => {

  if (!order) {

    setCustomerId("");

    setPlanId("");

    setPromoCodeId("");

    setPaymentMethod("manual");

    setPaymentStatus("pending");

    setOrderStatus("pending");

    return;

  }

  setCustomerId(order.customer_id);

  setPlanId(order.plan_id);

  setPromoCodeId(order.promo_code_id ?? "");

  setPaymentMethod(order.payment_method);

  setPaymentStatus(order.payment_status);

  setOrderStatus(order.order_status);

}, [order]);



// =====================================================
// SAVE
// =====================================================

async function handleSave() {

  await onSave({

    customer_id: customerId,

    plan_id: planId,

    promo_code_id:
      promoCodeId || null,

    payment_method:
      paymentMethod,

    payment_status:
      paymentStatus,

    order_status:
      orderStatus,

  });

}


// =====================================================
// UI
// =====================================================

return (

  <Modal
    open={open}
    title={
      order
        ? "Edit Order"
        : "Create Order"
    }
    onClose={onClose}
  >

    <div className="grid grid-cols-2 gap-5">

      {/* Customer */}

      <div>

        <label className="mb-2 block text-sm font-semibold">
          Customer
        </label>

        <select
          value={customerId}
          onChange={(e) =>
            setCustomerId(e.target.value)
          }
          className="w-full rounded-xl border px-4 py-3"
        >
          <option value="">
            Select Customer
          </option>

          {customers.map((customer) => (

            <option
              key={customer.id}
              value={customer.id}
            >
              {customer.name}
            </option>

          ))}

        </select>

      </div>

      {/* Plan */}

      <div>

        <label className="mb-2 block text-sm font-semibold">
          Plan
        </label>

        <select
          value={planId}
          onChange={(e) =>
            setPlanId(e.target.value)
          }
          className="w-full rounded-xl border px-4 py-3"
        >
          <option value="">
            Select Plan
          </option>

          {plans.map((plan) => (

            <option
              key={plan.id}
              value={plan.id}
            >
              {plan.name}
            </option>

          ))}

        </select>

      </div>

      {/* Promo */}

      <div>

        <label className="mb-2 block text-sm font-semibold">
          Promo Code
        </label>

        <select
          value={promoCodeId}
          onChange={(e) =>
            setPromoCodeId(e.target.value)
          }
          className="w-full rounded-xl border px-4 py-3"
        >
          <option value="">
            No Promo
          </option>

          {promoCodes.map((promo) => (

            <option
              key={promo.id}
              value={promo.id}
            >
              {promo.code}
            </option>

          ))}

        </select>

      </div>

      {/* Payment Method */}

      <div>

        <label className="mb-2 block text-sm font-semibold">
          Payment Method
        </label>

        <select
          value={paymentMethod}
          onChange={(e) =>
            setPaymentMethod(e.target.value)
          }
          className="w-full rounded-xl border px-4 py-3"
        >
          <option value="manual">
            Manual
          </option>

          <option value="bkash">
            bKash
          </option>

          <option value="nagad">
            Nagad
          </option>

          <option value="card">
            Card
          </option>

        </select>

      </div>

      {/* Payment Status */}

      <div>

        <label className="mb-2 block text-sm font-semibold">
          Payment Status
        </label>

        <select
          value={paymentStatus}
          onChange={(e) =>
            setPaymentStatus(e.target.value)
          }
          className="w-full rounded-xl border px-4 py-3"
        >
         <option value="pending">Pending</option>
<option value="completed">Completed</option>
<option value="failed">Failed</option>
<option value="refunded">Refunded</option>

        </select>

      </div>

      {/* Order Status */}

      <div>

        <label className="mb-2 block text-sm font-semibold">
          Order Status
        </label>

        <select
          value={orderStatus}
          onChange={(e) =>
            setOrderStatus(e.target.value)
          }
          className="w-full rounded-xl border px-4 py-3"
        >
          <option value="pending">
  Pending
</option>

<option value="completed">
  Completed
</option>

<option value="failed">
  Failed
</option>

<option value="refunded">
  Refunded
</option>

        </select>

      </div>

    </div>

    <div className="mt-8 flex justify-end gap-3">

      <Button
        variant="outline"
        onClick={onClose}
      >
        Cancel
      </Button>

      <Button onClick={handleSave}>
        Save Order
      </Button>

    </div>

  </Modal>

);
}