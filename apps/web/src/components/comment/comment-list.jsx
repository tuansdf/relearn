import { isEmpty } from "lodash-es";
import Comment from "/src/components/comment/comment";
import Info from "/src/components/shared/info";

export default function CommentList({ comments }) {
  return (
    <div className="space-y-4">
      {!isEmpty(comments) ? (
        comments.map((comment) => (
          <Comment comment={comment} key={comment._id} />
        ))
      ) : (
        <Info text="No comment" />
      )}
    </div>
  );
}
