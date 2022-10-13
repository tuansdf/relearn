import { XMarkIcon } from "@heroicons/react/24/outline";
import clsx from "clsx";
import { IQuestion } from "../../interface/types";

import UpdateQuestionForm from "./update-question-form";

interface Props {
  isModal: boolean;
  closeModal: () => void;
  question: IQuestion;
}

export default function UpdateQuestionModal({
  isModal,
  closeModal,
  question,
}: Props) {
  return (
    <div>
      <div className={clsx("modal", { "modal-open": isModal })}>
        <div className="modal-box">
          {isModal && (
            <UpdateQuestionForm question={question} onSuccess={closeModal} />
          )}
          <button
            onClick={closeModal}
            className="btn btn-circle absolute top-0 right-0 m-4"
          >
            <XMarkIcon className="h-6 w-6" />
          </button>
        </div>
      </div>
    </div>
  );
}
