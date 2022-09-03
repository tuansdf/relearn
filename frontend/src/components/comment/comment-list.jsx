import CommentCard from "/src/components/comment/comment-card";
import Info from "/src/components/shared/info";

export default function CommentList({ comments }) {
  return comments.length > 0 ? (
    <div className="space-y-4">
      {comments.map((comment) => (
        <CommentCard comment={comment} key={comment._id} />
      ))}
    </div>
  ) : (
    <Info text="No comment" />
  );
}
