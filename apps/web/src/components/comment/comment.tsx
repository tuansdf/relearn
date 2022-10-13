import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import { useQuery } from "react-query";

import QueryKeys from "../../constants/query-keys";
import userService from "../../helpers/fetchers/user.service";
import { IComment, IError, IUser } from "../../interface/types";

dayjs.extend(relativeTime);

interface Props {
  comment: IComment;
}

export default function Comment({ comment }: Props) {
  // query
  const userQuery = useQuery<IUser, IError>(
    [QueryKeys.USER, comment.author],
    () => userService.getOne(comment.author as string)
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
