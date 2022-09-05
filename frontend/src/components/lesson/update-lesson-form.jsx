import { useMatch } from "@tanstack/react-location";
import clsx from "clsx";
import { useId } from "react";
import { useForm } from "react-hook-form";
import { useMutation, useQueryClient } from "react-query";

import Success from "/src/components/shared/success";

import { QueryKeys } from "/src/constants/query-keys";
import { patchLessonApi } from "/src/helpers/fetchers";

export default function UpdateLessonForm({ lesson, onSuccess }) {
  const titleId = useId();
  const descriptionId = useId();

  //   location
  const {
    params: { courseId },
  } = useMatch();

  // form
  const { register, handleSubmit } = useForm({
    defaultValues: {
      title: lesson.title,
      description: lesson.description,
    },
  });

  // query
  const queryClient = useQueryClient();

  const lessonMutation = useMutation(
    (data) => patchLessonApi(lesson._id, data),
    {
      onSuccess: () => {
        queryClient.invalidateQueries([QueryKeys.LESSONS_BY_COURSE, courseId]);
        onSuccess();
      },
    }
  );

  const onSubmit = (data) => {
    lessonMutation.mutate(data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 p-0">
      <h2 className="card-title text-2xl">Update lesson</h2>
      <div className="form-control">
        <label htmlFor={titleId} className="label">
          <span className="label-text">Title</span>
        </label>
        <input
          type="text"
          id={titleId}
          className="input input-bordered"
          {...register("title", { required: true })}
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
          loading: lessonMutation.isLoading,
        })}
      >
        Update
      </button>

      {lessonMutation.isSuccess && (
        <Success text="Lesson updated successfully!" />
      )}
    </form>
  );
}
