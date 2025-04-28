interface ThProps {
    children: React.ReactNode
}
export default function Th(params: ThProps){
    return (
        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
            {params.children}
        </th>
    )
}