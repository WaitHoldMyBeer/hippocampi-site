// /app/dashboard/patients/page.tsx
import Pagination from "@/app/components/ui/patients/pagination";
import { lusitana } from "@/app/components/ui/fonts";
import { Suspense } from "react";
import Search from "@/app/components/ui/patients/search";
import PatientsTable from "@/app/components/ui/patients/PatientsTable";
import { PatientsTableSkeleton } from "@/app/components/ui/skeletons";

export default async function Page(props: {
  searchParams?: Promise<{
    query?: string;
    page?: string;
    doctorId?: string;
  }>;
}) {
  // Resolve search parameters (query, page, doctorId)
  const searchParams = await props.searchParams;
  const query = searchParams?.query || "";
  const currentPage = Number(searchParams?.page) || 1;
  const doctorId =
    searchParams?.doctorId || "aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa";

  // Construct an absolute URL for the API call.
  // Ensure you have an environment variable NEXT_PUBLIC_SITE_URL set to your site's base URL.
  // If not, it will fallback to "http://localhost:3000" in development.
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";
  const countUrl = new URL(
    `/api/patients/count?doctorId=${doctorId}&query=${encodeURIComponent(
      query
    )}`,
    baseUrl
  );

  const res = await fetch(countUrl.toString());
  if (!res.ok) {
    throw new Error("Failed to fetch total number of patients");
  }
  const { totalPages } = await res.json();

  return (
    <div className="w-full">
      <div className="flex w-full items-center justify-between">
        <h1 className={`${lusitana.className} text-2xl`}>Patients</h1>
      </div>
      <div className="mt-4 flex items-center justify-between gap-2 md:mt-8">
        <Search placeholder="Search patients..." />
      </div>
      <Suspense key={query + currentPage} fallback={<PatientsTableSkeleton />}>
        <PatientsTable
          query={query}
          currentPage={currentPage}
          doctorId={doctorId}
        />
      </Suspense>
      <div className="mt-5 flex w-full justify-center">
        <Pagination
          totalPages={totalPages}
          currentPage={currentPage}
          query={query}
          doctorId={doctorId}
        />
      </div>
    </div>
  );
}
