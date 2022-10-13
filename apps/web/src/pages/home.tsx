import { useQuery } from "react-query";
import CourseCardList from "../components/course/course-card-list";
import Error from "../components/shared/error";
import Loading from "../components/shared/loading";
import QueryKeys from "../constants/query-keys";
import courseService from "../helpers/fetchers/course.service";
import { ICourse, IError } from "../interface/types";

export default function Home() {
  // query
  const coursesQuery = useQuery<ICourse[], IError>(
    [QueryKeys.COURSES],
    courseService.getAll
  );

  return (
    <div className="space-y-4 lg:space-y-8">
      <h2 className="text-2xl font-bold lg:text-3xl">Courses</h2>

      {coursesQuery.isLoading ? (
        <Loading />
      ) : coursesQuery.isError ? (
        <Error text={coursesQuery.error.response.data?.message} />
      ) : coursesQuery.data ? (
        <CourseCardList courses={coursesQuery.data} />
      ) : null}
    </div>
  );
}
