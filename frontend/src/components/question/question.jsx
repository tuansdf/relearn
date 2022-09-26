import { Link } from "@tanstack/react-location";
import Error from "/src/components/shared/error";
import Success from "/src/components/shared/success";

export default function Question({
  question,
  index,
  register,
  disabled,
  isCorrect = false,
}) {
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
              value={answer.isCorrect}
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
