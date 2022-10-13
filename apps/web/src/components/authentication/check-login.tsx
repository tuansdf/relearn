import { Navigate } from "@tanstack/react-location";
import { useAtom } from "jotai";
import { ReactNode } from "react";

import { userAtom } from "../../stores/auth.store";

interface Props {
  children: ReactNode;
}

export default function CheckLogin({ children }: Props) {
  // atom
  const [user] = useAtom(userAtom);

  return <>{!user?.token ? <Navigate to="/login" replace /> : children}</>;
}
