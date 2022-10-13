import { ICourse } from "../../interface/types";
import Info from "../shared/info";
import CourseCard from "./course-card";

interface Props {
  courses: ICourse[];
}

export default function CourseCardList({ courses }: Props) {
  return courses.length > 0 ? (
    <div className="grid gap-4 lg:grid-cols-2 lg:gap-8 lg:px-8 xl:grid-cols-3">
      {courses.map((course) => (
        <CourseCard course={course} key={course._id} />
      ))}
    </div>
  ) : (
    <Info text="No course" />
  );
}
