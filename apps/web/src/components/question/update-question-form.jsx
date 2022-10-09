import { XMarkIcon } from "@heroicons/react/24/outline";
import { useMatch } from "@tanstack/react-location";
import clsx from "clsx";
import { useId } from "react";
import { useFieldArray, useForm } from "react-hook-form";
import { useMutation, useQueryClient } from "react-query";

import Success from "/src/components/shared/success";

import { QueryKeys } from "/src/constants/query-keys";
import { patchQuestionApi } from "/src/helpers/fetchers";

const FormKeys = Object.freeze({
  TEXT: "text",
  DESCRIPTION: "description",
  ANSWERS: "answers",
  IS_CORRECT: "isCorrect",
});

export default function UpdateQuestionForm({ question, onSuccess }) {
  const textId = useId();
  const descriptionId = useId();

  //   location
  const {
    params: { lessonId },
  } = useMatch();

  // form
  const { register, handleSubmit, control } = useForm({
    defaultValues: {
      text: question.text,
      description: question.description,
      answers: question.answers,
    },
  });
  const { fields, append, remove } = useFieldArray({
    control,
    name: FormKeys.ANSWERS,
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

  const addAnswerField = () => {
    append({ [FormKeys.TEXT]: "", [FormKeys.IS_CORRECT]: false });
  };
  const removeAnswerField = (index) => {
    remove(index);
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

      {/* answers */}
      <div className="form-control">
        <label className="label">
          <span className="label-text">Answers - True/False</span>
        </label>

        <ul className="space-y-2">
          {fields.map((answer, index) => (
            <li className="flex items-center gap-2" key={answer.id}>
              <input
                type="text"
                className="input input-bordered w-full"
                {...register(`${FormKeys.ANSWERS}.${index}.${FormKeys.TEXT}`, {
                  required: true,
                })}
              />
              <input
                type="checkbox"
                {...register(
                  `${FormKeys.ANSWERS}.${index}.${FormKeys.IS_CORRECT}`
                )}
                className="checkbox"
              />

              <button
                onClick={() => removeAnswerField(index)}
                type="button"
                className="btn btn-square"
              >
                <XMarkIcon className="h-6 w-6" />{" "}
              </button>
            </li>
          ))}

          <button
            type="button"
            onClick={addAnswerField}
            className="btn btn-block"
          >
            Add Question
          </button>
        </ul>
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
