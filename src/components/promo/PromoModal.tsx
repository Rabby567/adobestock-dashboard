
import { useEffect, useState } from "react";

import Modal from "../ui/Modal";
import Button from "../ui/Button";
import Input from "../ui/Input";
import { getPlans } from "../../services/promoService";

import type { Promo } from "../../types/promo";

interface PromoModalProps {
  open: boolean;
  promo?: Promo | null;

  onClose: () => void;

  onSave: (values: {
  code: string;
  name: string;
  plan_id: string;

  promo_type:
    | "free_plan"
    | "percentage"
    | "fixed";

  discount_value: number;

  max_uses: number;

  status: "active" | "inactive";
}) => Promise<void>;

}

export default function PromoModal({
  open,
  promo,
  onClose,
  onSave,
}: PromoModalProps) {

  const [code, setCode] = useState("");
  const [name, setName] = useState("");
  const [planId, setPlanId] = useState("");
  const [promoType, setPromoType] = useState<
  "free_plan" | "percentage" | "fixed"
>("free_plan");
  const [discount, setDiscount] = useState(0);
  const [maxUses, setMaxUses] = useState(100);
  const [status, setStatus] = useState<
  "active" | "inactive"
>("active");

const [plans, setPlans] = useState<
  { id: string; name: string }[]
>([]);

  useEffect(() => {
  if (promo) {
    setCode(promo.code);
    setName(promo.name);
    setPlanId(promo.plan_id);

    setPromoType(
      promo.promo_type as
        | "free_plan"
        | "percentage"
        | "fixed"
    );

    setDiscount(promo.discount_value);
    setMaxUses(promo.max_uses);

    setStatus(
      promo.status as
        | "active"
        | "inactive"
    );
  } else {
    setCode("");
    setName("");
    setPlanId("");
    setPromoType("free_plan");
    setDiscount(0);
    setMaxUses(100);
    setStatus("active");
  }
}, [promo]);

useEffect(() => {
  async function loadPlans() {
    try {
      const data = await getPlans();
      setPlans(data ?? []);
    } catch (err) {
      console.error(err);
    }
  }

  void loadPlans();
}, []);

  async function handleSave() {

    await onSave({
      code,
      name,
      plan_id: planId,
      promo_type: promoType,
      discount_value: discount,
      max_uses: maxUses,
      status,
    });

  }

  return (

    <Modal
      open={open}
      title={promo ? "Edit Promo" : "Create Promo"}
      onClose={onClose}
    >

      <div className="grid grid-cols-2 gap-5">

    <Input
  label="Promo Code"
  value={code}
  onChange={(e) => setCode(e.target.value)}
/>

        <Input
          label="Promo Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />


<div>

  <label className="mb-2 block text-sm font-semibold">
    Plan
  </label>

  <select
    value={planId}
    onChange={(e) => setPlanId(e.target.value)}
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
      
        <div>

          <label className="mb-2 block text-sm font-semibold">

            Promo Type

          </label>

         <select
  value={promoType}
  onChange={(e) =>
    setPromoType(
      e.target.value as
        | "free_plan"
        | "percentage"
        | "fixed"
    )
  }
  className="w-full rounded-xl border px-4 py-3"
>

            <option value="free_plan">
              Free Plan
            </option>

            <option value="percentage">
              Percentage
            </option>

            <option value="fixed">
              Fixed
            </option>

          </select>

        </div>

        <Input
          type="number"
          label="Discount"
          value={discount}
          onChange={(e) =>
            setDiscount(Number(e.target.value))
          }
        />

        <Input
          type="number"
          label="Maximum Uses"
          value={maxUses}
          onChange={(e) =>
            setMaxUses(Number(e.target.value))
          }
        />

      </div>

      <div>

  <label className="mb-2 block text-sm font-semibold">
    Status
  </label>

  <select
    value={status}
    onChange={(e) =>
      setStatus(
        e.target.value as
          | "active"
          | "inactive"
      )
    }
    className="w-full rounded-xl border px-4 py-3"
  >
    <option value="active">
      Active
    </option>

    <option value="inactive">
      Inactive
    </option>
  </select>

</div>

      <div className="mt-8 flex justify-end gap-3">

        <Button
          variant="outline"
          onClick={onClose}
        >
          Cancel
        </Button>

        <Button onClick={handleSave}>

          Save Promo

        </Button>

      </div>

    </Modal>

  );

}