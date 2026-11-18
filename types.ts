export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "14.18"
  }
  public: {
    Tables: {
      announcements: {
        Row: {
          created_at: string
          id: number
          message: string | null
          target_section_id: number | null
          teacher_id: number
          title: string
        }
        Insert: {
          created_at?: string
          id?: number
          message?: string | null
          target_section_id?: number | null
          teacher_id: number
          title: string
        }
        Update: {
          created_at?: string
          id?: number
          message?: string | null
          target_section_id?: number | null
          teacher_id?: number
          title?: string
        }
        Relationships: [
          {
            foreignKeyName: "announcements_target_section_id_fkey"
            columns: ["target_section_id"]
            isOneToOne: false
            referencedRelation: "sections"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "announcements_teacher_id_fkey"
            columns: ["teacher_id"]
            isOneToOne: false
            referencedRelation: "teachers"
            referencedColumns: ["id"]
          },
        ]
      }
      departments: {
        Row: {
          active: boolean
          code: string
          id: number
          name: string
        }
        Insert: {
          active?: boolean
          code: string
          id?: number
          name: string
        }
        Update: {
          active?: boolean
          code?: string
          id?: number
          name?: string
        }
        Relationships: []
      }
      exam_form_subjects: {
        Row: {
          form_id: number
          id: number
          subject_id: number
        }
        Insert: {
          form_id: number
          id?: number
          subject_id: number
        }
        Update: {
          form_id?: number
          id?: number
          subject_id?: number
        }
        Relationships: [
          {
            foreignKeyName: "exam_form_subjects_form_id_fkey"
            columns: ["form_id"]
            isOneToOne: false
            referencedRelation: "exam_forms"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "exam_form_subjects_subject_id_fkey"
            columns: ["subject_id"]
            isOneToOne: false
            referencedRelation: "subjects"
            referencedColumns: ["id"]
          },
        ]
      }
      exam_forms: {
        Row: {
          exam_id: number
          fee: number
          id: number
          payment_status: string
          rejection_reason: string | null
          status: string
          student_id: number
          submitted_at: string
        }
        Insert: {
          exam_id: number
          fee?: number
          id?: number
          payment_status?: string
          rejection_reason?: string | null
          status?: string
          student_id: number
          submitted_at?: string
        }
        Update: {
          exam_id?: number
          fee?: number
          id?: number
          payment_status?: string
          rejection_reason?: string | null
          status?: string
          student_id?: number
          submitted_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "exam_forms_exam_id_fkey"
            columns: ["exam_id"]
            isOneToOne: false
            referencedRelation: "exams"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "exam_forms_student_id_fkey"
            columns: ["student_id"]
            isOneToOne: false
            referencedRelation: "students"
            referencedColumns: ["id"]
          },
        ]
      }
      exams: {
        Row: {
          academic_year: string | null
          end_date: string | null
          fee: number
          form_deadline: string | null
          form_start: string | null
          id: number
          name: string
          semester_id: number | null
          start_date: string | null
          status: string
          type: string
        }
        Insert: {
          academic_year?: string | null
          end_date?: string | null
          fee?: number
          form_deadline?: string | null
          form_start?: string | null
          id?: number
          name: string
          semester_id?: number | null
          start_date?: string | null
          status?: string
          type?: string
        }
        Update: {
          academic_year?: string | null
          end_date?: string | null
          fee?: number
          form_deadline?: string | null
          form_start?: string | null
          id?: number
          name?: string
          semester_id?: number | null
          start_date?: string | null
          status?: string
          type?: string
        }
        Relationships: [
          {
            foreignKeyName: "exams_semester_id_fkey"
            columns: ["semester_id"]
            isOneToOne: false
            referencedRelation: "semesters"
            referencedColumns: ["id"]
          },
        ]
      }
      marks: {
        Row: {
          assignment: number
          attendance: number
          exam_id: number
          external: number
          grade: string | null
          grade_point: number
          id: number
          internal: number
          practical: number
          status: string
          student_id: number
          subject_id: number
          teacher_id: number | null
          total: number
          updated_at: string
        }
        Insert: {
          assignment?: number
          attendance?: number
          exam_id: number
          external?: number
          grade?: string | null
          grade_point?: number
          id?: number
          internal?: number
          practical?: number
          status?: string
          student_id: number
          subject_id: number
          teacher_id?: number | null
          total?: number
          updated_at?: string
        }
        Update: {
          assignment?: number
          attendance?: number
          exam_id?: number
          external?: number
          grade?: string | null
          grade_point?: number
          id?: number
          internal?: number
          practical?: number
          status?: string
          student_id?: number
          subject_id?: number
          teacher_id?: number | null
          total?: number
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "marks_exam_id_fkey"
            columns: ["exam_id"]
            isOneToOne: false
            referencedRelation: "exams"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "marks_student_id_fkey"
            columns: ["student_id"]
            isOneToOne: false
            referencedRelation: "students"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "marks_subject_id_fkey"
            columns: ["subject_id"]
            isOneToOne: false
            referencedRelation: "subjects"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "marks_teacher_id_fkey"
            columns: ["teacher_id"]
            isOneToOne: false
            referencedRelation: "teachers"
            referencedColumns: ["id"]
          },
        ]
      }
      notifications: {
        Row: {
          created_at: string
          id: number
          is_read: boolean
          message: string | null
          title: string
          type: string
          user_id: string
        }
        Insert: {
          created_at?: string
          id?: number
          is_read?: boolean
          message?: string | null
          title: string
          type?: string
          user_id: string
        }
        Update: {
          created_at?: string
          id?: number
          is_read?: boolean
          message?: string | null
          title?: string
          type?: string
          user_id?: string
        }
        Relationships: []
      }
      profiles: {
        Row: {
          active: boolean
          created_at: string
          email: string
          id: string
          name: string
        }
        Insert: {
          active?: boolean
          created_at?: string
          email?: string
          id: string
          name?: string
        }
        Update: {
          active?: boolean
          created_at?: string
          email?: string
          id?: string
          name?: string
        }
        Relationships: []
      }
      registration_requests: {
        Row: {
          created_at: string
          department_id: number | null
          email: string
          id: number
          name: string
          phone: string | null
          requested_role: Database["public"]["Enums"]["app_role"]
          status: string
          user_id: string
        }
        Insert: {
          created_at?: string
          department_id?: number | null
          email?: string
          id?: number
          name?: string
          phone?: string | null
          requested_role: Database["public"]["Enums"]["app_role"]
          status?: string
          user_id: string
        }
        Update: {
          created_at?: string
          department_id?: number | null
          email?: string
          id?: number
          name?: string
          phone?: string | null
          requested_role?: Database["public"]["Enums"]["app_role"]
          status?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "registration_requests_department_id_fkey"
            columns: ["department_id"]
            isOneToOne: false
            referencedRelation: "departments"
            referencedColumns: ["id"]
          },
        ]
      }
      results: {
        Row: {
          cgpa: number | null
          failed_subjects: number | null
          id: number
          passed_subjects: number | null
          published_at: string | null
          semester_id: number
          sgpa: number | null
          status: string | null
          student_id: number
          total_credits: number | null
        }
        Insert: {
          cgpa?: number | null
          failed_subjects?: number | null
          id?: number
          passed_subjects?: number | null
          published_at?: string | null
          semester_id: number
          sgpa?: number | null
          status?: string | null
          student_id: number
          total_credits?: number | null
        }
        Update: {
          cgpa?: number | null
          failed_subjects?: number | null
          id?: number
          passed_subjects?: number | null
          published_at?: string | null
          semester_id?: number
          sgpa?: number | null
          status?: string | null
          student_id?: number
          total_credits?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "results_semester_id_fkey"
            columns: ["semester_id"]
            isOneToOne: false
            referencedRelation: "semesters"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "results_student_id_fkey"
            columns: ["student_id"]
            isOneToOne: false
            referencedRelation: "students"
            referencedColumns: ["id"]
          },
        ]
      }
      sections: {
        Row: {
          id: number
          name: string
          semester_id: number | null
        }
        Insert: {
          id?: number
          name: string
          semester_id?: number | null
        }
        Update: {
          id?: number
          name?: string
          semester_id?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "sections_semester_id_fkey"
            columns: ["semester_id"]
            isOneToOne: false
            referencedRelation: "semesters"
            referencedColumns: ["id"]
          },
        ]
      }
      semesters: {
        Row: {
          academic_year: string
          active: boolean
          id: number
          name: string
          number: number
        }
        Insert: {
          academic_year: string
          active?: boolean
          id?: number
          name: string
          number: number
        }
        Update: {
          academic_year?: string
          active?: boolean
          id?: number
          name?: string
          number?: number
        }
        Relationships: []
      }
      students: {
        Row: {
          address: string | null
          department_id: number | null
          dob: string | null
          enrollment_no: string | null
          gender: string | null
          id: number
          phone: string | null
          roll_no: string | null
          section_id: number | null
          semester_id: number | null
          user_id: string
        }
        Insert: {
          address?: string | null
          department_id?: number | null
          dob?: string | null
          enrollment_no?: string | null
          gender?: string | null
          id?: number
          phone?: string | null
          roll_no?: string | null
          section_id?: number | null
          semester_id?: number | null
          user_id: string
        }
        Update: {
          address?: string | null
          department_id?: number | null
          dob?: string | null
          enrollment_no?: string | null
          gender?: string | null
          id?: number
          phone?: string | null
          roll_no?: string | null
          section_id?: number | null
          semester_id?: number | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "students_department_id_fkey"
            columns: ["department_id"]
            isOneToOne: false
            referencedRelation: "departments"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "students_section_id_fkey"
            columns: ["section_id"]
            isOneToOne: false
            referencedRelation: "sections"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "students_semester_id_fkey"
            columns: ["semester_id"]
            isOneToOne: false
            referencedRelation: "semesters"
            referencedColumns: ["id"]
          },
        ]
      }
      subjects: {
        Row: {
          code: string
          credits: number
          department_id: number | null
          id: number
          name: string
          semester_id: number | null
          type: string
        }
        Insert: {
          code: string
          credits?: number
          department_id?: number | null
          id?: number
          name: string
          semester_id?: number | null
          type?: string
        }
        Update: {
          code?: string
          credits?: number
          department_id?: number | null
          id?: number
          name?: string
          semester_id?: number | null
          type?: string
        }
        Relationships: [
          {
            foreignKeyName: "subjects_department_id_fkey"
            columns: ["department_id"]
            isOneToOne: false
            referencedRelation: "departments"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "subjects_semester_id_fkey"
            columns: ["semester_id"]
            isOneToOne: false
            referencedRelation: "semesters"
            referencedColumns: ["id"]
          },
        ]
      }
      teacher_subjects: {
        Row: {
          id: number
          section_id: number | null
          subject_id: number
          teacher_id: number
        }
        Insert: {
          id?: number
          section_id?: number | null
          subject_id: number
          teacher_id: number
        }
        Update: {
          id?: number
          section_id?: number | null
          subject_id?: number
          teacher_id?: number
        }
        Relationships: [
          {
            foreignKeyName: "teacher_subjects_section_id_fkey"
            columns: ["section_id"]
            isOneToOne: false
            referencedRelation: "sections"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "teacher_subjects_subject_id_fkey"
            columns: ["subject_id"]
            isOneToOne: false
            referencedRelation: "subjects"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "teacher_subjects_teacher_id_fkey"
            columns: ["teacher_id"]
            isOneToOne: false
            referencedRelation: "teachers"
            referencedColumns: ["id"]
          },
        ]
      }
      teachers: {
        Row: {
          department_id: number | null
          id: number
          phone: string | null
          user_id: string
        }
        Insert: {
          department_id?: number | null
          id?: number
          phone?: string | null
          user_id: string
        }
        Update: {
          department_id?: number | null
          id?: number
          phone?: string | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "teachers_department_id_fkey"
            columns: ["department_id"]
            isOneToOne: false
            referencedRelation: "departments"
            referencedColumns: ["id"]
          },
        ]
      }
      timetables: {
        Row: {
          exam_date: string | null
          exam_id: number
          exam_time: string | null
          id: number
          published: boolean
          room_no: string | null
          section_id: number | null
          subject_id: number
        }
        Insert: {
          exam_date?: string | null
          exam_id: number
          exam_time?: string | null
          id?: number
          published?: boolean
          room_no?: string | null
          section_id?: number | null
          subject_id: number
        }
        Update: {
          exam_date?: string | null
          exam_id?: number
          exam_time?: string | null
          id?: number
          published?: boolean
          room_no?: string | null
          section_id?: number | null
          subject_id?: number
        }
        Relationships: [
          {
            foreignKeyName: "timetables_exam_id_fkey"
            columns: ["exam_id"]
            isOneToOne: false
            referencedRelation: "exams"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "timetables_section_id_fkey"
            columns: ["section_id"]
            isOneToOne: false
            referencedRelation: "sections"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "timetables_subject_id_fkey"
            columns: ["subject_id"]
            isOneToOne: false
            referencedRelation: "subjects"
            referencedColumns: ["id"]
          },
        ]
      }
      user_roles: {
        Row: {
          id: string
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Insert: {
          id?: string
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Update: {
          id?: string
          role?: Database["public"]["Enums"]["app_role"]
          user_id?: string
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      has_role: {
        Args: {
          _role: Database["public"]["Enums"]["app_role"]
          _user_id: string
        }
        Returns: boolean
      }
      is_staff: { Args: never; Returns: boolean }
      my_student_id: { Args: never; Returns: number }
      my_teacher_id: { Args: never; Returns: number }
      review_registration: {
        Args: { _approve: boolean; _id: number }
        Returns: undefined
      }
      teaches: { Args: { _subject: number }; Returns: boolean }
      update_my_contact: {
        Args: { _address: string; _phone: string }
        Returns: undefined
      }
    }
    Enums: {
      app_role: "admin" | "teacher" | "student"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends (DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never) = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends (DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never) = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends (DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never) = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends (DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never) = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends (PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never) = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {
      app_role: ["admin", "teacher", "student"],
    },
  },
} as const
