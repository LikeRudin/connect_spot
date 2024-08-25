import dbClient from "@/lib/db";
import { SpotUploadForm } from "@/components";
import SpotList from "@/components/features/SpotList";

export const getInitialSpots = async () =>
  dbClient.spot.findMany({
    select: {
      id: true,
      title: true,
      text: true,
      createdAt: true,
      updatedAt: true,
      user: true,
      spotConnects: true,
    },
    orderBy: {
      updatedAt: "desc",
    },
    take: 3,
  });

const Home = async () => {
  const spots = await getInitialSpots();
  return (
    <main className="w-auto  box-border  overflow-y-auto">
      <SpotUploadForm />
      {
        //@ts-ignore
        <SpotList initialSpots={spots} />
      }
    </main>
  );
};

export default Home;
