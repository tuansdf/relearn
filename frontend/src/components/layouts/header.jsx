import { CpuChipIcon } from "@heroicons/react/24/outline";
import { Link, useNavigate } from "@tanstack/react-location";
import { useAtom } from "jotai";
import { RESET } from "jotai/utils";

import { userAtom } from "/src/stores/auth.store";

export default function Header() {
  // router
  const navigate = useNavigate();

  // atom
  const [user, setUser] = useAtom(userAtom);

  const logout = () => {
    setUser(RESET);
    navigate({ to: "/login" });
  };

  return (
    <nav className="bg-base-300">
      <div className="container navbar">
        <div className="navbar-start">
          <Link className="btn btn-ghost">
            <CpuChipIcon className="h-8 w-8" />
            <div to="/" className="text-xl font-bold">
              <span>re</span>
              <span className="text-primary">learn</span>
            </div>
          </Link>
          <Link to="/" className="btn btn-ghost">
            Home
          </Link>
          <Link to="/user" className="btn btn-ghost">
            User
          </Link>
          {user.role === "admin" && (
            <Link to="admin" className="btn btn-ghost">
              Admin
            </Link>
          )}
        </div>
        <div className="navbar-end space-x-4">
          {Object.keys(user).length > 0 ? (
            <>
              <span>{user.username}</span>
              <button className="btn btn-primary" onClick={logout}>
                Log out
              </button>
            </>
          ) : (
            <Link className="btn btn-primary" to="/login">
              Log in
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
}
