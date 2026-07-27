import { Routes, Route, Navigate } from "react-router-dom";

import Home from "./website/pages/Home";

import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import PromoCodes from "./pages/PromoCodes";
import Orders from "./pages/Orders";
import Plans from "./pages/Plans";
import Licenses from "./pages/Licenses";
import Customers from "./pages/Customers";
import Settings from "./pages/Settings";
import Checkout from "./website/pages/Checkout";
import Success from "./website/pages/Success";

import ProtectedRoute from "./components/ProtectedRoute";

export default function App() {
  return (
    <Routes>
      {/* Root */}
      <Route
        path="/"
        element={<Navigate to="/login" replace />}
      />

      {/* Website */}
      <Route
        path="/website"
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

      {/* Login */}
      <Route
        path="/login"
        element={<Login />}
      />

      {/* Dashboard */}
      <Route
        path="/dashboard"
        element={
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        }
      />

      {/* Licenses */}

<Route
  path="/licenses"
  element={
    <ProtectedRoute>
      <Licenses />
    </ProtectedRoute>
  }
/>

{/* Customers */}

<Route
  path="/customers"
  element={
    <ProtectedRoute>
      <Customers />
    </ProtectedRoute>
  }
/>

{/* Settings */}

<Route
  path="/settings"
  element={
    <ProtectedRoute>
      <Settings />
    </ProtectedRoute>
  }
/>

      {/* Promo Codes */}
      <Route
        path="/promo-codes"
        element={
          <ProtectedRoute>
            <PromoCodes />
          </ProtectedRoute>
        }
      />

      {/* Orders */}
      <Route
        path="/orders"
        element={
          <ProtectedRoute>
            <Orders />
          </ProtectedRoute>
        }
      />

      {/* Plans */}
      <Route
        path="/plans"
        element={
          <ProtectedRoute>
            <Plans />
          </ProtectedRoute>
        }
      />

      {/* 404 */}
      <Route
        path="*"
        element={<Navigate to="/login" replace />}
      />
    </Routes>
  );
}