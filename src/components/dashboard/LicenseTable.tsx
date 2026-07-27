import {
  EyeIcon,
  PencilSquareIcon,
  ArrowPathIcon,
  TrashIcon,
} from "@heroicons/react/24/outline";

  import { useState } from "react";
import type { License } from "../../types/license";
import { formatPlan } from "../../utils/license";

type Props = {
  licenses: License[];
  search: string;
  onDelete: (id: string) => void;
  onEdit: (license: License) => void;
  onView: (license: License) => void;
  onStatusChange: (
    id: string,
    status: License["status"]
) => void;
};

export default function LicenseTable({
  licenses,
  search,
  onDelete,
  onEdit,
  onView,
  onStatusChange,
}: Props) {
  const [statusFilter, setStatusFilter] = useState("all");
  const keyword = search.toLowerCase();


const filteredLicenses = licenses.filter((item) => {

    const searchMatch =
        (item.license_key || "").toLowerCase().includes(keyword) ||
        (item.customer_name || "").toLowerCase().includes(keyword) ||
        (item.email || "").toLowerCase().includes(keyword) ||
        (item.plan || "").toLowerCase().includes(keyword);

    const statusMatch =
        statusFilter === "all" ||
        item.status === statusFilter;

    return searchMatch && statusMatch;
});

  return (
    <div className="bg-white rounded-2xl border border-slate-200 shadow-sm mt-8 overflow-hidden">
    <div className="overflow-x-auto">
      <div className="px-6 py-4 border-b border-slate-200 flex items-center justify-between">
    <h2 className="text-xl font-bold">
        Recent Licenses
    </h2>

    <select
        value={statusFilter}
        onChange={(e) => setStatusFilter(e.target.value)}
        className="h-10 w-36 rounded-xl border border-slate-300 px-3 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
    >
        <option value="all">All Status</option>
        <option value="unused">Unused</option>
        <option value="active">Active</option>
        <option value="suspended">Suspended</option>
    </select>
</div>

      <table className="w-full table-auto">
        <thead className="bg-slate-50">
          <tr>
            <th className="w-56 px-4 py-4 text-left">License</th>
            <th className="w-48 px-4 py-4 text-left">Customer</th>
            <th className="w-64 px-4 py-4 text-left">Email</th>
            <th className="w-28 px-4 py-4 text-left">Plan</th>
            <th className="w-32 px-4 py-4 text-left">Created</th>
            <th className="w-32 px-4 py-4 text-left">Expiry</th>
            <th className="w-28 px-4 py-4 text-left">Status</th>
            <th className="w-64 px-4 py-4 text-left">Device</th>
            <th className="w-44 px-4 py-4 text-center">Actions</th>
          </tr>
        </thead>

        <tbody>
          {filteredLicenses.length === 0 ? (
            <tr>
              <td
                colSpan={8}
                className="text-center py-16 text-slate-400"
              >
                No Licenses Found
              </td>
            </tr>
          ) : (
            filteredLicenses.map((item) => (
              <tr
                key={item.id}
                className="border-t border-slate-100 hover:bg-slate-50 transition"
              >
                <td className="px-4 py-4 whitespace-nowrap font-mono font-semibold text-sm">
                  {item.license_key}
                </td>

                <td className="px-4 py-4 whitespace-nowrap">
                  {item.customer_name}
                </td>

                <td className="px-4 py-4 whitespace-nowrap overflow-hidden text-ellipsis">
                  {item.email}
                </td>

                <td className="px-4 py-4 whitespace-nowrap">
                  {formatPlan(item.plan)}
                </td>

                <td className="px-4 py-4 whitespace-nowrap">
                  {item.issue_date}
                </td>

                <td className="px-4 py-4 whitespace-nowrap">
                  {item.expiry_date ?? "Lifetime"}
                </td>

                <td className="px-4 py-4">

                  <select
    value={item.status}
    onChange={(e) =>
        onStatusChange(
            item.id,
            e.target.value as License["status"]
        )
    }
    className="h-8 w-24 rounded-md border border-slate-300 px-2 text-xs"
>

<option value="unused">
Unused
</option>

<option value="active">
Active
</option>

<option value="suspended">
Suspended
</option>

</select>
                </td>

                <td
  
  className="px-6 py-4 font-mono text-xs max-w-[220px] truncate"
  title={item.device_id ?? undefined}
>
  {item.device_id ?? "-"}
</td>

                <td className="px-6 py-4">
                  <div className="flex justify-center items-center gap-2">
                    <button
                      title="View"
                      onClick={() => onView(item)}
                      className="w-9 h-9 rounded-lg bg-slate-100 hover:bg-blue-100 hover:text-blue-600 transition flex items-center justify-center"
                    >
                      <EyeIcon className="w-5 h-5" />
                    </button>

                    <button
                      title="Edit"
                      onClick={() => onEdit(item)}
                      className="w-9 h-9 rounded-lg bg-slate-100 hover:bg-amber-100 hover:text-amber-600 transition flex items-center justify-center"
                    >
                      <PencilSquareIcon className="w-5 h-5" />
                    </button>

                    <button
                      title="Extend"
                      className="w-9 h-9 rounded-lg bg-slate-100 hover:bg-green-100 hover:text-green-600 transition flex items-center justify-center"
                    >
                      <ArrowPathIcon className="w-5 h-5" />
                    </button>

                    <button
                      title="Delete"
                      onClick={() => onDelete(item.id)}
                      className="w-9 h-9 rounded-lg bg-slate-100 hover:bg-red-100 hover:text-red-600 transition flex items-center justify-center"
                    >
                      <TrashIcon className="w-5 h-5" />
                    </button>
                  </div>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
    </div>
  );
}