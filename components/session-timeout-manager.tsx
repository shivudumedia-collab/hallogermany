"use client";

import { useEffect, useMemo } from "react";
import { usePathname, useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";

const SESSION_TIMEOUT_MS = 5 * 60 * 1000;
const SESSION_START_KEY = "germanychecklist_session_start";

export function SessionTimeoutManager() {
  const router = useRouter();
  const pathname = usePathname();
  const supabase = useMemo(() => createClient(), []);

  useEffect(() => {
    let timeoutId: number | null = null;

    const clearTimer = () => {
      if (timeoutId !== null) {
        window.clearTimeout(timeoutId);
        timeoutId = null;
      }
    };

    const signOutForTimeout = async () => {
      clearTimer();
      localStorage.removeItem(SESSION_START_KEY);
      await supabase.auth.signOut();
      router.push("/login?reason=session_expired");
      router.refresh();
    };

    const scheduleTimeout = async () => {
      clearTimer();

      const {
        data: { session }
      } = await supabase.auth.getSession();

      if (!session) {
        localStorage.removeItem(SESSION_START_KEY);
        return;
      }

      const rawStart = localStorage.getItem(SESSION_START_KEY);
      const parsedStart = rawStart ? Number(rawStart) : NaN;
      const sessionStart = Number.isFinite(parsedStart) ? parsedStart : Date.now();

      if (!Number.isFinite(parsedStart)) {
        localStorage.setItem(SESSION_START_KEY, String(sessionStart));
      }

      const elapsed = Date.now() - sessionStart;
      const remaining = SESSION_TIMEOUT_MS - elapsed;

      if (remaining <= 0) {
        await signOutForTimeout();
        return;
      }

      timeoutId = window.setTimeout(() => {
        void signOutForTimeout();
      }, remaining);
    };

    void scheduleTimeout();

    const {
      data: { subscription }
    } = supabase.auth.onAuthStateChange((event, session) => {
      if (event === "SIGNED_OUT" || !session) {
        clearTimer();
        localStorage.removeItem(SESSION_START_KEY);
        return;
      }

      if (event === "SIGNED_IN") {
        localStorage.setItem(SESSION_START_KEY, String(Date.now()));
      }

      void scheduleTimeout();
    });

    return () => {
      clearTimer();
      subscription.unsubscribe();
    };
  }, [pathname, router, supabase]);

  return null;
}
