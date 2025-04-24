import Td from "./td";
import Th from "./th"
import FindReservations from "../_server-actions/find-reservations";
import ApproveReservationButton from "./approve-reservation-button";

interface RequestsTableProps{
    labId: string
}

export default async function RequestsTable(params: RequestsTableProps){
  const columnNames = ["Equipment", "User", "Day"];

  const requests = await FindReservations(params.labId);

    return (
        <>
        <div className="bg-white rounded-lg shadow overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
            {columnNames.map((x) => 
                <Th key={x}>{x}</Th>
            )}
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {requests.map((request) => (
              <tr key={request.id} className="hover:bg-gray-50">
                <Td>{request.equipment.name}</Td>
                <Td>{request.user.name}</Td>
                <Td>{request.date.toString()}</Td>
                
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                <div className="flex space-x-3">
                <ApproveReservationButton requestId={request.id} path={`/dashboard/lab-manager/${params.labId}/reservations`}/>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
        </>
    )
}