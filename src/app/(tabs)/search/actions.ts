"use server";

import dbClient from "@/lib/db";

export const searchSpots = async (_: any, formData: FormData) => {
  console.log("시작");
  const keyword = formData.get("keyword");

  if (!keyword) {
    return;
  }

  const spots = await dbClient.spot.findMany({
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
    include: {
      category: true,
      user: true,
      spotMarkers: true,
      spotConnects: true,
    },
  });

  return spots;
};
