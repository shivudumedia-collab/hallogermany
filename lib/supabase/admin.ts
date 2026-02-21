import "server-only";
import { createClient } from "@supabase/supabase-js";
import { Database } from "@/types/database";
import { env } from "@/lib/env";

export function createAdminClient() {
  if (!env.supabaseServiceRoleKey) {
    throw new Error("Missing SUPABASE_SERVICE_ROLE_KEY");
  }

  return createClient<Database>(env.supabaseUrl, env.supabaseServiceRoleKey, {
    auth: {
      autoRefreshToken: false,
      persistSession: false
    }
  });
}
