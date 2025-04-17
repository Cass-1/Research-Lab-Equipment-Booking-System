import LabDeletePage from "@/app/_components/lab-delete-page";

export default async function Page({params}: {params: Promise<{labId: string}>}) {
  const {labId} = await params;
  return (
    <LabDeletePage labId={labId}/>
  );
}