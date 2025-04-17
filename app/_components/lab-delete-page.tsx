'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';

export default function DeleteLabPage({ labId }: { labId: string }) {
  const router = useRouter();
  const [isDeleting, setIsDeleting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleDelete = async () => {
    setIsDeleting(true);
    setError(null);

    try {
      const response = await fetch(`/api/labs/${labId}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.message || 'Failed to delete the lab');
      }

      // Redirect to the labs list page after successful deletion
      router.push('/dashboard/lab-manager/labs');
    } catch (err: any) {
      setError(err.message);
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <div className="p-4">
      <h1 className="text-xl font-bold">Delete Lab</h1>
      <p className="mt-2 text-gray-600">
        Are you sure you want to delete this lab? This action cannot be undone.
      </p>

      {error && <p className="mt-2 text-red-500">{error}</p>}

      <div className="mt-4 flex gap-2">
        <button
          onClick={handleDelete}
          disabled={isDeleting}
          className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 disabled:opacity-50"
        >
          {isDeleting ? 'Deleting...' : 'Delete'}
        </button>
        <button
          onClick={() => router.back()}
          className="px-4 py-2 bg-gray-300 text-black rounded hover:bg-gray-400"
        >
          Cancel
        </button>
      </div>
    </div>
  );
}