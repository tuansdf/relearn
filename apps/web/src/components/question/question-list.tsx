import { useMatch } from "@tanstack/react-location";
import clsx from "clsx";
import { useAtom } from "jotai";
import { isEmpty, keys, sampleSize } from "lodash-es";
import { useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import { useMutation, useQueryClient } from "react-query";

import Error from "../shared/error";
import Info from "../shared/info";
import Question from "./question";

import QueryKeys from "../../constants/query-keys";
import testResultService from "../../helpers/fetchers/test-result.service";
import {
  CreateTestResultDto,
  IError,
  IQuestion,
  ITestResult,
} from "../../interface/types";
import { userAtom } from "../../stores/auth.store";

const NUM_QUESTIONS_EACH_TEST = 10;

interface Props {
  questions: IQuestion[];
  isMarking?: boolean;
}

export default function QuestionList({ questions, isMarking }: Props) {
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

  const testResultMutation = useMutation<
    ITestResult,
    IError,
    CreateTestResultDto
  >((data) => testResultService.createInCourse(courseId, data), {
    onSuccess: () => {
      queryClient.invalidateQueries([
        QueryKeys.TEST_RESULTS_BY_COURSE,
        courseId,
      ]);
    },
  });

  // atom
  const [user] = useAtom(userAtom);

  const [isModal, setIsModal] = useState(false);
  const [score, setScore] = useState(0);
  const [correctAnswerIds, setCorrectAnswerIds] = useState<string[]>([]);

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
  }, [questions, isMarking]);

  const onSubmit = (data: any) => {
    console.log(data);

    openModal();

    const correctAnswerIds = keys(data).filter((key) => data[key] === "true");
    setCorrectAnswerIds(correctAnswerIds);

    const score = correctAnswerIds.length;
    setScore(score);

    const createTestResultData: CreateTestResultDto = {
      score,
      userId: user?._id || "",
    };

    if (isMarking) testResultMutation.mutate(createTestResultData);
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
            disabled={Boolean(score)}
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
