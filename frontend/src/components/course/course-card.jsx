import { Link } from "@tanstack/react-location";

export default function CourseCard({ course }) {
  return (
    <div className="card card-bordered w-full bg-base-300 lg:aspect-2/1">
      <div className="card-body">
        <h3 className="card-title">{course.title}</h3>

        <div className="relative flex-1">
          <p className="absolute inset-0 overflow-hidden">
            {course.description}
          </p>
        </div>

        <div className="card-actions justify-end">
          <Link to={`/courses/${course._id}`} className="btn">
            Learn
          </Link>
        </div>
      </div>
    </div>
  );
}
