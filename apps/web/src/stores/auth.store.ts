import { atomWithStorage } from "jotai/utils";

import { IUser } from "../interface/types";

export const userAtom = atomWithStorage<IUser | undefined>("user", undefined);
