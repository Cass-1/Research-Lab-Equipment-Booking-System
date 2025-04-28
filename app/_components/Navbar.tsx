import { auth, signOut } from "@/auth";
import Link from "next/link";
import Image from "next/image";
import LoginForm from "./login-form";

export default async function Navbar() {
  const session = await auth();
  const userId = session?.user?.id;
  const userPage = userId ? `user/${userId}`: `user/lost`;
  return (
    <header className="px-5 py-3 shadow-sm font-work-sans">
      <nav className="flex justify-between">
        <Link href="/">
          <Image
            src="lab-svgrepo-com.svg"
            alt="application logo"
            width={30}
            height={30}
          />
        </Link>
        <div className="flex items-center gap-5">
          {session && session?.user ? (
            <>
              {/* Add Admin Lab Management Link */}
              {session?.user?.role === 'ADMIN' && (
                <Link 
                  href="/lab-manager" 
                  className="hover:text-orange-600"
                >
                  Lab Management
                </Link>
              )}
              <form
                action={async () => {
                  "use server";
                  await signOut({ redirectTo: "/"});
                }}
              >
                <button className="cursor-pointer hover:text-orange-600" type="submit">Logout</button>
              </form>
              <Link className="hover:text-orange-600" href={userPage}>
                <span>{session?.user?.name}</span>
              </Link>
            </>
          ) : (
            <>
              <LoginForm/>
            </>
          )}
        </div>
      </nav>
    </header>
  );
}