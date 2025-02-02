"use client";

import { useEffect, useState } from "react";
import { ArrowPathIcon } from "@heroicons/react/24/outline";
import clsx from "clsx";
import Image from "next/image";
import { lusitana } from "@/app/components/ui/fonts";
import { Appointment } from "@/app/lib/definitions";

type UpcomingMeetingsProps = {
  doctorId: string;
};

export default function UpcomingMeetings({ doctorId }: UpcomingMeetingsProps) {
  const [meetings, setMeetings] = useState<Appointment[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchAppointments() {
      try {
        setLoading(true);
        setError(null);

        const res = await fetch(`/api/appointments?doctorId=${doctorId}`);
        if (!res.ok) throw new Error("Failed to fetch appointments");
        const data: Appointment[] = await res.json();

        // Filter future appointments & sort ascending
        const upcoming = data
          .filter((appt) => new Date(appt.datetime) > new Date())
          .sort(
            (a, b) =>
              new Date(a.datetime).getTime() - new Date(b.datetime).getTime()
          )
          .slice(0, 5);

        setMeetings(upcoming);
      } catch (err: any) {
        console.error("Error fetching appointments:", err);
        setError(err.message || "Error fetching data");
      } finally {
        setLoading(false);
      }
    }

    fetchAppointments();
  }, [doctorId]);

  if (loading) {
    return <p className="text-gray-500">Loading upcoming meetings...</p>;
  }
  if (error) {
    return <p className="text-red-500">Error: {error}</p>;
  }

  return (
    <div className="flex w-full flex-col md:col-span-4">
      <h2 className={`${lusitana.className} mb-4 text-xl md:text-2xl`}>
        Upcoming Meetings
      </h2>
      <div className="flex grow flex-col justify-between rounded-xl bg-gray-50 p-4">
        <div className="bg-white px-6">
          {meetings.length === 0 ? (
            <p className="py-4 text-sm text-gray-500">No upcoming meetings.</p>
          ) : (
            meetings.map((appt, i) => {
              // In a real app, you'd do a JOIN or separate fetch to get
              // patient details, image, etc. For now, we just display the date/time.
              const dateObj = new Date(appt.datetime);
              const formattedDate = dateObj.toLocaleString([], {
                dateStyle: "short",
                timeStyle: "short",
              });

              return (
                <div
                  key={appt.id}
                  className={clsx(
                    "flex flex-row items-center justify-between py-4",
                    {
                      "border-t": i !== 0,
                    }
                  )}
                >
                  <div className="flex items-center">
                    <Image
                      src="/placeholder.png"
                      alt="Patient placeholder image"
                      className="mr-4 rounded-full"
                      width={32}
                      height={32}
                    />
                    <div className="min-w-0">
                      <p className="truncate text-sm font-semibold md:text-base">
                        Patient Placeholder
                      </p>
                      <p className="hidden text-sm text-gray-500 sm:block">
                        patient@placeholder.com
                      </p>
                    </div>
                  </div>
                  <p
                    className={`${lusitana.className} truncate text-sm font-medium md:text-base`}
                  >
                    {formattedDate}
                  </p>
                </div>
              );
            })
          )}
        </div>
        <div className="flex items-center pb-2 pt-6">
          <ArrowPathIcon className="h-5 w-5 text-gray-500" />
          <h3 className="ml-2 text-sm text-gray-500">Updated just now</h3>
        </div>
      </div>
    </div>
  );
}
