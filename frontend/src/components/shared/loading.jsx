import { ArrowPathIcon } from "@heroicons/react/24/outline";

export default function Loading() {
  return (
    <div className="alert loading">
      <div>
        <ArrowPathIcon className="h-6 w-6 animate-spin" /> Loading...
      </div>
    </div>
  );
}
