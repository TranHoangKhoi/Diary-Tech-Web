import { ROLE } from "@/configs/appConfig";

const ROLE_GROUP = {
  OWNER_LIKE: [ROLE.Owner, ROLE.SubAccount, ROLE.Admin],
};

const ROLE_LEVEL: Record<string, number> = {
  [ROLE.SubAccount]: 1,
  [ROLE.Owner]: 2,
  [ROLE.Admin]: 3,
  [ROLE.SuperAdmin]: 4,
};

export const isOwnerRole = (role?: string): boolean => {
  if (!role) return false;
  return ROLE_LEVEL[role] >= ROLE_LEVEL[ROLE.Owner];
};

export const isSubAccountRole = (role?: string): boolean => {
  if (!role) return false;
  return ROLE_LEVEL[role] >= ROLE_LEVEL[ROLE.SubAccount];
};
