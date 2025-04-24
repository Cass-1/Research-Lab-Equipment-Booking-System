import ReservationsTable from "@/app/_components/requests-table";

export default async function Page({params}: {params: Promise<{labId: string}>}){
    const {labId} = await params;
    return (
        <>
            <ReservationsTable labId={labId}/>
        </>
    )
}