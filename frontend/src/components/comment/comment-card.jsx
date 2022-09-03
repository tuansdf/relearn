import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import { useQuery } from "react-query";

import { QueryKeys } from "/src/constants/query-keys";
import { getUserApi } from "/src/helpers/fetchers";

dayjs.extend(relativeTime);

export default function CommentCard({ comment }) {
  // query
  const userQuery = useQuery([QueryKeys.USER, comment.author], () =>
    getUserApi(comment.author)
  );

  return (
    <div className="card card-bordered w-full rounded bg-base-200">
      <div className="card-body">
        <div className="flex items-end justify-between gap-2">
          <h2 className="font-bold">
            @{userQuery.isSuccess ? userQuery.data.username : ""}
          </h2>

          <span className="text-sm">
            {dayjs().to(dayjs(comment.updatedAt))}
          </span>
        </div>
        <p>{comment.text}</p>
      </div>
    </div>
  );
}
