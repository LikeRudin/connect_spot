"use client";

import type {
  Spot as SpotType,
  User as UserType,
  SpotConnect,
} from "@prisma/client";

import { getSpots } from "@/app/(tabs)/home/actions";

import { useState } from "react";

import { Pagination } from "../designs";

type SpotDataType = SpotType & {
  user: UserType;
  spotConnects: SpotConnect[];
  connectCount: number;
  isConnected: boolean;
};

interface SpotListProps {
  initialSpots: SpotDataType[];
}

import Spot from "./Spot";
import { formatDateTimeToText } from "@/lib/utils";

const SpotList = ({ initialSpots }: SpotListProps) => {
  const [spots, setSpots] = useState<SpotDataType[]>(initialSpots);
  const [isLoading, setIsLoading] = useState(false);
  const [page, setPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);

  const fetchSpots = async (page: number) => {
    setIsLoading(true);
    const { spots: newSpots, totalPages: pagesNumber } = await getSpots(
      5,
      page
    );
    setIsLoading(false);

    setTotalPages(pagesNumber);

    if (newSpots.length !== 0) {
      //@ts-ignore
      setSpots(newSpots);
      setPage(page);
    }
  };

  const handlePageChange = (newPage: number) => {
    fetchSpots(newPage);
  };

  return (
    <div className="p-5 flex flex-col gap-5">
      {spots.map(
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
            isConnected={isConnected}
            title={title}
            key={id}
            id={id}
            text={text}
            createdAt={formatDateTimeToText(createdAt)}
            username={username}
            connectCount={connectCount}
          />
        )
      )}
      <Pagination
        currentPage={page}
        totalPages={totalPages}
        onPageChange={handlePageChange}
      />
      {isLoading && <div>로딩 중...</div>}
    </div>
  );
};

export default SpotList;
