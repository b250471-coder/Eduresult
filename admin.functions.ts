import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import { requireSupabaseAuth } from "@/integrations/supabase/auth-middleware";

const schema = z.object({
  role: z.enum(["teacher", "student"]),
  name: z.string().trim().min(2).max(100),
  email: z.string().trim().email().max(150),
  password: z.string().min(8).max(72),
  department_id: z.number().int().nullable(),
  phone: z.string().max(20).optional(),
  roll_no: z.string().max(30).optional(),
  enrollment_no: z.string().max(40).optional(),
  semester_id: z.number().int().nullable().optional(),
  section_id: z.number().int().nullable().optional(),
  gender: z.string().max(20).optional(),
  dob: z.string().optional(),
  address: z.string().max(255).optional(),
});

export const createAccount = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .validator((d: unknown) => schema.parse(d))
  .handler(async ({ data, context }) => {
    const { data: isAdmin } = await context.supabase.rpc("has_role", { _user_id: context.userId, _role: "admin" });
    if (!isAdmin) throw new Error("Only admins can create accounts.");
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
    const { data: created, error } = await supabaseAdmin.auth.admin.createUser({
      email: data.email,
      password: data.password,
      email_confirm: true,
      user_metadata: { name: data.name },
    });
    if (error || !created.user) throw new Error(error?.message ?? "Could not create account");
    const id = created.user.id;
    await supabaseAdmin.from("profiles").upsert({ id, name: data.name, email: data.email });
    await supabaseAdmin.from("user_roles").insert({ user_id: id, role: data.role });
    if (data.role === "teacher") {
      const { error: e } = await supabaseAdmin.from("teachers").insert({ user_id: id, department_id: data.department_id, phone: data.phone || null });
      if (e) throw new Error(e.message);
    } else {
      const { error: e } = await supabaseAdmin.from("students").insert({
        user_id: id, department_id: data.department_id, phone: data.phone || null, roll_no: data.roll_no || null,
        enrollment_no: data.enrollment_no || null, semester_id: data.semester_id ?? null, section_id: data.section_id ?? null,
        gender: data.gender || null, dob: data.dob || null, address: data.address || null,
      });
      if (e) throw new Error(e.message);
    }
    return { id };
  });

export const deleteAccount = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .validator((d: unknown) => z.object({ userId: z.string().uuid() }).parse(d))
  .handler(async ({ data, context }) => {
    const { data: isAdmin } = await context.supabase.rpc("has_role", { _user_id: context.userId, _role: "admin" });
    if (!isAdmin) throw new Error("Only admins can delete accounts.");
    if (data.userId === context.userId) throw new Error("You cannot delete yourself.");
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
    await supabaseAdmin.from("students").delete().eq("user_id", data.userId);
    await supabaseAdmin.from("teachers").delete().eq("user_id", data.userId);
    const { error } = await supabaseAdmin.auth.admin.deleteUser(data.userId);
    if (error) throw new Error(error.message);
    return { ok: true };
  });
