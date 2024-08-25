import { notFound } from "next/navigation";
import { getConnectStatus, getSpot } from "./actions";
import { Spot } from "@/components";

interface IPageParams {
  params: { id: number };
}

const Page = async ({ params }: IPageParams) => {
  const spot = await getSpot(params.id);
  const { isConnected, connectCount } = await getConnectStatus(params.id);
  if (!spot) {
    notFound();
  }
  const {
    title,
    text,
    user: { username },
  } = spot;
  return (
    <Spot
      isConnected={isConnected}
      id={spot.id}
      connectCount={connectCount}
      title={title}
      text={text}
      username={username}
    />
  );
};
export default Page;
