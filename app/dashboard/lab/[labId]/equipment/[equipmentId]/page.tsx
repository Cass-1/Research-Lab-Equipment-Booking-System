import ReservationForm from "@/app/_components/reservation-form";
import { auth } from "@/auth";


export default async function Page({ params }: { params: Promise<{labId: string, equipmentId: string}> }){
    const {equipmentId, labId} = await params;
    const session= await auth();

    // function 

    return (
    <>
        <span>{equipmentId}</span>
        <ReservationForm equipmentId={equipmentId} userId={session?.user.id} labId={labId} />
    </>);
}