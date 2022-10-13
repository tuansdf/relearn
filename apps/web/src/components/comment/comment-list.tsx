import { isEmpty } from "lodash-es";

import Info from "../shared/info";
import Comment from "./comment";

import { IComment } from "../../interface/types";

interface Props {
  comments: IComment[];
}

export default function CommentList({ comments }: Props) {
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
