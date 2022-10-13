import { Link } from "@tanstack/react-location";

import { ILesson } from "../../interface/types";

interface Props {
  lesson: ILesson;
}

export default function LessonCard({ lesson }: Props) {
  return (
    <div className="card card-bordered w-full bg-base-300 xl:aspect-2/1">
      <div className="card-body">
        <h3 className="card-title">{lesson.title}</h3>

        <div className="xl:relative xl:flex-1">
          <p className="xl:absolute xl:inset-0 xl:overflow-hidden">
            {lesson.description}
          </p>
        </div>

        <div className="card-actions justify-end">
          <Link to={`/lessons/${lesson._id}`} className="btn">
            relearn
          </Link>
        </div>
      </div>
    </div>
  );
}
