import { auth } from '@/auth';
import { prisma } from '@/app/_lib/prisma';
import LabCard from '../_components/lab-card';
import { Suspense } from 'react';

export default async function Page() {
  const session = await auth();
  
  // Get user's enrolled labs
  const userWithLabs = await prisma.user.findUnique({
    where: {
      email: session?.user?.email as string,
    },
    include: {
      labs: {
        include: {
          lab: true
        }
      }
    }
  });

  const userLabs = userWithLabs?.labs || [];
  const userRole = session?.user?.role;

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">My Labs</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <Suspense fallback={<p>Loading labs...</p>}>
          {userLabs.length === 0 ? (
            <p className="text-gray-500">You are not currently enrolled in any labs.</p>
          ) : (
            userLabs.map((userLab) => (
              <LabCard 
                key={userLab.labId} 
                lab={userLab.lab}
                role={userRole} 
              />
            ))
          )}
        </Suspense>
      </div>
    </div>
  );
}