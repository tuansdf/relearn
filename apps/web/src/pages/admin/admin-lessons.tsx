import { useMatch } from "@tanstack/react-location";
import { useState } from "react";
import { useQuery } from "react-query";

import CreateLessonModal from "../../components/lesson/create-lesson-modal";
import LessonTable from "../../components/lesson/lesson-table";
import Error from "../../components/shared/error";
import Loading from "../../components/shared/loading";

import QueryKeys from "../../constants/query-keys";
import lessonService from "../../helpers/fetchers/lesson.service";
import { IError, ILesson } from "../../interface/types";

export default function AdminLessons() {
  // location
  const {
    params: { courseId },
  } = useMatch();

  // query
  const lessonsQuery = useQuery<ILesson[], IError>(
    [QueryKeys.LESSONS_BY_COURSE, courseId],
    () => lessonService.getAllByCourse(courseId)
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
      ) : lessonsQuery.data ? (
        <LessonTable lessons={lessonsQuery.data} />
      ) : null}

      {/* create modal */}
      <CreateLessonModal
        isModal={isCreateModal}
        closeModal={closeCreateModal}
      />
    </div>
  );
}
