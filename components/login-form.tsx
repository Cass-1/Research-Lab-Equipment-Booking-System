import { signIn } from "@/auth";

export default function LoginForm() {
  return (
    <form
    action={async () => {
      "use server";
      await signIn("github", {redirectTo: "/"});
    }}
    className="flex items-center gap-5 self-start rounded-lg bg-blue-500 px-6 py-3 text-sm font-medium text-white transition-colors hover:bg-blue-400 md:text-base"
  >
    <button type="submit">Log In</button>
  </form>
  );
}