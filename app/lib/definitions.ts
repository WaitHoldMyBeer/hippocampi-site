// /app/lib/definitions.ts

// If you don't already have it, define a type for an appointment:
// /app/lib/definitions.ts (example)
export type Appointment = {
  id: string;
  doctor_id: string;
  patient_id: string;
  datetime: string;
  status: "scheduled" | "completed" | "canceled";
  zoom_link: string | null;
};
