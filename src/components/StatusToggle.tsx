"use client";

import React from "react";

type StatusToggleProps = {
  isActive: boolean;
  onToggle: (newStatus: boolean) => void;
};

export default function StatusToggle({ isActive, onToggle }: StatusToggleProps) {
  const handleClick = () => {
    onToggle(!isActive);
  };

  return (
    <span
      onClick={handleClick}
      className={`rounded-full px-2 py-1 text-xs font-semibold cursor-pointer ${
        isActive ? "bg-green-100 text-green-800" : "bg-red-100 text-red-500"
      }`}
    >
      {isActive ? "Active" : "Inactive"}
    </span>
  );
}
