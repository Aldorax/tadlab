export const MASTER_ADMIN_ROLE = "SUPER_ADMIN" as const;
export const MID_LEVEL_ADMIN_ROLE = "ADMIN" as const;

export const ROLE_LABELS: Record<string, string> = {
  SUPER_ADMIN: "Master Control",
  ADMIN: "Mid-Level Control",
  EDITOR: "Editor",
};

export function normalizeAdminEmail(email: string) {
  return email.toLowerCase().trim();
}

export function isMasterAdminRole(role: string) {
  return role === MASTER_ADMIN_ROLE;
}

export function requiresApproval(role: string) {
  return !isMasterAdminRole(role);
}

export function getInvitableRoles(actorRole: string) {
  if (actorRole === MASTER_ADMIN_ROLE) {
    return [MASTER_ADMIN_ROLE, MID_LEVEL_ADMIN_ROLE];
  }

  if (actorRole === MID_LEVEL_ADMIN_ROLE) {
    return [MID_LEVEL_ADMIN_ROLE];
  }

  return [];
}

export function canInviteRole(actorRole: string, targetRole: string) {
  return getInvitableRoles(actorRole).includes(targetRole as typeof MASTER_ADMIN_ROLE | typeof MID_LEVEL_ADMIN_ROLE);
}
