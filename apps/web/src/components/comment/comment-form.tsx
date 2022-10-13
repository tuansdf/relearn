import { useMatch } from "@tanstack/react-location";
import { useAtom } from "jotai";
import { useForm } from "react-hook-form";
import { useMutation, useQueryClient } from "react-query";

import QueryKeys from "../../constants/query-keys";
import commentService from "../../helpers/fetchers/comment.service";
import { CreateCommentDto, IComment, IError } from "../../interface/types";
import { userAtom } from "../../stores/auth.store";

export default function CommentForm() {
  // location
  const {
    params: { questionId },
  } = useMatch();

  // atom
  const [user] = useAtom(userAtom);

  // form
  const { register, handleSubmit, reset } = useForm<CreateCommentDto>();

  // query
  const queryClient = useQueryClient();

  const commentMutation = useMutation<IComment, IError, CreateCommentDto>(
    (data) => commentService.createInQuestion(questionId, data),
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

  const onSubmit = (data: CreateCommentDto) => {
    commentMutation.mutate({ ...data, authorId: user?._id || "" });
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
