"use server";

import dbClient from "@/lib/db";
import getSession from "@/lib/session";
import { z } from "zod";

const spotSchema = z.object({
  text: z.string({
    required_error: "spot cannot be an empty post",
  }),
  title: z.string({
    required_error: "spot must have title",
  }),
});

export const uploadSpot = async (_: any, formData: FormData) => {
  const data = {
    title: formData.get("title"),
    text: formData.get("text"),
  };

  const result = spotSchema.safeParse(data);
  if (!result.success) {
    return result.error.flatten();
  }

  const { text, title } = result.data;

  const session = await getSession();
  if (session.id) {
    const spot = await dbClient.spot.create({
      data: {
        title,
        text,
        user: {
          connect: {
            id: session.id,
          },
        },
        category: { connect: { name: "Spot" } },
      },
      select: {
        id: true,
      },
    });
    return spot;
  }
};

export const getSpots = async (
  spotsNumberPerPage: number,
  currentPage: number
) => {
  const skip = currentPage > 0 ? (currentPage - 1) * spotsNumberPerPage : 0;
  const spots = await dbClient.spot.findMany({
    take: spotsNumberPerPage,
    skip,
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

  const session = await getSession();

  const spotsWithConnectionStatus = spots.map((spot) => {
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

  const totalSpotsCount = await dbClient.spot.count();
  const totalPages = Math.ceil(totalSpotsCount / spotsNumberPerPage);

  return { spots: spotsWithConnectionStatus, totalPages };
};
