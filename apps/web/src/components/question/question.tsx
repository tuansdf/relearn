import { Link } from "@tanstack/react-location";

import { IQuestion } from "../../interface/types";
import Error from "../shared/error";
import Success from "../shared/success";

interface Props {
  question: IQuestion;
  index: number;
  register: any;
  disabled: boolean;
  isCorrect: boolean;
}

export default function Question({
  question,
  index,
  register,
  disabled,
  isCorrect = false,
}: Props) {
  return (
    <div className="space-y-4">
      <p>
        {index}. {question.text}
      </p>
      <div className="space-y-2 pl-4">
        {question.answers.map((answer) => (
          <div className="flex items-center gap-2" key={answer._id}>
            <input
              type="radio"
              className="radio radio-sm"
              value={answer.isCorrect ? "true" : "false"}
              id={answer._id}
              disabled={disabled}
              {...register(question._id, { required: true })}
            />
            <label htmlFor={answer._id}>{answer.text}</label>
          </div>
        ))}
      </div>
      <Link
        to={`/questions/${question._id}`}
        className="link inline-block font-bold"
      >
        Discussion
      </Link>

      {disabled ? (
        isCorrect ? (
          <Success text={question.description} />
        ) : (
          <Error text={question.description} />
        )
      ) : null}
    </div>
  );
}
