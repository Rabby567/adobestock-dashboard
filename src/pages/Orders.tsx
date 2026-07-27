// =====================================================
// IMPORTS
// =====================================================

import { useCallback, useEffect, useMemo, useState } from "react";

import DashboardLayout from "../components/layout/DashboardLayout";

import OrderStats from "../components/orders/OrderStats";
import OrderToolbar from "../components/orders/OrderToolbar";
import OrderTable from "../components/orders/OrderTable";
import OrderModal from "../components/orders/OrderModal";

import type { Order } from "../types/order";

import {
  getOrders,
  createOrder,
  updateOrder,
  deleteOrder,
} from "../services/orderService";


// =====================================================
// TYPES
// =====================================================

type OrderFormValues = {
  customer_id: string;
  plan_id: string;
  promo_code_id: string | null;

  payment_method: string;
  payment_status: string;
  order_status: string;
};


// =====================================================
// COMPONENT
// =====================================================

export default function Orders() {


// =====================================================
// STATES
// =====================================================

const [orders, setOrders] =
useState<Order[]>([]);

const [loading, setLoading] =
useState(true);

const [search, setSearch] =
useState("");

const [status, setStatus] =
useState("all");

const [openModal, setOpenModal] =
useState(false);

const [selectedOrder, setSelectedOrder] =
useState<Order | null>(null);


// =====================================================
// LOAD ORDERS
// =====================================================

const loadOrders = useCallback(async () => {

  try {

    setLoading(true);

    const data = await getOrders();

    setOrders(data);

  } catch (err) {

    console.error(err);

  } finally {

    setLoading(false);

  }

}, []);


// =====================================================
// CREATE ORDER
// =====================================================

async function handleCreateOrder(
  values: OrderFormValues
) {
   
  console.log("FROM MODAL:", values);

  await createOrder(values);

  setOpenModal(false);
  setSelectedOrder(null);

  await loadOrders();
}


// =====================================================
// UPDATE ORDER
// =====================================================

async function handleUpdateOrder(
  values: OrderFormValues
) {
  if (!selectedOrder) return;

  await updateOrder(
    selectedOrder.id,
    values
  );

  setOpenModal(false);
  setSelectedOrder(null);

  await loadOrders();
}

// =====================================================
// DELETE ORDER
// =====================================================

async function handleDeleteOrder(
  order: Order
) {

  if (!confirm("Delete order?"))
    return;

  await deleteOrder(order.id);

  await loadOrders();

}


// =====================================================
// LOAD PAGE
// =====================================================

useEffect(() => {

  void loadOrders();

}, [loadOrders]);


// =====================================================
// FILTER
// =====================================================

const filteredOrders = useMemo(() => {

  return orders.filter((order) => {

    const matchSearch =

      order.order_number
        .toLowerCase()
        .includes(search.toLowerCase())

      ||

      (order.customers?.name ?? "")
        .toLowerCase()
        .includes(search.toLowerCase());

    const matchStatus =

      status === "all"

      ||

      order.order_status === status;

    return matchSearch && matchStatus;

  });

}, [orders, search, status]);


// =====================================================
// JSX
// =====================================================

return (

<DashboardLayout>

<OrderStats
  total={orders.length}
  paid={
    orders.filter(
      (o) => o.payment_status === "completed"
    ).length
  }
  pending={
    orders.filter(
      (o) => o.payment_status === "pending"
    ).length
  }
  cancelled={
    orders.filter(
      (o) => o.order_status === "cancelled"
    ).length
  }
/>

<OrderToolbar
  search={search}
  setSearch={setSearch}
  status={status}
  setStatus={setStatus}
  onCreate={() => {
    setSelectedOrder(null);
    setOpenModal(true);
  }}
/>

<OrderTable
  orders={filteredOrders}
  loading={loading}
  onEdit={(order) => {
    setSelectedOrder(order);
    setOpenModal(true);
  }}
  onDelete={handleDeleteOrder}
/>

<OrderModal
  open={openModal}
  order={selectedOrder}
  onClose={() => {
    setOpenModal(false);
    setSelectedOrder(null);
  }}
  onSave={
    selectedOrder
      ? handleUpdateOrder
      : handleCreateOrder
  }
/>

</DashboardLayout>



);

}

