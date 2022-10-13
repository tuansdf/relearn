import { useState } from "react";
import { IQuestion } from "../../interface/types";
import UpdateQuestionModal from "./update-question-modal";

interface Props {
  questions: IQuestion[];
}

export default function QuestionTable({ questions }: Props) {
  const [isUpdateModal, setIsUpdateModal] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(0);

  const openUpdateModal = () => setIsUpdateModal(true);
  const closeUpdateModal = () => setIsUpdateModal(false);
  const editQuestion = (index: number) => {
    openUpdateModal();
    setSelectedIndex(index);
  };

  return (
    <>
      <div className="overflow-x-auto">
        <table className="table-zebra table w-full">
          <thead>
            <tr>
              <th />
              <th>Actions</th>
              <th>Question</th>
              <th>Description</th>
              <th>Answers</th>
            </tr>
          </thead>

          <tbody>
            {questions.map((question, index) => (
              <tr key={question._id}>
                <th>{index + 1}</th>
                <td className="space-x-2">
                  <button
                    className="btn btn-ghost btn-sm"
                    onClick={() => editQuestion(index)}
                  >
                    Edit
                  </button>
                </td>
                <td>{question.text}</td>
                <td>{question.description}</td>
                <td>
                  {question.answers.map((answer) => (
                    <p key={answer._id}>
                      {answer.isCorrect ? "+" : "-"} {answer.text}
                    </p>
                  ))}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* update modal */}
      <UpdateQuestionModal
        isModal={isUpdateModal}
        closeModal={closeUpdateModal}
        question={questions[selectedIndex]}
      />
    </>
  );
}
