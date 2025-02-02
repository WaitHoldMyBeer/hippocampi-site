"use client";

import React, { useState, useEffect } from "react";
import { Appointment } from "@/app/lib/definitions";
import {
  CalendarIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
} from "@heroicons/react/24/outline";
import { lusitana } from "@/app/components/ui/fonts";

/** Utility: get all days in a specified (year, month). */
function getDatesInMonth(year: number, month: number) {
  const firstDay = new Date(year, month, 1);
  const lastDay = new Date(year, month + 1, 0);
  const dates = [];

  for (let d = new Date(firstDay); d <= lastDay; d.setDate(d.getDate() + 1)) {
    dates.push(new Date(d));
  }
  return dates;
}

type DoctorCalendarProps = {
  doctorId: string; // pass in the logged-in doctor’s ID
};

export default function DoctorCalendar({ doctorId }: DoctorCalendarProps) {
  // Local state for the list of appointments
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // Month/Year state for navigating the calendar
  const [currentMonth, setCurrentMonth] = useState<number>(
    new Date().getMonth()
  );
  const [currentYear, setCurrentYear] = useState<number>(
    new Date().getFullYear()
  );

  useEffect(() => {
    async function fetchData() {
      try {
        setLoading(true);
        setError(null);

        // If you don't provide doctorId, the route returns all appointments
        // We want only this doctor's appointments
        const url = `/api/appointments?doctorId=${doctorId}`;
        const res = await fetch(url);
        if (!res.ok) throw new Error("Failed to fetch appointments");
        const data: Appointment[] = await res.json();

        setAppointments(data);
      } catch (err: any) {
        console.error("Error fetching appointments:", err);
        setError(err.message || "Error fetching data");
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, [doctorId]);

  // Loading or error states
  if (error) {
    return <p className="mt-4 text-red-500">Error: {error}</p>;
  }

  // Filter appointments for the current displayed month
  const startOfMonth = new Date(currentYear, currentMonth, 1)
    .toISOString()
    .split("T")[0];
  const endOfMonth = new Date(currentYear, currentMonth + 1, 0)
    .toISOString()
    .split("T")[0];

  const monthlyAppointments = appointments.filter((appt) => {
    const apptDate = appt.datetime.split("T")[0];
    return apptDate >= startOfMonth && apptDate <= endOfMonth;
  });

  // Mark which days in the current month have an appointment
  const appointmentDates = new Set(
    monthlyAppointments.map((appt) => appt.datetime.split("T")[0])
  );

  // Generate array of all days in the month
  const datesInMonth = getDatesInMonth(currentYear, currentMonth);

  // Previous/Next month navigation
  function handlePrevMonth() {
    const newMonth = currentMonth - 1;
    if (newMonth < 0) {
      setCurrentYear(currentYear - 1);
      setCurrentMonth(11);
    } else {
      setCurrentMonth(newMonth);
    }
  }
  function handleNextMonth() {
    const newMonth = currentMonth + 1;
    if (newMonth > 11) {
      setCurrentYear(currentYear + 1);
      setCurrentMonth(0);
    } else {
      setCurrentMonth(newMonth);
    }
  }

  // e.g. "October 2023"
  const currentMonthName = new Date(currentYear, currentMonth).toLocaleString(
    "default",
    {
      month: "long",
      year: "numeric",
    }
  );

  return (
    <div className="w-full md:col-span-4">
      <h2 className={`${lusitana.className} mb-4 text-xl md:text-2xl`}>
        Doctor Calendar
      </h2>

      <div className="rounded-xl bg-gray-50 p-4">
        {/* Header with month controls */}
        <div className="mb-2 flex items-center justify-between">
          <button
            className="inline-flex items-center rounded bg-white p-1 hover:bg-gray-100"
            onClick={handlePrevMonth}
          >
            <ChevronLeftIcon className="h-5 w-5 text-gray-600" />
          </button>
          <span className="text-md font-semibold text-gray-700">
            {currentMonthName}
          </span>
          <button
            className="inline-flex items-center rounded bg-white p-1 hover:bg-gray-100"
            onClick={handleNextMonth}
          >
            <ChevronRightIcon className="h-5 w-5 text-gray-600" />
          </button>
        </div>

        {/* Calendar Grid */}
        <div className="grid grid-cols-7 gap-2 bg-white p-4 rounded-md">
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
          <h3 className="ml-2 text-sm text-gray-500">
            Use arrows to navigate months
          </h3>
        </div>
      </div>
    </div>
  );
}
