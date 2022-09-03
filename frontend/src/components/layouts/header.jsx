import {
  AdjustmentsVerticalIcon,
  ArrowRightOnRectangleIcon,
  AtSymbolIcon,
  CpuChipIcon,
  HomeIcon,
  UserIcon,
} from "@heroicons/react/24/outline";
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
      <div className="container navbar flex-col sm:flex-row">
        {/* start */}
        <div>
          <Link to="/" className="btn btn-ghost">
            <CpuChipIcon className="h-8 w-8" />
            <span className="text-xl font-bold">
              <span>re</span>
              <span className="text-primary">learn</span>
            </span>
          </Link>
          <Link to="/" className="btn btn-ghost gap-1">
            <HomeIcon className="h-5 w-5" />
            Home
          </Link>
          {user.role === "admin" && (
            <Link to="/admin" className="btn btn-ghost gap-1">
              <AdjustmentsVerticalIcon className="h-5 w-5" />
              Admin Dashboard
            </Link>
          )}
        </div>

        {/* end */}
        <div className="ml-auto">
          {Object.keys(user).length > 0 ? (
            <div className="dropdown-end dropdown">
              <label tabIndex={0} className="btn btn-ghost">
                <AtSymbolIcon className="h-5 w-5" />
                {user.username}
              </label>
              <ul
                tabIndex={0}
                className="dropdown-content menu rounded-box menu-compact mt-3 w-52 bg-base-200 p-2 shadow-lg"
              >
                <li>
                  <Link to="/user">
                    <UserIcon className="h-5 w-5" /> Profile
                  </Link>
                </li>
                <li onClick={logout}>
                  <span>
                    <ArrowRightOnRectangleIcon className="h-5 w-5" /> Log out
                  </span>
                </li>
              </ul>
            </div>
          ) : (
            <Link className="btn btn-primary" to="/login">
              Log in
            </Link>
          )}
        </div>
        {/* end navbar-end */}
      </div>
    </nav>
  );
}
