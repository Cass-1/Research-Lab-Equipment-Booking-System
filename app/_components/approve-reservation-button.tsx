"use client";
import ApproveReservation from "../_server-actions/approve-reservation";
import Button from "./button";

export default function ApproveReservationButton(params: {requestId: string, onClick: () => void}){
    return (
        <>
            <Button onClick={async () => {ApproveReservation(params.requestId, params.path)}}>Approve</Button>
        </>
    );
}