"use client"; // for Next.js 13+ app directory to use React hooks

import axios from "axios";
import { useEffect, useState } from "react";

// const roles = ["ceo", "cfo", "hr", "manager", "employee"];
export default function AddStaffPage() {
  const [roles, setRoles] = useState<string[]>([]);
  const jobTypes = ["full-time", "part-time", "contract"];

  type FormState = {
    name: string;
    number: string;
    email: string;
    staffId: string;
    role: string;
    designation: string;
    password: string;
    joinDate: string;
    job_type: string;
  };

  const initialFormState: FormState = {
    name: "",
    number: "",
    email: "",
    staffId: "",
    role: "",
    designation: "",
    password: "",
    joinDate: "",
    job_type: "",
  };

  const [form, setForm] = useState<FormState>(initialFormState);

  useEffect(() => {
    // localStorage se current user role lena
    const storedUser = localStorage.getItem("staff");
    const currentRole = storedUser ? JSON.parse(storedUser).role : null;

    console.log("rolesss", currentRole);

    if (currentRole === "hr") {
      setRoles(["hr", "manager", "employee"]);
    } else if (currentRole === "ceo" || currentRole === "cfo") {
      setRoles(["ceo", "cfo", "hr", "manager", "employee"]);
    } else {
      // Agar koi aur role hai to default empty ya jo bhi tu decide kare
      setRoles([]);
    }
  }, []);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const target = e.target;
    const { name, value, type } = target;

    const newValue =
      type === "checkbox" ? (target as HTMLInputElement).checked : value;

    setForm((prev) => ({
      ...prev,
      [name]: newValue,
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // For now just log form data
    const token = localStorage.getItem("token");
    // console.log("Submitting staff data:", token, form);

    try {
      const response = await axios.post(
        "http://localhost:4000/api/staff/createStaff",
        form,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      console.log("staff created successful", response.data);
    } catch (error: any) {
      console.log("addStaff", error.message);
    } finally {
      setForm(initialFormState);
    }
    // After processing the form data (e.g., sending it to a server),
    // reset the state by setting it back to the initial state.
    // setForm();
    // TODO: call your Add Staff API here
    // success → empty form
  };

  return (
    // <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
    //   <form
    //     onSubmit={handleSubmit}
    //     className="bg-white rounded-lg shadow-md max-w-xl w-full p-6 md:p-8"
    //   >
    //     <h2 className="text-2xl font-semibold mb-6 text-gray-800 text-center">
    //       Add Staff Member
    //     </h2>

    //     {/* Name */}
    //     <div className="mb-4">
    //       <label
    //         htmlFor="name"
    //         className="block mb-1 font-medium text-gray-700"
    //       >
    //         Name
    //       </label>
    //       <input
    //         type="text"
    //         id="name"
    //         name="name"
    //         value={form.name}
    //         onChange={handleChange}
    //         required
    //         placeholder="Full Name"
    //         className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
    //       />
    //     </div>

    //     {/* Number */}
    //     <div className="mb-4">
    //       <label
    //         htmlFor="number"
    //         className="block mb-1 font-medium text-gray-700"
    //       >
    //         Phone Number
    //       </label>
    //       <input
    //         type="tel"
    //         id="number"
    //         name="number"
    //         value={form.number}
    //         onChange={handleChange}
    //         required
    //         placeholder="+91 98765 43210"
    //         className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
    //       />
    //     </div>

    //     {/* Email */}
    //     <div className="mb-4">
    //       <label
    //         htmlFor="email"
    //         className="block mb-1 font-medium text-gray-700"
    //       >
    //         Email Address
    //       </label>
    //       <input
    //         type="email"
    //         id="email"
    //         name="email"
    //         value={form.email}
    //         onChange={handleChange}
    //         required
    //         placeholder="example@mail.com"
    //         className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
    //       />
    //     </div>

    //     {/* Staff ID */}
    //     <div className="mb-4">
    //       <label
    //         htmlFor="staffId"
    //         className="block mb-1 font-medium text-gray-700"
    //       >
    //         Staff ID
    //       </label>
    //       <input
    //         type="text"
    //         id="staffId"
    //         name="staffId"
    //         value={form.staffId}
    //         onChange={handleChange}
    //         required
    //         placeholder="STAFF1234"
    //         className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
    //       />
    //     </div>

    //     {/* Active Toggle */}
    //     {/* <div className="mb-4 flex items-center space-x-3">
    //       <label htmlFor="isActive" className="font-medium text-gray-700">
    //         Active Status
    //       </label>
    //       <input
    //         type="checkbox"
    //         id="isActive"
    //         name="isActive"
    //         checked={form.isActive}
    //         onChange={handleChange}
    //         className="h-5 w-5 text-blue-600 rounded"
    //       />
    //     </div> */}

    //     {/* Role */}
    //     <div className="mb-4">
    //       <label
    //         htmlFor="role"
    //         className="block mb-1 font-medium text-gray-700"
    //       >
    //         Role
    //       </label>
    //       <select
    //         id="role"
    //         name="role"
    //         value={form.role}
    //         onChange={handleChange}
    //         className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
    //         required
    //       >
    //         {roles.map((r) => (
    //           <option key={r} value={r}>
    //             {r.charAt(0).toUpperCase() + r.slice(1)}
    //           </option>
    //         ))}
    //       </select>
    //     </div>

    //     {/* Designation */}
    //     <div className="mb-4">
    //       <label
    //         htmlFor="designation"
    //         className="block mb-1 font-medium text-gray-700"
    //       >
    //         Designation
    //       </label>
    //       <input
    //         type="text"
    //         id="designation"
    //         name="designation"
    //         value={form.designation}
    //         onChange={handleChange}
    //         required
    //         placeholder="e.g. Senior Developer"
    //         className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
    //       />
    //     </div>

    //     {/* Password */}
    //     <div className="mb-4">
    //       <label
    //         htmlFor="password"
    //         className="block mb-1 font-medium text-gray-700"
    //       >
    //         Password
    //       </label>
    //       <input
    //         type="password"
    //         id="password"
    //         name="password"
    //         value={form.password}
    //         onChange={handleChange}
    //         required
    //         placeholder="Enter a strong password"
    //         className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
    //       />
    //     </div>

    //     {/* Join Date */}
    //     <div className="mb-4">
    //       <label
    //         htmlFor="joinDate"
    //         className="block mb-1 font-medium text-gray-700"
    //       >
    //         Join Date
    //       </label>
    //       <input
    //         type="date"
    //         id="joinDate"
    //         name="joinDate"
    //         value={form.joinDate}
    //         onChange={handleChange}
    //         required
    //         className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
    //       />
    //     </div>

    //     {/* Job Type */}
    //     <div className="mb-6">
    //       <label
    //         htmlFor="job_type"
    //         className="block mb-1 font-medium text-gray-700"
    //       >
    //         Job Type
    //       </label>
    //       <select
    //         id="job_type"
    //         name="job_type"
    //         value={form.job_type}
    //         onChange={handleChange}
    //         className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
    //         required
    //       >
    //         {jobTypes.map((j) => (
    //           <option key={j} value={j}>
    //             {j.charAt(0).toUpperCase() + j.slice(1).replace("-", " ")}
    //           </option>
    //         ))}
    //       </select>
    //     </div>

    //     <button
    //       type="submit"
    //       className="w-full bg-blue-600 hover:bg-blue-700 transition-colors text-white font-semibold py-3 rounded-md"
    //     >
    //       Add Staff
    //     </button>
    //   </form>
    // </div>

    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4 sm:p-6">
      <div className="bg-white rounded-xl shadow-2xl w-full max-w-2xl overflow-hidden transform transition-all duration-300 scale-95 hover:scale-100">
        <div className="p-6 md:p-10">
          <h2 className="text-3xl font-extrabold text-gray-900 text-center mb-2">
            New Staff Member
          </h2>
          <p className="text-center text-gray-500 mb-8">
            Fill in the details below to add a new staff member to the team.
          </p>
          <form
            onSubmit={handleSubmit}
            className="grid grid-cols-1 md:grid-cols-2 gap-6"
          >
            {/* Name */}
            <div className="col-span-1">
              <label
                htmlFor="name"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={form.name}
                onChange={handleChange}
                required
                placeholder="Full Name"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition duration-200"
              />
            </div>

            {/* Staff ID */}
            <div className="col-span-1">
              <label
                htmlFor="staffId"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Staff ID
              </label>
              <input
                type="text"
                id="staffId"
                name="staffId"
                value={form.staffId}
                onChange={handleChange}
                required
                placeholder="STAFF1234"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition duration-200"
              />
            </div>

            {/* Email */}
            <div className="md:col-span-2">
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Email Address
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                required
                placeholder="example@mail.com"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition duration-200"
              />
            </div>

            {/* Phone Number */}
            <div className="col-span-1">
              <label
                htmlFor="number"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Phone Number
              </label>
              <input
                type="tel"
                id="number"
                name="number"
                value={form.number}
                onChange={handleChange}
                required
                placeholder="+91 98765 43210"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition duration-200"
              />
            </div>

            {/* Password */}
            <div className="col-span-1">
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Password
              </label>
              <input
                type="password"
                id="password"
                name="password"
                value={form.password}
                onChange={handleChange}
                required
                placeholder="Enter a strong password"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition duration-200"
              />
            </div>

            {/* Designation */}
            <div className="col-span-1">
              <label
                htmlFor="designation"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Designation
              </label>
              <input
                type="text"
                id="designation"
                name="designation"
                value={form.designation}
                onChange={handleChange}
                required
                placeholder="e.g. Senior Developer"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition duration-200"
              />
            </div>

            {/* Role */}
            <div className="col-span-1">
              <label
                htmlFor="role"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Role
              </label>
              <select
                id="role"
                name="role"
                value={form.role}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition duration-200"
                required
              >
                <option value="" disabled>
                  Select a role
                </option>
                {roles.map((r) => (
                  <option key={r} value={r}>
                    {r.charAt(0).toUpperCase() + r.slice(1)}
                  </option>
                ))}
              </select>
            </div>

            {/* Join Date */}
            <div className="col-span-1">
              <label
                htmlFor="joinDate"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Join Date
              </label>
              <input
                type="date"
                id="joinDate"
                name="joinDate"
                value={form.joinDate}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition duration-200"
              />
            </div>

            {/* Job Type */}
            <div className="col-span-1">
              <label
                htmlFor="job_type"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Job Type
              </label>
              <select
                id="job_type"
                name="job_type"
                value={form.job_type}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition duration-200"
                required
              >
                <option value="" disabled>
                  Select a job type
                </option>
                {jobTypes.map((j) => (
                  <option key={j} value={j}>
                    {j.charAt(0).toUpperCase() + j.slice(1).replace("-", " ")}
                  </option>
                ))}
              </select>
            </div>

            {/* Submit Button */}
            <div className="md:col-span-2 mt-4">
              <button
                type="submit"
                className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-3 rounded-lg shadow-md hover:shadow-lg transition-all duration-300 ease-in-out transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
              >
                Add Staff Member
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
