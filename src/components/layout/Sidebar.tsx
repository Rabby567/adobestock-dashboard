import {
  HomeIcon,
  KeyIcon,
  UsersIcon,
  Cog6ToothIcon,
  ArrowLeftStartOnRectangleIcon,
  ShoppingBagIcon,
  TicketIcon,
  CubeIcon,
} from "@heroicons/react/24/outline";

import type { ReactNode } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { logout } from "../../services/authService";

export default function Sidebar() {
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = async () => {
    const ok = window.confirm("Are you sure you want to logout?");

    if (!ok) return;

    await logout();

    navigate("/login", { replace: true });
  };

  const menuItems = [
    {
      title: "Dashboard",
      icon: <HomeIcon className="h-5 w-5" />,
      path: "/dashboard",
    },
    {
      title: "Licenses",
      icon: <KeyIcon className="h-5 w-5" />,
      path: "/licenses",
    },
    {
      title: "Customers",
      icon: <UsersIcon className="h-5 w-5" />,
      path: "/customers",
    },
    {
      title: "Orders",
      icon: <ShoppingBagIcon className="h-5 w-5" />,
      path: "/orders",
    },
    {
      title: "Promo Codes",
      icon: <TicketIcon className="h-5 w-5" />,
      path: "/promo-codes",
    },
    {
      title: "Plans",
      icon: <CubeIcon className="h-5 w-5" />,
      path: "/plans",
    },
    {
      title: "Settings",
      icon: <Cog6ToothIcon className="h-5 w-5" />,
      path: "/settings",
    },
  ];

  return (
    <aside className="flex w-72 flex-col bg-slate-950 text-white">

      {/* Logo */}
      <div className="border-b border-slate-800 px-8 pt-10 pb-8">
        <h1 className="text-3xl font-bold">
          Adobe Stock
        </h1>

        <p className="mt-2 text-slate-400">
          License Manager
        </p>
      </div>

      {/* Menu */}
      <nav className="flex-1 space-y-2 px-5 py-8">
        {menuItems.map((item) => (
          <MenuItem
            key={item.path}
            icon={item.icon}
            title={item.title}
            active={location.pathname === item.path}
            onClick={() => navigate(item.path)}
          />
        ))}
      </nav>

      {/* Logout */}
      <div className="border-t border-slate-800 p-5">
        <button
          onClick={handleLogout}
          className="
            flex
            w-full
            items-center
            gap-3
            rounded-xl
            px-4
            py-3
            text-red-400
            transition
            hover:bg-red-600
            hover:text-white
          "
        >
          <ArrowLeftStartOnRectangleIcon className="h-5 w-5" />

          <span className="font-medium">
            Logout
          </span>
        </button>
      </div>

    </aside>
  );
}

type MenuProps = {
  icon: ReactNode;
  title: string;
  active?: boolean;
  onClick?: () => void;
};

function MenuItem({
  icon,
  title,
  active = false,
  onClick,
}: MenuProps) {
  return (
    <button
      onClick={onClick}
      className={`
        flex
        w-full
        items-center
        gap-3
        rounded-xl
        px-4
        py-3
        font-medium
        transition-all
        duration-200

        ${
          active
            ? "bg-blue-600 text-white shadow-lg"
            : "text-slate-300 hover:bg-slate-900 hover:text-white"
        }
      `}
    >
      {icon}

      <span>
        {title}
      </span>
    </button>
  );
}