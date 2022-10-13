import { useMatch } from "@tanstack/react-location";
import { useQuery } from "react-query";

import CommentForm from "../../components/comment/comment-form";
import CommentList from "../../components/comment/comment-list";
import Error from "../../components/shared/error";
import Loading from "../../components/shared/loading";

import QueryKeys from "../../constants/query-keys";
import commentService from "../../helpers/fetchers/comment.service";
import { IComment, IError } from "../../interface/types";

export default function UserQuestionDetail() {
  // location
  const {
    params: { questionId },
  } = useMatch();

  // query
  const commentsQuery = useQuery<IComment[], IError>(
    [QueryKeys.COMMENTS_BY_QUESTION, questionId],
    () => commentService.getAllByQuestion(questionId)
  );

  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold lg:text-3xl">Comments</h2>
      <CommentForm />

      {commentsQuery.isLoading ? (
        <Loading />
      ) : commentsQuery.isError ? (
        <Error text={commentsQuery.error.response.data?.message} />
      ) : commentsQuery.data ? (
        <CommentList comments={commentsQuery.data} />
      ) : null}
    </div>
  );
}
