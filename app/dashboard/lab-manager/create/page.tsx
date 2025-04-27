import { prisma, Role } from '@/app/_lib/prisma';
import { redirect } from 'next/navigation';
import { auth } from '@/auth';

export default async function CreateLabPage() {
    const session = await auth();

    // Check if the user is an admin
    if (!session?.user ) {
        redirect('/dashboard');
    }

    async function handleCreateLab(formData: FormData) {
        'use server'; // Enables server actions in Next.js
        const name = formData.get('name') as string;
        const description = formData.get('description') as string;

        // Create the lab in the database
        await prisma.lab.create({
            data: {
                name,
                description,
            },
        });

        // Redirect back to the labs management page
        redirect('/dashboard/lab-manager');
    }

    return (
        <div className="p-6">
            <h1 className="text-2xl font-bold mb-4">Create a New Lab</h1>
            <form action={handleCreateLab} className="space-y-4">
                <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                        Lab Name
                    </label>
                    <input
                        type="text"
                        name="name"
                        id="name"
                        required
                        className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                    />
                </div>
                <div>
                    <label htmlFor="description" className="block text-sm font-medium text-gray-700">
                        Description
                    </label>
                    <textarea
                        name="description"
                        id="description"
                        rows={4}
                        className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                    ></textarea>
                </div>
                <button
                    type="submit"
                    className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors"
                >
                    Create Lab
                </button>
            </form>
        </div>
    );
}