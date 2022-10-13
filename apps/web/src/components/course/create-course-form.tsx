import clsx from "clsx";
import { useId } from "react";
import { useForm } from "react-hook-form";
import { useMutation, useQueryClient } from "react-query";

import Success from "../shared/success";

import QueryKeys from "../../constants/query-keys";
import courseService from "../../helpers/fetchers/course.service";
import { CreateCourseDto, ICourse, IError } from "../../interface/types";

interface Props {
  onSuccess: () => void;
}

export default function CreateCourseForm({ onSuccess }: Props) {
  const titleId = useId();
  const descriptionId = useId();

  // form
  const { register, handleSubmit, reset } = useForm<CreateCourseDto>();

  // query
  const queryClient = useQueryClient();

  const courseMutation = useMutation<ICourse, IError, CreateCourseDto>(
    (data) => courseService.create(data),
    {
      onSuccess: () => {
        queryClient.invalidateQueries([QueryKeys.COURSES]);
        onSuccess();
        reset();
      },
    }
  );

  const onSubmit = (data: CreateCourseDto) => {
    courseMutation.mutate(data);
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="max-w-screen-md space-y-4"
    >
      <h2 className="card-title text-2xl">Create a course</h2>

      <div className="form-control">
        <label htmlFor={titleId} className="label">
          <span className="label-text">Title</span>
        </label>
        <input
          type="text"
          id={titleId}
          className="input input-bordered w-full"
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
          className="input input-bordered w-full"
          {...register("description", { required: true })}
        />
      </div>

      <button
        className={clsx("btn btn-primary", {
          loading: courseMutation.isLoading,
        })}
      >
        Create
      </button>

      {courseMutation.isSuccess && (
        <Success text="Course created successfully!" />
      )}
    </form>
  );
}
