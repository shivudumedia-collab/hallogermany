export type ChecklistStatus = "not_started" | "in_progress" | "completed";

export type ChecklistCategory =
  | "Pre-Application"
  | "Visa & Financial"
  | "Post-Arrival"
  | "Life in Germany";

export interface ChecklistStep {
  key: string;
  title: string;
  description: string;
  category: ChecklistCategory;
}

export interface UserChecklistItem {
  id: number;
  user_id: string;
  checklist_item_key: string;
  status: ChecklistStatus;
  notes: string | null;
  proof_url: string | null;
  created_at: string;
  updated_at: string;
}
