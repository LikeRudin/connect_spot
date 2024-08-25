import { PrismaClient } from "@prisma/client";

const dbClient = new PrismaClient();

const initClient = async () => {
  const categories = [
    { name: "Spot" },
    { name: "Gather" },
    { name: "After-Gathering" },
    { name: "SpotReview" },
    { name: "SpotRecommend" },
  ];

  for (const category of categories) {
    await dbClient.spotCategory.upsert({
      where: { name: category.name },
      update: {},
      create: category,
    });
  }
};

initClient()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await dbClient.$disconnect();
  });

export default dbClient;
