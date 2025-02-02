// /app/api/patient-stats/route.ts
import { NextResponse } from "next/server";
import { sql } from "@vercel/postgres";

/**
 * Example table assumption:
 *  CREATE TABLE IF NOT EXISTS users (
 *    id UUID PRIMARY KEY,
 *    name VARCHAR(255) NOT NULL,
 *    email VARCHAR(255) NOT NULL UNIQUE,
 *    doctor_id UUID,         // can be NULL if unassigned
 *    phone_number VARCHAR(50),
 *    notes TEXT,
 *    password TEXT
 *  );
 */

export async function GET(request: Request) {
  try {
    // If you want a specific doctor, parse from the query, e.g.:
    const { searchParams } = new URL(request.url);
    const doctorId = searchParams.get("doctorId");

    // Count how many patients are assigned to this doctor
    // If doctorId is not provided, we could return some default or
    // do an overall count. For demonstration, let's assume doctorId is required:
    if (!doctorId) {
      return NextResponse.json(
        { error: "Missing doctorId query parameter" },
        { status: 400 }
      );
    }

    // 1) Count of assigned patients
    //    Filter by doctor_id = the one passed in query param
    const assignedResult = await sql`
      SELECT COUNT(*)::int AS "assigned_count"
      FROM users
      WHERE doctor_id = ${doctorId}
    `;
    const assignedCount = assignedResult.rows[0]?.assigned_count || 0;

    // 2) Count of unassigned patients (doctor_id IS NULL)
    const unassignedResult = await sql`
      SELECT COUNT(*)::int AS "unassigned_count"
      FROM users
      WHERE doctor_id IS NULL
    `;
    const unassignedCount = unassignedResult.rows[0]?.unassigned_count || 0;

    return NextResponse.json({
      assignedCount,
      unassignedCount,
    });
  } catch (error) {
    console.error("Database Error:", error);
    return NextResponse.json({ error: String(error) }, { status: 500 });
  }
}
