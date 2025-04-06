import Link from 'next/link';

export default function AdminDashboardPage() {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Welcome to the Admin Dashboard</h1>
      <div className="space-y-4">
        {/* Button to Manage Labs */}
        <Link
          href="/dashboard/admin/labs"
          className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors"
        >
          Manage Labs
        </Link>
        {/* Button to Manage Equipment */}
        <Link
          href="/dashboard/admin/equipment"
          className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors"
        >
          Manage Equipment
        </Link>
      </div>
    </div>
  );
}