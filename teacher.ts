import { useMe } from "@/lib/me";
import { usePeople } from "@/lib/people";
import { useLookups } from "@/lib/lookups";

/** Teacher's assignments joined with subject, plus the students they teach. */
export function useTeaching() {
  const { data: me } = useMe();
  const { data: people } = usePeople();
  const { data: lk } = useLookups();
  const tid = me?.teacher?.id;
  const assignments = (people?.teacherSubjects ?? []).filter((a) => a.teacher_id === tid).map((a) => ({
    ...a,
    subject: lk?.subjects.find((s) => s.id === a.subject_id),
    section: lk?.sections.find((s) => s.id === a.section_id),
  }));
  const studentsFor = (a: (typeof assignments)[number]) =>
    (people?.students ?? []).filter((s) => (a.section_id ? s.section_id === a.section_id : s.semester_id === a.subject?.semester_id));
  const students = [...new Map(assignments.flatMap((a) => studentsFor(a)).map((s) => [s.id, s])).values()];
  return { me, tid, lk, people, assignments, studentsFor, students, ready: !!me && !!people && !!lk };
}
