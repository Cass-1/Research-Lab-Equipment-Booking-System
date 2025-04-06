import LabEditPage from "@/app/_components/lab-edit-page";

export default async function Page({params}: {params: Promise<{labId: string}>}) {
  const {labId} = await params;
  return (
    <LabEditPage labId={labId}/>
  );
}