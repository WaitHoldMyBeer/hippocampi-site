// import { Card } from '@/app/ui/dashboard/cards';
// import RevenueChart from '@/app/ui/dashboard/revenue-chart';
// import LatestInvoices from '@/app/ui/dashboard/latest-invoices';
import { lusitana } from "@/app/components/ui/fonts";
import DoctorCalendar from "../components/ui/dashboard/DoctorCalendar";
import { fetchAppointments } from "../lib/data";
import UpcomingMeetings from "@/app/components/ui/dashboard/UpcomingMeetings";
import DashboardCards from "../components/ui/dashboard/DashboardCards";

export default async function Page() {
  const currentDoctorId = "aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa";

  const appointments = await fetchAppointments();
  return (
    <main>
      <h1 className={`${lusitana.className} mb-4 text-xl md:text-2xl`}>
        Dashboard
      </h1>
      <DashboardCards doctorId={currentDoctorId} />
      <div className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-4 lg:grid-cols-8">
        <DoctorCalendar doctorId={currentDoctorId} />
        <UpcomingMeetings doctorId={currentDoctorId} />
      </div>
    </main>
  );
}
