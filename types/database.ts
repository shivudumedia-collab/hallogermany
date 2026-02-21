import { ChecklistStatus } from "@/types/checklist";

export type Json = string | number | boolean | null | { [key: string]: Json } | Json[];

export interface Database {
  public: {
    Tables: {
      profiles: {
        Row: {
          id: string;
          full_name: string | null;
          email: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id: string;
          full_name?: string | null;
          email?: string | null;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          full_name?: string | null;
          email?: string | null;
          updated_at?: string;
        };
        Relationships: [];
      };
      user_checklist_items: {
        Row: {
          id: number;
          user_id: string;
          checklist_item_key: string;
          status: ChecklistStatus;
          notes: string | null;
          proof_url: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: number;
          user_id: string;
          checklist_item_key: string;
          status?: ChecklistStatus;
          notes?: string | null;
          proof_url?: string | null;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          status?: ChecklistStatus;
          notes?: string | null;
          proof_url?: string | null;
          updated_at?: string;
        };
        Relationships: [];
      };
    };
    Views: Record<string, never>;
    Functions: Record<string, never>;
    Enums: Record<string, never>;
    CompositeTypes: Record<string, never>;
  };
}
