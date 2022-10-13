import { Link } from "@tanstack/react-location";

import { ICourse } from "../../interface/types";

interface Props {
  course: ICourse;
}

export default function CourseCard({ course }: Props) {
  return (
    <div className="card card-bordered w-full bg-base-300 lg:aspect-2/1">
      <div className="card-body">
        <h3 className="card-title">{course.title}</h3>

        <div className="lg:relative lg:flex-1">
          <p className="lg:absolute lg:inset-0 lg:overflow-hidden">
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
