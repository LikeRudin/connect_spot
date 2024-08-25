"use client";

import { editProfile } from "@/app/users/[username]/edit/actions";
import { useFormState } from "react-dom";
import { LockClosedIcon } from "@heroicons/react/24/solid";
import { useState } from "react";

import {
  IconButton,
  LongInput,
  SubmitButton,
  Textarea,
} from "@/components/designs";

interface IProfileEditForm {
  username: string;
  email?: string | null;
  bio?: string | null;
}

const ProfileEditForm = ({ username, bio, email }: IProfileEditForm) => {
  const [state, trigger] = useFormState(editProfile, null);

  const [isChangingPassword, setIsChangingPassword] = useState(false);

  const onClickChangePassword = () => {
    setIsChangingPassword((prev) => !prev);
  };

  return (
    <form
      action={trigger}
      className="w-full flex flex-col items-center gap-y-2"
    >
      <LongInput name="username" defaultValue={username} label="username" />
      <LongInput name="email" defaultValue={email ? email : ""} label="email" />

      <Textarea
        label="bio"
        className="w-full bg-custom-light-green"
        name="bio"
        defaultValue={bio ? bio : ""}
        required={false}
      />

      <LongInput
        label="password"
        name="password"
        type="password"
        //@ts-ignore
        errors={state?.fieldErrors.password}
      />

      <IconButton
        theme="nav"
        text="비밀번호 변경"
        type="button"
        icon={<LockClosedIcon />}
        active={isChangingPassword}
        onClick={onClickChangePassword}
      />
      {isChangingPassword && (
        <>
          <LongInput label="new password" name="new_password" type="password" />
          <LongInput
            label="new password confirm"
            name="new_password_confirm"
            type="password"
          />
        </>
      )}

      <SubmitButton text="done" />
    </form>
  );
};

export default ProfileEditForm;
