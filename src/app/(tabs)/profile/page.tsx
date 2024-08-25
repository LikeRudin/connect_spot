import Link from "next/link";

import { IconButton, Profile } from "@/components";

import { WrenchScrewdriverIcon } from "@heroicons/react/24/solid";
import { getMyProfile } from "./actions";

const Page = async () => {
  const user = await getMyProfile();
  return (
    <>
      <Profile {...user} />
      <Link href={`/users/${user.username}/edit`}>
        <IconButton
          text="정보 수정"
          theme="nav"
          icon={<WrenchScrewdriverIcon />}
        />
      </Link>
    </>
  );
};

export default Page;
