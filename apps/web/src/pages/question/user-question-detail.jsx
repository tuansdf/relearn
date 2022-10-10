import { useMatch } from "@tanstack/react-location";
import { useQuery } from "react-query";

import CommentForm from "/src/components/comment/comment-form";
import CommentList from "/src/components/comment/comment-list";
import Error from "/src/components/shared/error";
import Loading from "/src/components/shared/loading";

import { QueryKeys } from "/src/constants/query-keys";
import { getCommentsByQuestionApi } from "/src/helpers/fetchers";

export default function UserQuestionDetail() {
  // location
  const {
    params: { questionId },
  } = useMatch();

  // query
  const commentsQuery = useQuery(
    [QueryKeys.COMMENTS_BY_QUESTION, questionId],
    () => getCommentsByQuestionApi(questionId)
  );

  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold lg:text-3xl">Comments</h2>
      <CommentForm />

      {commentsQuery.isLoading ? (
        <Loading />
      ) : commentsQuery.isError ? (
        <Error text={commentsQuery.error.response.data?.message} />
      ) : (
        <CommentList comments={commentsQuery.data} />
      )}
    </div>
  );
}
