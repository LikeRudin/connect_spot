"use server";
import { redirect } from "next/navigation";

import dbClient from "@/lib/db";
import getSession from "@/lib/session";

import bcrypt from "bcrypt";
import { z } from "zod";

const checkUsernameExist = async (username: string) => {
  const user = await dbClient.user.findUnique({
    where: { username },
  });

  return Boolean(user);
};

const formSchema = z.object({
  username: z.string().refine(checkUsernameExist, "unposessed username"),
  password: z.string({
    required_error: "password is required",
  }),
});

export const login = async (prevState: any, formData: FormData) => {
  const data = {
    username: formData.get("username"),
    password: formData.get("password"),
  };

  const result = await formSchema.spa(data);

  if (!result.success) {
    return result.error.flatten();
  }

  const user = await dbClient.user.findUnique({
    where: {
      username: result.data.username,
    },
    select: {
      id: true,
      password: true,
    },
  });

  if (!user) {
    throw new Error("cannot find user");
  }

  const approved = await bcrypt.compare(result.data.password, user.password);
  if (approved) {
    const session = await getSession();
    session.id = user.id;
    await session.save();

    redirect("/");
  }
  return {
    fieldErrors: {
      password: ["Password is wrong"],
      username: [],
    },
  };
};
