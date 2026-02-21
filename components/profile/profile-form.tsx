"use client";

import { FormEvent, useState } from "react";
import { toast } from "sonner";
import { createClient } from "@/lib/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface ProfileFormProps {
  userId: string;
  email: string;
  initialName: string;
}

export function ProfileForm({ userId, email, initialName }: ProfileFormProps) {
  const [fullName, setFullName] = useState(initialName);
  const [saving, setSaving] = useState(false);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSaving(true);

    const supabase = createClient();
    const { error } = await (supabase.from("profiles") as any).upsert(
      {
        id: userId,
        email,
        full_name: fullName
      },
      {
        onConflict: "id"
      }
    );

    setSaving(false);

    if (error) {
      toast.error(error.message);
      return;
    }

    toast.success("Profile updated");
  };

  return (
    <form className="space-y-4" onSubmit={handleSubmit}>
      <div className="space-y-2">
        <label htmlFor="fullName" className="text-sm font-medium">
          Full name
        </label>
        <Input id="fullName" value={fullName} onChange={(event) => setFullName(event.target.value)} required />
      </div>

      <div className="space-y-2">
        <label htmlFor="email" className="text-sm font-medium">
          Email
        </label>
        <Input id="email" value={email} disabled readOnly />
      </div>

      <Button type="submit" disabled={saving}>
        {saving ? "Saving..." : "Save changes"}
      </Button>
    </form>
  );
}
