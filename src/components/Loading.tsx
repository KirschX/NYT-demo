import ClipLoader from "react-spinners/ClipLoader";

export default function Loading() {
  return (
    <div className=" w-full h-full flex items-center justify-center">
      <ClipLoader
        size={100}
        aria-label="Loading Spinner"
        data-testid="loader"
      />
    </div>
  );
}
