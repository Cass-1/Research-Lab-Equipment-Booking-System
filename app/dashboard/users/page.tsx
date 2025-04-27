import ReservationsTable from '@/app/_components/reservations-table-2';
import { auth } from '@/auth';
import { ReservationStatus } from '@prisma/client';

export default async function Page() {
  const session = await auth();
  return ( 
    <>
    <ReservationsTable defaultTab={ReservationStatus.PENDING} availableActions={[ReservationStatus.REJECTED]} showTabs={true} specificUser={session?.user.id}/>
    </>
  );
}