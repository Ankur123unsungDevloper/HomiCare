export const ROLES = {
  HOUSEHOLD: "HOUSEHOLD",
  HELPER: "HELPER",
  ADMIN: "ADMIN",
} as const

export type UserRole = (typeof ROLES)[keyof typeof ROLES]

export const ROLE_ROUTES: Record<UserRole, string> = {
  HOUSEHOLD: "/dashboard",
  HELPER: "/helper/dashboard",
  ADMIN: "/admin/dashboard",
}