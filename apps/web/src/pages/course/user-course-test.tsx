import { useMatch } from "@tanstack/react-location";
import { useQuery } from "react-query";

import QuestionList from "../../components/question/question-list";
import Error from "../../components/shared/error";
import Loading from "../../components/shared/loading";

import QueryKeys from "../../constants/query-keys";
import questionService from "../../helpers/fetchers/question.service";
import { IError, IQuestion } from "../../interface/types";

export default function UserCourseTest() {
  // location
  const {
    params: { courseId },
  } = useMatch();

  // query
  const questionsQuery = useQuery<IQuestion[], IError>(
    [QueryKeys.QUESTIONS_BY_COURSE, courseId],
    () => questionService.getAllByCourse(courseId)
  );

  return (
    <div className="space-y-4 lg:space-y-8">
      <h2 className="text-2xl font-bold lg:text-3xl">Test</h2>
      {questionsQuery.isLoading ? (
        <Loading />
      ) : questionsQuery.isError ? (
        <Error text={questionsQuery.error.response.data?.message} />
      ) : questionsQuery.data ? (
        <QuestionList questions={questionsQuery.data} isMarking />
      ) : null}
    </div>
  );
}
