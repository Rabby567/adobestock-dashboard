interface CustomerToolbarProps {
  search: string;
  setSearch: (value: string) => void;

  status: string;
  setStatus: (value: string) => void;

  onCreate: () => void;
}

export default function CustomerToolbar({
  search,
  setSearch,
  status,
  setStatus,
  onCreate,
}: CustomerToolbarProps) {
  return (
    <div className="mb-8 flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
      <div>
        <h1 className="text-3xl font-bold text-slate-900">
          Customers
        </h1>

        <p className="mt-2 text-slate-500">
          Manage all registered customers.
        </p>
      </div>

      <div className="flex flex-wrap items-center gap-3">
        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search customer..."
          className="w-72 rounded-xl border border-slate-300 bg-white px-4 py-3 outline-none focus:border-blue-500"
        />

        <select
          value={status}
          onChange={(e) => setStatus(e.target.value)}
          className="rounded-xl border border-slate-300 bg-white px-4 py-3"
        >
          <option value="all">All Status</option>
          <option value="active">Active</option>
          <option value="inactive">Inactive</option>
        </select>

        <button
          onClick={onCreate}
          className="rounded-xl bg-blue-600 px-6 py-3 font-semibold text-white transition hover:bg-blue-700"
        >
          + Create Customer
        </button>
      </div>
    </div>
  );
}