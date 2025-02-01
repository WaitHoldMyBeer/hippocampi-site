"use client";

import React from "react";
import { Appointment } from "@/app/lib/definitions";
import { lusitana } from "@/app/components/ui/fonts"; // Updated import path
import { CalendarIcon } from "@heroicons/react/24/outline";

/**
 * Utility: Get dates for the current month
 */
function getDatesInCurrentMonth() {
  const now = new Date();
  const year = now.getFullYear();
  const month = now.getMonth(); // 0-based
  const firstDay = new Date(year, month, 1);
  const lastDay = new Date(year, month + 1, 0);

  const dates = [];
  for (let d = firstDay; d <= lastDay; d.setDate(d.getDate() + 1)) {
    dates.push(new Date(d));
  }
  return dates;
}

type DoctorCalendarProps = {
  appointments: Appointment[]; // must match the Appointment type in definitions.ts
};

export default function DoctorCalendar({ appointments }: DoctorCalendarProps) {
  const calendarHeight = 350;
  const datesInMonth = getDatesInCurrentMonth();

  // Convert each appointment datetime into a "YYYY-MM-DD" string
  const appointmentDates = new Set(
    appointments.map((appt) => {
      const dateObj = new Date(appt.datetime);
      return dateObj.toISOString().split("T")[0];
    })
  );

  if (!appointments || appointments.length === 0) {
    return <p className="mt-4 text-gray-400">No appointments available.</p>;
  }

  return (
    <div className="w-full md:col-span-4">
      <h2 className={`${lusitana.className} mb-4 text-xl md:text-2xl`}>
        Doctor Calendar
      </h2>

      <div className="rounded-xl bg-gray-50 p-4">
        <div
          className="grid grid-cols-7 gap-2 bg-white p-4 rounded-md"
          style={{ minHeight: `${calendarHeight}px` }}
        >
          {/* Weekday labels */}
          {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((wd) => (
            <div key={wd} className="text-center font-medium text-gray-600">
              {wd}
            </div>
          ))}

          {/* Days of the month */}
          {datesInMonth.map((date) => {
            const dateISO = date.toISOString().split("T")[0];
            const isAppointment = appointmentDates.has(dateISO);

            return (
              <div
                key={dateISO}
                className="flex h-14 flex-col items-center justify-center border border-gray-100"
              >
                <span
                  className={`text-sm ${
                    isAppointment ? "font-bold text-blue-600" : "text-gray-500"
                  }`}
                >
                  {date.getDate()}
                </span>
                {isAppointment && (
                  <span className="mt-1 rounded bg-blue-100 px-1 text-xs text-blue-600">
                    Appt
                  </span>
                )}
              </div>
            );
          })}
        </div>
        <div className="flex items-center pb-2 pt-6">
          <CalendarIcon className="h-5 w-5 text-gray-500" />
          <h3 className="ml-2 text-sm text-gray-500">Current Month</h3>
        </div>
      </div>
    </div>
  );
}
