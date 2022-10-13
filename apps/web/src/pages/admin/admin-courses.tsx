import { useState } from "react";
import { useQuery } from "react-query";

import CourseTable from "../../components/course/course-table";
import CreateCourseModal from "../../components/course/create-course-modal";
import Error from "../../components/shared/error";
import Loading from "../../components/shared/loading";

import QueryKeys from "../../constants/query-keys";
import courseService from "../../helpers/fetchers/course.service";
import { ICourse, IError } from "../../interface/types";

export default function AdminCourses() {
  // query
  const coursesQuery = useQuery<ICourse[], IError>(
    [QueryKeys.COURSES],
    courseService.getAll
  );

  const [isCreateModal, setIsCreateModal] = useState(false);
  const openCreateModal = () => setIsCreateModal(true);
  const closeCreateModal = () => setIsCreateModal(false);

  return (
    <div className="space-y-4 lg:space-y-8">
      <h2 className="text-2xl font-bold lg:text-3xl">Courses</h2>

      <button className="btn" onClick={openCreateModal}>
        Create course
      </button>

      {coursesQuery.isLoading ? (
        <Loading />
      ) : coursesQuery.isError ? (
        <Error text={coursesQuery.error.response.data.message} />
      ) : coursesQuery.data ? (
        <CourseTable courses={coursesQuery.data} />
      ) : null}

      {/* create modal */}
      <CreateCourseModal
        isModal={isCreateModal}
        closeModal={closeCreateModal}
      />
    </div>
  );
}
