import {
  KeyIcon,
  CheckCircleIcon,
  XCircleIcon,
  UsersIcon,
} from "@heroicons/react/24/solid";

import StatCard from "./StatCard";

interface DashboardStatsProps {
  totalLicenses: number;
  activeLicenses: number;
  expiredLicenses: number;
  unusedLicenses: number;
  suspendedLicenses: number;
  customerCount: number;
}

export default function DashboardStats({
  totalLicenses,
  activeLicenses,
  expiredLicenses,
  unusedLicenses,
  suspendedLicenses,
  customerCount,
}: DashboardStatsProps) {
  return (
    <div className="grid grid-cols-6 gap-6">

      <StatCard
        title="Total Licenses"
        value={totalLicenses}
        color="#2563eb"
        icon={<KeyIcon className="w-7 h-7" />}
      />

      <StatCard
        title="Active"
        value={activeLicenses}
        color="#16a34a"
        icon={<CheckCircleIcon className="w-7 h-7" />}
      />

      <StatCard
        title="Expired"
        value={expiredLicenses}
        color="#f59e0b"
        icon={<XCircleIcon className="w-7 h-7" />}
      />

      <StatCard
        title="Unused"
        value={unusedLicenses}
        color="#eab308"
        icon={<KeyIcon className="w-7 h-7" />}
      />

      <StatCard
        title="Suspended"
        value={suspendedLicenses}
        color="#dc2626"
        icon={<XCircleIcon className="w-7 h-7" />}
      />

      <StatCard
        title="Customers"
        value={customerCount}
        color="#9333ea"
        icon={<UsersIcon className="w-7 h-7" />}
      />

    </div>
  );
}