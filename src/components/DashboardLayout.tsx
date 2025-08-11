"use client";
import Navbar from "./Navbar";
import Sidebar from "./Sidebar";

export default function DashboardShell({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <div className="flex flex-1">
        <Sidebar />
        <main className="flex-1 p-1 bg-gray-50">{children}</main>
      </div>
    </div>
  );
}
