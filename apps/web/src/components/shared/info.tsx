import { InformationCircleIcon } from "@heroicons/react/24/outline";

interface Props {
  text: string;
}

export default function Info({ text }: Props) {
  return (
    <div className="alert">
      <div>
        <InformationCircleIcon className="h-6 w-6" />
        {text || "..."}
      </div>
    </div>
  );
}
