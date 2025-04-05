import { auth } from '@/auth';
import { prisma } from '@/app/_lib/prisma';
import { redirect } from 'next/navigation';

export default async function DeleteEquipmentPage({ params }: { params: { labId: string; equipmentId: string } }) {
  const session = await auth();

  // Check if user is authenticated and has admin role
  if (!session?.user || session.user.role !== 'ADMIN') {
    redirect('/dashboard');
  }

  async function handleDeleteEquipment() {
    await prisma.equipment.delete({
      where: { id: params.equipmentId },
    });

    redirect(`/dashboard/admin/equipment/${params.labId}`);
  }

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Delete Equipment</h1>
      <p className="mb-4">Are you sure you want to delete this equipment?</p>
      <form action={handleDeleteEquipment} method="post">
        <button
          type="submit"
          className="bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700 transition-colors"
        >
          Delete
        </button>
      </form>
    </div>
  );
}