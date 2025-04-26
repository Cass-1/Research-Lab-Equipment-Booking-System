"use client";
import Td from "./td";
import Th from "./th"
import {  useState } from "react";
import Button from "./button";
import SetReservationStatus from "../_server-actions/set-reservation-status";

interface UserRequestsTableProps{
    userId: string,
    data: any[]
}

export default function UserReservationsTable(params: UserRequestsTableProps){
  const columnNames = ["Equipment", "User", "Day"];
  const [deletedIds, setDeletedIds] = useState<string[]>([]);

  const items = params.data.filter(x => !deletedIds.includes(x.id));
  async function handleButtonClick(reservationId: string){
    setDeletedIds([...deletedIds, reservationId]);
    await SetReservationStatus(reservationId, false);
  }


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
            {items.map((item) => (
              <tr key={item.id} className="hover:bg-gray-50">
                <Td>{item.equipment.name}</Td>
                <Td>{item.lab.name}</Td>
                <Td>{item.date.toString()}</Td>
                
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                <div className="flex space-x-3">
                <Button onClick={() => {handleButtonClick(item.id)}}>
                  Cancel
                </Button>
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