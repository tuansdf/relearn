import { useMatch } from "@tanstack/react-location";
import { useQuery } from "react-query";

import QuestionList from "/src/components/question/question-list";
import Error from "/src/components/shared/error";
import Loading from "/src/components/shared/loading";

import { QueryKeys } from "/src/constants/query-keys";
import { getQuestionsByCourseApi } from "/src/helpers/fetchers";

export default function UserCourseTest() {
  // location
  const {
    params: { courseId },
  } = useMatch();

  // query
  const questionsQuery = useQuery(
    [QueryKeys.QUESTIONS_BY_COURSE, courseId],
    () => getQuestionsByCourseApi(courseId)
  );

  return (
    <div className="space-y-4 lg:space-y-8">
      <h2 className="text-2xl font-bold lg:text-3xl">Test</h2>
      {questionsQuery.isLoading ? (
        <Loading />
      ) : questionsQuery.isError ? (
        <Error text={questionsQuery.error.response.data?.message} />
      ) : (
        <QuestionList questions={questionsQuery.data} isMarking />
      )}
    </div>
  );
}
