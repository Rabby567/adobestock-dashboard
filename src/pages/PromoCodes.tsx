/* eslint-disable react-hooks/set-state-in-effect */
import { useCallback, useEffect, useMemo, useState } from "react";

import DashboardLayout from "../components/layout/DashboardLayout";
import PromoModal from "../components/promo/PromoModal";

import {
  getPromos,
  createPromo,
  updatePromo,
  deletePromo,
} from "../services/promoService";

import PromoStats from "../components/promo/PromoStats";
import PromoToolbar from "../components/promo/PromoToolbar";

import type { Promo } from "../types/promo";

export default function PromoCodes() {
  const [promos, setPromos] = useState<Promo[]>([]);
  const [loading, setLoading] = useState(true);

  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("all");

  const [openModal, setOpenModal] = useState(false);
  const [selectedPromo, setSelectedPromo] =
  useState<Promo | null>(null);

 type PromoFormValues = {
  code: string;
  name: string;
  plan_id: string;

  promo_type: "free_plan" | "percentage" | "fixed";

  discount_value: number;
  max_uses: number;

  status: "active" | "inactive";
};

 const loadPromos = useCallback(async () => {
  try {
    setLoading(true);

    const data = await getPromos();

    setPromos(data);
  } catch (err) {
    console.error(err);
  } finally {
    setLoading(false);
  }
}, []);

async function handleCreatePromo(
  values: PromoFormValues
) {

  await createPromo(values);

  setOpenModal(false);
  setSelectedPromo(null);

  await loadPromos();
}

async function handleUpdatePromo(
  values: PromoFormValues
) {

  if (!selectedPromo) return;

  await updatePromo(selectedPromo.id, values);

  setOpenModal(false);
  setSelectedPromo(null);

  await loadPromos();
}

useEffect(() => {
  void loadPromos();
}, [loadPromos]);

  const filteredPromos = useMemo(() => {
    return promos.filter((promo) => {
      const matchSearch =
        promo.code.toLowerCase().includes(search.toLowerCase()) ||
        promo.name.toLowerCase().includes(search.toLowerCase());

      const matchStatus =
        status === "all" || promo.status === status;

      return matchSearch && matchStatus;
    });
  }, [promos, search, status]);

  return (
    <DashboardLayout>
      {/* Stats */}

     <PromoStats
  total={promos.length}
  active={promos.filter(p => p.status === "active").length}
  redeemed={promos.reduce((a, b) => a + b.used_count, 0)}
  expired={
  promos.filter((p) => {
    if (!p.expires_at) return false;

    return new Date(p.expires_at) < new Date();
  }).length
}
/>

      {/* Toolbar */}

      <PromoToolbar
        search={search}
        setSearch={setSearch}
        status={status}
        setStatus={setStatus}
        onCreate={() => {
  setSelectedPromo(null);
  setOpenModal(true);
}}
      />

      {/* Table */}

      <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">

        <table className="w-full">

          <thead className="bg-slate-100">

            <tr>

              <th className="px-6 py-4 text-left">
                Code
              </th>

              <th className="px-6 py-4 text-left">
                Plan
              </th>

              <th className="px-6 py-4 text-left">
                Type
              </th>

              <th className="px-6 py-4 text-left">
                Uses
              </th>

              <th className="px-6 py-4 text-left">
                Status
              </th>

              <th className="px-6 py-4 text-right">
                Actions
              </th>

            </tr>

          </thead>

         <tbody>

{loading && (

<tr>

<td
colSpan={6}
className="py-10 text-center text-slate-500"
>

Loading...

</td>

</tr>

)}

{!loading && filteredPromos.length === 0 && (

<tr>

<td
colSpan={6}
className="py-10 text-center text-slate-500"
>

No promo codes found.

</td>

</tr>

)}

{filteredPromos.map((promo) => (

<tr key={promo.id}>

<td className="px-6 py-5 font-semibold">

{promo.code}

</td>

<td className="px-6 py-5">

{promo.plans?.name ?? "-"}

</td>

<td className="px-6 py-5">

{promo.promo_type}

</td>

<td className="px-6 py-5">

{promo.used_count} / {promo.max_uses}

</td>

<td className="px-6 py-5">

<span
className={`rounded-full px-3 py-1 text-sm font-semibold ${
promo.status === "active"
? "bg-green-100 text-green-700"
: "bg-red-100 text-red-700"
}`}
>

{promo.status}

</span>

</td>

<td className="px-6 py-5 text-right">

<button
  className="mr-3 text-blue-600"
  onClick={() => {
    setSelectedPromo(promo);
    setOpenModal(true);
  }}
>
  Edit
</button>
<button
className="text-red-600"
onClick={async () => {

if (!confirm("Delete promo?"))
return;

await deletePromo(promo.id);

loadPromos();

}}
>

Delete

</button>

</td>

</tr>

))}

</tbody>

        </table>

      </div>

      {/* Modal পরে এখানে আসবে */}

     <PromoModal
  open={openModal}
  promo={selectedPromo}
  onClose={() => {
    setOpenModal(false);
    setSelectedPromo(null);
  }}
  onSave={
    selectedPromo
      ? handleUpdatePromo
      : handleCreatePromo
  }
/>

    </DashboardLayout>
  );
}