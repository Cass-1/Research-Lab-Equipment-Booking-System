interface TdProps {
    children: React.ReactNode
}
export default function Td(params: TdProps){
    return (
        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
            {params.children}
        </td>
    )
}