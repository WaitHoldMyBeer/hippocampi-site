"use client";

import Link from "next/link";

export function UpdatePatient({ id }: { id: string }) {
  return (
    <Link href={`/dashboard/patients/edit/${id}`}>
      <button className="rounded bg-blue-500 px-2 py-1 text-white text-xs hover:bg-blue-600">
        Update
      </button>
    </Link>
  );
}
