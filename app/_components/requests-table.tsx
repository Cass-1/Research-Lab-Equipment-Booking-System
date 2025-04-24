"use client";
import Td from "./td";
import Th from "./th"
import { useEffect, useState } from "react";
import Button from "./button";
import ApproveReservation from "../_server-actions/approve-reservation";

interface RequestsTableProps{
    labId: string,
    data: any[],
    approve: boolean
}

export default function ReservationsTable(params: RequestsTableProps){
  const columnNames = ["Equipment", "User", "Day"];
  const [deletedIds, setDeletedIds] = useState<string[]>([]);
  const [showApproved, setShowApproved] = useState(true);

  useEffect(()=> {
    setShowApproved(params.approve);
  }, [params.approve]);

  const items = params.data.filter(x => !deletedIds.includes(x.id));
  async function handleButtonClick(reservationId: string){
    setDeletedIds([...deletedIds, reservationId]);
    await ApproveReservation(reservationId, !showApproved);
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
                <Td>{item.user.name}</Td>
                <Td>{item.date.toString()}</Td>
                
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                <div className="flex space-x-3">
                <Button onClick={() => {handleButtonClick(item.id)}}>
                  {params.approve ? "Approve" : "Cancel"}
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