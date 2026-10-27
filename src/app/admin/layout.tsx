import type { Metadata } from "next";
import Sidebar from "@/components/admin/Sidebar";

export const metadata: Metadata = {
  title: "Painel | ValeCred",
  robots: { index: false, follow: false },
};

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-surface lg:flex">
      <Sidebar />
      <div className="min-w-0 flex-1">
        <p className="bg-accent px-4 py-2 text-center text-xs font-medium">
          Modo demonstração: dados fictícios, nada é salvo e não há login real.
        </p>
        <div className="p-5 md:p-8">{children}</div>
      </div>
    </div>
  );
}
