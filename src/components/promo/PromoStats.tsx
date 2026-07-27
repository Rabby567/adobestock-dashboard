interface PromoStatsProps {
  total: number;
  active: number;
  redeemed: number;
  expired: number;
}

function Card({
  title,
  value,
  color,
}: {
  title: string;
  value: number;
  color: string;
}) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
      <p className="text-sm text-slate-500">
        {title}
      </p>

      <h2 className={`mt-3 text-4xl font-bold ${color}`}>
        {value}
      </h2>
    </div>
  );
}

export default function PromoStats({
  total,
  active,
  redeemed,
  expired,
}: PromoStatsProps) {
  return (
    <div className="mb-8 grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-4">

      <Card
        title="Total Promo Codes"
        value={total}
        color="text-slate-900"
      />

      <Card
        title="Active"
        value={active}
        color="text-green-600"
      />

      <Card
        title="Redeemed"
        value={redeemed}
        color="text-blue-600"
      />

      <Card
        title="Expired"
        value={expired}
        color="text-red-600"
      />

    </div>
  );
}