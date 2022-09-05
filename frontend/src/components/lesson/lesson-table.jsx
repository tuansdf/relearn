import { XMarkIcon } from "@heroicons/react/24/outline";
import { Link } from "@tanstack/react-location";
import clsx from "clsx";
import { useState } from "react";

import UpdateLessonForm from "/src/components/lesson/update-lesson-form";

export default function LessonTable({ lessons }) {
  const [isUpdateModal, setIsUpdateModal] = useState(false);
  const [selectedId, setSelectedId] = useState(0);

  const openUpdateModal = () => setIsUpdateModal(true);
  const closeUpdateModal = () => setIsUpdateModal(false);
  const editLesson = (lessonId) => {
    openUpdateModal();
    setSelectedId(lessonId);
  };

  return (
    <>
      <div className="overflow-x-auto">
        <table className="table-zebra table">
          <thead>
            <tr>
              <th />
              <th>Actions</th>
              <th>Title</th>
              <th>Description</th>
            </tr>
          </thead>

          <tbody>
            {lessons.map((lesson, index) => (
              <tr key={lesson._id}>
                <th>{index + 1}</th>
                <td className="space-x-2">
                  <button
                    className="btn btn-ghost btn-sm"
                    onClick={() => editLesson(index)}
                  >
                    Edit
                  </button>
                  <Link
                    to={`/admin/lessons/${lesson._id}/questions`}
                    className="btn btn-ghost btn-sm"
                  >
                    Questions
                  </Link>
                </td>
                <td>{lesson.title}</td>
                <td>{lesson.description}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* update modal */}
      <div>
        <div className={clsx("modal", { "modal-open": isUpdateModal })}>
          <div className="modal-box">
            {isUpdateModal && (
              <UpdateLessonForm
                lesson={lessons[selectedId]}
                onSuccess={closeUpdateModal}
              />
            )}
            <button
              onClick={closeUpdateModal}
              className="btn btn-circle absolute top-0 right-0 m-4"
            >
              <XMarkIcon className="h-6 w-6" />
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
