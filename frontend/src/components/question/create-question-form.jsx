import { useMatch } from "@tanstack/react-location";
import clsx from "clsx";
import { useId, useState } from "react";
import { useForm } from "react-hook-form";
import { useMutation, useQueryClient } from "react-query";

import Success from "/src/components/shared/success";

import { QueryKeys } from "/src/constants/query-keys";
import { postQuestionInLessonApi } from "/src/helpers/fetchers";

const FormKeys = Object.freeze({
  TEXT: "text",
  DESCRIPTION: "description",
  ANSWERS: "answers",
  IS_CORRECT: "isCorrect",
  ANSWER_TEXT: "answertext",
  ANSWER_CORRECT: "answercorrect",
  ANSWER_SPLITTER: "-",
});

export default function CreateQuestionForm({ onSuccess }) {
  const textId = useId();
  const descriptionId = useId();

  // location
  const {
    params: { lessonId },
  } = useMatch();

  // form
  const { register, handleSubmit, reset } = useForm();

  // query
  const queryClient = useQueryClient();

  const questionMutation = useMutation(
    (data) => postQuestionInLessonApi(lessonId, data),
    {
      onSuccess: () => {
        queryClient.invalidateQueries([
          QueryKeys.QUESTIONS_BY_LESSON,
          lessonId,
        ]);
        onSuccess();
        reset();
      },
    }
  );

  const [answerCount, setAnswerCount] = useState(1);

  const onSubmit = (data) => {
    const newData = {
      [FormKeys.TEXT]: data[FormKeys.TEXT],
      [FormKeys.DESCRIPTION]: data[FormKeys.DESCRIPTION],
      [FormKeys.ANSWERS]: [],
    };

    for (let i = 0; i < answerCount; i++) {
      const answerTextKey = `${FormKeys.ANSWER_TEXT}${FormKeys.ANSWER_SPLITTER}${i}`;
      const answerCorrectKey = `${FormKeys.ANSWER_CORRECT}${FormKeys.ANSWER_SPLITTER}${i}`;

      newData[FormKeys.ANSWERS].push({
        [FormKeys.TEXT]: data[answerTextKey],
        [FormKeys.IS_CORRECT]: data[answerCorrectKey],
      });
    }

    questionMutation.mutate(newData);
  };

  const increaseAnswerCount = () => setAnswerCount((prev) => prev + 1);

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-2">
      <h2 className="card-title text-2xl">Create a question</h2>

      {/* title */}
      <div className="form-control">
        <label htmlFor={textId} className="label">
          <span className="label-text">Question</span>
        </label>
        <input
          type="text"
          id={textId}
          className="input input-bordered w-full"
          {...register(FormKeys.TEXT, { required: true })}
        />
      </div>

      {/* description */}
      <div className="form-control">
        <label htmlFor={descriptionId} className="label">
          <span className="label-text">Description</span>
        </label>
        <input
          type="text"
          id={descriptionId}
          className="input input-bordered w-full"
          {...register(FormKeys.DESCRIPTION, { required: true })}
        />
      </div>

      {/* answers */}
      <div className="form-control">
        <label className="label">
          <span className="label-text">Answer - True/False</span>
        </label>

        <div className="space-y-2">
          {[...Array(answerCount)].map((_, index) => (
            <div className="flex items-center gap-2">
              <input
                type="text"
                key={index}
                className="input input-bordered w-full"
                {...register(
                  `${FormKeys.ANSWER_TEXT}${FormKeys.ANSWER_SPLITTER}${index}`,
                  {
                    required: true,
                  }
                )}
              />
              <input
                type="checkbox"
                {...register(
                  `${FormKeys.ANSWER_CORRECT}${FormKeys.ANSWER_SPLITTER}${index}`
                )}
                className="checkbox"
              />
            </div>
          ))}

          <button
            type="button"
            onClick={increaseAnswerCount}
            className="btn btn-block"
          >
            Add Question
          </button>
        </div>
      </div>

      {/* submit */}
      <div className="flex justify-end pt-2">
        <button
          className={clsx("btn btn-primary", {
            loading: questionMutation.isLoading,
          })}
        >
          Create
        </button>
      </div>

      {questionMutation.isSuccess && (
        <Success text="Question created successfully!" />
      )}
    </form>
  );
}
