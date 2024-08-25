"use client";

import { searchSpots } from "./actions";

import { MagnifyingGlassIcon } from "@heroicons/react/24/solid";
import { IconButton, LongInput } from "@/components/designs";

import { useFormState } from "react-dom";

import { Spot } from "@/components";

const Page = () => {
  const [state, trigger] = useFormState(searchSpots, null);
  console.log("클라이언트 스테이트");
  console.log(state);

  return (
    <div>
      <form action={trigger} className="flex">
        <LongInput name="keyword" placeholder="search spots by keyword..." />
        <IconButton
          theme="others"
          icon={<MagnifyingGlassIcon />}
          type="submit"
        />
      </form>
      {state?.map(({ id, text, createdAt, title, user: { username } }) => (
        <Spot
          title={title}
          key={id}
          id={id}
          text={text}
          createdAt={createdAt.toDateString()}
          username={username}
        />
      ))}
    </div>
  );
};

export default Page;
