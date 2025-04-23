"use client";
import { useState } from "react";
import createReservation from "../_server-actions/create-reservation";
import AlertModal from "./modal-alert";

export default function CreateReservation(params: {equipmentId: string, userId: string}){
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
        <input name="approved" type="hidden" value="false"/>
        <input name="userId" type="hidden" value={params.userId}/>
        <input name="date" required={true} type="date"/>
        <button type="submit">Submit</button>
    </form>
    <AlertModal isOpen={showModal} onClose={() => {setShowModal(false)}}>A reservation for that day already exists</AlertModal>
    </>);
}