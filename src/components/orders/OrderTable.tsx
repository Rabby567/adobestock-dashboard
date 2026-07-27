// =====================================================
// IMPORTS
// =====================================================

import type { Order } from "../../types/order";


// =====================================================
// PROPS
// =====================================================

interface OrderTableProps {

  orders: Order[];

  loading: boolean;

  onEdit: (order: Order) => void;

  onDelete: (order: Order) => void;

}


// =====================================================
// COMPONENT
// =====================================================

export default function OrderTable({

  orders,

  loading,

  onEdit,

  onDelete,

}: OrderTableProps) {


// =====================================================
// UI
// =====================================================

return (

<div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">

<table className="w-full">

<thead className="bg-slate-100">

<tr>

<th className="px-6 py-4 text-left">
Order
</th>

<th className="px-6 py-4 text-left">
Customer
</th>

<th className="px-6 py-4 text-left">
Plan
</th>

<th className="px-6 py-4 text-left">
Amount
</th>

<th className="px-6 py-4 text-left">
Payment
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

{/* ===================================================== */}
{/* LOADING */}
{/* ===================================================== */}

{loading && (

<tr>

<td
colSpan={7}
className="py-10 text-center text-slate-500"
>

Loading orders...

</td>

</tr>

)}

{/* ===================================================== */}
{/* EMPTY */}
{/* ===================================================== */}

{!loading && orders.length === 0 && (

<tr>

<td
colSpan={7}
className="py-10 text-center text-slate-500"
>

No orders found.

</td>

</tr>

)}

{/* ===================================================== */}
{/* ORDERS */}
{/* ===================================================== */}

{orders.map((order) => (

<tr
key={order.id}
className="border-t border-slate-100"
>

{/* Order Number */}

<td className="px-6 py-5 font-semibold">

{order.order_number}

</td>

{/* Customer */}

<td className="px-6 py-5">

{order.customers?.name ?? "-"}

</td>

{/* Plan */}

<td className="px-6 py-5">

{order.plans?.name ?? "-"}

</td>

{/* Amount */}

<td className="px-6 py-5">

{order.currency} {order.final_price}

</td>

{/* Payment */}

<td className="px-6 py-5">

<span
className={`rounded-full px-3 py-1 text-xs font-semibold ${
order.payment_status === "paid"
? "bg-green-100 text-green-700"
: order.payment_status === "pending"
? "bg-yellow-100 text-yellow-700"
: "bg-red-100 text-red-700"
}`}
>

{order.payment_status}

</span>

</td>

{/* Order Status */}

<td className="px-6 py-5">

<span
className={`rounded-full px-3 py-1 text-xs font-semibold ${
order.order_status === "completed"
? "bg-green-100 text-green-700"
: order.order_status === "pending"
? "bg-yellow-100 text-yellow-700"
: "bg-red-100 text-red-700"
}`}
>

{order.order_status}

</span>

</td>

{/* Actions */}

<td className="px-6 py-5 text-right">

<button
className="mr-4 font-medium text-blue-600 hover:text-blue-700"
onClick={() => onEdit(order)}
>

Edit

</button>

<button
className="font-medium text-red-600 hover:text-red-700"
onClick={() => onDelete(order)}
>

Delete

</button>

</td>

</tr>

))}

</tbody>

</table>

</div>

);

}