export default async function Page({params}: {params: Promise<{ labId: string }>}) {
    const { labId } = await params;
    return (
        <>
            <h1>Hello {labId}</h1>
        </>
    )
}