import { useMatch } from "@tanstack/react-location";
import clsx from "clsx";
import { useId } from "react";
import { useForm } from "react-hook-form";
import { useMutation, useQueryClient } from "react-query";

import Success from "/src/components/shared/success";

import { QueryKeys } from "/src/constants/query-keys";
import { patchQuestionApi } from "/src/helpers/fetchers";

export default function UpdateQuestionForm({ question, onSuccess }) {
  const textId = useId();
  const descriptionId = useId();

  //   location
  const {
    params: { lessonId },
  } = useMatch();

  // form
  const { register, handleSubmit } = useForm({
    defaultValues: {
      text: question.text,
      description: question.description,
    },
  });

  // query
  const queryClient = useQueryClient();

  const questionMutation = useMutation(
    (data) => patchQuestionApi(question._id, data),
    {
      onSuccess: () => {
        queryClient.invalidateQueries([
          QueryKeys.QUESTIONS_BY_LESSON,
          lessonId,
        ]);
        onSuccess();
      },
    }
  );

  const onSubmit = (data) => {
    questionMutation.mutate(data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 p-0">
      <h2 className="card-title text-2xl">Update lesson</h2>
      <div className="form-control">
        <label htmlFor={textId} className="label">
          <span className="label-text">Title</span>
        </label>
        <input
          type="text"
          id={textId}
          className="input input-bordered"
          {...register("text", { required: true })}
        />
      </div>
      <div className="form-control">
        <label htmlFor={descriptionId} className="label">
          <span className="label-text">Description</span>
        </label>
        <input
          type="text"
          id={descriptionId}
          className="input input-bordered"
          {...register("description", { required: true })}
        />
      </div>

      <button
        className={clsx("btn btn-primary mt-4 rounded", {
          loading: questionMutation.isLoading,
        })}
      >
        Update
      </button>

      {questionMutation.isSuccess && (
        <Success text="Lesson updated successfully!" />
      )}
    </form>
  );
}
