import { useMatch } from "@tanstack/react-location";
import { useState } from "react";
import { useQuery } from "react-query";
import CreateLessonModal from "/src/components/lesson/create-lesson-modal";

import LessonTable from "/src/components/lesson/lesson-table";
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
      <div className="flex items-center gap-2 lg:gap-4">
        <button
          className="btn btn-primary"
          onClick={() => window.history.back()}
        >
          Back
        </button>
        <h2 className="text-2xl font-bold lg:text-3xl">Lessons</h2>
      </div>

      <button className="btn" onClick={openCreateModal}>
        Create lesson
      </button>

      {lessonsQuery.isLoading ? (
        <Loading />
      ) : lessonsQuery.isError ? (
        <Error text={lessonsQuery.error.response.data?.message} />
      ) : (
        <LessonTable lessons={lessonsQuery.data} />
      )}

      {/* create modal */}
      <CreateLessonModal
        isModal={isCreateModal}
        closeModal={closeCreateModal}
      />
    </div>
  );
}
