interface CustomerStatsProps {
  total: number;
  active: number;
  inactive: number;
  verified: number;
}

export default function CustomerStats({
  total,
  active,
  inactive,
  verified,
}: CustomerStatsProps) {
  const cards = [
    {
      title: "Total Customers",
      value: total,
      color: "text-blue-600",
    },
    {
      title: "Active",
      value: active,
      color: "text-green-600",
    },
    {
      title: "Inactive",
      value: inactive,
      color: "text-red-600",
    },
    {
      title: "Verified",
      value: verified,
      color: "text-purple-600",
    },
  ];

  return (
    <div className="mb-8 grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-4">
      {cards.map((card) => (
        <div
          key={card.title}
          className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm"
        >
          <p className="text-sm text-slate-500">
            {card.title}
          </p>

          <h2 className={`mt-3 text-4xl font-bold ${card.color}`}>
            {card.value}
          </h2>
        </div>
      ))}
    </div>
  );
}