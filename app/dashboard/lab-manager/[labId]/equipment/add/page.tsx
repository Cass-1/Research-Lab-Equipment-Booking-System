'use client';

import { useState } from 'react';
import { useRouter, useParams } from 'next/navigation';

export default function AddEquipmentPage() {
  const router = useRouter();
  const params = useParams(); // Use useParams to retrieve route parameters
  const labId = params.labId; // Extract labId from params

  const [name, setName] = useState('');
  const [quantity, setQuantity] = useState('');

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    if (!labId) {
      console.error('Lab ID is missing');
      return;
    }

    const res = await fetch('/api/equipment/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        labId,
        name,
        quantity,
      }),
    });

    if (res.ok) {
      router.push(`/dashboard/lab-manager/${labId}/equipment`);
    } else {
      console.error('Failed to add equipment');
    }
  }

  return (
    <form onSubmit={handleSubmit} className="p-6">
      <h1 className="text-2xl font-bold mb-6">Add Equipment</h1>
      <div className="mb-4">
        <label htmlFor="name" className="block text-sm font-medium text-gray-700">
          Equipment Name
        </label>
        <input
          type="text"
          id="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
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
          value={quantity}
          onChange={(e) => setQuantity(e.target.value)}
          className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
          required
        />
      </div>
      <button
        type="submit"
        className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors"
      >
        Add Equipment
      </button>
    </form>
  );
}