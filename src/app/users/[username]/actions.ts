"use server";
import { notFound } from "next/navigation";
import dbClient from "@/lib/db";
import getSession from "@/lib/session";

export const getUserProfile = async (username: string) => {
  const session = await getSession();
  const user = await dbClient.user.findUnique({
    where: {
      username,
    },
    select: {
      username: true,
      email: true,
      bio: true,
      avatar: true,
      spots: {
        select: {
          id: true,
          title: true,
          text: true,
          createdAt: true,
          updatedAt: true,
          spotConnects: {
            select: {
              userId: true,
            },
          },
        },
      },
    },
  });

  if (!user) {
    notFound();
  }

  const spotsWithConnectStatus = user?.spots.map((spot) => {
    const isConnected = spot.spotConnects.some(
      (connect) => connect.userId === session.id
    );
    const connectCount = spot.spotConnects.length;
    return {
      ...spot,
      connectCount,
      isConnected,
    };
  });

  return {
    ...user,
    spots: spotsWithConnectStatus,
  };
};
