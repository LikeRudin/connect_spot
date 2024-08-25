import Image from "next/image";
import { AtSymbolIcon, BookOpenIcon } from "@heroicons/react/24/solid";

interface IProfileProps {
  username: string;
  email?: string | null;
  avatar?: string | null;
  bio?: string | null;
}

const Profile = ({ username, email, bio, avatar }: IProfileProps) => {
  return (
    <div className="w-full p-4 flex flex-col items-center">
      <div className="w-1/2 flex items-center justify-start gap-x-5">
        {avatar ? (
          <Image
            src={avatar}
            alt={`${username}'s avatar`}
            className="rounded-2xl"
            width={100}
            height={100}
          />
        ) : (
          <div className="bg-gray-300 text-gray-600 rounded-2xl flex items-center justify-center h-24 w-24">
            <span className="text-xl">{username.toUpperCase()[0]}</span>
          </div>
        )}

        <div className="p-4 ">
          <h2 className="text-center text-2xl font-semibold">{username}</h2>
          <div className=" text-center text-gray-600">
            <div className="flex items-center gap-x-3">
              <AtSymbolIcon className="w-3 h-3" />
              <span>{email}</span>
            </div>
          </div>
        </div>
      </div>
      <div className="flex flex-col mt-2 text-center text-gray-700 w-1/2 ">
        <BookOpenIcon className="w-4 h-4" />
        <pre className="w-full ring-2 ring-custom-light-blue">
          {bio ? bio : "empty"}
        </pre>
      </div>
    </div>
  );
};

export default Profile;
