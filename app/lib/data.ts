// /app/lib/data.ts
import { sql } from "@vercel/postgres";
import { Appointment } from "./definitions";

export async function fetchAppointments() {
  try {
    // If you want to log which DB you're hitting:
    console.log("Using Database URL:", process.env.POSTGRES_URL);

    // Query all records from the 'appointments' table
    const data = await sql<Appointment>`SELECT * FROM appointments`;

    // data.rows will be typed as Appointment[] (thanks to the generic)
    return data.rows;
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error("Failed to fetch appointments data.");
  }
}
