import { signIn, auth } from "@/auth";
import FormLoginButton from "./form-login-button";

export default async function LoginForm() {
  const session = await auth();
  return (
    <form
      action={async () => {
        "use server";
        console.log(session);
        console.log(process.env.NEXTAUTH_URL);
        await signIn("github", {redirectTo: "/"});
      }}
      className="flex-col items-center self-start "
    >
    <FormLoginButton/>
  </form>
  );
}


