import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

export type Role = "admin" | "teacher" | "student";

export async function fetchMe() {
  const { data: u } = await supabase.auth.getUser();
  if (!u.user) return null;
  const [{ data: roles }, { data: profile }, { data: student }, { data: teacher }] = await Promise.all([
    supabase.from("user_roles").select("role").eq("user_id", u.user.id),
    supabase.from("profiles").select("*").eq("id", u.user.id).maybeSingle(),
    supabase.from("students").select("*").eq("user_id", u.user.id).maybeSingle(),
    supabase.from("teachers").select("*").eq("user_id", u.user.id).maybeSingle(),
  ]);
  const r = (roles ?? []).map((x) => x.role as Role);
  const role: Role | null = r.includes("admin") ? "admin" : r.includes("teacher") ? "teacher" : r.includes("student") ? "student" : null;
  return { user: u.user, role, profile, student, teacher };
}

export const meQuery = { queryKey: ["me"], queryFn: fetchMe, staleTime: 60_000 };
export function useMe() {
  return useQuery(meQuery);
}
