"use client";

import { useMemo, useState } from "react";
import { ChecklistStep, ChecklistStatus, UserChecklistItem } from "@/types/checklist";
import { AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { StatusBadge } from "@/components/ui/badge";
import { Select } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";

interface ChecklistItemProps {
  step: ChecklistStep;
  item?: UserChecklistItem;
  loadingState: string | null;
  onStatusChange: (key: string, status: ChecklistStatus) => Promise<void>;
  onSaveNotes: (key: string, notes: string) => Promise<void>;
}

export function ChecklistItem({
  step,
  item,
  loadingState,
  onStatusChange,
  onSaveNotes
}: ChecklistItemProps) {
  const [noteDraft, setNoteDraft] = useState(item?.notes ?? "");

  const currentStatus = item?.status ?? "not_started";

  const isBusy = useMemo(() => {
    if (!loadingState) return false;
    return loadingState.startsWith(step.key);
  }, [loadingState, step.key]);

  return (
    <AccordionItem value={step.key}>
      <AccordionTrigger>
        <div className="flex w-full items-center justify-between gap-2 pr-2">
          <div className="text-left">
            <p className="font-semibold">{step.title}</p>
            <p className="text-xs text-black">{step.category}</p>
          </div>
          <StatusBadge status={currentStatus} />
        </div>
      </AccordionTrigger>
      <AccordionContent>
        <div className="space-y-4">
          <p className="text-sm text-black">{step.description}</p>

          <div className="space-y-2">
            <label className="text-xs font-semibold uppercase tracking-wide text-black">Status</label>
            <Select
              value={currentStatus}
              onChange={(event) => onStatusChange(step.key, event.target.value as ChecklistStatus)}
              disabled={isBusy}
            >
              <option value="not_started">Not started</option>
              <option value="in_progress">In progress</option>
              <option value="completed">Completed</option>
            </Select>
          </div>

          <div className="space-y-2">
            <label className="text-xs font-semibold uppercase tracking-wide text-black">Notes</label>
            <Textarea
              placeholder="Add your notes: deadlines, links, pending docs, interview reminders..."
              value={noteDraft}
              onChange={(event) => setNoteDraft(event.target.value)}
            />
            <Button type="button" size="sm" disabled={isBusy} onClick={() => onSaveNotes(step.key, noteDraft)}>
              Save notes
            </Button>
          </div>
        </div>
      </AccordionContent>
    </AccordionItem>
  );
}
