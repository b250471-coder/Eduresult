import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

/** Students and teachers joined with their profile (name/email). Staff only. */
export function usePeople() {
  return useQuery({
    queryKey: ["people"],
    queryFn: async () => {
      const [p, s, t, ts] = await Promise.all([
        supabase.from("profiles").select("*"),
        supabase.from("students").select("*").order("roll_no"),
        supabase.from("teachers").select("*").order("id"),
        supabase.from("teacher_subjects").select("*"),
      ]);
      const prof = new Map((p.data ?? []).map((x) => [x.id, x]));
      return {
        students: (s.data ?? []).map((x) => ({ ...x, name: prof.get(x.user_id)?.name ?? "—", email: prof.get(x.user_id)?.email ?? "" })),
        teachers: (t.data ?? []).map((x) => ({ ...x, name: prof.get(x.user_id)?.name ?? "—", email: prof.get(x.user_id)?.email ?? "" })),
        teacherSubjects: ts.data ?? [],
      };
    },
  });
}
