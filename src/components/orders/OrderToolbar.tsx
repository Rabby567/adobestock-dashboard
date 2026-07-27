import Button from "../ui/Button";

interface OrderToolbarProps {
  search: string;

  setSearch: (value: string) => void;

  status: string;

  setStatus: (value: string) => void;

  onCreate: () => void;
}

export default function OrderToolbar({
  search,
  setSearch,
  status,
  setStatus,
  onCreate,
}: OrderToolbarProps) {
  return (
    <>
      {/* ===================================================== */}
      {/* PAGE HEADER */}
      {/* ===================================================== */}

      <div className="mb-8 flex items-center justify-between">

        <div>

          <h1 className="text-5xl font-bold text-slate-900">

            Orders

          </h1>

          <p className="mt-2 text-slate-500">

            Manage customer orders.

          </p>

        </div>

        <Button onClick={onCreate}>

          + Create Order

        </Button>

      </div>

      {/* ===================================================== */}
      {/* FILTER BAR */}
      {/* ===================================================== */}

      <div className="mb-6 flex items-center gap-4">

        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search order..."
          className="w-80 rounded-xl border border-slate-300 px-4 py-3"
        />

        <select
          value={status}
          onChange={(e) => setStatus(e.target.value)}
          className="rounded-xl border border-slate-300 px-4 py-3"
        >
          <option value="all">
            All Status
          </option>

          <option value="pending">
            Pending
          </option>

          <option value="processing">
            Processing
          </option>

          <option value="completed">
            Completed
          </option>

          <option value="cancelled">
            Cancelled
          </option>
        </select>

      </div>
    </>
  );
}