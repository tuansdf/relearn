import LessonCard from "/src/components/lesson/lesson-card";
import Info from "/src/components/shared/info";

export default function LessonCardList({ lessons = [] }) {
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
