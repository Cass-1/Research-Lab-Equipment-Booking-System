import { auth } from '@/auth';
import { prisma, Role } from '@/app/_lib/prisma';
import { redirect } from 'next/navigation';
import Link from 'next/link';
import { PlusIcon, PencilIcon, TrashIcon } from '@heroicons/react/24/outline';

export default async function LabEquipmentPage({ params }: { params: Promise<{ labId: string }> }) {
  const session = await auth();
  
  // Check if user is authenticated and has admin role
  if (!session?.user ) {
    redirect('/dashboard');
  }

  const {labId} = await params;
  // Fetch lab and its equipment
  const lab = await prisma.lab.findUnique({
    where: { id: labId },
    include: { equipment: true },
  });

  if (!lab) {
    redirect(`/dashboard/lab-manager/${labId}`);
  }

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Manage Equipment for {lab.name}</h1>
        <Link
          href={`/dashboard/lab-manager/${lab.id}/equipment/add`}
          className="flex items-center bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors"
        >
          <PlusIcon className="w-5 h-5 mr-2" />
          Add Equipment
        </Link>
      </div>

      <div className="bg-white rounded-lg shadow overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Equipment Name
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {lab.equipment.map((item) => (
              <tr key={item.id} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm font-medium text-gray-900">{item.name}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                  <div className="flex space-x-3">
                    <Link
                      href={`/dashboard/lab-manager/${lab.id}/equipment/${item.id}/edit`}
                      className="text-indigo-600 hover:text-indigo-900"
                    >
                      <PencilIcon className="w-5 h-5" />
                    </Link>
                    <Link
                      href={`/dashboard/lab-manager/${lab.id}/equipment/${item.id}/delete`}
                      className="text-red-600 hover:text-red-900"
                    >
                      <TrashIcon className="w-5 h-5" />
                    </Link>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}