// /app/lib/data.ts
import { sql } from "@vercel/postgres";
import { Appointment } from "./definitions";
import { Patient } from "./definitions";

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
// /app/lib/data.ts

const ITEMS_PER_PAGE = 6;

export async function fetchFilteredPatients(
  query: string,
  currentPage: number,
  doctorId: string
) {
  const offset = (currentPage - 1) * ITEMS_PER_PAGE;
  try {
    const patients = await sql<Patient>`
      SELECT
        id,
        name,
        email,
        phone_number,
        notes
      FROM users
      WHERE doctor_id = ${doctorId}
        AND (
          name ILIKE ${`%${query}%`} OR
          email ILIKE ${`%${query}%`} OR
          phone_number ILIKE ${`%${query}%`}
        )
      ORDER BY name ASC
      LIMIT ${ITEMS_PER_PAGE} OFFSET ${offset}
    `;
    return patients.rows;
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error("Failed to fetch patients.");
  }
}

export async function fetchPatientsPages(query: string, doctorId: string) {
  try {
    const countResult = await sql`
      SELECT COUNT(*)::int AS count
      FROM users
      WHERE doctor_id = CAST(${doctorId} AS uuid)
        AND (
          name ILIKE ${`%${query}%`} OR
          email ILIKE ${`%${query}%`} OR
          phone_number ILIKE ${`%${query}%`}
        )
    `;
    const totalPages = Math.ceil(
      Number(countResult.rows[0].count) / ITEMS_PER_PAGE
    );
    return totalPages;
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error("Failed to fetch total number of patients.");
  }
}
