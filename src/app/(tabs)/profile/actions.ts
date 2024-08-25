"use Server";

import dbClient from "@/lib/db";
import getSession from "@/lib/session";

import { notFound } from "next/navigation";

export const getMyProfile = async () => {
  const session = await getSession();

  if (!(session && session.id)) {
    notFound();
  }

  const user = await dbClient.user.findUnique({
    where: {
      id: session.id,
    },
  });

  if (!user) {
    notFound();
  }

  return user;
};
