"use client";

import React, { useEffect, useState } from "react";
import { Card } from "@/app/components/ui/dashboard/cards"; // or wherever your Card is located

export default function DashboardCards({ doctorId }: { doctorId: string }) {
  const [assignedCount, setAssignedCount] = useState<number>(0);
  const [unassignedCount, setUnassignedCount] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchStats() {
      try {
        setLoading(true);
        setError(null);

        const res = await fetch(`/api/patient-stats?doctorId=${doctorId}`);
        if (!res.ok) {
          throw new Error("Failed to fetch patient stats");
        }

        const data = await res.json();
        // data should look like { assignedCount: number, unassignedCount: number }
        setAssignedCount(data.assignedCount);
        setUnassignedCount(data.unassignedCount);
      } catch (err: any) {
        setError(err.message || "Error fetching stats");
      } finally {
        setLoading(false);
      }
    }

    fetchStats();
  }, [doctorId]);

  if (loading) {
    return <p className="text-gray-500">Loading patient stats...</p>;
  }
  if (error) {
    return <p className="text-red-500">Error: {error}</p>;
  }

  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
      {/* Card for total patients (assigned to the current doctor) */}
      <Card
        title="Total Patients"
        value={assignedCount}
        type="customers"
        // 'customers' will show the UserGroupIcon from the iconMap
      />

      {/* Card for awaiting (unassigned) patients */}
      <Card
        title="Awaiting Patients"
        value={unassignedCount}
        type="pending"
        // 'pending' will show the ClockIcon from the iconMap
      />
    </div>
  );
}
