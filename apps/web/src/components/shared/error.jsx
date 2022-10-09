import { ExclamationCircleIcon } from "@heroicons/react/24/outline";

export default function Error({ text }) {
  return (
    <div className="alert alert-error">
      <div>
        <ExclamationCircleIcon className="h-6 w-6" />
        {text || "Something went wrong. Try again later."}
      </div>
    </div>
  );
}
