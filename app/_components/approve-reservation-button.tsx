"use client";
import SetReservationStatus from "../_server-actions/set-reservation-status";
import Button from "./button";

export default function ApproveReservationButton(params: {requestId: string, onClick: () => void}){
    return (
        <>
            <Button onClick={async () => {SetReservationStatus(params.requestId, params.path)}}>Approve</Button>
        </>
    );
}