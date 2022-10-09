import clsx from "clsx";
import { useId } from "react";
import { useForm } from "react-hook-form";
import { useMutation, useQueryClient } from "react-query";

import Success from "/src/components/shared/success";

import { QueryKeys } from "/src/constants/query-keys";
import { patchCourseApi } from "/src/helpers/fetchers";

export default function UpdateCourseForm({ course, onSuccess }) {
  const titleId = useId();
  const descriptionId = useId();

  // form
  const { register, handleSubmit } = useForm({
    defaultValues: {
      title: course.title,
      description: course.description,
    },
  });

  // query
  const queryClient = useQueryClient();

  const courseMutation = useMutation(
    (data) => patchCourseApi(course._id, data),
    {
      onSuccess: () => {
        queryClient.invalidateQueries([QueryKeys.COURSES]);
        onSuccess();
      },
    }
  );

  const onSubmit = (data) => {
    courseMutation.mutate(data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <h2 className="card-title text-2xl">Update course</h2>
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
        className={clsx("btn btn-primary rounded", {
          loading: courseMutation.isLoading,
        })}
      >
        Update
      </button>

      {courseMutation.isSuccess && (
        <Success text="Course updated successfully!" />
      )}
    </form>
  );
}
