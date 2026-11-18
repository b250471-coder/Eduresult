import { redirect } from "@tanstack/react-router";
import type { QueryClient } from "@tanstack/react-query";
import { meQuery, type Role } from "@/lib/me";

export async function requireRole(queryClient: QueryClient, role: Role) {
  const me = await queryClient.ensureQueryData(meQuery);
  if (!me) throw redirect({ to: "/auth" });
  if (me.role !== role) throw redirect({ to: "/dashboard" });
  return me;
}
