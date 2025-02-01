// /app/lib/placeholder-data.ts

/****************************************************
 * DOCTORS
 ****************************************************/
const doctors = [
  {
    id: "aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa",
    name: "Dr. Alice Smith",
    email: "alice@telehealth.com",
    specialty: "Neurology",
    image_url: "/doctors/dr-alice.png",
  },
  {
    id: "bbbbbbbb-bbbb-bbbb-bbbb-bbbbbbbbbbbb",
    name: "Dr. Bob Johnson",
    email: "bob@telehealth.com",
    specialty: "Geriatrics",
    image_url: "/doctors/dr-bob.png",
  },
  {
    id: "cccccccc-cccc-cccc-cccc-cccccccccccc",
    name: "Dr. Carol Wang",
    email: "carol@telehealth.com",
    specialty: "Sleep Medicine",
    image_url: "/doctors/dr-carol.png",
  },
];

/****************************************************
 * USERS (PATIENTS)
 * Each user references one doctor via doctor_id
 ****************************************************/
const users = [
  {
    id: "dddddddd-dddd-dddd-dddd-dddddddddddd",
    name: "John Doe",
    email: "john@example.com",
    password: "john123",
    phone_number: "555-1234",
    notes: "Previous headaches; mild memory issues.",
    doctor_id: doctors[0].id, // Dr. Alice
  },
  {
    id: "eeeeeeee-eeee-eeee-eeee-eeeeeeeeeeee",
    name: "Jane Miller",
    email: "jane@example.com",
    password: "jane123",
    phone_number: "555-5678",
    notes: "Family history of Alzheimer's.",
    doctor_id: doctors[0].id, // Dr. Alice
  },
  {
    id: "ffffffff-ffff-ffff-ffff-ffffffffffff",
    name: "Sam Brown",
    email: "sam@example.com",
    password: "sam123",
    phone_number: "555-9012",
    notes: "Complaint of difficulty sleeping.",
    doctor_id: doctors[1].id, // Dr. Bob
  },
  {
    id: "11111111-2222-3333-4444-555555555555",
    name: "Emily Davis",
    email: "emily@example.com",
    password: "emily123",
    phone_number: "555-3456",
    notes: "Experiencing anxiety; scheduling regular checkups.",
    doctor_id: doctors[1].id, // Dr. Bob
  },
  {
    id: "66666666-7777-8888-9999-000000000000",
    name: "Raj Patel",
    email: "raj@example.com",
    password: "raj123",
    phone_number: "555-7890",
    notes: "Seeking geriatric care consultation.",
    doctor_id: doctors[1].id, // Dr. Bob
  },
  {
    id: "99999999-aaaa-bbbb-cccc-dddddddddddd",
    name: "Linda Green",
    email: "linda@example.com",
    password: "linda123",
    phone_number: "555-2468",
    notes: "Insomnia for the past 2 months.",
    doctor_id: doctors[2].id, // Dr. Carol
  },
  {
    id: "aaaa1111-bbbb-2222-cccc-333333333333",
    name: "Mark Taylor",
    email: "mark@example.com",
    password: "mark123",
    phone_number: "555-1357",
    notes: "Complains of chronic fatigue.",
    doctor_id: doctors[2].id, // Dr. Carol
  },
  {
    id: "dddd1111-eeee-2222-ffff-444444444444",
    name: "Sophia Wu",
    email: "sophia@example.com",
    password: "sophia123",
    phone_number: "555-4321",
    notes: "Suspected migraines; recommended neuro consult.",
    doctor_id: doctors[0].id, // Dr. Alice
  },
];

/****************************************************
 * APPOINTMENTS
 * Each appointment references a doctor_id and a patient_id
 ****************************************************/
const appointments = [
  {
    id: "11111111-1111-1111-1111-111111111111",
    doctor_id: doctors[0].id, // Dr. Alice
    patient_id: users[0].id, // John Doe
    datetime: "2023-10-15T10:00:00Z",
    status: "scheduled",
    zoom_link: "https://zoom.us/j/abc123",
  },
  {
    id: "22222222-2222-2222-2222-222222222222",
    doctor_id: doctors[0].id, // Dr. Alice
    patient_id: users[1].id, // Jane Miller
    datetime: "2023-10-20T09:30:00Z",
    status: "scheduled",
    zoom_link: "https://zoom.us/j/xyz789",
  },
  {
    id: "33333333-3333-3333-3333-333333333333",
    doctor_id: doctors[1].id, // Dr. Bob
    patient_id: users[2].id, // Sam Brown
    datetime: "2023-11-05T14:00:00Z",
    status: "completed",
    zoom_link: "https://zoom.us/j/lmn456",
  },
  {
    id: "44444444-4444-4444-4444-444444444444",
    doctor_id: doctors[1].id, // Dr. Bob
    patient_id: users[3].id, // Emily Davis
    datetime: "2023-11-09T09:15:00Z",
    status: "scheduled",
    zoom_link: "https://zoom.us/j/def789",
  },
  {
    id: "55555555-5555-5555-5555-555555555555",
    doctor_id: doctors[2].id, // Dr. Carol
    patient_id: users[5].id, // Linda Green
    datetime: "2023-12-01T16:00:00Z",
    status: "canceled",
    zoom_link: null,
  },
  {
    id: "66666666-6666-6666-6666-666666666666",
    doctor_id: doctors[2].id, // Dr. Carol
    patient_id: users[6].id, // Mark Taylor
    datetime: "2023-12-10T14:00:00Z",
    status: "scheduled",
    zoom_link: "https://zoom.us/j/ghi321",
  },
];

/****************************************************
 * SURVEYS
 * Each survey references a user (patient) via user_id
 ****************************************************/
const surveys = [
  {
    id: "77777777-7777-7777-7777-777777777777",
    user_id: users[0].id, // John Doe
    survey_name: "Brain Fog Assessment",
    responses: JSON.stringify({ question1: "Yes", question2: "Sometimes" }),
    submitted_at: "2023-10-10T08:30:00Z",
  },
  {
    id: "88888888-8888-8888-8888-888888888888",
    user_id: users[1].id, // Jane Miller
    survey_name: "Memory Questionnaire",
    responses: JSON.stringify({ question1: "No", question2: "Mild" }),
    submitted_at: "2023-10-18T10:15:00Z",
  },
  {
    id: "99999999-9999-9999-9999-999999999999",
    user_id: users[2].id, // Sam Brown
    survey_name: "Sleep Quality Survey",
    responses: JSON.stringify({ hours: 5, interruptions: 2 }),
    submitted_at: "2023-10-22T07:00:00Z",
  },
  {
    id: "aaaaaaa1-aaaa-aaaa-aaaa-aaaaaaaaaa12",
    user_id: users[3].id, // Emily Davis
    survey_name: "Anxiety Screening",
    responses: JSON.stringify({ question1: "Frequent", question2: "Severe" }),
    submitted_at: "2023-10-25T09:45:00Z",
  },
  {
    id: "bbbbbbb2-bbbb-bbbb-bbbb-bbbbbbbbbbb2",
    user_id: users[4].id, // Raj Patel
    survey_name: "Geriatrics Initial Assessment",
    responses: JSON.stringify({ question1: "Yes", question2: "Moderate" }),
    submitted_at: "2023-10-29T14:20:00Z",
  },
  {
    id: "ccccccc3-cccc-cccc-cccc-cccccccccc32",
    user_id: users[5].id, // Linda Green
    survey_name: "Insomnia Checklist",
    responses: JSON.stringify({ hoursSleep: 3, question2: "Wakes frequently" }),
    submitted_at: "2023-10-31T11:00:00Z",
  },
  {
    id: "ddddddd4-dddd-dddd-dddd-ddddddddddd4",
    user_id: users[6].id, // Mark Taylor
    survey_name: "Chronic Fatigue Q&A",
    responses: JSON.stringify({
      question1: "Always tired",
      question2: "Naps daily",
    }),
    submitted_at: "2023-11-02T10:00:00Z",
  },
  {
    id: "eeeeeee5-eeee-eeee-eeee-eeeeeeeeee52",
    user_id: users[7].id, // Sophia Wu
    survey_name: "Migraines Self-Report",
    responses: JSON.stringify({
      question1: "3-4 times/week",
      question2: "Throbbing pain",
    }),
    submitted_at: "2023-11-05T15:30:00Z",
  },
];

export { doctors, users, appointments, surveys };
