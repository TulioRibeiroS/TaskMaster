export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      TaskManager: {
        Row: {
          created_at: string
          description: string | null
          id: number
          status: boolean | null
          title: string | null
        }
        Insert: {
          created_at?: string
          description?: string | null
          id?: number
          status?: boolean | null
          title?: string | null
        }
        Update: {
          created_at?: string
          description?: string | null
          id?: number
          status?: boolean | null
          title?: string | null
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}
