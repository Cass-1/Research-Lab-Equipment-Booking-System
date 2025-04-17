import { auth } from '@/auth';
import { prisma } from '@/app/_lib/prisma';
import { redirect } from 'next/navigation';

export default async function EditEquipmentPage({ params }: { params: Promise<{ labId: string; equipmentId: string }> }) {
  const session = await auth();
  const { labId, equipmentId } = await params;
  console.log("lab id: " + labId + " equipment id: " +  equipmentId);
  // Check if user is authenticated and has admin role
  if (!session?.user || session.user.role !== 'ADMIN') {
    redirect('/dashboard');
  }

  const equipment = await prisma.equipment.findUnique({
    where: { id: equipmentId },
  });

  if (!equipment) {
    redirect(`/dashboard/lab-manager/equipment/${labId}`);
  }

  async function handleEditEquipment(formData: FormData) {
    "use server";
    const name = formData.get('name') as string;
    const quantity = parseInt(formData.get('quantity') as string, 10);

    await prisma.equipment.update({
      where: { id: equipmentId },
      data: {
        name,
        quantity,
      },
    });

    redirect(`/dashboard/lab-manager/labs/${labId}/equipment`);
  }

  return (
    <form action={handleEditEquipment} className="p-6">
      <h1 className="text-2xl font-bold mb-6">Edit Equipment</h1>
      <div className="mb-4">
        <label htmlFor="name" className="block text-sm font-medium text-gray-700">
          Equipment Name
        </label>
        <input
          type="text"
          id="name"
          name="name"
          defaultValue={equipment.name}
          className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
          required
        />
      </div>
      <div className="mb-4">
        <label htmlFor="quantity" className="block text-sm font-medium text-gray-700">
          Quantity
        </label>
        <input
          type="number"
          id="quantity"
          name="quantity"
          defaultValue={equipment.quantity}
          className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
          required
        />
      </div>
      <button
        type="submit"
        className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors"
      >
        Save Changes
      </button>
    </form>
  );
}