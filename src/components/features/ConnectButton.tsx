"use client";

import { useOptimistic } from "react";

import { HeartIcon } from "@heroicons/react/24/solid";
import { HeartIcon as OutlineHeartIcon } from "@heroicons/react/24/outline";

import { IconButton } from "@/components/designs";

import { connectSpot, disconnectSpot } from "@/app/spots/[id]/actions";

interface IConnectButtonProps {
  isConnected: boolean;
  connectCount: number;
  spotId: number;
}

const ConnectButton = ({
  isConnected,
  connectCount,
  spotId,
}: IConnectButtonProps) => {
  const [state, reducerFn] = useOptimistic(
    { isConnected, connectCount },
    (previousState, payload) => ({
      isConnected: !previousState.isConnected,
      connectCount: previousState.isConnected
        ? previousState.connectCount - 1
        : previousState.connectCount + 1,
    })
  );
  const onClick = async () => {
    reducerFn(undefined);
    if (isConnected) {
      await disconnectSpot(spotId);
    } else {
      await connectSpot(spotId);
    }
  };
  return (
    <IconButton
      onClick={onClick}
      theme="others"
      icon={state.isConnected ? <HeartIcon fill="red" /> : <OutlineHeartIcon />}
      text={
        state.isConnected
          ? `connected with ${state.connectCount}`
          : `connect with ${state.connectCount}`
      }
    />
  );
};

export default ConnectButton;
