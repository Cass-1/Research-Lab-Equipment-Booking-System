"use client";
import { useState, useEffect } from "react";
import Button from "./button";
import GetReservations from "../_server-actions/get-registrations";
import ReservationsTable from "./reservations-table";

export default function ReservationsTables(params: {labId: string}){
    const [showApproved, setShowApproved] = useState(false)
    const [items, setItems] = useState([]);
    const [loading, setLoading] = useState(true);

    // Load initial data when component mounts
    useEffect(() => {
        async function loadInitialData() {
            setLoading(true);
            try {
                const reservations = await GetReservations(params.labId, showApproved, !showApproved);
                console.log(`reservations are ${reservations[0].equipment}`)
                setItems(reservations);
            } catch (error) {
                console.error("Failed to load reservations:", error);
            } finally {
                setLoading(false);
            }
        }
        
        loadInitialData();
    }, [params.labId]);

    async function handleButtonClick(){
        setLoading(true);
        const newApprovalView = !showApproved;
        setShowApproved(newApprovalView);
        
        try {
            const reservations = await GetReservations(params.labId, newApprovalView, !newApprovalView);
            setItems(reservations);
        } catch (error) {
            console.error("Failed to load reservations:", error);
        } finally {
            setLoading(false);
        }
    }

    return (
        <>
        <h1>{showApproved ? "Approved Reservations" : "Pending Reservations"}</h1>
            <Button onClick={handleButtonClick} disabled={loading}>
                {showApproved ? "View Pending Approval":"View Approved"}
            </Button>
            
            {loading ? (
                <div className="text-center py-4">Loading reservations...</div>
            ) : items.length > 0 ? (
                <ReservationsTable labId={params.labId} data={items} approve={showApproved}/>
            ) : (
                <div className="text-center py-4">No reservations found.</div>
            )}
        </>
    )
}