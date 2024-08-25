"use client";

import Link from "next/link";
import { SubmitButton, LongInput } from "@/components";

import {
  UserIcon,
  LockClosedIcon,
  LockOpenIcon,
} from "@heroicons/react/24/solid";

import { useFormState } from "react-dom";
import { join } from "./actions";

const Join = () => {
  const [state, dispatch] = useFormState(join, null);
  return (
    <div className="flex flex-col gap-10 py-8 px-6">
      <div className="flex flex-col gap-2 *:font-medium">
        <h2 className="text-xl">회원가입</h2>
      </div>
      <form action={dispatch} className="flex flex-col gap-3 w-1/2">
        <LongInput
          name="username"
          type="text"
          placeholder="Username"
          theme="auth"
          required
          errors={state?.fieldErrors.username}
          minLength={3}
          maxLength={10}
        >
          <UserIcon />
        </LongInput>
        <LongInput
          name="password"
          type="password"
          placeholder="Password"
          theme="auth"
          minLength={4}
          required
          errors={state?.fieldErrors.password}
        >
          <LockClosedIcon />
        </LongInput>
        <LongInput
          name="password_confirm"
          type="password"
          placeholder="Confirm Password"
          theme="auth"
          required
          minLength={4}
          errors={state?.fieldErrors.password_confirm}
        >
          <LockOpenIcon />
        </LongInput>
        <SubmitButton text="Create account" />
      </form>
      <Link href="/login" className="w-1/2">
        <SubmitButton text="I already have an account" />
      </Link>
    </div>
  );
};
export default Join;
