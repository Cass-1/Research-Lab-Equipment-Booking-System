"use client";
import { Reservations, ReservationStatus } from "@prisma/client";
import { useState } from "react";
import GetReservations from "../_server-actions/get-reservations";
import UpdateReservationStatus from "../_server-actions/update-reservation-status";

interface ReservationsTableProps{
    defaultTab: ReservationStatus,
    showTabs: boolean,
    availableActions: ReservationStatus[],
    specificUser?: string
}
export default function ReservationsTable(params : ReservationsTableProps){

    const [reservations, setReservations] = useState<Reservations[]>([]);
    const [loading, setLoading] = useState(true);
    const [activeTab, setActiveTab] = useState<ReservationStatus>(params.defaultTab);
    const [selectedReservations, setSelectedReservations] = useState<string[]>([]);

    const fetchReservations = async ()=>{
        setLoading(true);
        const reservations = await GetReservations(activeTab, params.specificUser);
        setReservations(reservations);
        setLoading(false);
    }

    const handleTabChange = (newValue: ReservationStatus) => {
        setActiveTab(newValue as ReservationStatus);
        setSelectedReservations([]);
    }

    const handleCheckbox = (reservationId: string) => {
        const selected = selectedReservations.filter(x => x != reservationId);
        setSelectedReservations(selected);
    }

    const handleStatusChange = async (status: ReservationStatus) => {
        await UpdateReservationStatus(activeTab, params.specificUser);
        setSelectedReservations([]);
        await fetchReservations();
    } 
    const renderActionButtons = () => {
        return (
            <div>
                {params.availableActions.includes(ReservationStatus.APPROVED) &&
                    <button disabled={selectedReservations.length === 0}onClick={() => handleStatusChange(ReservationStatus.APPROVED)}>
                        Approve
                    </button>}
                {params.availableActions.includes(ReservationStatus.REJECTED) &&
                    <button disabled={selectedReservations.length === 0}onClick={() => handleStatusChange(ReservationStatus.REJECTED)}>
                        Reject
                    </button>}
            </div>
        )
    }
    const renderTabs = () => {
        return (
            <>
                {params.showTabs &&
                <>
                    <button onClick={() => handleTabChange(ReservationStatus.PENDING)}>
                        Pending
                    </button>
                    <button onClick={() => handleTabChange(ReservationStatus.APPROVED)}>
                        Approved
                    </button>
                    <button onClick={() => handleTabChange(ReservationStatus.REJECTED)}>
                        Rejcected
                    </button>
                </>
                }
            </>
        )
    }
    const renderTable = () => {
        return (
            <>
                <table>
                    <thead>
                        <tr>
                            <td>checkbox</td>
                            <td>name</td>
                        </tr>
                    </thead>
                    <tbody>
                        {loading ? <tr><td>loading</td></tr>:
                            (reservations.map((x) => (
                                <tr key={x.id} onClick={() => handleCheckbox(x.id)} >
                                    <td>
                                        <input type="checkbox" checked={selectedReservations.includes(x.id)}/>
                                    </td>
                                    <td>
                                        <span>{x.date.toString()}</span>
                                    </td>
                                </tr>
                            )))
                        }
                    </tbody>
                </table>
            </>
        )
    }

    return (
        <>
        {renderTabs()}
        {renderActionButtons()}
        {renderTable()}
        </>
    );
}