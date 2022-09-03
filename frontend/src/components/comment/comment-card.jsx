import { useQuery } from "react-query";
import { QueryKeys } from "/src/constants/query-keys";
import { getUserApi } from "/src/helpers/fetchers";

export default function CommentCard({ comment }) {
  // query
  const userQuery = useQuery([QueryKeys.USER, comment.author], () =>
    getUserApi(comment.author)
  );

  return (
    <div class="card card-bordered w-full bg-base-300">
      <div class="card-body">
        <h2 class="card-title">
          {userQuery.isSuccess ? userQuery.data.username : ""}
        </h2>
        <p>{comment.text}</p>
      </div>
    </div>
  );
}
