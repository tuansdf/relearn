import { useMatch } from "@tanstack/react-location";
import { useAtom } from "jotai";
import { useForm } from "react-hook-form";
import { useMutation, useQueryClient } from "react-query";

import CommentBox from "/src/components/comment/comment-box";
import Info from "/src/components/shared/info";
import { QueryKeys } from "/src/constants/query-keys";

import { postCommentInQuestionApi } from "/src/helpers/fetchers";
import { userAtom } from "/src/stores/auth.store";

export default function CommentBoxList({ comments }) {
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

  return (
    <div className="space-y-4">
      <form className="w-full" onSubmit={handleSubmit(onSubmit)}>
        <input
          type="text"
          placeholder="Add a comment..."
          className="input input-bordered w-full"
          {...register("text", { required: true })}
        />
      </form>
      {comments.length > 0 ? (
        comments.map((comment) => (
          <CommentBox comment={comment} key={comment._id} />
        ))
      ) : (
        <Info text="No comment" />
      )}
    </div>
  );
}
