// /app/components/ui/patients/PatientsTable.tsx
import Image from "next/image";
import { UpdatePatient } from "./buttons"; // Create this component accordingly // this must be updated
// import { formatDateToLocal } from "@/app/lib/utils";
import { fetchFilteredPatients } from "@/app/lib/data";
import { Patient } from "@/app/lib/definitions";

export default async function PatientsTable({
  query,
  currentPage,
  doctorId,
}: {
  query: string;
  currentPage: number;
  doctorId: string;
}) {
  const patients: Patient[] = await fetchFilteredPatients(
    query,
    currentPage,
    doctorId
  );

  return (
    <div className="mt-6 flow-root">
      <div className="inline-block min-w-full align-middle">
        <div className="rounded-lg bg-gray-50 p-2 md:pt-0">
          {/* Mobile view */}
          <div className="md:hidden">
            {patients.map((patient) => (
              <div
                key={patient.id}
                className="mb-2 w-full rounded-md bg-white p-4"
              >
                <div className="flex items-center justify-between border-b pb-4">
                  <div className="flex items-center">
                    {/* <Image
                      src={patient.image_url}
                      alt={`${patient.name}'s profile picture`}
                      className="mr-2 rounded-full"
                      width={28}
                      height={28}
                    /> */}
                    <p>{patient.name}</p>
                  </div>
                </div>
                <div className="flex w-full items-center justify-between pt-4">
                  <div>
                    <p className="text-sm">{patient.email}</p>
                    <p className="text-sm">{patient.phone_number}</p>
                    {/* <p className="text-xs text-gray-500">
                      {formatDateToLocal(patient.created_at)}
                    </p> */}
                  </div>
                  <div className="flex justify-end gap-2">
                    <UpdatePatient id={patient.id} />
                  </div>
                </div>
              </div>
            ))}
          </div>
          {/* Desktop view */}
          <table className="hidden min-w-full text-gray-900 md:table">
            <thead className="rounded-lg text-left text-sm font-normal">
              <tr>
                <th scope="col" className="px-4 py-5 font-medium sm:pl-6">
                  Patient
                </th>
                <th scope="col" className="px-3 py-5 font-medium">
                  Email
                </th>
                <th scope="col" className="px-3 py-5 font-medium">
                  Phone
                </th>
                <th scope="col" className="px-3 py-5 font-medium">
                  Registered
                </th>
                <th scope="col" className="relative py-3 pl-6 pr-3">
                  <span className="sr-only">Edit</span>
                </th>
              </tr>
            </thead>
            <tbody className="bg-white">
              {patients.map((patient) => (
                <tr
                  key={patient.id}
                  className="w-full border-b py-3 text-sm last-of-type:border-none [&:first-child>td:first-child]:rounded-tl-lg [&:first-child>td:last-child]:rounded-tr-lg [&:last-child>td:first-child]:rounded-bl-lg [&:last-child>td:last-child]:rounded-br-lg"
                >
                  <td className="whitespace-nowrap py-3 pl-6 pr-3">
                    <div className="flex items-center gap-3">
                      {/* <Image
                        src={patient.image_url}
                        className="rounded-full"
                        width={28}
                        height={28}
                        alt={`${patient.name}'s profile picture`}
                      /> */}
                      <p>{patient.name}</p>
                    </div>
                  </td>
                  <td className="whitespace-nowrap px-3 py-3">
                    {patient.email}
                  </td>
                  <td className="whitespace-nowrap px-3 py-3">
                    {patient.phone_number}
                  </td>
                  {/* <td className="whitespace-nowrap px-3 py-3">
                    {formatDateToLocal(patient.created_at)}
                  </td> */}
                  <td className="whitespace-nowrap py-3 pl-6 pr-3">
                    <div className="flex justify-end gap-3">
                      <UpdatePatient id={patient.id} />
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
