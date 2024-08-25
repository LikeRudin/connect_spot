"use client";

import { uploadSpot } from "@/app/(tabs)/home/actions";
import { Textarea, SubmitButton, LongInput } from "@/components";
import { useFormState } from "react-dom";

const SpotUploadForm = () => {
  const [state, trigger] = useFormState(uploadSpot, null);
  return (
    <div className="w-full flex flex-col items-center">
      <h2> Settle down new Spot</h2>
      <form action={trigger} className="w-1/2 flex flex-col gap-5 ">
        <LongInput
          className="w-full ring-1 ring-blue-500"
          theme="others"
          name="title"
          label="Spot title"
        />
        <Textarea
          className="ring-1 ring-blue-500 w-full"
          name="text"
          required
        />
        <SubmitButton text="Settle down" />
      </form>
    </div>
  );
};

export default SpotUploadForm;
