<!-- LOVABLE:BEGIN -->
> [!IMPORTANT]
> This project is connected to [Lovable](https://lovable.dev). Avoid rewriting
> published git history — force pushing, or rebasing/amending/squashing commits
> that are already pushed — as it rewrites history on Lovable's side and the
> user will likely lose their project history.
>
> Commits you push to the connected branch sync back to Lovable and show up in
> the editor, so keep the branch in a working state.
<!-- LOVABLE:END -->

## EduResult architecture
- Roles live in `user_roles` (admin/teacher/student); every table is protected by RLS using `has_role`, `my_student_id`, `my_teacher_id` — pages query the database directly from the browser, so permission rules must stay in the database.
- Creating/deleting login accounts goes through server functions in `src/lib/admin.functions.ts` (need the privileged client); everything else is client-side queries.
- Grading/SGPA rules live only in `src/lib/grade.ts` (tested in `grade.test.ts`) so marks entry and result publishing stay consistent.
