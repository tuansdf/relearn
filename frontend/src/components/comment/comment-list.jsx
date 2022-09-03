import { useMatch } from "@tanstack/react-location";
import { useAtom } from "jotai";
import { useForm } from "react-hook-form";
import { useMutation, useQueryClient } from "react-query";

import CommentCard from "/src/components/comment/comment-card";
import Info from "/src/components/shared/info";
import { QueryKeys } from "/src/constants/query-keys";

import { postCommentInQuestionApi } from "/src/helpers/fetchers";
import { userAtom } from "/src/stores/auth.store";

export default function CommentList({ comments }) {
  // location
  const {
    params: { questionId },
  } = useMatch();

  // atom
  const [user] = useAtom(userAtom);

  // form
  const { register, handleSubmit, reset } = useForm();

  // query
  const queryClient = useQueryClient();

  const commentMutation = useMutation(
    (data) => postCommentInQuestionApi(questionId, data),
    {
      onSuccess: () =>
        queryClient.invalidateQueries([
          QueryKeys.COMMENTS_BY_QUESTION,
          questionId,
        ]),
    }
  );

  const onSubmit = (data) => {
    commentMutation.mutate({ ...data, authorId: user._id });
    reset();
  };

  return comments.length > 0 ? (
    <div className="space-y-4">
      <form className="w-full" onSubmit={handleSubmit(onSubmit)}>
        <input
          type="text"
          placeholder="Add a comment..."
          className="input input-bordered w-full"
          {...register("text", { required: true })}
        />
      </form>
      {comments.map((comment) => (
        <CommentCard comment={comment} key={comment._id} />
      ))}
    </div>
  ) : (
    <Info text="No comment" />
  );
}
