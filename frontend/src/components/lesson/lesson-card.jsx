import { Link } from "@tanstack/react-location";

export default function LessonCard({ lesson }) {
  return (
    <div className="card card-bordered w-full bg-base-300">
      <div className="card-body">
        <h3 className="card-title">{lesson.title}</h3>
        <p>{lesson.description}</p>
        <div className="card-actions justify-end">
          <Link to={`/lessons/${lesson._id}`} className="btn">
            relearn
          </Link>
        </div>
      </div>
    </div>
  );
}
