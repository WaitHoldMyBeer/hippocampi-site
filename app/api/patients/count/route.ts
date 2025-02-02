// /app/api/patients/count/route.ts
import { NextResponse } from "next/server";
import { sql } from "@vercel/postgres";

const ITEMS_PER_PAGE = 6;

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const query = searchParams.get("query") || "";
    const doctorId = searchParams.get("doctorId");
    if (!doctorId) {
      return NextResponse.json(
        { error: "Missing doctorId query parameter" },
        { status: 400 }
      );
    }

    // Count patients assigned to the given doctor that match the search query
    const countResult = await sql`
      SELECT COUNT(*)::int AS count
      FROM users
      WHERE doctor_id = ${doctorId}
        AND (
          name ILIKE ${`%${query}%`} OR
          email ILIKE ${`%${query}%`} OR
          phone_number ILIKE ${`%${query}%`}
        )
    `;

    const totalCount = countResult.rows[0]?.count || 0;
    const totalPages = Math.ceil(totalCount / ITEMS_PER_PAGE);
    return NextResponse.json({ totalPages });
  } catch (error) {
    console.error("Database Error:", error);
    return NextResponse.json({ error: String(error) }, { status: 500 });
  }
}
