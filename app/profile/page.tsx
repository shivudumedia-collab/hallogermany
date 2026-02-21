import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { Card, CardDescription, CardTitle } from "@/components/ui/card";
import { ProfileForm } from "@/components/profile/profile-form";

export default async function ProfilePage() {
  const supabase = createClient();

  const {
    data: { user }
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login");
  }

  const { data: profile } = await supabase.from("profiles").select("full_name, email").eq("id", user.id).single();
  const typedProfile = profile as { email: string | null; full_name: string | null } | null;

  return (
    <div className="page-container py-8">
      <div className="mx-auto max-w-xl">
        <Card className="space-y-4">
          <div>
            <CardTitle>Profile</CardTitle>
            <CardDescription>Update your personal details for a personalized dashboard.</CardDescription>
          </div>
          <ProfileForm userId={user.id} email={typedProfile?.email || user.email || ""} initialName={typedProfile?.full_name || ""} />
        </Card>
      </div>
    </div>
  );
}
