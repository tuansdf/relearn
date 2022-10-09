import { XMarkIcon } from "@heroicons/react/24/outline";
import clsx from "clsx";

import CreateLessonForm from "/src/components/lesson/create-lesson-form";

export default function CreateLessonModal({ isModal, closeModal }) {
  return (
    <div>
      <div className={clsx("modal", { "modal-open": isModal })}>
        <div className="modal-box">
          {isModal && <CreateLessonForm onSuccess={closeModal} />}
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
