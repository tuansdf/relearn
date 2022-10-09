import { CheckCircleIcon } from "@heroicons/react/24/outline";

export default function Success({ text }) {
  return (
    <div className="alert alert-success">
      <div>
        <CheckCircleIcon className="h-6 w-6" /> {text || "Hurray!"}
      </div>
    </div>
  );
}
