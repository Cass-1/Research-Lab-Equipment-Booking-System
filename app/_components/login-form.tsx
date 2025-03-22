import { signIn } from "@/auth";
import FormLoginButton from "./form-login-button";

export default function LoginForm() {
  return (
    <form
      action={async () => {
        "use server";
        await signIn("github", {redirectTo: "/"});
      }}
      className="flex-col items-center self-start "
    >
    <FormLoginButton/>
  </form>
  );
}


