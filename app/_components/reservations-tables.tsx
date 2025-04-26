"use client";
import { useState, useEffect } from "react";
import Button from "./button";
import GetReservations from "../_server-actions/get-registrations";
import ReservationsTable from "./reservations-table";
import { ReservationStatus } from "@prisma/client";
import SetReservationStatus from "../_server-actions/set-reservation-status";

export default function ReservationsTables(params: {labId: string}){
    const [approvalStatus, setApprovalStatus] = useState<ReservationStatus>(ReservationStatus.PENDING);
    const [items, setItems] = useState([]);
    const [loading, setLoading] = useState(true);

    // Load initial data when component mounts
    useEffect(() => {
        async function loadInitialData() {
            setLoading(true);
            try {
                const reservations = await GetReservations(params.labId, approvalStatus);
                setItems(reservations);
            } catch (error) {
                console.error("Failed to load reservations:", error);
            } finally {
                setLoading(false);
            }
        }
        
        loadInitialData();
    }, [params.labId, approvalStatus]);

    async function handleButtonClick(){
        setLoading(true);
        const newApprovalView = approvalStatus === ReservationStatus.PENDING ? ReservationStatus.APPROVED : ReservationStatus.PENDING;
        setApprovalStatus(newApprovalView);
        console.log(`the approval status is: ${approvalStatus}`)
        
        try {
            const reservations = await GetReservations(params.labId,approvalStatus);
            setItems(reservations);
        } catch (error) {
            console.error("Failed to load reservations:", error);
        } finally {
            setLoading(false);
        }
    }

    return (
        <>
        <h1>{approvalStatus === ReservationStatus.APPROVED ? "Approved Reservations" : "Pending Reservations"}</h1>
            <Button onClick={handleButtonClick} disabled={loading}>
                {approvalStatus === ReservationStatus.APPROVED ? "View Approved":"View Pending Approval"}
            </Button>
            
            {loading ? (
                <div className="text-center py-4">Loading reservations...</div>
            ) : items.length > 0 ? (
                <ReservationsTable data={items} status={approvalStatus}/>
            ) : (
                <div className="text-center py-4">No reservations found.</div>
            )}
        </>
    )
}