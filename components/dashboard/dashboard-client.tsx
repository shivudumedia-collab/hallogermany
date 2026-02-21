"use client";

import { useMemo, useState, useEffect } from "react";
import { Download, Search } from "lucide-react";
import { toast } from "sonner";
import { checklistCategories, checklistSteps } from "@/lib/checklist-data";
import { createClient } from "@/lib/supabase/client";
import { ChecklistStatus, UserChecklistItem } from "@/types/checklist";
import { Button } from "@/components/ui/button";
import { Card, CardDescription, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Input } from "@/components/ui/input";
import { Accordion } from "@/components/ui/accordion";
import { ChecklistItem } from "@/components/dashboard/checklist-item";

interface DashboardClientProps {
  userId: string;
  fullName: string;
  initialItems: UserChecklistItem[];
}

function toItemMap(items: UserChecklistItem[]) {
  return items.reduce<Record<string, UserChecklistItem>>((acc, item) => {
    acc[item.checklist_item_key] = item;
    return acc;
  }, {});
}

export function DashboardClient({ userId, fullName, initialItems }: DashboardClientProps) {
  const supabase = useMemo(() => createClient(), []);
  const [itemsByKey, setItemsByKey] = useState<Record<string, UserChecklistItem>>(toItemMap(initialItems));
  const [search, setSearch] = useState("");
  const [loadingState, setLoadingState] = useState<string | null>(null);

  useEffect(() => {
    const channel = supabase
      .channel(`checklist-updates-${userId}`)
      .on(
        "postgres_changes",
        {
          event: "*",
          schema: "public",
          table: "user_checklist_items",
          filter: `user_id=eq.${userId}`
        },
        (payload) => {
          setItemsByKey((prev) => {
            const next = { ...prev };

            if (payload.eventType === "DELETE") {
              const oldRow = payload.old as UserChecklistItem;
              delete next[oldRow.checklist_item_key];
              return next;
            }

            const row = payload.new as UserChecklistItem;
            next[row.checklist_item_key] = row;
            return next;
          });
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [supabase, userId]);

  const filteredSteps = useMemo(() => {
    if (!search.trim()) return checklistSteps;

    const q = search.toLowerCase();
    return checklistSteps.filter(
      (step) =>
        step.title.toLowerCase().includes(q) || step.description.toLowerCase().includes(q) || step.category.toLowerCase().includes(q)
    );
  }, [search]);

  const completedCount = useMemo(() => {
    return checklistSteps.filter((step) => itemsByKey[step.key]?.status === "completed").length;
  }, [itemsByKey]);

  const inProgressCount = useMemo(() => {
    return checklistSteps.filter((step) => itemsByKey[step.key]?.status === "in_progress").length;
  }, [itemsByKey]);

  const notStartedCount = checklistSteps.length - completedCount - inProgressCount;

  const completion = Math.round((completedCount / checklistSteps.length) * 100);

  async function upsertChecklistItem(key: string, payload: Partial<UserChecklistItem>) {
    const hasStatus = Object.prototype.hasOwnProperty.call(payload, "status");
    const hasNotes = Object.prototype.hasOwnProperty.call(payload, "notes");
    const hasProof = Object.prototype.hasOwnProperty.call(payload, "proof_url");

    const { data, error } = await (supabase
      .from("user_checklist_items") as any)
      .upsert(
        {
          user_id: userId,
          checklist_item_key: key,
          status: hasStatus ? payload.status : (itemsByKey[key]?.status ?? "not_started"),
          notes: hasNotes ? payload.notes : (itemsByKey[key]?.notes ?? null),
          proof_url: hasProof ? payload.proof_url : (itemsByKey[key]?.proof_url ?? null)
        },
        {
          onConflict: "user_id,checklist_item_key"
        }
      )
      .select()
      .single();

    if (error) {
      throw error;
    }

    setItemsByKey((prev) => ({ ...prev, [key]: data as UserChecklistItem }));
  }

  const handleStatusChange = async (key: string, status: ChecklistStatus) => {
    setLoadingState(`${key}:status`);
    try {
      await upsertChecklistItem(key, { status });
      toast.success("Status updated");
    } catch (error) {
      const message = error instanceof Error ? error.message : "Could not update status";
      toast.error(message);
    } finally {
      setLoadingState(null);
    }
  };

  const handleSaveNotes = async (key: string, notes: string) => {
    setLoadingState(`${key}:notes`);
    try {
      await upsertChecklistItem(key, { notes: notes || null });
      toast.success("Notes saved");
    } catch (error) {
      const message = error instanceof Error ? error.message : "Could not save notes";
      toast.error(message);
    } finally {
      setLoadingState(null);
    }
  };

  const handleUploadProof = async (key: string, file: File) => {
    setLoadingState(`${key}:upload`);
    try {
      const extension = file.name.split(".").pop() || "pdf";
      const safeExt = extension.replace(/[^a-zA-Z0-9]/g, "").toLowerCase();
      const fileName = `${Date.now()}-${Math.random().toString(36).slice(2)}.${safeExt}`;
      const path = `${userId}/${key}/${fileName}`;

      const { error: uploadError } = await supabase.storage.from("user-documents").upload(path, file, {
        contentType: file.type || "application/octet-stream",
        upsert: false
      });

      if (uploadError) {
        throw uploadError;
      }

      await upsertChecklistItem(key, { proof_url: path });
      toast.success("Proof uploaded");
    } catch (error) {
      const message = error instanceof Error ? error.message : "Could not upload proof";
      toast.error(message);
    } finally {
      setLoadingState(null);
    }
  };

  const handleOpenProof = async (proofPath: string) => {
    const { data, error } = await supabase.storage.from("user-documents").createSignedUrl(proofPath, 60 * 10);

    if (error || !data?.signedUrl) {
      toast.error(error?.message || "Could not open file");
      return;
    }

    window.open(data.signedUrl, "_blank", "noopener,noreferrer");
  };

  const downloadChecklistSummary = () => {
    const rows = checklistSteps.map((step) => {
      const item = itemsByKey[step.key];
      return {
        title: step.title,
        category: step.category,
        status: item?.status ?? "not_started",
        notes: item?.notes ?? ""
      };
    });

    const header = "Title,Category,Status,Notes";
    const csvRows = rows.map((row) =>
      [row.title, row.category, row.status, row.notes]
        .map((cell) => `"${String(cell).replaceAll('"', '""')}"`)
        .join(",")
    );

    const blob = new Blob([[header, ...csvRows].join("\n")], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "germanychecklist.csv";
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="space-y-6">
      <Card className="space-y-5">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <CardTitle className="text-2xl">Welcome, {fullName || "Student"}</CardTitle>
            <CardDescription>Track your complete Germany MS journey with real-time progress.</CardDescription>
          </div>
          <Button variant="outline" onClick={downloadChecklistSummary} className="gap-2">
            <Download className="h-4 w-4" />
            Download Checklist (CSV)
          </Button>
        </div>

        <div className="space-y-2">
          <div className="flex items-center justify-between text-sm font-medium">
            <span>Overall completion</span>
            <span>
              {completedCount}/{checklistSteps.length} completed ({completion}%)
            </span>
          </div>
          <Progress value={completion} />
        </div>

        <div className="grid gap-3 sm:grid-cols-3">
          <Card className="p-4">
            <p className="text-xs text-black">Completed</p>
            <p className="text-xl font-bold text-black">{completedCount}</p>
          </Card>
          <Card className="p-4">
            <p className="text-xs text-black">In Progress</p>
            <p className="text-xl font-bold text-black">{inProgressCount}</p>
          </Card>
          <Card className="p-4">
            <p className="text-xs text-black">Not Started</p>
            <p className="text-xl font-bold text-foreground">{notStartedCount}</p>
          </Card>
        </div>
      </Card>

      <Card className="space-y-4">
        <div className="relative">
          <Search className="pointer-events-none absolute left-3 top-3.5 h-4 w-4 text-black" />
          <Input
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            placeholder="Search steps, categories, or keywords"
            className="pl-9"
          />
        </div>

        {checklistCategories.map((category) => {
          const categorySteps = filteredSteps.filter((step) => step.category === category);
          if (!categorySteps.length) return null;

          return (
            <div key={category} className="space-y-3">
              <h2 className="text-lg font-semibold">{category}</h2>
              <Accordion type="multiple" className="space-y-2">
                {categorySteps.map((step) => (
                  <ChecklistItem
                    key={step.key}
                    step={step}
                    item={itemsByKey[step.key]}
                    loadingState={loadingState}
                    onStatusChange={handleStatusChange}
                    onSaveNotes={handleSaveNotes}
                    onUploadProof={handleUploadProof}
                    onOpenProof={handleOpenProof}
                  />
                ))}
              </Accordion>
            </div>
          );
        })}
      </Card>
    </div>
  );
}
