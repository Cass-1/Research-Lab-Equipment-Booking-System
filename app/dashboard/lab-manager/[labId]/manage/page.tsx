import ManageLabMembersPage from "@/app/_components/lab-manage-page";

export default async function Page({params}: {params: Promise<{labId: string}>}) {
  const {labId} = await params;
  return (
    <ManageLabMembersPage labId={labId}/>
  );
}