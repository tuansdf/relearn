import { XMarkIcon } from "@heroicons/react/24/outline";
import clsx from "clsx";

import CreateCourseForm from "/src/components/course/create-course-form";

export default function CreateCourseModal({ isModal, closeModal }) {
  return (
    <div>
      <div className={clsx("modal", { "modal-open": isModal })}>
        <div className="modal-box">
          {isModal && <CreateCourseForm onSuccess={closeModal} />}
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
