"use client";
import Td from "./td";
import Th from "./th"
import FindReservations from "../_server-actions/find-reservations";
import ApproveReservationButton from "./approve-reservation-button";
import { Reservations } from "@prisma/client";
import { useState } from "react";
import Button from "./button";
import ApproveReservation from "../_server-actions/approve-reservation";

interface RequestsTableProps{
    labId: string,
    data: any[]
}

export default function ReservationsTable(params: RequestsTableProps){
  const columnNames = ["Equipment", "User", "Day"];
  const [items, setItems] = useState(params.data);

  async function handleButtonClick(reservationId: string){
    setItems(items.filter(item => item.id !=reservationId));
    await ApproveReservation(reservationId);
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
                  Approve
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