"use client";

import { searchSpots } from "./actions";

import { MagnifyingGlassIcon } from "@heroicons/react/24/solid";
import { IconButton, LongInput } from "@/components/designs";

import { useFormState } from "react-dom";

import { Spot } from "@/components";

const Page = () => {
  const [state, trigger] = useFormState(searchSpots, null);

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
      {state?.map(
        ({
          id,
          text,
          createdAt,
          title,
          user: { username },
          connectCount,
          isConnected,
        }) => (
          <Spot
            connectCount={connectCount}
            isConnected={isConnected}
            title={title}
            key={id}
            id={id}
            text={text}
            createdAt={createdAt.toDateString()}
            username={username}
          />
        )
      )}
    </div>
  );
};

export default Page;
