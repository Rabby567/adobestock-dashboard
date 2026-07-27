// =====================================================
// IMPORTS
// =====================================================

import { useCallback, useEffect, useMemo, useState } from "react";

import DashboardLayout from "../components/layout/DashboardLayout";

import CustomerStats from "../components/customers/CustomerStats";
import CustomerToolbar from "../components/customers/CustomerToolbar";
import CustomerTable from "../components/customers/CustomerTable";
import CustomerModal from "../components/customers/CustomerModal";

import type { Customer } from "../types/customer";

import {
  getCustomers,
  createCustomer,
  updateCustomer,
  deleteCustomer,
} from "../services/customerService";


// =====================================================
// TYPES
// =====================================================

type CustomerFormValues = {
  name: string;
  email: string;
  status: "active" | "inactive";
  email_verified: boolean;
};


// =====================================================
// COMPONENT
// =====================================================

export default function Customers() {


// =====================================================
// STATES
// =====================================================

const [customers, setCustomers] = useState<Customer[]>([]);

const [loading, setLoading] = useState(true);

const [search, setSearch] = useState("");

const [status, setStatus] = useState("all");

const [openModal, setOpenModal] = useState(false);

const [selectedCustomer, setSelectedCustomer] =
useState<Customer | null>(null);


// =====================================================
// LOAD CUSTOMERS
// =====================================================

const loadCustomers = useCallback(async () => {

  try {

    setLoading(true);

    const data = await getCustomers();

    setCustomers(data);

  } catch (err) {

    console.error(err);

  } finally {

    setLoading(false);

  }

}, []);


// =====================================================
// CREATE CUSTOMER
// =====================================================

async function handleCreateCustomer(
values: CustomerFormValues
) {

  await createCustomer(values);

  setOpenModal(false);

  setSelectedCustomer(null);

  await loadCustomers();

}


// =====================================================
// UPDATE CUSTOMER
// =====================================================

async function handleUpdateCustomer(
values: CustomerFormValues
) {

  if (!selectedCustomer) return;

  await updateCustomer(
    selectedCustomer.id,
    values
  );

  setOpenModal(false);

  setSelectedCustomer(null);

  await loadCustomers();

}


// =====================================================
// DELETE CUSTOMER
// =====================================================

async function handleDeleteCustomer(
customer: Customer
) {

  if (!confirm("Delete customer?"))
    return;

  await deleteCustomer(customer.id);

  await loadCustomers();

}


// =====================================================
// LOAD ON PAGE OPEN
// =====================================================

useEffect(() => {

  void loadCustomers();

}, [loadCustomers]);


// =====================================================
// FILTER CUSTOMERS
// =====================================================

const filteredCustomers = useMemo(() => {

  return customers.filter((customer) => {

    const matchSearch =

      customer.name
        .toLowerCase()
        .includes(search.toLowerCase())

      ||

      customer.email
        .toLowerCase()
        .includes(search.toLowerCase());

    const matchStatus =

      status === "all"

      ||

      customer.status === status;

    return matchSearch && matchStatus;

  });

}, [customers, search, status]);


// =====================================================
// JSX
// =====================================================

return (

<DashboardLayout>

{/* ===================================================== */}
{/* PAGE HEADER */}
{/* ===================================================== */}

<CustomerStats
  total={customers.length}
  active={
    customers.filter(
      (c) => c.status === "active"
    ).length
  }
  verified={
    customers.filter(
      (c) => c.email_verified
    ).length
  }
  inactive={
    customers.filter(
      (c) => c.status === "inactive"
    ).length
  }
/>

{/* ===================================================== */}
{/* TOOLBAR */}
{/* ===================================================== */}

<CustomerToolbar
  search={search}
  setSearch={setSearch}
  status={status}
  setStatus={setStatus}
  onCreate={() => {
    setSelectedCustomer(null);
    setOpenModal(true);
  }}
/>

{/* ===================================================== */}
{/* CUSTOMER TABLE */}
{/* ===================================================== */}

<CustomerTable
  customers={filteredCustomers}
  loading={loading}
  onEdit={(customer) => {
    setSelectedCustomer(customer);
    setOpenModal(true);
  }}
  onDelete={handleDeleteCustomer}
/>

{/* ===================================================== */}
{/* CUSTOMER MODAL */}
{/* ===================================================== */}

<CustomerModal
  open={openModal}
  customer={selectedCustomer}
  onClose={() => {
    setOpenModal(false);
    setSelectedCustomer(null);
  }}
  onSave={
    selectedCustomer
      ? handleUpdateCustomer
      : handleCreateCustomer
  }
/>

</DashboardLayout>

);

}