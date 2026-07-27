interface Props {
  search: string;
  setSearch: (value: string) => void;

  status: string;
  setStatus: (value: string) => void;

  onCreate: () => void;
}

export default function PromoToolbar({
  search,
  setSearch,
  status,
  setStatus,
  onCreate,
}: Props) {
  return (
    <div className="mb-8 flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">

      <div>

        <h1 className="text-3xl font-bold text-slate-900">
          Promo Codes
        </h1>

        <p className="mt-2 text-slate-500">
          Manage promotional license codes.
        </p>

      </div>

      <div className="flex flex-wrap items-center gap-3">

        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search promo code..."
          className="
            h-11
            w-72
            rounded-xl
            border
            border-slate-300
            px-4
            outline-none
            focus:border-blue-500
          "
        />

        <select
          value={status}
          onChange={(e) => setStatus(e.target.value)}
          className="
            h-11
            rounded-xl
            border
            border-slate-300
            px-4
          "
        >
          <option value="all">All Status</option>
          <option value="active">Active</option>
          <option value="inactive">Inactive</option>
          <option value="expired">Expired</option>
        </select>

        <button
          onClick={onCreate}
          className="
            h-11
            rounded-xl
            bg-blue-600
            px-6
            font-semibold
            text-white
            transition
            hover:bg-blue-700
          "
        >
          + Create Promo
        </button>

      </div>

    </div>
  );
}