import { auth } from '@/auth';
import { prisma } from '@/app/_lib/prisma';
import { redirect } from 'next/navigation';
import Link from 'next/link';

export default async function EquipmentManagementPage() {
  const session = await auth();

  // Check if user is authenticated and has admin role
  if (!session?.user || session.user.role !== 'ADMIN') {
    redirect('/dashboard');
  }

  // Fetch all labs
  const labs = await prisma.lab.findMany({
    orderBy: { name: 'asc' },
  });

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Equipment Management</h1>
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Lab Name
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {labs.map((lab) => (
              <tr key={lab.id} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm font-medium text-gray-900">{lab.name}</div>
                  <div className="text-sm text-gray-500 truncate max-w-xs">{lab.description}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                  <Link
                    href={`/dashboard/lab-manager/equipment/${lab.id}`}
                    className="text-blue-600 hover:text-blue-900"
                  >
                    Manage Equipment
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}