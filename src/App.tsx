import { Routes, Route, Navigate } from "react-router-dom";

import Home from "./website/pages/Home";
import Checkout from "./website/pages/Checkout";
import Success from "./website/pages/Success";

import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Licenses from "./pages/Licenses";
import Customers from "./pages/Customers";
import Orders from "./pages/Orders";
import Plans from "./pages/Plans";
import PromoCodes from "./pages/PromoCodes";
import Settings from "./pages/Settings";

import ProtectedRoute from "./components/ProtectedRoute";

export default function App() {
  return (
    <Routes>

      {/* ============================= */}
      {/* WEBSITE */}
      {/* ============================= */}

      <Route
        path="/"
        element={<Home />}
      />

      <Route
        path="/checkout"
        element={<Checkout />}
      />

      <Route
        path="/success"
        element={<Success />}
      />

      {/* ============================= */}
      {/* AUTH */}
      {/* ============================= */}

      <Route
        path="/login"
        element={<Login />}
      />

      {/* ============================= */}
      {/* DASHBOARD */}
      {/* ============================= */}

      <Route
        path="/dashboard"
        element={
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        }
      />

      <Route
        path="/dashboard/licenses"
        element={
          <ProtectedRoute>
            <Licenses />
          </ProtectedRoute>
        }
      />

      <Route
        path="/dashboard/customers"
        element={
          <ProtectedRoute>
            <Customers />
          </ProtectedRoute>
        }
      />

      <Route
        path="/dashboard/orders"
        element={
          <ProtectedRoute>
            <Orders />
          </ProtectedRoute>
        }
      />

      <Route
        path="/dashboard/plans"
        element={
          <ProtectedRoute>
            <Plans />
          </ProtectedRoute>
        }
      />

      <Route
        path="/dashboard/promos"
        element={
          <ProtectedRoute>
            <PromoCodes />
          </ProtectedRoute>
        }
      />

      <Route
        path="/dashboard/settings"
        element={
          <ProtectedRoute>
            <Settings />
          </ProtectedRoute>
        }
      />

      {/* ============================= */}
      {/* 404 */}
      {/* ============================= */}

      <Route
        path="*"
        element={<Navigate to="/" replace />}
      />

    </Routes>
  );
}