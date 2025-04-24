import Link from 'next/link';

interface EquipmentCardProps {
  equipmentName: string;
  equipmentId: string;
  labName: string;
  labId: string;
}

export default function EquipmentCard({  equipmentName, equipmentId, labName, labId }: EquipmentCardProps) {
  return (
    <Link href={`/lab/${labId}/equipment/${equipmentId}`}>
      <div className="border rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300 h-full flex flex-col">
        {/* Card Header/Lab Image */}
        <div className="w-full h-40 bg-blue-600 relative">
          
          <div className="w-full h-full flex items-center justify-center bg-blue-600 text-white">
            {equipmentName.substring(0, 2).toUpperCase()}
          </div>
          
        </div>
        
        {/* Card Content */}
        <div className="p-4 flex-grow flex flex-col">
          <div className="flex items-center justify-between mb-2">
            <h3 className="font-bold text-lg truncate">{equipmentName}</h3>
          </div>
          
          <p className="text-sm text-gray-600 mb-4 line-clamp-2">
            {labName}
          </p>
          
          <div className="mt-auto flex justify-between items-center">
            <span className="text-blue-600 text-sm">Reserve →</span>
          </div>
        </div>
      </div>
    </Link>
  );
}