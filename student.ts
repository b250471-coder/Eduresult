import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useMe } from "@/lib/me";

/** The signed-in student's published marks and results (RLS hides unpublished). */
export function useMyResults() {
  const { data: me } = useMe();
  const sid = me?.student?.id;
  return useQuery({
    queryKey: ["my-results", sid],
    enabled: !!sid,
    queryFn: async () => {
      const [m, r] = await Promise.all([
        supabase.from("marks").select("*").eq("student_id", sid!).eq("status", "Published"),
        supabase.from("results").select("*").eq("student_id", sid!).order("semester_id"),
      ]);
      return { marks: m.data ?? [], results: r.data ?? [] };
    },
  });
}
