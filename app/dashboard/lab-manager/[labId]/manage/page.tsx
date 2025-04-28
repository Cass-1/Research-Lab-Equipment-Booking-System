import ManageLabMembersPage from "@/app/_components/lab-manage-page";
import { auth } from "@/auth";

export default async function Page({params}: {params: Promise<{labId: string}>}) {
  const {labId} = await params;
  const session = await auth();
  return (
    <ManageLabMembersPage labId={labId} userRole={session?.user.role}/>
  );
}