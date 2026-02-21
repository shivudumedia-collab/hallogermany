"use client";

import { FormEvent, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { createClient } from "@/lib/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

function GoogleIcon() {
  return (
    <svg aria-hidden="true" className="h-4 w-4" viewBox="0 0 24 24">
      <path
        d="M22.5 12.23c0-.7-.06-1.37-.18-2.02H12v3.82h5.9a5.05 5.05 0 0 1-2.19 3.31v2.75h3.55c2.08-1.92 3.24-4.75 3.24-7.86Z"
        fill="#4285F4"
      />
      <path
        d="M12 23c2.93 0 5.38-.97 7.17-2.63l-3.55-2.75c-.98.66-2.24 1.05-3.62 1.05-2.78 0-5.13-1.88-5.97-4.4H2.36v2.83A11 11 0 0 0 12 23Z"
        fill="#34A853"
      />
      <path
        d="M6.03 14.27a6.61 6.61 0 0 1 0-4.54V6.9H2.36a11 11 0 0 0 0 9.2l3.67-2.83Z"
        fill="#FBBC05"
      />
      <path
        d="M12 5.33c1.6 0 3.03.55 4.15 1.62l3.1-3.1C17.38 2.12 14.93 1 12 1A11 11 0 0 0 2.36 6.9l3.67 2.83C6.87 7.2 9.22 5.33 12 5.33Z"
        fill="#EA4335"
      />
    </svg>
  );
}

export function SignupForm() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [googleLoading, setGoogleLoading] = useState(false);
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoading(true);

    const supabase = createClient();
    const origin = window.location.origin;

    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: { full_name: fullName },
        emailRedirectTo: `${origin}/auth/callback`
      }
    });

    setLoading(false);

    if (error) {
      toast.error(error.message);
      return;
    }

    if (!data.session) {
      toast.success("Account created. Check your email to confirm your account.");
      router.push("/login");
      return;
    }

    toast.success("Account created successfully.");
    router.push("/dashboard");
    router.refresh();
  };

  const handleGoogleSignUp = async () => {
    setGoogleLoading(true);

    const supabase = createClient();
    const callbackUrl = new URL("/auth/callback", window.location.origin);
    callbackUrl.searchParams.set("next", "/dashboard");

    const { error } = await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: callbackUrl.toString()
      }
    });

    if (error) {
      setGoogleLoading(false);
      toast.error(error.message);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <Button
        type="button"
        variant="outline"
        className="w-full gap-2"
        onClick={handleGoogleSignUp}
        disabled={loading || googleLoading}
      >
        <GoogleIcon />
        {googleLoading ? "Redirecting..." : "Continue with Google"}
      </Button>

      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <span className="w-full border-t border-black/30" />
        </div>
        <p className="relative mx-auto w-fit bg-white px-2 text-xs font-semibold uppercase tracking-[0.14em] text-black">or</p>
      </div>

      <div className="space-y-2">
        <label className="text-sm font-medium" htmlFor="fullName">
          Full name
        </label>
        <Input
          id="fullName"
          type="text"
          placeholder="Your name"
          required
          value={fullName}
          onChange={(event) => setFullName(event.target.value)}
        />
      </div>

      <div className="space-y-2">
        <label className="text-sm font-medium" htmlFor="email">
          Email
        </label>
        <Input
          id="email"
          type="email"
          placeholder="you@example.com"
          required
          value={email}
          onChange={(event) => setEmail(event.target.value)}
        />
      </div>

      <div className="space-y-2">
        <label className="text-sm font-medium" htmlFor="password">
          Password
        </label>
        <Input
          id="password"
          type="password"
          placeholder="At least 6 characters"
          required
          minLength={6}
          value={password}
          onChange={(event) => setPassword(event.target.value)}
        />
      </div>

      <Button type="submit" className="w-full" disabled={loading}>
        {loading ? "Creating account..." : "Sign up"}
      </Button>

      <p className="text-center text-sm text-black">
        Already have an account?{" "}
        <Link className="font-medium text-black" href="/login">
          Login
        </Link>
      </p>
    </form>
  );
}
