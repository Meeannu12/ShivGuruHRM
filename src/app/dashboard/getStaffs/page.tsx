"use client";
import React, { useState, useEffect } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  TextField,
  IconButton,
  Button,
} from "@mui/material";
import { MdDeleteForever } from "react-icons/md";
import { FaEdit } from "react-icons/fa";
import { Edit, Save, Cancel } from "@mui/icons-material";
import axios from "axios";
import StatusToggle from "@/components/StatusToggle";
import ConfirmDialog from "@/components/ConfirmDialog";

interface Staff {
  _id: string;
  name: string;
  number: string;
  email: string;
  staffId: string;
  isActive: boolean;
  role: string;
  designation: string;
  job_type: string;
  joinDate: string;
}

export default function StaffTable() {
  const [rows, setRows] = useState<Staff[]>([]);
  const [editRowId, setEditRowId] = useState<string | null>(null);
  const [editData, setEditData] = useState<Partial<Staff>>({});
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [selectedId, setSelectedId] = useState<string | null>(null); // ✅ null or string allowed
  const [token, setToken] = useState<string | null>(null);

  // Fetch data
  useEffect(() => {
    const token = localStorage.getItem("token");
    axios
      .get("http://localhost:4000/api/staff/getStaff")
      .then((res) => setRows(res.data.user))
      .catch((err) => console.error(err));
    setToken(token);
  }, []);

  const handleDeleteClick = (id: string) => {
    setSelectedId(id);
    setIsDialogOpen(true);
  };

  const confirmDelete = async () => {
    console.log("Deleting student with id:", selectedId);
    // 🔥 Your API call here
    const response = await axios.delete(
      `http://localhost:4000/api/staff/staffDelete/${selectedId}`,
      {
        headers: {
          Authorization: `Bearer ${token}`, // ✅ Token in header
        },
      }
    );

    // ✅ Remove row from state
    setRows((prev) => prev.filter((staff) => staff._id !== selectedId));
    setIsDialogOpen(false);
    console.log("delete response ", response.data);
  };

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8">
      <div className="overflow-x-auto rounded-lg shadow-md">
        <table className="min-w-full bg-white text-xs sm:text-sm">
          <thead className="bg-indigo-100 text-indigo-900">
            <tr>
              {[
                "Staff Id",
                "Name",
                "Contact Number",
                "Email",
                "Status",
                "Join Date",
                "Role",
                // "Resend",
                "Edit | Delete",
              ].map((header) => (
                <th
                  key={header}
                  className="px-4 py-3 text-left whitespace-nowrap"
                >
                  {header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200 text-gray-600">
            {rows.map((student) => (
              <tr key={student._id} className="hover:bg-gray-50">
                {/* staff Id  */}
                <td
                  className="px-4 py-3 max-w-[120px] truncate"
                  title={student.staffId}
                >
                  {student.staffId}
                </td>
                {/* Truncated text with tooltip */}
                <td
                  className="px-4 py-3 max-w-[120px] truncate"
                  title={student.name}
                >
                  {student.name}
                </td>
                <td
                  className="px-4 py-3 max-w-[120px] truncate"
                  title={student.number}
                >
                  {student.number}
                </td>
                <td
                  className="px-4 py-3 max-w-[160px] truncate"
                  title={student.email}
                >
                  {student.email}
                </td>
                {/* Example status */}

                {/* ✅ Reusable Toggle */}
                <td className="px-4 py-3">
                  <StatusToggle
                    isActive={student.isActive}
                    onToggle={async (newStatus: boolean) => {
                      try {
                        await axios.patch(
                          `http://localhost:4000/api/staff/staffStatusUpdate/${student._id}`,
                          { isActive: newStatus },
                          {
                            headers: {
                              "Content-Type": "application/json",
                              Authorization: `Bearer ${token}`,
                            },
                          }
                        );

                        setRows((prev) =>
                          prev.map((r) =>
                            r._id === student._id
                              ? { ...r, isActive: newStatus }
                              : r
                          )
                        );
                      } catch (err) {
                        console.error(err);
                        alert("Failed to update status");
                      }
                    }}
                  />
                </td>

                {/* joining date  */}
                <td
                  className="px-4 py-3 max-w-[160px] truncate"
                  title={student.joinDate}
                >
                  {new Date(student.joinDate).toLocaleDateString()}
                </td>

                {/* Employee Role  */}
                <td
                  className="px-4 py-3 max-w-[160px] truncate"
                  title={student.role}
                >
                  {student.role}
                </td>
                {/* Checkin time */}
                {/* <td className="px-4 py-3 text-center">
                  {student.checkInTime ? (
                    <span className="rounded-full bg-green-100 p-1 font-semibold text-green-800">
                      {new Date(student.checkInTime).toLocaleTimeString(
                        "en-IN",
                        {
                          timeZone: "Asia/Kolkata",
                          hour: "2-digit",
                          minute: "2-digit",
                          hour12: true,
                        }
                      )}
                    </span>
                  ) : (
                    <span className="font-semibold text-red-500">NA</span>
                  )}
                </td> */}
                {/* Download */}
                {/* <td className="flex cursor-pointer justify-center px-4 py-3 hover:text-blue-600">
                  <DownloadCloud
                    size={18}
                    onClick={() => HandleDownloadTicket(student._id)}
                  />
                </td> */}
                {/* Resend */}
                {/* <td className="cursor-pointer px-4 py-3 hover:text-yellow-600">
                  <RepeatIcon
                    size={18}
                    onClick={() => handleResendTicket(student._id)}
                  />
                </td> */}

                {/* Delete */}

                {/* <td className="cursor-pointer px-4 py-3 hover:text-red-600 text-2xl flex mx-2"> */}
                <td className="cursor-pointer px-4 py-3 text-2xl flex gap-4 mx-2">
                  {/* Edit Student Button */}
                  <button
                    // onClick={() => handleDeleteStudent(student._id)}
                    className="hover:text-red-600"
                  >
                    <FaEdit />
                  </button>
                  {/* Delete Staff Button */}
                  <button
                    onClick={() => handleDeleteClick(student._id)}
                    className="hover:text-red-600"
                  >
                    <MdDeleteForever />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <ConfirmDialog
          isOpen={isDialogOpen}
          title="Confirm Delete"
          message="Are you sure you want to delete this student?"
          onConfirm={confirmDelete}
          onCancel={() => setIsDialogOpen(false)}
        />
      </div>
    </div>
  );
}
