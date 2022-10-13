import { XMarkIcon } from "@heroicons/react/24/outline";
import clsx from "clsx";
import { ILesson } from "../../interface/types";
import UpdateLessonForm from "./update-lesson-form";

interface Props {
  isModal: boolean;
  closeModal: () => void;
  lesson: ILesson;
}

export default function UpdateLessonModal({
  isModal,
  closeModal,
  lesson,
}: Props) {
  return (
    <div>
      <div className={clsx("modal", { "modal-open": isModal })}>
        <div className="modal-box">
          {isModal && (
            <UpdateLessonForm lesson={lesson} onSuccess={closeModal} />
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
