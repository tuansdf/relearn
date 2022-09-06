import { useMatch } from "@tanstack/react-location";
import { useState } from "react";
import { useQuery } from "react-query";
import CreateQuestionModal from "/src/components/question/create-question-modal";

import QuestionTable from "/src/components/question/question-table";
import Error from "/src/components/shared/error";
import Loading from "/src/components/shared/loading";

import { QueryKeys } from "/src/constants/query-keys";
import { getQuestionsByLessonApi } from "/src/helpers/fetchers";

export default function AdminQuestions() {
  // location
  const {
    params: { lessonId },
  } = useMatch();

  // query
  const questionsQuery = useQuery(
    [QueryKeys.QUESTIONS_BY_LESSON, lessonId],
    () => getQuestionsByLessonApi(lessonId)
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
      ) : (
        <QuestionTable questions={questionsQuery.data} />
      )}

      {/* create modal */}
      <CreateQuestionModal
        isModal={isCreateModal}
        closeModal={closeCreateModal}
      />
    </div>
  );
}
