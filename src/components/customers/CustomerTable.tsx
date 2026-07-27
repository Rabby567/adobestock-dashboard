/* ========================================================= */
/* CUSTOMER TABLE */
/* ========================================================= */

import type { Customer } from "../../types/customer";

/* ========================================================= */
/* PROPS */
/* ========================================================= */

interface CustomerTableProps {
  customers: Customer[];
  loading: boolean;

  onEdit: (customer: Customer) => void;

  onDelete: (customer: Customer) => void;
}

/* ========================================================= */
/* COMPONENT */
/* ========================================================= */

export default function CustomerTable({
  customers,
  loading,
  onEdit,
  onDelete,
}: CustomerTableProps) {
  return (
    <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">

      <table className="w-full">

        {/* ========================================================= */}
        {/* TABLE HEADER */}
        {/* ========================================================= */}

        <thead className="bg-slate-100">

          <tr>

            <th className="px-6 py-4 text-left">
              Name
            </th>

            <th className="px-6 py-4 text-left">
              Email
            </th>

            <th className="px-6 py-4 text-left">
              Verified
            </th>

            <th className="px-6 py-4 text-left">
              Status
            </th>

            <th className="px-6 py-4 text-left">
              Created
            </th>

            <th className="px-6 py-4 text-right">
              Actions
            </th>

          </tr>

        </thead>

        {/* ========================================================= */}
        {/* TABLE BODY */}
        {/* ========================================================= */}

        <tbody>

          {/* ---------------- Loading ---------------- */}

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

          {/* ---------------- Empty ---------------- */}

          {!loading && customers.length === 0 && (

            <tr>

              <td
                colSpan={6}
                className="py-10 text-center text-slate-500"
              >
                No customers found.
              </td>

            </tr>

          )}

          {/* ---------------- Data ---------------- */}

          {!loading &&
            customers.map((customer) => (

              <tr
                key={customer.id}
                className="border-t"
              >

                {/* Name */}

                <td className="px-6 py-5 font-semibold">
                  {customer.name}
                </td>

                {/* Email */}

                <td className="px-6 py-5">
                  {customer.email}
                </td>

                {/* Email Verified */}

                <td className="px-6 py-5">

                  <span
                    className={`rounded-full px-3 py-1 text-sm font-semibold ${
                      customer.email_verified
                        ? "bg-green-100 text-green-700"
                        : "bg-red-100 text-red-700"
                    }`}
                  >
                    {customer.email_verified
                      ? "Verified"
                      : "Not Verified"}
                  </span>

                </td>

                {/* Status */}

                <td className="px-6 py-5">

                  <span
                    className={`rounded-full px-3 py-1 text-sm font-semibold ${
                      customer.status === "active"
                        ? "bg-green-100 text-green-700"
                        : "bg-red-100 text-red-700"
                    }`}
                  >
                    {customer.status}
                  </span>

                </td>

                {/* Created */}

                <td className="px-6 py-5">

                  {new Date(
                    customer.created_at
                  ).toLocaleDateString()}

                </td>

                {/* Actions */}

                <td className="px-6 py-5 text-right">

                  <button
                    className="mr-3 text-blue-600 hover:underline"
                    onClick={() => onEdit(customer)}
                  >
                    Edit
                  </button>

                  <button
                    className="text-red-600 hover:underline"
                    onClick={() => onDelete(customer)}
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