import { Link } from "@tanstack/react-location";

export default function LessonCard({ lesson }) {
  return (
    <div className="card card-bordered w-full bg-base-300 xl:aspect-2/1">
      <div className="card-body">
        <h3 className="card-title">{lesson.title}</h3>

        <div className="relative flex-1">
          <p className="absolute inset-0 overflow-hidden">
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
