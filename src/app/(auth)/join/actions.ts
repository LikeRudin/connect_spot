"use server";

import dbClient from "@/lib/db";
import getSession from "@/lib/session";
import bcrypt from "bcrypt";
import { redirect } from "next/navigation";

import { z } from "zod";

const checkPasswordConfirm = ({
  password,
  password_confirm,
}: {
  password: string;
  password_confirm: string;
}) => password === password_confirm;

const formSchema = z
  .object({
    username: z.string(),
    password: z.string({
      required_error: "password is required",
    }),
    password_confirm: z.string({
      required_error: "password_confirm is required",
    }),
  })
  .refine(checkPasswordConfirm, {
    message: "Password and confirmation do not match",
    path: ["password_confirm"],
  })
  .superRefine(async ({ username }, ctx) => {
    const user = await dbClient.user.findUnique({
      where: {
        username,
      },
      select: {
        id: true,
      },
    });
    if (user) {
      ctx.addIssue({
        code: "custom",
        message: "possessed username",
        path: ["username"],
        fatal: true,
      });
      return z.NEVER;
    }
  });

export const join = async (prevState: any, formData: FormData) => {
  const submittedData = {
    username: formData.get("username"),
    password: formData.get("password"),
    password_confirm: formData.get("password_confirm"),
  };

  const result = await formSchema.spa(submittedData);
  if (!result.success) {
    return result.error.flatten();
  }

  const { username, password } = result.data;

  const hashedPassword = await bcrypt.hash(password, 10);
  const newUser = await dbClient.user.create({
    data: {
      username,
      password: hashedPassword,
    },
    select: {
      id: true,
    },
  });
  const session = await getSession();
  session.id = newUser.id;
  await session.save();

  redirect("/");
};
