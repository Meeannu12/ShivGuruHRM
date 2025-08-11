// "use client";

// export default function Navbar() {
//   return (
//     <header className="flex justify-between items-center px-6 py-3 bg-white shadow">
//       <div className="text-xl font-bold">NEET ADVISOR</div>
//       <div className="flex items-center gap-2">
//         <span className="font-medium">Profile</span>
//         <div className="w-8 h-8 flex items-center justify-center rounded-full bg-orange-500 text-white">
//           A
//         </div>
//       </div>
//     </header>
//   );
// }

"use client";

type NavbarProps = {
  username: string;
};

export default function Navbar({ username }: NavbarProps) {
  return (
    <header className="w-full h-14 bg-gray-800 text-white flex items-center justify-between px-4 shadow">
      <h1 className="text-lg font-semibold">My Dashboard</h1>
      <div>Welcome, {username}</div>
    </header>
  );
}
