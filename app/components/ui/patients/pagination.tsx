"use client";

import Link from "next/link";

export default function Pagination({
  totalPages,
  currentPage,
  query,
  doctorId,
}: {
  totalPages: number;
  currentPage: number;
  query: string;
  doctorId: string;
}) {
  return (
    <div className="mt-5 flex w-full justify-center">
      <nav className="flex space-x-2">
        {Array.from({ length: totalPages }, (_, i) => (
          <Link
            key={i}
            href={`/dashboard/patients?doctorId=${doctorId}&query=${encodeURIComponent(
              query
            )}&page=${i + 1}`}
            className={`rounded-md px-3 py-1 text-sm ${
              i + 1 === currentPage
                ? "bg-blue-500 text-white"
                : "bg-gray-200 text-gray-700"
            }`}
          >
            {i + 1}
          </Link>
        ))}
      </nav>
    </div>
  );
}
