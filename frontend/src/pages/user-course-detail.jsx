import { Link, useMatch } from "@tanstack/react-location";
import { useQuery } from "react-query";

import LessonCardList from "/src/components/lesson/lesson-card-list";
import Error from "/src/components/shared/error";
import Loading from "/src/components/shared/loading";

import { QueryKeys } from "/src/constants/query-keys";
import { getLessonsByCourseApi } from "/src/helpers/fetchers";

export default function UserCourseDetail() {
  // location
  const {
    params: { courseId },
  } = useMatch();

  // query
  const lessonsQuery = useQuery([QueryKeys.LESSONS_BY_COURSE, courseId], () =>
    getLessonsByCourseApi(courseId)
  );

  return (
    <div className="grid gap-8 lg:grid-cols-3">
      <div className="col-span-1 space-y-8 lg:order-last lg:space-y-16">
        {/* test */}
        <div className="space-y-4">
          <h2 className="text-2xl font-bold lg:text-3xl">Test</h2>
          <p>Test your knowledge</p>
          <Link to={`/courses/${courseId}/test`} className="btn">
            Take a test
          </Link>
        </div>

        {/* rank */}
        <div className="space-y-4">
          <h2 className="text-2xl font-bold lg:text-3xl">Ranking</h2>
          <p>See your position in the leaderboard</p>
          <Link className="btn">Ranking</Link>
        </div>

        {/* profile */}
        <div className="space-y-4">
          <h2 className="text-2xl font-bold lg:text-3xl">Lecture's profile</h2>
          <p>See information about your lecturer</p>
          <Link className="btn">Go to Profile</Link>
        </div>
      </div>

      {/* lessons */}
      <div className="col-span-2 space-y-4 lg:order-first">
        <h2 className="text-2xl font-bold lg:text-3xl">Lessons</h2>
        {lessonsQuery.isLoading ? (
          <Loading />
        ) : lessonsQuery.isError ? (
          <Error text={lessonsQuery.error.response.data.message} />
        ) : (
          <LessonCardList lessons={lessonsQuery.data} />
        )}
      </div>
    </div>
  );
}
