"use server";

import dbClient from "@/lib/db";
import getSession from "@/lib/session";

export const searchSpots = async (_: any, formData: FormData) => {
  const session = await getSession();
  const keyword = formData.get("keyword");

  if (!keyword) {
    return;
  }

  const searchedSpots = await dbClient.spot.findMany({
    where: {
      OR: [
        {
          title: {
            contains: keyword as string,
          },
        },
        {
          text: {
            contains: keyword as string,
          },
        },
      ],
    },
    select: {
      id: true,
      text: true,
      createdAt: true,
      updatedAt: true,
      user: true,
      spotConnects: {
        select: {
          userId: true,
        },
      },
      title: true,
      userId: true,
      categoryId: true,
    },
    orderBy: {
      updatedAt: "desc",
    },
  });

  const spots = searchedSpots.map((spot) => {
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

  return spots;
};
