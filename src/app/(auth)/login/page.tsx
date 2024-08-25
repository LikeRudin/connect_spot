"use client";

import Link from "next/link";

import { UserIcon, LockClosedIcon } from "@heroicons/react/24/solid";
import { SubmitButton, LongInput } from "@/components";

import { useFormState } from "react-dom";
import { login } from "./actions";

const Login = () => {
  const [state, dispatch] = useFormState(login, null);
  return (
    <div className="flex flex-col gap-10 py-8 px-6">
      <div className="flex flex-col gap-2 *:font-medium">
        <h1 className="text-2xl">Well come</h1>
        <h2 className="text-xl">Log in with email and password.</h2>
      </div>
      <form action={dispatch} className="flex flex-col gap-3 w-1/2">
        <LongInput
          name="username"
          type="text"
          placeholder="username"
          required
          errors={state?.fieldErrors.username}
        >
          <UserIcon />
        </LongInput>
        <LongInput
          name="password"
          type="password"
          placeholder="Password"
          required
          errors={state?.fieldErrors.password}
        >
          <LockClosedIcon />
        </LongInput>
        <SubmitButton text="Login" />
      </form>
      <Link href="/join" className="w-1/2">
        <SubmitButton text=" I don't have an account yet" />
      </Link>
    </div>
  );
};

export default Login;
