"use client";

export default function ErrorBoundary({
  error,
  reset,
}: {
  error: Error;
  reset: () => void;
}) {
  return (
    <div className="w-screen h-screen flex items-center justify-center">
      <h2
        onClick={() => reset()}
        className="text-3xl cursor-pointer text-zenith-neutral-900 font-medium"
      >
        ATM<span className="text-zenith-red-600">360</span>
      </h2>
    </div>
  );
}
