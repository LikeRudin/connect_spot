import Link from "next/link";
import Image from "next/image";
import { IconButton } from "../designs";
import { ArrowRightCircleIcon, HeartIcon } from "@heroicons/react/24/solid";
import ConnectButton from "./ConnectButton";

interface SpotProps {
  createdAt?: string;
  username?: string;
  avatarString?: string;
  text: string;
  title: string;
  id: number;
  connectCount: number;
  isConnected: boolean;
}

const Spot = ({
  createdAt,
  username,
  avatarString,
  title,
  text,
  id,
  connectCount,
  isConnected,
}: SpotProps) => {
  return (
    <div className="w-full flex p-4 border-t border-black">
      <div className="flex-none w-1/10 h-16 relative mr-4">
        {avatarString ? (
          <Image
            className="rounded-full object-cover"
            src={`/${avatarString}`}
            alt="AvatarImage"
            fill
            sizes="6.4rem"
          />
        ) : (
          <div className="w-16 h-16 flex items-center justify-center bg-gray-200 rounded-full">
            사진없음
          </div>
        )}
      </div>
      <div className="flex-grow">
        <div className="flex justify-between pr-3">
          <Link href={`/users/${username}`} className="font-bold">
            {username}
          </Link>
          <span className="text-gray-500">{createdAt}</span>
        </div>
        <h2>{title}</h2>
        <div className="mt-2">{text}</div>
      </div>
      <div>
        <Link className="flex-none w-4 h-4" href={`/spots/${id}`} passHref>
          <IconButton theme="others" icon={<ArrowRightCircleIcon />} />
        </Link>
        <ConnectButton
          isConnected={isConnected}
          connectCount={connectCount}
          spotId={id}
        />
      </div>
    </div>
  );
};

export default Spot;
