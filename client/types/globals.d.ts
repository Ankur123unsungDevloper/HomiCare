import type { UserRole } from "@/lib/auth/roles"

declare global {
  interface CustomJwtSessionClaims {
    metadata: { role?: UserRole }
  }
}