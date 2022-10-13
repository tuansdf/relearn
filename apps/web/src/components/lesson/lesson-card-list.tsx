import Info from "../shared/info";
import LessonCard from "./lesson-card";

import { ILesson } from "../../interface/types";

interface Props {
  lessons: ILesson[];
}

export default function LessonCardList({ lessons }: Props) {
  return lessons.length > 0 ? (
    <div className="grid gap-4 xl:grid-cols-2 xl:gap-8 xl:px-8">
      {lessons.map((lesson) => (
        <LessonCard lesson={lesson} key={lesson._id} />
      ))}
    </div>
  ) : (
    <Info text="No lesson" />
  );
}
