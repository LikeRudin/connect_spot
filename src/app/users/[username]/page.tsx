import { formatDateTimeToText } from "@/lib/utils";
import { getUserProfile } from "./actions";

import { Profile, Spot } from "@/components";

interface IUserPageParams {
  params: {
    username: string;
  };
}

const UserPage = async ({ params }: IUserPageParams) => {
  const user = await getUserProfile(params.username);

  return (
    <div className="w-full flex flex-col items-center">
      <Profile {...user} />
      <div className="w-1/2 ">
        {user.spots.map(
          ({ id, text, createdAt, title, isConnected, connectCount }) => (
            <Spot
              connectCount={connectCount}
              isConnected={isConnected}
              title={title}
              key={id}
              id={id}
              text={text}
              createdAt={formatDateTimeToText(createdAt)}
              username={user.username}
            />
          )
        )}
      </div>
    </div>
  );
};

export default UserPage;
