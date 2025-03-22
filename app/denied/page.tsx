import Link from "next/link";

// from https://dev.to/alisamir/unauthorized-and-forbidden-pages-in-nextjs-15-2jm
export default function Page(){
    return(
        <div className="min-h-screen flex flex-col items-center justify-center text-center">
      <h1 className="text-4xl font-bold text-red-600">403 - Forbidden</h1>
      <p className="mt-4 text-lg">
        You don’t have permission to access this page.
      </p>
      <Link href="/" className="mt-6 text-blue-500 hover:underline">
        Return to Home
      </Link>
    </div>
    )
}