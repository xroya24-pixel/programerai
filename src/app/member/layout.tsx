"use client";

import { Sidebar } from "@/components/dashboard/sidebar";
import { Topbar } from "@/components/dashboard/topbar";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-background">
      <Sidebar />
      <div className="md:pl-[240px] transition-all duration-300">
        <Topbar />
        <main className="p-6 md:p-8">{children}</main>
      </div>
    </div>
  );
}
