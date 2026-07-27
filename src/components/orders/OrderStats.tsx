interface OrderStatsProps {
  total: number;
  paid: number;
  pending: number;
  cancelled: number;
}

export default function OrderStats({
  total,
  paid,
  pending,
  cancelled,
}: OrderStatsProps) {
  return (
    <div className="mb-8 grid grid-cols-4 gap-6">
      <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
        <p className="text-slate-500">Total Orders</p>

        <h2 className="mt-2 text-4xl font-bold text-blue-600">
          {total}
        </h2>
      </div>

      <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
        <p className="text-slate-500">Completed</p>

        <h2 className="mt-2 text-4xl font-bold text-green-600">
          {paid}
        </h2>
      </div>

      <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
        <p className="text-slate-500">Pending</p>

        <h2 className="mt-2 text-4xl font-bold text-yellow-500">
          {pending}
        </h2>
      </div>

      <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
        <p className="text-slate-500">Cancelled</p>

        <h2 className="mt-2 text-4xl font-bold text-red-600">
          {cancelled}
        </h2>
      </div>
    </div>
  );
}