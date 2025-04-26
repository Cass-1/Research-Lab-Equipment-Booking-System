import ReservationsTable from "@/app/_components/reservations-table";
import ReservationsTables from "@/app/_components/reservations-tables";
import { prisma } from "@/app/_lib/prisma";

export default async function Page({params}: {params: Promise<{labId: string}>}){
    const {labId} = await params;
    return (
        <>
            <ReservationsTables labId={labId}/>
        </>
    )
}