import { Link } from "@tanstack/react-location";
import { useState } from "react";

import UpdateLessonModal from "./update-lesson-modal";

import { ILesson } from "../../interface/types";

interface Props {
  lessons: ILesson[];
}

export default function LessonTable({ lessons }: Props) {
  const [isUpdateModal, setIsUpdateModal] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(0);

  const openUpdateModal = () => setIsUpdateModal(true);
  const closeUpdateModal = () => setIsUpdateModal(false);
  const editLesson = (index: number) => {
    openUpdateModal();
    setSelectedIndex(index);
  };

  return (
    <>
      <div className="overflow-x-auto">
        <table className="table-zebra table w-full">
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
      <UpdateLessonModal
        isModal={isUpdateModal}
        closeModal={closeUpdateModal}
        lesson={lessons[selectedIndex]}
      />
    </>
  );
}
