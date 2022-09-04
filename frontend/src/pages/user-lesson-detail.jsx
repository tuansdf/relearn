import { useMatch } from "@tanstack/react-location";
import { useQuery } from "react-query";

import QuestionList from "/src/components/question/question-list";
import Error from "/src/components/shared/error";
import Loading from "/src/components/shared/loading";

import { QueryKeys } from "/src/constants/query-keys";
import { getQuestionsByLessonApi } from "/src/helpers/fetchers";

export default function UserLessonDetail() {
  // location
  const {
    params: { lessonId },
  } = useMatch();

  // query
  const questionsQuery = useQuery(
    [QueryKeys.QUESTIONS_BY_LESSON, lessonId],
    () => getQuestionsByLessonApi(lessonId)
  );

  return (
    <div className="space-y-4 lg:space-y-8">
      <h2 className="text-2xl font-bold lg:text-3xl">Questions</h2>
      {questionsQuery.isLoading ? (
        <Loading />
      ) : questionsQuery.isError ? (
        <Error text={questionsQuery.error.response.data.message} />
      ) : (
        <QuestionList questions={questionsQuery.data} />
      )}
    </div>
  );
}
