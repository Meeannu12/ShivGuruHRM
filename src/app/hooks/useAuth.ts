"use client"; // <-- this makes it run on the client
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation"; // ✅ App Router import
import { toast } from "react-toastify";

export function useAuth() {
  const [user, setUser] = useState<any>(null);
  const router = useRouter();

  useEffect(() => {
    if (typeof window !== "undefined") {
      const storedUser = localStorage.getItem("staff");

      if (!storedUser) {
        toast.error("This page does not exist. Please log in.", {
          position: "top-right",
        });
        router.push("/login");
      } else {
        setUser(JSON.parse(storedUser));
      }
    }
  }, [router]);

  return user;
}
