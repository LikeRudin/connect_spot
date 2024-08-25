import { getBasicProfile } from "./actions";
import { ProfileEditForm } from "@/components";

interface IPageParams {
  username: string;
}

const Page = async ({ params }: { params: IPageParams }) => {
  const user = await getBasicProfile(params.username);
  return (
    <div className="w-full flex items-center justify-center">
      <div className="w-96 ">
        <ProfileEditForm {...user} />
      </div>
    </div>
  );
};

export default Page;
