"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation"; // use router to redirect";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { IoIosEye, IoIosEyeOff } from "react-icons/io";
import { loginUser } from "@/lib/db";
import axios from "axios";

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    password: "",
    staffId: "",
  });

  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    // const user = await loginUser(formData.staffId, formData.password);

    try {
      const res = await axios.post(
        "http://localhost:4000/api/staff/staffLogin",
        formData
      );
      // setResponse(res.data.message);
      // console.log("response", res.data);
      // if (typeof window !== "undefined") {
      localStorage.setItem("user", JSON.stringify(res.data.staff));
      // }
      // toast.success("Login successful!", { position: "top-right" });
      router.push("/dashboard");
    } catch (err: any) {
      console.error(err.message);
      toast("Error submitting data");
    } finally {
      setFormData({ password: "", staffId: "" });
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div
      className="min-h-screen bg-cover bg-center flex items-center justify-center px-4"
      style={{ backgroundImage: 'url("https://i.postimg.cc/RFqSM2rc/bg.jpg")' }}
    >
      <form
        onSubmit={handleLogin}
        className="w-full max-w-md bg-gray bg-opacity-10 backdrop-blur-md p-8 rounded-xl shadow-lg space-y-5 text-white"
      >
        <h2 className="text-3xl font-bold text-center">Login</h2>

        <div className="relative">
          <input
            type="test" //{email ? "text" : "password"}
            name="staffId"
            placeholder="Staff Id"
            required
            className="w-full p-3 pl-5 pr-12 rounded-full bg-transparent border border-white/30 placeholder-white/80"
            onChange={handleChange}
            value={formData.staffId}
            autoComplete="new-password"
          />
          <i className="ri-user-fill absolute right-4 top-1/2 transform -translate-y-1/2 text-black" />
        </div>

        <div className="relative">
          <input
            type={showPassword ? "text" : "password"} // ✅ toggle type
            name="password"
            placeholder="Password"
            required
            className="w-full p-3 pl-5 pr-12 rounded-full bg-transparent border border-white/30 placeholder-white/80"
            onChange={handleChange}
            value={formData.password}
          />
          <i
            className={`cursor-pointer absolute right-4 top-1/2 transform -translate-y-1/2 text-black ri-${
              // showPassword ? <IoIosEye /> : <IoIosEyeOff />
              showPassword ? "<>" : "<0>"
            }`}
            onClick={() => setShowPassword(!showPassword)}
          />
        </div>

        <div className="flex justify-between items-center text-sm">
          <label className="flex items-center">
            <input type="checkbox" className="mr-2 accent-white" />
            Remember me
          </label>
          <a href="#" className="hover:underline">
            Forgot Password?
          </a>
        </div>

        <button
          type="submit"
          className="w-full bg-white text-blue-800 font-bold py-2 rounded-full hover:bg-gray-100 transition"
        >
          Login
        </button>

        <div className="flex justify-center gap-4 text-sm">
          <a href="#" className="hover:underline">
            <i className="ri-google-fill mr-1" /> Google
          </a>
          <span>—</span>
          <a href="#" className="hover:underline">
            <i className="ri-facebook-fill mr-1" /> Facebook
          </a>
        </div>
      </form>
    </div>
  );
}
