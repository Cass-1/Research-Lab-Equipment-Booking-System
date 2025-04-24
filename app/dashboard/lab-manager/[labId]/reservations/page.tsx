import ReservationsTable from "@/app/_components/requests-table";
import { prisma } from "@/app/_lib/prisma";

export default async function Page({params}: {params: Promise<{labId: string}>}){
    const {labId} = await params;
    const reservations = await prisma.reservations.findMany({
        where:{
            labId: labId,
            approved: false
        },
        include:{
            equipment: true,
            user: true
        }
    })
    return (
        <>
            <ReservationsTable labId={labId} data={reservations}/>
        </>
    )
}