// // /app/seed/route.ts
// import bcrypt from "bcrypt";
// import { db } from "@vercel/postgres";
// import {
//   doctors,
//   users,
//   appointments,
//   surveys,
// } from "@/app/lib/placeholder-data";

// const client = await db.connect();

// async function seedDoctors() {
//   await client.sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`;

//   await client.sql`
//     CREATE TABLE IF NOT EXISTS doctors (
//       id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
//       name VARCHAR(255) NOT NULL,
//       email VARCHAR(255) NOT NULL UNIQUE,
//       specialty VARCHAR(255) NOT NULL,
//       image_url VARCHAR(255)
//     );
//   `;

//   const insertedDoctors = await Promise.all(
//     doctors.map(
//       (doc) =>
//         client.sql`
//         INSERT INTO doctors (id, name, email, specialty, image_url)
//         VALUES (${doc.id}, ${doc.name}, ${doc.email}, ${doc.specialty}, ${doc.image_url})
//         ON CONFLICT (id) DO NOTHING;
//       `
//     )
//   );
//   return insertedDoctors;
// }

// async function seedUsers() {
//   // Each user is effectively a patient referencing a doctor
//   await client.sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`;

//   await client.sql`
//     CREATE TABLE IF NOT EXISTS users (
//       id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
//       name VARCHAR(255) NOT NULL,
//       email TEXT NOT NULL UNIQUE,
//       password TEXT NOT NULL,
//       phone_number VARCHAR(50),
//       notes TEXT,
//       doctor_id UUID NOT NULL
//       -- optionally: FOREIGN KEY (doctor_id) REFERENCES doctors(id)
//     );
//   `;

//   const insertedUsers = await Promise.all(
//     users.map(async (user) => {
//       const hashedPassword = await bcrypt.hash(user.password, 10);
//       return client.sql`
//         INSERT INTO users (id, name, email, password, phone_number, notes, doctor_id)
//         VALUES (${user.id}, ${user.name}, ${user.email}, ${hashedPassword}, ${user.phone_number}, ${user.notes}, ${user.doctor_id})
//         ON CONFLICT (id) DO NOTHING;
//       `;
//     })
//   );
//   return insertedUsers;
// }

// async function seedAppointments() {
//   await client.sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`;

//   await client.sql`
//     CREATE TABLE IF NOT EXISTS appointments (
//       id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
//       doctor_id UUID NOT NULL,
//       patient_id UUID NOT NULL,
//       datetime TIMESTAMP NOT NULL,
//       status VARCHAR(255) NOT NULL,
//       zoom_link TEXT
//       -- FOREIGN KEY (doctor_id) REFERENCES doctors(id),
//       -- FOREIGN KEY (patient_id) REFERENCES users(id)
//     );
//   `;

//   const insertedAppointments = await Promise.all(
//     appointments.map(
//       (appt) =>
//         client.sql`
//         INSERT INTO appointments (id, doctor_id, patient_id, datetime, status, zoom_link)
//         VALUES (${appt.id}, ${appt.doctor_id}, ${appt.patient_id}, ${appt.datetime}, ${appt.status}, ${appt.zoom_link})
//         ON CONFLICT (id) DO NOTHING;
//       `
//     )
//   );
//   return insertedAppointments;
// }

// async function seedSurveys() {
//   await client.sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`;

//   await client.sql`
//     CREATE TABLE IF NOT EXISTS surveys (
//       id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
//       user_id UUID NOT NULL,
//       survey_name VARCHAR(255) NOT NULL,
//       responses JSON NOT NULL,
//       submitted_at TIMESTAMP NOT NULL
//       -- FOREIGN KEY (user_id) REFERENCES users(id)
//     );
//   `;

//   const insertedSurveys = await Promise.all(
//     surveys.map(
//       (survey) =>
//         client.sql`
//         INSERT INTO surveys (id, user_id, survey_name, responses, submitted_at)
//         VALUES (${survey.id}, ${survey.user_id}, ${survey.survey_name}, ${survey.responses}, ${survey.submitted_at})
//         ON CONFLICT (id) DO NOTHING;
//       `
//     )
//   );
//   return insertedSurveys;
// }

// export async function GET() {
//   try {
//     await client.sql`BEGIN`;

//     // Seed each table in logical order
//     await seedDoctors();
//     await seedUsers();
//     await seedAppointments();
//     await seedSurveys();

//     await client.sql`COMMIT`;

//     return new Response(
//       JSON.stringify({ message: "Database seeded successfully" }),
//       {
//         status: 200,
//         headers: { "Content-Type": "application/json" },
//       }
//     );
//   } catch (error) {
//     await client.sql`ROLLBACK`;
//     console.error("Seeding Error:", error);
//     return new Response(JSON.stringify({ error: String(error) }), {
//       status: 500,
//     });
//   }
// }
