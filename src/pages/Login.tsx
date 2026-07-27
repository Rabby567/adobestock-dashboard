import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { login } from "../services/authService";
import {
  EnvelopeIcon,
  LockClosedIcon,
  EyeIcon,
  EyeSlashIcon,
} from "@heroicons/react/24/outline";

export default function Login() {
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
const [password, setPassword] = useState("");

const [loading, setLoading] = useState(false);
const [error, setError] = useState("");

const handleLogin = async () => {
  setLoading(true);
  setError("");

  const { error } = await login(email, password);

  if (error) {
    setError(error.message);
    setLoading(false);
    return;
  }

  setLoading(false);
  navigate("/dashboard", { replace: true });
};

  return (
    <div className="min-h-screen bg-slate-100 flex items-center justify-center px-6">
      <div className="w-full max-w-[430px] rounded-2xl bg-white border border-slate-200 shadow-xl p-8">

        {/* Logo */}
        <div className="text-center mb-8">
          <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-blue-600 text-2xl font-bold text-white">
            A
          </div>

          <h1 className="text-2xl font-bold text-slate-900">
            Adobe Stock Submission Manager
          </h1>

          <p className="mt-2 text-sm text-slate-500">
            Admin Dashboard
          </p>
        </div>

        {/* Email */}
        <div className="mb-5">
          <label className="mb-2 block text-sm font-medium text-slate-700">
            Email Address
          </label>

          <div className="relative">
            <EnvelopeIcon className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400" />

            <input
            type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="admin@example.com"
              className="h-12 w-full rounded-xl border border-slate-300 pl-12 pr-4 outline-none transition focus:border-blue-600"
            />
          </div>
        </div>

        {/* Password */}
        <div className="mb-5">
          <label className="mb-2 block text-sm font-medium text-slate-700">
            Password
          </label>

          <div className="relative">
            <LockClosedIcon className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400" />

            <input
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter password"
              className="h-12 w-full rounded-xl border border-slate-300 pl-12 pr-12 outline-none transition focus:border-blue-600"
            />

            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-700"
            >
              {showPassword ? (
                <EyeSlashIcon className="h-5 w-5" />
              ) : (
                <EyeIcon className="h-5 w-5" />
              )}
            </button>
          </div>
        </div>

        {/* Remember */}
        <div className="mb-6 flex items-center justify-between">
          <label className="flex items-center gap-2 text-sm text-slate-600">
            <input
              type="checkbox"
              className="h-4 w-4 rounded border-slate-300"
            />

            Remember Me
          </label>
        </div>

        {error && (
  <div className="mb-4 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600">
    {error}
  </div>
)}

        {/* Button */}
        <button
  type="button"
  onClick={handleLogin}
  disabled={loading}
  className="h-12 w-full rounded-xl bg-blue-600 text-white font-semibold transition hover:bg-blue-700 disabled:opacity-60"
>
  {loading ? "Signing In..." : "Sign In"}
</button>

        {/* Footer */}
        <div className="mt-8 border-t border-slate-200 pt-5 text-center text-sm text-slate-400">
          Dashboard v1.1.2
        </div>
      </div>
    </div>
  );
}