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
    <form action={handleFormSubmission}>
        <input name="equipmentId" type="hidden" value={params.equipmentId}/>
        <input name="approved" type="hidden" value={ReservationStatus.PENDING}/>
        <input name="userId" type="hidden" value={params.userId}/>
        <input name="date" required={true} type="date"/>
        <input name="labId" type="hidden" value={params.labId}/>
        <button type="submit">Submit</button>
    </form>
    <NotificationModal isOpen={showModal} onClose={() => {setShowModal(false)}}>A reservation for that day already exists</NotificationModal>
    </>);
}