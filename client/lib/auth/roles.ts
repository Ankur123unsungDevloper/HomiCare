export const ROLES = {
USER: "USER",
HELPER: "HELPER",
ADMIN: "ADMIN",
} as const;

export type UserRole = (typeof ROLES)[keyof typeof ROLES];

export const ROLE_ROUTES: Record<UserRole, string> = {
USER: "/dashboard",
HELPER: "/helper/dashboard",
ADMIN: "/admin/dashboard",
};
