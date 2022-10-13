import { useAtom } from "jotai";

import { userAtom } from "../../stores/auth.store";

export default function UserInfo() {
  // atom
  const [user] = useAtom(userAtom);

  return (
    <div className="space-y-4">
      <div className="mb-8 text-2xl">
        <div>
          <span className="font-bold">Profile:</span> {user?.username}
        </div>
        <div className="badge">{user?.role}</div>
      </div>

      <div>
        <span className="font-bold">ID:</span> {user?._id}
      </div>

      <div>
        <span className="font-bold">Email:</span> {user?.email}
      </div>
    </div>
  );
}
