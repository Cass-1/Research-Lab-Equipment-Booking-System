"use client";
import { useFormStatus } from "react-dom";
import Spinner from "./spinner";

// inspo: https://www.freecodecamp.org/news/react-19-actions-simpliy-form-submission-and-loading-states/
export default function FormLoginButton() {
  const { pending } = useFormStatus();
  return (
    <>
  <button className="cursor-pointer bg-blue-500 hover:bg-blue-400 rounded-lg px-6 py-3 text-sm font-medium text-white transition-colors md:text-base " type="submit" disabled={pending}>
      {pending ? <div className="flex items-center space-x-2"><Spinner/> <p>Loading...</p></div>: "Log In"}
    </button>
    </>
  );
}