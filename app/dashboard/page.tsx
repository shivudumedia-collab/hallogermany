import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { DashboardClient } from "@/components/dashboard/dashboard-client";

export default async function DashboardPage() {
  const supabase = createClient();

  const {
    data: { user }
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login");
  }

  const [{ data: profile }, { data: checklistItems }] = await Promise.all([
    supabase.from("profiles").select("full_name").eq("id", user.id).single(),
    supabase
      .from("user_checklist_items")
      .select("id, user_id, checklist_item_key, status, notes, proof_url, created_at, updated_at")
      .eq("user_id", user.id)
  ]);

  const profileName = (profile as { full_name: string | null } | null)?.full_name;
  const metadataName = typeof user.user_metadata?.full_name === "string" ? user.user_metadata.full_name : "";

  return (
    <div className="page-container py-8">
      <DashboardClient userId={user.id} fullName={profileName || metadataName} initialItems={checklistItems || []} />
    </div>
  );
}
