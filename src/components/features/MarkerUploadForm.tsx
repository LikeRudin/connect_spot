import { Textarea, SubmitButton, LongInput } from "@/components";
// export default function AddMarker() {
//   const [state, action] = useFormState(uploadMarker, null);

const MarkerUploadForm = () => {
  return (
    <div className="w-inherit flex flex-col items-center">
      <form className="p-5 flex flex-col gap-5 ">
        <Textarea
          className="ring-1 ring-blue-500"
          name="MarkerText"
          required
          // className={state?.fieldErrors.MarkerText ? "error" : ""}
        />
        <SubmitButton text="Mark" />
      </form>
    </div>
  );
};

export default MarkerUploadForm;
