import ReservationsTable from '@/app/_components/reservations-table-2';
import { prisma } from '@/app/_lib/prisma';
import { auth } from '@/auth';
import { ReservationStatus } from '@prisma/client';

export default async function Page() {
  console.log('running user page');
  const session = await auth();
  console.log('session', session);
  const labIdResults = await prisma.userLab.findMany({
        where: {
          userId: session?.user.id
        },
        select:{
          userId: false,
          labId: true
        }
      });
    const labIds = labIdResults.map(x => x.labId);
    const reservations = await prisma.reservations.findMany({
      where: {
        userId: session?.user.id,
        labId: {in: labIds},
        approved: ReservationStatus.PENDING
      },
      include:{
        equipment: true,
        user: true
      }
    })
  return (
    <>
    <ReservationsTable defaultTab={ReservationStatus.APPROVED} availableActions={[ReservationStatus.APPROVED, ReservationStatus.REJECTED]} showTabs={true}/>
    </>
  );
}