import { useMatch } from "@tanstack/react-location";
import { useQuery } from "react-query";

import Error from "../../components/shared/error";
import Loading from "../../components/shared/loading";
import TestResultTable from "../../components/test-result/test-result-table";

import QueryKeys from "../../constants/query-keys";
import testResultService from "../../helpers/fetchers/test-result.service";
import { IError, ITestResult } from "../../interface/types";

export default function CourseLeaderboard() {
  // location
  const {
    params: { courseId },
  } = useMatch();

  // query
  const testResultsQuery = useQuery<ITestResult[], IError>(
    [QueryKeys.TEST_RESULTS_BY_COURSE, courseId],
    () => testResultService.getAllByCourse(courseId)
  );

  console.log(testResultsQuery);

  return (
    <div className="space-y-4 lg:space-y-8">
      <div className="flex items-center gap-2 lg:gap-4">
        <button
          className="btn btn-primary"
          onClick={() => window.history.back()}
        >
          Back
        </button>
        <h2 className="text-2xl font-bold lg:text-3xl">Leaderboard</h2>
      </div>

      {testResultsQuery.isLoading ? (
        <Loading />
      ) : testResultsQuery.isError ? (
        <Error text={testResultsQuery.error.response?.data?.message} />
      ) : testResultsQuery.data ? (
        <TestResultTable testResults={testResultsQuery.data} />
      ) : null}
    </div>
  );
}
