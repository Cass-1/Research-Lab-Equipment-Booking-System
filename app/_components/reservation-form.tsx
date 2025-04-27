"use client";
import { useState } from "react";
import createReservation from "../_server-actions/create-reservation";
import NotificationModal from "./notification-model";
import { ReservationStatus } from "@prisma/client";

export default function CreateReservation(params: {equipmentId: string, userId: string, labId: string}){
    const [showModal, setShowModal] = useState(false);

    async function handleFormSubmission(formData: FormData){
        const success = await createReservation(formData);
        if (!success){
            setShowModal(true);
            console.log("duplicate");
            return;
        }
        console.log("no duplicate");
    }

    return (
        <>
  <div className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-md">
    <form 
      action={handleFormSubmission}
      className="space-y-4"
    >
      <input name="equipmentId" type="hidden" value={params.equipmentId} />
      <input name="status" type="hidden" value={ReservationStatus.PENDING} />
      <input name="userId" type="hidden" value={params.userId} />
      <input name="labId" type="hidden" value={params.labId} />

      <div className="space-y-2">
        <label 
          htmlFor="date" 
          className="block text-sm font-medium text-gray-700"
        >
          Reservation Date
        </label>
        <input
          name="date"
          id="date"
          required={true}
          type="date"
          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
        />
      </div>

      <button
        type="submit"
        className="w-full px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors"
      >
        Create Reservation
      </button>
    </form>
  </div>

  <NotificationModal 
    isOpen={showModal} 
    onClose={() => setShowModal(false)}
  >Day already has a reservation</NotificationModal>

    </>);
}