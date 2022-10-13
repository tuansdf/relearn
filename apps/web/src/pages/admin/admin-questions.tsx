import { useMatch } from "@tanstack/react-location";
import { useState } from "react";
import { useQuery } from "react-query";
import CreateQuestionModal from "../../components/question/create-question-modal";
import QuestionTable from "../../components/question/question-table";
import Error from "../../components/shared/error";
import Loading from "../../components/shared/loading";
import QueryKeys from "../../constants/query-keys";
import questionService from "../../helpers/fetchers/question.service";
import { IError, IQuestion } from "../../interface/types";

export default function AdminQuestions() {
  // location
  const {
    params: { lessonId },
  } = useMatch();

  // query
  const questionsQuery = useQuery<IQuestion[], IError>(
    [QueryKeys.QUESTIONS_BY_LESSON, lessonId],
    () => questionService.getAllByLesson(lessonId)
  );

  const [isCreateModal, setIsCreateModal] = useState(false);
  const openCreateModal = () => setIsCreateModal(true);
  const closeCreateModal = () => setIsCreateModal(false);

  return (
    <div className="space-y-4 lg:space-y-8">
      <div className="flex items-center gap-2 lg:gap-4">
        <button
          className="btn btn-primary"
          onClick={() => window.history.back()}
        >
          Back
        </button>
        <h2 className="text-2xl font-bold lg:text-3xl">Questions</h2>
      </div>

      <button className="btn" onClick={openCreateModal}>
        Create question
      </button>

      {questionsQuery.isLoading ? (
        <Loading />
      ) : questionsQuery.isError ? (
        <Error text={questionsQuery.error.response.data?.message} />
      ) : questionsQuery.data ? (
        <QuestionTable questions={questionsQuery.data} />
      ) : null}

      {/* create modal */}
      <CreateQuestionModal
        isModal={isCreateModal}
        closeModal={closeCreateModal}
      />
    </div>
  );
}
