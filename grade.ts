export function grade(total: number): [string, number] {
  if (total >= 90) return ["A+", 10];
  if (total >= 80) return ["A", 9];
  if (total >= 70) return ["B+", 8];
  if (total >= 60) return ["B", 7];
  if (total >= 50) return ["C", 6];
  if (total >= 40) return ["D", 5];
  return ["F", 0];
}

export const MARK_LIMITS = { internal: 30, external: 60, practical: 50, assignment: 10, attendance: 10 } as const;

/** Total out of 100: theory = internal+external+assignment+attendance (capped at 100). */
export function computeTotal(m: { internal: number; external: number; practical: number; assignment: number; attendance: number }, isPractical: boolean) {
  const raw = isPractical
    ? m.internal + m.practical + m.assignment + m.attendance
    : m.internal + m.external + m.assignment + m.attendance;
  return Math.min(100, Math.round(raw * 100) / 100);
}

/** SGPA = sum(credits * grade point) / sum(credits) */
export function sgpa(rows: { credits: number; grade_point: number }[]) {
  const c = rows.reduce((a, r) => a + r.credits, 0);
  if (!c) return 0;
  return Math.round((rows.reduce((a, r) => a + r.credits * r.grade_point, 0) / c) * 100) / 100;
}
