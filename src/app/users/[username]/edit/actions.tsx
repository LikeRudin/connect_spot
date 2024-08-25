"use server";

import getSession from "@/lib/session";
import dbClient from "@/lib/db";

import { revalidatePath } from "next/cache";
import { notFound, redirect } from "next/navigation";

import { z } from "zod";

import bcrypt from "bcrypt";
import { NextResponse } from "next/server";

const checkPasswordConfirm = ({
  new_password,
  new_password_confirm,
}: {
  new_password?: string;
  new_password_confirm?: string;
}) => new_password === new_password_confirm;

const formSchema = (userId: number, userPassword: string) =>
  z
    .object({
      username: z.string(),
      bio: z.string().optional(),
      password: z.string({
        required_error: "password is required",
      }),
      new_password: z.string().optional(),
      new_password_confirm: z.string().optional(),
    })
    .refine(checkPasswordConfirm, {
      message: "New password and confirmation do not match",
      path: ["new_password_confirm"],
    })
    .superRefine(async ({ username, password }, ctx) => {
      const user = await dbClient.user.findUnique({
        where: {
          username,
        },
        select: {
          id: true,
          password: true,
        },
      });
      if (user && userId !== user.id) {
        ctx.addIssue({
          code: "custom",
          message: "possessed username",
          path: ["username"],
          fatal: true,
        });
        return z.NEVER;
      }

      const isOk = await bcrypt.compare(password, userPassword);
      if (!isOk) {
        ctx.addIssue({
          code: "custom",
          message: "wrong password",
          path: ["password"],
          fatal: true,
        });
        return z.NEVER;
      }
    });

export const editProfile = async (prevState: any, formData: FormData) => {
  console.log("editProfile");
  const data = {
    username: formData.get("username"),
    bio: formData.get("bio"),
    password: formData.get("password"),
    new_password: formData.get("new_password") || "",
    new_password_confirm: formData.get("new_password_confirm") || "",
  };
  console.log("data 수집 완료");
  const session = await getSession();
  console.log("세션 완료");

  if (!(session && session.id)) {
    console.log("사용자 정보를 찾을 수 없음");
    notFound();
  }

  const user = await dbClient.user.findUnique({ where: { id: session.id } });

  if (!user) {
    notFound();
  }

  const result = await formSchema(session.id, user.password).spa(data);
  console.log(Boolean(result.success));

  if (!result.success) {
    console.log(result.error.flatten());
    return result.error.flatten();
  }

  const updateData: any = {
    username: result.data.username,
    bio: result.data.bio || null,
  };

  if (result.data.new_password) {
    const hashedNewPassword = await bcrypt.hash(result.data.new_password, 10);
    updateData.password = hashedNewPassword;
  }

  const updatedUser = await dbClient.user.update({
    where: {
      id: session.id,
    },
    data: updateData,
    select: {
      id: true,
    },
  });

  if (!updatedUser) {
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }

  revalidatePath(`/profile`);
  redirect("/profile");
};

export const getBasicProfile = async (username: string) => {
  const user = await dbClient.user.findUnique({
    where: {
      username,
    },
    select: {
      username: true,
      email: true,
      bio: true,
    },
  });

  if (!user) {
    notFound();
  }
  return user;
};
