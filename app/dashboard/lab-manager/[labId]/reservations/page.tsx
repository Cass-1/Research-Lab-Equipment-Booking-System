import ReservationsTable from "@/app/_components/reservations-table-2";
import { ReservationStatus } from "@prisma/client";

export default async function Page({params}: {params: Promise<{labId: string}>}){
    const {labId} = await params;
    return (
        <>
            <ReservationsTable availableActions={[ReservationStatus.APPROVED, ReservationStatus.REJECTED]} defaultTab={ReservationStatus.PENDING} showTabs={true}/>
        </>
    )
}