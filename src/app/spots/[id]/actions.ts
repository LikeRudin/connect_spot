"use server";

import dbClient from "@/lib/db";

import getSession from "@/lib/session";
import { revalidateTag } from "next/cache";

export const connectSpot = async (spotId: number) => {
  const session = await getSession();
  try {
    await dbClient.spotConnect.create({
      data: {
        spotId,
        userId: session.id!,
      },
    });
    revalidateTag(`connect-status-${spotId}`);
  } catch (e) {
    console.error(e);
  }
};

export const disconnectSpot = async (spotId: number) => {
  try {
    const session = await getSession();
    await dbClient.spotConnect.delete({
      where: {
        id: {
          spotId,
          userId: session.id!,
        },
      },
    });
    revalidateTag(`connect-status-${spotId}`);
  } catch (e) {
    console.error(e);
  }
};

export const getSpot = async (id: number) => {
  const spot = await dbClient.spot.findUnique({
    where: {
      id: +id,
    },
    include: {
      user: true,
    },
  });

  return spot;
};

export const getConnectStatus = async (spotId: number) => {
  const session = await getSession();
  const isConnected = await dbClient.spotConnect.findUnique({
    where: {
      id: {
        spotId: +spotId,
        userId: session.id!,
      },
    },
  });
  const connectCount = await dbClient.spotConnect.count({
    where: {
      spotId: +spotId,
    },
  });
  return {
    connectCount,
    isConnected: Boolean(isConnected),
  };
};
