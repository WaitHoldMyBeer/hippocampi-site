import { lusitana } from "@/app/components/ui/fonts";
import DoctorCalendar from "../../components/ui/dashboard/DoctorCalendar";
// import { fetchAppointments } from "../lib/data";
import UpcomingMeetings from "@/app/components/ui/dashboard/UpcomingMeetings";
import DashboardCards from "../../components/ui/dashboard/DashboardCards";
import {
  DoctorCalendarSkeleton,
  UpcomingMeetingsSkeleton,
} from "../../components/ui/skeletons";
import { Suspense } from "react";

export default async function Page() {
  const currentDoctorId = "aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa";

  return (
    <main>
      <h1 className={`${lusitana.className} mb-4 text-xl md:text-2xl`}>
        Dashboard
      </h1>
      {/*Wrap cards into single skeleton*/}
      <DashboardCards doctorId={currentDoctorId} />
      <div className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-4 lg:grid-cols-8">
        <Suspense fallback={<DoctorCalendarSkeleton />}>
          <DoctorCalendar doctorId={currentDoctorId} />
        </Suspense>
        {/*Fix streaming */}
        <Suspense fallback={<UpcomingMeetingsSkeleton />}>
          <UpcomingMeetings doctorId={currentDoctorId} />
        </Suspense>
      </div>
    </main>
  );
}
