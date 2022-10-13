import { XMarkIcon } from "@heroicons/react/24/outline";
import { useMatch } from "@tanstack/react-location";
import clsx from "clsx";
import { useId } from "react";
import { useFieldArray, useForm } from "react-hook-form";
import { useMutation, useQueryClient } from "react-query";

import Success from "../shared/success";

import QueryKeys from "../../constants/query-keys";
import questionService from "../../helpers/fetchers/question.service";
import { IError, IQuestion, UpdateQuestionDto } from "../../interface/types";

interface Props {
  question: IQuestion;
  onSuccess: () => void;
}

export default function UpdateQuestionForm({ question, onSuccess }: Props) {
  const textId = useId();
  const descriptionId = useId();

  //   location
  const {
    params: { lessonId },
  } = useMatch();

  // form
  const { register, handleSubmit, control } = useForm<UpdateQuestionDto>({
    defaultValues: {
      text: question.text,
      description: question.description,
      answers: question.answers,
    },
  });
  const { fields, append, remove } = useFieldArray({
    control,
    name: "answers",
  });

  // query
  const queryClient = useQueryClient();

  const questionMutation = useMutation<IQuestion, IError, UpdateQuestionDto>(
    (data) => questionService.update(question._id, data),
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

  const onSubmit = (data: UpdateQuestionDto) => {
    questionMutation.mutate(data);
  };

  const addAnswerField = () => {
    append({ text: "", isCorrect: false });
  };
  const removeAnswerField = (index: number) => {
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
                {...register(`answers.${index}.text` as const, {
                  required: true,
                })}
              />
              <input
                type="checkbox"
                {...register(`answers.${index}.isCorrect` as const)}
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
