import { useMatch } from "@tanstack/react-location";
import clsx from "clsx";
import { useAtom } from "jotai";
import { isEmpty, keys, sampleSize } from "lodash-es";
import { useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import { useMutation, useQueryClient } from "react-query";

import Question from "/src/components/question/question";
import Error from "/src/components/shared/error";
import Info from "/src/components/shared/info";
import { QueryKeys } from "/src/constants/query-keys";

import { postTestResultsInCourseApi } from "/src/helpers/fetchers";
import { userAtom } from "/src/stores/auth.store";

const NUM_QUESTIONS_EACH_TEST = 10;

export default function QuestionList({ questions, isMarking }) {
  // location
  const {
    params: { courseId },
  } = useMatch();

  // form
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  // query
  const queryClient = useQueryClient();

  const testResultMutation = useMutation(
    (data) => postTestResultsInCourseApi(courseId, data),
    {
      onSuccess: () => {
        queryClient.invalidateQueries([
          QueryKeys.TEST_RESULTS_BY_COURSE,
          courseId,
        ]);
      },
    }
  );

  // atom
  const [user] = useAtom(userAtom);

  const [isModal, setIsModal] = useState(false);
  const [score, setScore] = useState(0);
  const [correctAnswerIds, setCorrectAnswerIds] = useState([]);

  // memo
  const mark = useMemo(() => {
    const totalQ = isMarking ? NUM_QUESTIONS_EACH_TEST : questions.length;
    const percentage = score / totalQ;
    if (percentage >= 0.8) return "HD";
    if (percentage >= 0.7) return "DI";
    if (percentage >= 0.6) return "CR";
    if (percentage >= 0.5) return "PA";
    return "NN";
  }, [score]);

  const questionSample = useMemo(() => {
    return isMarking
      ? sampleSize(questions, NUM_QUESTIONS_EACH_TEST)
      : questions;
  }, [questions]);

  const onSubmit = (data) => {
    openModal();

    const correctAnswerIds = keys(data).filter((key) => data[key] === "true");
    setCorrectAnswerIds(correctAnswerIds);

    const score = correctAnswerIds.length;
    setScore(score);

    if (isMarking) testResultMutation.mutate({ score, userId: user._id });
  };

  const openModal = () => setIsModal(true);
  const closeModal = () => setIsModal(false);

  return !isEmpty(questions) ? (
    <>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-8 pl-4">
        {/* error */}
        {!isEmpty(errors) && <Error text="You must answer all questions" />}

        {/* list */}
        {questionSample.map((question, index) => (
          <Question
            question={question}
            key={question._id}
            index={index + 1}
            register={register}
            disabled={score}
            isCorrect={correctAnswerIds.includes(question._id)}
          />
        ))}

        {/* submit */}
        <button className="btn btn-primary">Submit</button>
      </form>

      {/* modal */}
      <div>
        <div className={clsx("modal mt-0", { "modal-open": isModal })}>
          <div className="modal-box space-y-4">
            <h3 className="text-lg font-bold uppercase">Test result</h3>
            <p>
              You scored <span className="font-bold">{score}</span> points out
              of {questionSample.length}
            </p>
            <p>
              You got <span className="font-bold">{mark}</span>
            </p>
            <div className="modal-action">
              <button onClick={closeModal} className="btn btn-primary">
                OK
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  ) : (
    <Info text="No question" />
  );
}
