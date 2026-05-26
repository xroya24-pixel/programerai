"use client";

import { AdminSidebar } from "@/components/admin/sidebar";
import { AdminTopbar } from "@/components/admin/topbar";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-[#060816]">
      <AdminSidebar />
      <div className="lg:pl-[240px] transition-all duration-300">
        <AdminTopbar />
        <main className="p-6 lg:p-8">{children}</main>
      </div>
    </div>
  );
}
