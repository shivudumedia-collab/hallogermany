import { ChecklistStatus } from "@/types/checklist";
import { cn } from "@/lib/utils";

const styles: Record<ChecklistStatus, string> = {
  not_started: "bg-muted text-foreground",
  in_progress: "bg-white text-black",
  completed: "bg-secondary/15 text-black"
};

const labels: Record<ChecklistStatus, string> = {
  not_started: "Not Started",
  in_progress: "In Progress",
  completed: "Completed"
};

export function StatusBadge({ status }: { status: ChecklistStatus }) {
  return <span className={cn("rounded-full px-2.5 py-1 text-xs font-semibold", styles[status])}>{labels[status]}</span>;
}
