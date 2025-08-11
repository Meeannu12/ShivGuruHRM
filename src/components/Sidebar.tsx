// "use client";

// import { useState } from "react";
// import { Menu } from "lucide-react";
// import Link from "next/link";
// import { useRouter } from "next/navigation"; // ✅ Added

// const menuItems = [
//   { name: "Home", href: "/dashboard/neet-hub" },
//   { name: "Profile", href: "/dashboard/e-books" },
//   { name: "Meeting", href: "/dashboard/health-analysis" },
//   { name: "Today Attendence", href: "/dashboard/alerts" },
//   { name: "Rules Of Company", href: "/dashboard/assistants" },
//   // { name: "Logout", href: "/dashboard/6-year-survey" },
//   { name: "Logout", href: "/login" }, // ✅ Changed href to /login
// ];

// export default function Sidebar() {
//   const [isOpen, setIsOpen] = useState(false);

//   const router = useRouter(); // ✅ Added

//   type MenuItem = {
//     name: string;
//     href: string;
//   };

//   // ✅ New function to handle logout
//   const handleClick = (item: MenuItem) => {
//     setIsOpen(false);
//     if (item.name === "Logout") {
//       localStorage.clear();
//       sessionStorage.clear();
//       router.push("/login");
//     }
//   };

//   return (
//     <>
//       {/* Mobile Menu Button */}
//       <div className="md:hidden">
//         <button className="p-4" onClick={() => setIsOpen(true)}>
//           <Menu size={24} />
//         </button>
//       </div>

//       {/* Overlay (only mobile) */}
//       {isOpen && (
//         <div
//           className="fixed inset-0 bg-black bg-opacity-50 z-40 md:hidden"
//           onClick={() => setIsOpen(false)}
//         />
//       )}

//       {/* Sidebar */}
//       <aside
//         className={`fixed top-0 left-0 h-full w-64 bg-white shadow-md z-50 transform transition-transform duration-300
//         ${
//           isOpen ? "translate-x-0" : "-translate-x-full"
//         } md:translate-x-0 md:static`}
//       >
//         <nav className="flex flex-col gap-4 p-4">
//           {menuItems.map((item) => (
//             <Link
//               key={item.name}
//               href={item.href}
//               className="hover:text-blue-500"
//               onClick={(e) => {
//                 if (item.name === "Logout") e.preventDefault(); // ✅ Stop normal link if Logout
//                 handleClick(item); // ✅ Our function
//               }}
//             >
//               {item.name}
//             </Link>
//           ))}
//         </nav>
//       </aside>
//     </>
//   );
// }

"use client";

import { useState } from "react";
import Link from "next/link";
import { Menu } from "lucide-react";
import type { MenuItem } from "@/types/menu";

type SidebarProps = {
  role: string;
  menuItems: MenuItem[];
  onLogout?: () => void; // <-- add optional onLogout prop
};

export default function Sidebar({ role, menuItems, onLogout }: SidebarProps) {
  const [isOpen, setIsOpen] = useState(false);

  const filteredMenu = menuItems.filter((item) => item.roles.includes(role));

  return (
    <>
      {/* Mobile Menu Button */}
      <div className="md:hidden p-4">
        <button onClick={() => setIsOpen(true)}>
          <Menu size={24} />
        </button>
      </div>

      {/* Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40 md:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed top-0 left-0 h-full w-64 bg-white shadow-md z-50 transform transition-transform duration-300 
          ${
            isOpen ? "translate-x-0" : "-translate-x-full"
          } md:translate-x-0 md:static`}
      >
        <nav className="flex flex-col gap-4 p-4">
          {filteredMenu.map((item) =>
            item.name === "Logout" ? (
              <button
                key={item.name}
                onClick={() => {
                  setIsOpen(false);
                  onLogout && onLogout(); // call logout handler passed from parent
                }}
                className="hover:text-blue-500 text-left w-full"
              >
                {item.name}
              </button>
            ) : (
              <Link
                key={item.name}
                href={item.href}
                className="hover:text-blue-500"
                onClick={() => setIsOpen(false)}
              >
                {item.name}
              </Link>
            )
          )}
        </nav>
      </aside>
    </>
  );
}
