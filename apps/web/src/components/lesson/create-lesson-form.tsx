import { useMatch } from "@tanstack/react-location";
import clsx from "clsx";
import { useId } from "react";
import { useForm } from "react-hook-form";
import { useMutation, useQueryClient } from "react-query";

import Success from "../shared/success";

import QueryKeys from "../../constants/query-keys";
import lessonService from "../../helpers/fetchers/lesson.service";
import { CreateLessonDto, IError, ILesson } from "../../interface/types";

interface Props {
  onSuccess: () => void;
}

export default function CreateLessonForm({ onSuccess }: Props) {
  const titleId = useId();
  const descriptionId = useId();

  // location
  const {
    params: { courseId },
  } = useMatch();

  // form
  const { register, handleSubmit, reset } = useForm<CreateLessonDto>();

  // query
  const queryClient = useQueryClient();

  const lessonMutation = useMutation<ILesson, IError, CreateLessonDto>(
    (data) => lessonService.createInCourse(courseId, data),
    {
      onSuccess: () => {
        queryClient.invalidateQueries([QueryKeys.LESSONS_BY_COURSE, courseId]);
        onSuccess();
        reset();
      },
    }
  );

  const onSubmit = (data: CreateLessonDto) => {
    lessonMutation.mutate(data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <h2 className="card-title text-2xl">Create a lesson</h2>

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
          loading: lessonMutation.isLoading,
        })}
      >
        Create
      </button>

      {lessonMutation.isSuccess && (
        <Success text="Lesson created successfully!" />
      )}
    </form>
  );
}
