import { XMarkIcon } from "@heroicons/react/24/outline";
import clsx from "clsx";

import UpdateLessonForm from "/src/components/lesson/update-lesson-form";

export default function UpdateLessonModal({ isModal, closeModal, lesson }) {
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
