import Comment from "/src/components/comment/comment";
import Info from "/src/components/shared/info";

export default function CommentList({ comments }) {
  return (
    <div className="space-y-4">
      {comments.length > 0 ? (
        comments.map((comment) => (
          <Comment comment={comment} key={comment._id} />
        ))
      ) : (
        <Info text="No comment" />
      )}
    </div>
  );
}
