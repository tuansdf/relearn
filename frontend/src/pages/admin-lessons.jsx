import { XMarkIcon } from "@heroicons/react/24/outline";
import { useMatch } from "@tanstack/react-location";
import clsx from "clsx";
import { useState } from "react";
import { useQuery } from "react-query";

import CourseTable from "/src/components/course/course-table";
import CreateCourseForm from "/src/components/course/create-course-form";
import Error from "/src/components/shared/error";
import Loading from "/src/components/shared/loading";

import { QueryKeys } from "/src/constants/query-keys";
import { getLessonsByCourseApi } from "/src/helpers/fetchers";

export default function AdminLessons() {
  // location
  const {
    params: { courseId },
  } = useMatch();

  // query
  const lessonsQuery = useQuery([QueryKeys.LESSONS_BY_COURSE, courseId], () =>
    getLessonsByCourseApi(courseId)
  );

  const [isCreateModal, setIsCreateModal] = useState(false);
  const openCreateModal = () => setIsCreateModal(true);
  const closeCreateModal = () => setIsCreateModal(false);

  return (
    <div className="space-y-4 lg:space-y-8">
      <h2 className="text-2xl font-bold lg:text-3xl">Lessons</h2>

      <button className="btn" onClick={openCreateModal}>
        Create lesson
      </button>

      {lessonsQuery.isLoading ? (
        <Loading />
      ) : lessonsQuery.isError ? (
        <Error text={lessonsQuery.error.response.data.message} />
      ) : (
        <CourseTable courses={lessonsQuery.data} />
      )}

      {/* create modal */}
      <div>
        <div className={clsx("modal", { "modal-open": isCreateModal })}>
          <div className="modal-box">
            {isCreateModal && <CreateCourseForm onSuccess={closeCreateModal} />}
            <button
              onClick={closeCreateModal}
              className="btn btn-circle absolute top-0 right-0 m-4"
            >
              <XMarkIcon className="h-6 w-6" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
