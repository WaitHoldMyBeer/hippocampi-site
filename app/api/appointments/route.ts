// /app/api/appointments/route.ts

import { NextResponse } from "next/server";
import { sql } from "@vercel/postgres";
import { Appointment } from "@/app/lib/definitions";

export async function GET(request: Request) {
  try {
    // Parse the incoming URL for query params
    const { searchParams } = new URL(request.url);
    const doctorId = searchParams.get("doctorId");

    let data;
    if (doctorId) {
      // Filter for appointments belonging to a specific doctor
      data = await sql<Appointment>`
        SELECT * FROM appointments
        WHERE doctor_id = ${doctorId}
      `;
    } else {
      // Return all appointments if no doctorId was provided
      data = await sql<Appointment>`SELECT * FROM appointments`;
    }

    return NextResponse.json(data.rows);
  } catch (error) {
    console.error("Database Error:", error);
    return NextResponse.json({ error: String(error) }, { status: 500 });
  }
}
