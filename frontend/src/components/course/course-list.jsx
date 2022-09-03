import CourseCard from "/src/components/course/course-card";
import Info from "/src/components/shared/info";

export default function CourseList({ courses = [] }) {
  return courses.length > 0 ? (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {courses.map((course) => (
        <CourseCard course={course} key={course._id} />
      ))}
    </div>
  ) : (
    <Info text="No course" />
  );
}
