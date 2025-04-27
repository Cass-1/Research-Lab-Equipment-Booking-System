import Link from 'next/link';
import Image from 'next/image';
import { Lab, Role } from '@prisma/client';

interface LabCardProps {
  lab: Lab;
  role: string;
}

export default function LabCard({ lab, role }: LabCardProps) {
  return (
    <Link href={`/dashboard/lab/${lab.id}`}>
      <div className="border rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300 h-full flex flex-col">
        {/* Card Header/Lab Image */}
        <div className="w-full h-40 bg-blue-600 relative">
          {lab.imageUrl ? (
            <Image 
              src={lab.imageUrl}
              alt={lab.name}
              fill
              className="object-cover"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center bg-blue-600 text-white">
              {lab.name.substring(0, 2).toUpperCase()}
            </div>
          )}
        </div>
        
        {/* Card Content */}
        <div className="p-4 flex-grow flex flex-col">
          <div className="flex items-center justify-between mb-2">
            <h3 className="font-bold text-lg truncate">{lab.name}</h3>
            <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded-full">
              {role === Role.LAB_MANAGER ? 'Admin' : role === 'PI' ? 'Principal Investigator' : 'Member'}
            </span>
          </div>
          
          <p className="text-sm text-gray-600 mb-4 line-clamp-2">
            {lab.description || "No description available."}
          </p>
          
          <div className="mt-auto flex justify-between items-center">
            <span className="text-xs text-gray-500">
              {lab.equipmentCount || 0} Equipment Available
            </span>
            <span className="text-blue-600 text-sm">View Lab →</span>
          </div>
        </div>
      </div>
    </Link>
  );
}