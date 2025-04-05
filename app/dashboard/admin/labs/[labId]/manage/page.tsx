"use client";

import { useState, useEffect } from 'react';
// import { useRouter } from 'next/navigation';
import Link from 'next/link';

type UserLab = {
  userId: string;
  labId: string;
  role: string;
  user: {
    id: string;
    name: string;
    email: string;
    image: string | null;
  }
};

type Lab = {
  id: string;
  name: string;
  description: string;
  imageUrl: string | null;
  users: UserLab[];
};

export default function ManageLabMembersPage({ params }: { params: { labId: string } }) {
  // const router = useRouter();
  const { labId } = params;
  
  const [lab, setLab] = useState<Lab | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  const [newUserEmail, setNewUserEmail] = useState('');
  const [newUserRole, setNewUserRole] = useState('MEMBER');
  const [isAdding, setIsAdding] = useState(false);
  
  // Fetch lab data
  useEffect(() => {
    const fetchLab = async () => {
      try {
        const response = await fetch(`/api/labs/${labId}`);
        if (!response.ok) {
          throw new Error('Failed to fetch lab data');
        }
        
        const labData = await response.json();
        setLab(labData);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An unknown error occurred');
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchLab();
  }, [labId]);

  const handleAddMember = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsAdding(true);
    
    try {
      const response = await fetch(`/api/labs/${labId}/members`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: newUserEmail,
          role: newUserRole
        }),
      });
      
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to add member');
      }
      
      // Refresh lab data
      const updatedLabResponse = await fetch(`/api/labs/${labId}`);
      const updatedLab = await updatedLabResponse.json();
      setLab(updatedLab);
      
      // Clear form
      setNewUserEmail('');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An unknown error occurred');
    } finally {
      setIsAdding(false);
    }
  };
  
  const handleRemoveMember = async (userId: string) => {
    if (!confirm('Are you sure you want to remove this member?')) return;
    
    try {
      const response = await fetch(`/api/labs/${labId}/members/${userId}`, {
        method: 'DELETE',
      });
      
      if (!response.ok) {
        throw new Error('Failed to remove member');
      }
      
      // Update local state
      if (lab) {
        setLab({
          ...lab,
          users: lab.users.filter(userLab => userLab.userId !== userId)
        });
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An unknown error occurred');
    }
  };
  
  const handleUpdateRole = async (userId: string, newRole: string) => {
    try {
      const response = await fetch(`/api/labs/${labId}/members/${userId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ role: newRole }),
      });
      
      if (!response.ok) {
        throw new Error('Failed to update member role');
      }
      
      // Update local state
      if (lab) {
        setLab({
          ...lab,
          users: lab.users.map(userLab => 
            userLab.userId === userId ? { ...userLab, role: newRole } : userLab
          )
        });
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An unknown error occurred');
    }
  };

  if (isLoading) {
    return <div className="p-6">Loading lab data...</div>;
  }
  
  if (!lab) {
    return <div className="p-6 text-red-500">Lab not found</div>;
  }

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Manage Lab Members: {lab.name}</h1>
        <Link
          href="/admin/labs"
          className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50"
        >
          Back to Labs
        </Link>
      </div>
      
      {error && (
        <div className="bg-red-50 text-red-500 p-4 rounded-md mb-6">
          {error}
        </div>
      )}
      
      {/* Add member form */}
      <div className="bg-white p-6 rounded-lg shadow-md mb-8">
        <h2 className="text-lg font-medium mb-4">Add New Member</h2>
        <form onSubmit={handleAddMember} className="flex flex-col md:flex-row gap-4">
          <div className="flex-grow">
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
              Email Address
            </label>
            <input
              type="email"
              id="email"
              value={newUserEmail}
              onChange={(e) => setNewUserEmail(e.target.value)}
              required
              className="w-full rounded-md border border-gray-300 py-2 px-3 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-blue-500"
              placeholder="user@example.com"
            />
          </div>
          <div className="w-full md:w-1/4">
            <label htmlFor="role" className="block text-sm font-medium text-gray-700 mb-1">
              Role
            </label>
            <select
              id="role"
              value={newUserRole}
              onChange={(e) => setNewUserRole(e.target.value)}
              className="w-full rounded-md border border-gray-300 py-2 px-3 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-blue-500"
            >
              <option value="MEMBER">Member</option>
              <option value="PI">Principal Investigator</option>
              <option value="ADMIN">Admin</option>
            </select>
          </div>
          <div className="self-end">
            <button
              type="submit"
              disabled={isAdding || !newUserEmail}
              className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50"
            >
              {isAdding ? 'Adding...' : 'Add Member'}
            </button>
          </div>
        </form>
      </div>
      
      {/* Members list */}
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Member
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Email
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Role
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {lab.users.map((userLab) => (
              <tr key={userLab.userId}>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    {userLab.user.image && (
                      <img 
                        src={userLab.user.image} 
                        alt={userLab.user.name || ''} 
                        className="w-8 h-8 rounded-full mr-3"
                      />
                    )}
                    <div className="text-sm font-medium text-gray-900">
                      {userLab.user.name || 'Unnamed User'}
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {userLab.user.email}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <select
                    value={userLab.role}
                    onChange={(e) => handleUpdateRole(userLab.userId, e.target.value)}
                    className="rounded-md border border-gray-300 py-1 px-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-blue-500"
                  >
                    <option value="MEMBER">Member</option>
                    <option value="PI">Principal Investigator</option>
                    <option value="ADMIN">Admin</option>
                  </select>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                  <button
                    onClick={() => handleRemoveMember(userLab.userId)}
                    className="text-red-600 hover:text-red-900"
                  >
                    Remove
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}