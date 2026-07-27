import {
  BellIcon,
  MagnifyingGlassIcon,
} from "@heroicons/react/24/outline";

import { useEffect, useState } from "react";
import { getCurrentUser } from "../../services/authService";

export default function Header() {
  const [adminName, setAdminName] = useState("Admin");
  const [initials, setInitials] = useState("A");

  useEffect(() => {
    async function loadUser() {
      const user = await getCurrentUser();

      if (!user) return;

      const metadata = user.user_metadata;

      const fullName =
        metadata?.full_name ||
        metadata?.name ||
        user.email?.split("@")[0] ||
        "Admin";

      setAdminName(fullName);

      const words = fullName.trim().split(" ");

      if (words.length >= 2) {
        setInitials(
          (
            words[0][0] +
            words[1][0]
          ).toUpperCase()
        );
      } else {
        setInitials(
          fullName.substring(0, 2).toUpperCase()
        );
      }
    }

    loadUser();
  }, []);

  return (
    <header className="h-24 bg-white border-b border-slate-200 flex items-center justify-between px-10">

      {/* Left */}
      <div>
        <h2 className="text-3xl font-bold text-slate-900">
          Dashboard
        </h2>

        <p className="mt-1 text-slate-500">
          Welcome back, {adminName}
        </p>
      </div>

      {/* Right */}
      <div className="flex items-center gap-5">

        {/* Search */}
        <div className="relative">
          <MagnifyingGlassIcon
            className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400"
          />

          <input
            type="text"
            placeholder="Search..."
            className="
              h-11
              w-72
              rounded-xl
              border
              border-slate-200
              bg-slate-50
              pl-12
              pr-4
              outline-none
              transition
              focus:border-blue-500
              focus:bg-white
            "
          />
        </div>

        {/* Notification */}
        <button
          className="
            flex
            h-11
            w-11
            items-center
            justify-center
            rounded-xl
            bg-slate-100
            transition
            hover:bg-slate-200
          "
        >
          <BellIcon className="h-6 w-6 text-slate-700" />
        </button>

        {/* Profile */}
        <div className="flex items-center gap-3">

          <div className="text-right">
            <div className="font-semibold text-slate-900">
              {adminName}
            </div>

            <div className="text-sm text-green-600">
              ● Online
            </div>
          </div>

          <div
            className="
              flex
              h-12
              w-12
              items-center
              justify-center
              rounded-full
              bg-blue-600
              text-lg
              font-bold
              text-white
            "
          >
            {initials}
          </div>

        </div>

      </div>

    </header>
  );
}