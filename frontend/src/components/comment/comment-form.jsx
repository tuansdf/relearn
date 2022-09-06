import { useMatch } from "@tanstack/react-location";
import { useAtom } from "jotai";
import { useForm } from "react-hook-form";
import { useMutation, useQueryClient } from "react-query";

import { QueryKeys } from "/src/constants/query-keys";

import { postCommentInQuestionApi } from "/src/helpers/fetchers";
import { userAtom } from "/src/stores/auth.store";

export default function CommentForm() {
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
      onSuccess: () => {
        queryClient.invalidateQueries([
          QueryKeys.COMMENTS_BY_QUESTION,
          questionId,
        ]);
        reset();
      },
    }
  );

  const onSubmit = (data) => {
    commentMutation.mutate({ ...data, authorId: user._id });
  };

  return (
    <form className="w-full" onSubmit={handleSubmit(onSubmit)}>
      <input
        type="text"
        placeholder="Add a comment..."
        className="input input-bordered w-full"
        {...register("text", { required: true })}
      />
    </form>
  );
}
