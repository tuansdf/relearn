import { XMarkIcon } from "@heroicons/react/24/outline";
import clsx from "clsx";

import UpdateCourseForm from "./update-course-form";

import { ICourse } from "../../interface/types";

interface Props {
  isModal: boolean;
  closeModal: () => void;
  course: ICourse;
}

export default function UpdateCourseModal({
  isModal,
  closeModal,
  course,
}: Props) {
  return (
    <div>
      <div className={clsx("modal", { "modal-open": isModal })}>
        <div className="modal-box">
          {isModal && (
            <UpdateCourseForm course={course} onSuccess={closeModal} />
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
