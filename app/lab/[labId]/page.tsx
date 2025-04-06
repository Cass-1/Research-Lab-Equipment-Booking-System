import { prisma } from '@/app/_lib/prisma';
import { notFound } from 'next/navigation';
import { auth } from '@/auth';
import Link from 'next/link';

export default async function LabPage({ params }: { params: Promise<{ labId: string }> }) {
  const session = await auth();
  
  
  // Await params before destructuring
  const { labId } = await params;
  
  // Get lab data with equipment
  const lab = await prisma.lab.findUnique({
    where: { id: labId },
    include: { 
      equipment: true,
      users: {
        include: {
          user: true
        }
      }
    }
  });
  
  if (!lab) {
    notFound();
  }
  
  // Verify user access to this lab
  const userLab = await prisma.userLab.findUnique({
    where: {
      userId_labId: {
        userId: session?.user?.id as string,
        labId,
      }
    }
  });
  
  if (!userLab) {
    // User not authorized to view this lab
    return (
      <div className="p-6">
        <h1 className="text-2xl font-bold text-red-600">Unauthorized</h1>
        <p>You do not have access to this lab.</p>
      </div>
    );
  }
  
  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-2">{lab.name}</h1>
      <p className="text-gray-600 mb-8">{lab.description}</p>
      
      {/* Add Members Button for Admins */}
      {session?.user?.role === 'ADMIN' && (
        <div className="mb-8">
          <Link href={`/lab/${labId}/add-members`}>
            <button className="bg-green-600 text-white px-4 py-2 rounded">
              Add Members
            </button>
          </Link>
        </div>
      )}
      
      <div className="mb-8">
        <h2 className="text-xl font-semibold mb-4">Available Equipment</h2>
        {lab.equipment.length === 0 ? (
          <p className="text-gray-500">No equipment available in this lab.</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {lab.equipment.map((item) => (
              <div key={item.id} className="border rounded-lg p-4 shadow-sm">
                <h3 className="font-medium">{item.name}</h3>
                <p className="text-sm text-gray-500">{item.description}</p>
                <button className="mt-2 bg-blue-600 text-white px-3 py-1 rounded text-sm">
                  Book Equipment
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
      
      <div>
        <h2 className="text-xl font-semibold mb-4">Lab Members</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {lab.users.map((userLab) => (
            <div key={userLab.userId} className="flex items-center space-x-3 p-2">
              {userLab.user.image && (
                <img 
                  src={userLab.user.image} 
                  alt={userLab.user.name || ''} 
                  className="w-8 h-8 rounded-full"
                />
              )}
              <div>
                <p className="font-medium">{userLab.user.name}</p>
                
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}