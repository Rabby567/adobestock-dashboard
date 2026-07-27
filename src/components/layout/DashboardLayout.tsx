import Sidebar from "./Sidebar";
import Header from "./Header";

interface DashboardLayoutProps {
  children: React.ReactNode;
}

export default function DashboardLayout({
  children,
}: DashboardLayoutProps) {
  return (
    <div className="min-h-screen flex bg-slate-100">
      <Sidebar />

      <div className="flex-1">
        <Header />

        <main className="p-8">
          <div className="mx-auto w-full max-w-[1550px]">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}