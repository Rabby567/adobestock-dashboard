import DashboardLayout from "../components/layout/DashboardLayout";
import DashboardStats from "../components/dashboard/DashboardStats";
import LicenseTable from "../components/dashboard/LicenseTable";
import DashboardToolbar from "../components/dashboard/DashboardToolbar";
import CreateLicenseModal from "../components/dashboard/CreateLicenseModal";
import DeleteLicenseModal from "../components/dashboard/DeleteLicenseModal";
import ViewLicenseModal from "../components/dashboard/ViewLicenseModal";
import EditLicenseModal from "../components/dashboard/EditLicenseModal";

import { useEffect } from "react";
import {
  getLicenses,
  createLicense,
  updateLicense,
  deleteLicense,
} from "../services/licenseService";

import { useState } from "react"; 
import type { License } from "../types/license";
import { calculateExpiry } from "../utils/license";


export default function Dashboard() {

const [licenses, setLicenses] = useState<License[]>([]);

const loadLicenses = async () => {
  try {
    const data = await getLicenses();
    setLicenses(data);
  } catch (err) {
    console.error(err);
  }
};



useEffect(() => {
  const init = async () => {
    await loadLicenses();
  };

  init();
}, []);



const [deleteId, setDeleteId] = useState<string | null>(null);

const [openModal, setOpenModal] = useState(false);

const [customer, setCustomer] = useState("");
const [notes, setNotes] = useState("");

const [viewLicense, setViewLicense] = useState<License | null>(null);

const [email, setEmail] = useState("");

const [search, setSearch] = useState("");

const [plan, setPlan] = useState<
  "lifetime" | "1_year" | "6_months" | "3_months"
>("lifetime");

const totalLicenses = licenses.length;

const unusedLicenses = licenses.filter(
  (item) => item.status === "unused"
).length;

const suspendedLicenses = licenses.filter(
  (item) => item.status === "suspended"
).length;


const activeLicenses = licenses.filter(
  (l) => l.status === "active"
).length;

const expiredLicenses = licenses.filter((l) => {
if (!l.expiry_date) return false;

return new Date(l.expiry_date) < new Date();
}).length;

const customerCount = new Set(
  licenses.map((l) => (l.email || "").toLowerCase())
).size;

const [editLicense, setEditLicense] = useState<License | null>(null);

const handleSaveLicense = async () => {
  if (!customer.trim() || !email.trim()) {
    alert("Please fill all fields.");
    return;
  }
try {

  await createLicense({

    customer_name: customer,

    email,

    plan,

    customer_id: null,

    plan_id: null,

    order_id: null,

    notes,

  });

  await loadLicenses();

  setCustomer("");
  setEmail("");
  setPlan("lifetime");
  setNotes("");
  setOpenModal(false);

} catch (error) {

  console.error(error);

  alert(JSON.stringify(error, null, 2));

}
};


const handleStatusChange = async (
    id: string,
    status: License["status"]
) => {

    try {

        await updateLicense(id, {
            status,
        });

        await loadLicenses();

    } catch (err) {

        console.error(err);

        alert("Status Update Failed");

    }

};

  return (
    <DashboardLayout>

            {/* Stats */}
           <DashboardStats
  totalLicenses={totalLicenses}
  activeLicenses={activeLicenses}
  expiredLicenses={expiredLicenses}
  unusedLicenses={unusedLicenses}
  suspendedLicenses={suspendedLicenses}
  customerCount={customerCount}
/>

            {/* License Header */}
   <DashboardToolbar
  title="License Management"
  subtitle="Manage all customer licenses."
  search={search}
  searchPlaceholder="Search licenses..."
  buttonText="+ Create License"
  onSearch={setSearch}
  onButtonClick={() => setOpenModal(true)}
/>

            {/* Table */}
<LicenseTable
  licenses={licenses}
  onDelete={setDeleteId}
  search={search}
  onEdit={setEditLicense}
  onView={setViewLicense}
  onStatusChange={handleStatusChange}
/>

 {/* Modal */}

<CreateLicenseModal
  open={openModal}
  customer={customer}
  email={email}
  notes={notes}
  plan={plan}
  onClose={() => setOpenModal(false)}
  onSave={handleSaveLicense}
  setCustomer={setCustomer}
  setEmail={setEmail}
  setNotes={setNotes}
  setPlan={setPlan}
/>


<DeleteLicenseModal
  open={deleteId !== null}
  onClose={() => setDeleteId(null)}
  onDelete={async () => {
    if (!deleteId) return;

    try {
      await deleteLicense(deleteId);

      await loadLicenses();

      setDeleteId(null);
    } catch (err) {
      console.error(err);
    }
  }}
/>



<ViewLicenseModal
  open={viewLicense !== null}
  license={viewLicense}
  onClose={() => setViewLicense(null)}
/>




<EditLicenseModal
  open={editLicense !== null}
  license={editLicense}
  onClose={() => setEditLicense(null)}
  setLicense={setEditLicense}
  onSave={async () => {
    if (!editLicense) return;

    try {
     await updateLicense(editLicense.id, {
  customer_name: editLicense.customer_name,
  email: editLicense.email,
  plan: editLicense.plan,
  expiry_date: calculateExpiry(editLicense.plan),
  notes: editLicense.notes,
});

      await loadLicenses();

      setEditLicense(null);
    } catch (err) {
      console.error(err);
      alert("Update Failed");
    }
  }}
/>



</DashboardLayout>

  );
}
