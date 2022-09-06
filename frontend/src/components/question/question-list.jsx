import clsx from "clsx";
import { useMemo, useState } from "react";
import { useForm } from "react-hook-form";

import Question from "/src/components/question/question";
import Error from "/src/components/shared/error";
import Info from "/src/components/shared/info";

export default function QuestionList({ questions }) {
  // form
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const [isModal, setIsModal] = useState(false);
  const [score, setScore] = useState(0);

  const mark = useMemo(() => {
    const totalQ = questions.length;
    const percentage = score / totalQ;
    if (percentage >= 0.8) return "HD";
    if (percentage >= 0.7) return "DI";
    if (percentage >= 0.6) return "CR";
    if (percentage >= 0.5) return "PA";
    return "NN";
  }, [score]);

  const onSubmit = (data) => {
    openModal();
    setScore(
      Object.values(data).reduce(
        (acc, cur) => (cur === "true" ? ++acc : acc),
        0
      )
    );
  };

  const openModal = () => {
    setIsModal(true);
  };
  const closeModal = () => {
    setIsModal(false);
  };

  return questions.length > 0 ? (
    <>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-8 pl-4">
        {/* error */}
        {Object.keys(errors).length > 0 && (
          <Error text="You must answer all questions" />
        )}

        {/* list */}
        {questions.map((question, index) => (
          <Question
            question={question}
            key={question._id}
            index={index + 1}
            register={register}
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
              of {questions.length}
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
