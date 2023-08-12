export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

export type Columns = "date" | "description" | "id" | "concluded" | "title";

export interface ColumnsInsert {
  date?: string;
  description: string | null;
  id?: number;
  concluded?: boolean | null;
  title: string | null;
}

export interface Database {
  public: {
    Tables: {
      TaskManager: {
        Row: {
          date: string;
          description: string | null;
          id: number;
          concluded: boolean | null;
          title: string | null;
        };
        Insert: {
          date?: string;
          description?: string | null;
          id?: number;
          concluded?: boolean | null;
          title?: string | null;
        };
        Update: {
          date?: string;
          description?: string | null;
          id?: number;
          concluded?: boolean | null;
          title?: string | null;
        };
        Relationships: [];
      };
    };
    Views: {
      [_ in never]: never;
    };
    Functions: {
      [_ in never]: never;
    };
    Enums: {
      [_ in never]: never;
    };
    CompositeTypes: {
      [_ in never]: never;
    };
  };
}
