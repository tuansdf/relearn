import { Navigate } from "@tanstack/react-location";
import { useAtom } from "jotai";
import { ReactNode } from "react";

import { userAtom } from "../../stores/auth.store";

interface Props {
  children: ReactNode;
}

export default function CheckLogout({ children }: Props) {
  // atom
  const [user] = useAtom(userAtom);

  return <>{user?.token ? <Navigate to="/" replace /> : children}</>;
}
