"use client";

import { MenuItem } from "@/types/menu";
// import Navbar from "./components/Navbar";
// import Sidebar from "@/components/Sidebar";
// import type { MenuItem } from "@/types/menu";
import "../globals.css";
import Navbar from "@/components/Navbar";
import Sidebar from "@/components/Sidebar";
import { useAuth } from "../hooks/useAuth";
import { useRouter } from "next/navigation"; // <-- Next.js router for redirect

const menuItems: MenuItem[] = [
  { name: "Home", href: "/dashboard", roles: ["eco", "ceo"] },
  {
    name: "Add Staff",
    href: "/dashboard/addStaffs",
    roles: ["eco", "ceo", "hr"],
  },
  { name: "Reports", href: "/dashboard/reports", roles: ["eco", "ceo"] },
  { name: "Settings", href: "/dashboard/settings", roles: ["ceo", "eco"] },
  { name: "Profile", href: "/dashboard/profile", roles: ["ceo", "eco"] },
  { name: "Logout", href: "/login", roles: ["eco", "ceo"] },
];

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const user = useAuth();
  const router = useRouter(); // <-- use router for redirect
  if (!user) return null;

  //   console.log("User:", user);
  const userRole = user.role; // yaha tum localStorage ya cookie se role laaoge
  const username = user.name; // yaha bhi localStorage ya API se

  console.log("get from localstorage", userRole, username);

  // --- Add logout handler function here ---
  const handleLogout = () => {
    localStorage.clear(); // <-- clear localStorage
    router.push("/login"); // <-- redirect to login page
  };

  return (
    <div className="flex flex-col h-screen">
      <Navbar username={username} />
      <div className="flex flex-1 overflow-hidden">
        <Sidebar
          role={userRole}
          menuItems={menuItems}
          onLogout={handleLogout}
        />
        <main className="flex-1 p-4 overflow-auto">{children}</main>
      </div>
    </div>
  );
}
