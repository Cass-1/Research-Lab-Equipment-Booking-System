"use client";
import { ReservationStatus } from "@prisma/client";
import { useEffect, useState } from "react";
import GetReservations, { ReservationWithForeignKeys } from "../_server-actions/get-reservations";
import UpdateReservationStatus from "../_server-actions/update-reservation-status";

interface ReservationsTableProps{
    defaultTab: ReservationStatus,
    showTabs: boolean,
    availableActions: ReservationStatus[],
    specificUser?: string,
    specificLab?: string
}
export default function ReservationsTable(params : ReservationsTableProps){

    const [reservations, setReservations] = useState<ReservationWithForeignKeys[]>([]);
    const [loading, setLoading] = useState(false);
    const [activeTab, setActiveTab] = useState<ReservationStatus>(params.defaultTab);
    const [selectedReservations, setSelectedReservations] = useState<string[]>([]);

    useEffect(() => {
        fetchReservations();
    },[activeTab])

    const fetchReservations = async ()=>{
        setLoading(true);
        const reservations: ReservationWithForeignKeys[] = await GetReservations(activeTab, params.specificUser, params.specificLab);
        setReservations(reservations);
        setLoading(false);
    }

    const handleTabChange = async (newValue: ReservationStatus) => {
        setLoading(true);
        setActiveTab(newValue);
        setSelectedReservations([]);
        setLoading(false);
    }

    const toggleCheckbox = (reservationId: string) => {
        if (selectedReservations.includes(reservationId)){
            setSelectedReservations(selectedReservations.filter(x => x != reservationId));
        }
        else {
            setSelectedReservations([...selectedReservations, reservationId]);
        }
    }

    const handleStatusChange = async (status: ReservationStatus) => {
        console.log(`reservation length ${selectedReservations.length} `);
        await UpdateReservationStatus(status, selectedReservations);
        console.log("test")
        setSelectedReservations([]);
        await fetchReservations();
    } 
    const renderActionButtons = () => {
        return (
            <div className="mb-4 space-x-2">
                {params.availableActions.includes(ReservationStatus.APPROVED) &&
                    <button 
                        className={`px-4 py-2 rounded-lg ${selectedReservations.length ? 'bg-green-500 hover:bg-green-600 text-white' : 'bg-gray-200 cursor-not-allowed'}`}
                        disabled={selectedReservations.length === 0}
                        onClick={() => handleStatusChange(ReservationStatus.APPROVED)}
                    >
                        Approve Selected
                    </button>}
                {params.availableActions.includes(ReservationStatus.REJECTED) &&
                    <button 
                        className={`px-4 py-2 rounded-lg ${selectedReservations.length ? 'bg-red-500 hover:bg-red-600 text-white' : 'bg-gray-200 cursor-not-allowed'}`}
                        disabled={selectedReservations.length === 0}
                        onClick={() => handleStatusChange(ReservationStatus.REJECTED)}
                    >
                        Cancel Selected
                    </button>}
            </div>
        )
    }

    const renderTabs = () => {
        return (
            <div className="flex mb-4 border-b border-gray-200">
                {params.showTabs && <>
                <button className={`px-4 py-2 mr-1 -mb-px font-medium ${
                                activeTab === ReservationStatus.PENDING
                                    ? 'border-b-2 border-blue-500 text-blue-600'
                                    : 'text-gray-500 hover:text-gray-700'
                            }`} onClick={() => handleTabChange(ReservationStatus.PENDING)}>
                Pending
            </button>
            <button className={`px-4 py-2 mr-1 -mb-px font-medium ${
                                activeTab === ReservationStatus.APPROVED
                                    ? 'border-b-2 border-blue-500 text-blue-600'
                                    : 'text-gray-500 hover:text-gray-700'
                            }`} onClick={() => handleTabChange(ReservationStatus.APPROVED)}>
                Approved
            </button>
            <button className={`px-4 py-2 mr-1 -mb-px font-medium ${
                                activeTab === ReservationStatus.REJECTED
                                    ? 'border-b-2 border-blue-500 text-blue-600'
                                    : 'text-gray-500 hover:text-gray-700'
                            }`} onClick={() => handleTabChange(ReservationStatus.REJECTED)}>
                Canceled
            </button>
                </>}
            </div>
        )
    }

    const renderTable = () => {
        return (
            <div className="overflow-hidden border rounded-lg shadow">
                <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                        <tr>
                            <th className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase w-12"></th>
                            <th className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase">Date</th>
                            <th className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase">Lab</th>
                            <th className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase">Equipment</th>
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                        {loading ? (
                            <tr>
                                <td colSpan={2} className="px-6 py-4 text-center">
                                    <div className="flex justify-center items-center space-x-2">
                                        <div className="w-4 h-4 border-2 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
                                        <span className="text-gray-500">Loading reservations...</span>
                                    </div>
                                </td>
                            </tr>
                        ) : reservations.length === 0 ? <tr><td>None found</td></tr> : reservations.map((x) => (
                            <tr 
                                key={x.id} 
                                onClick={() => toggleCheckbox(x.id)}
                                className="hover:bg-gray-50 cursor-pointer transition-colors"
                            >
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <input 
                                        type="checkbox" 
                                        checked={selectedReservations.includes(x.id)}
                                        className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                                        onChange={() => toggleCheckbox(x.id)}
                                    />
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    {`${x.date.getUTCMonth()}/${x.date.getUTCDate()}/${x.date.getUTCFullYear()}`}
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    {x.lab.name}
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    {x.equipment.name}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        )
    }

    return (
        <div className="p-6">
            {renderTabs()}
            {renderActionButtons()}
            {renderTable()}
        </div>
    );
}