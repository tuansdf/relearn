import { useState } from "react";

import UpdateQuestionModal from "/src/components/question/update-question-modal";

export default function QuestionTable({ questions }) {
  const [isUpdateModal, setIsUpdateModal] = useState(false);
  const [selectedId, setSelectedId] = useState(0);

  const openUpdateModal = () => setIsUpdateModal(true);
  const closeUpdateModal = () => setIsUpdateModal(false);
  const editQuestion = (questionId) => {
    openUpdateModal();
    setSelectedId(questionId);
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
                    <p>
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
        question={questions[selectedId]}
      />
    </>
  );
}
