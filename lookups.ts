import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

export function useLookups() {
  return useQuery({
    queryKey: ["lookups"],
    queryFn: async () => {
      const [d, s, sec, sub, ex] = await Promise.all([
        supabase.from("departments").select("*").order("name"),
        supabase.from("semesters").select("*").order("number"),
        supabase.from("sections").select("*").order("id"),
        supabase.from("subjects").select("*").order("code"),
        supabase.from("exams").select("*").order("start_date"),
      ]);
      const semesters = s.data ?? [];
      return {
        departments: d.data ?? [],
        semesters,
        sections: (sec.data ?? []).map((x) => ({ ...x, label: `${semesters.find((m) => m.id === x.semester_id)?.name ?? ""} – ${x.name}` })),
        subjects: sub.data ?? [],
        exams: ex.data ?? [],
      };
    },
  });
}
