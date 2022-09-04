import { XMarkIcon } from "@heroicons/react/24/outline";
import clsx from "clsx";
import { useState } from "react";
import { useQuery } from "react-query";

import CourseTable from "/src/components/course/course-table";
import CreateCourseForm from "/src/components/course/create-course-form";
import Error from "/src/components/shared/error";
import Loading from "/src/components/shared/loading";

import { QueryKeys } from "/src/constants/query-keys";
import { getCoursesApi } from "/src/helpers/fetchers";

export default function AdminCourses() {
  // query
  const coursesQuery = useQuery([QueryKeys.COURSES], getCoursesApi);

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
      ) : (
        <CourseTable courses={coursesQuery.data} />
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
