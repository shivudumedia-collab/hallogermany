"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { ChevronDown, LogOut, UserRound, UserRoundCog } from "lucide-react";
import { useEffect, useMemo, useRef, useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { Button } from "@/components/ui/button";
import { BrandLogo } from "@/components/brand-logo";
import { cn } from "@/lib/utils";

interface HeaderUserInfo {
  id: string;
  email: string | null;
  fullName: string | null;
}

export function SiteHeader() {
  const pathname = usePathname();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [userInfo, setUserInfo] = useState<HeaderUserInfo | null>(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const profileMenuRef = useRef<HTMLDivElement | null>(null);
  const supabase = useMemo(() => createClient(), []);

  useEffect(() => {
    const fetchUser = async () => {
      const {
        data: { user }
      } = await supabase.auth.getUser();
      if (!user) {
        setUserInfo(null);
        return;
      }
      const metadataName = typeof user.user_metadata?.full_name === "string" ? user.user_metadata.full_name : null;
      setUserInfo({
        id: user.id,
        email: user.email ?? null,
        fullName: metadataName
      });
    };

    fetchUser();

    const {
      data: { subscription }
    } = supabase.auth.onAuthStateChange((_event, session) => {
      const user = session?.user;
      if (!user) {
        setUserInfo(null);
        return;
      }
      const metadataName = typeof user.user_metadata?.full_name === "string" ? user.user_metadata.full_name : null;
      setUserInfo({
        id: user.id,
        email: user.email ?? null,
        fullName: metadataName
      });
      router.refresh();
    });

    return () => subscription.unsubscribe();
  }, [router, supabase]);

  useEffect(() => {
    if (!menuOpen) return;
    const handleOutsideClick = (event: MouseEvent) => {
      const target = event.target as Node;

      if (profileMenuRef.current && !profileMenuRef.current.contains(target)) {
        setMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", handleOutsideClick);
    return () => document.removeEventListener("mousedown", handleOutsideClick);
  }, [menuOpen]);

  useEffect(() => {
    setMenuOpen(false);
  }, [pathname]);

  const isAuthPage = pathname === "/login" || pathname === "/signup";
  const navLinkClass = (href: string) =>
    cn(
      "inline-flex items-center whitespace-nowrap rounded-full px-3 py-1.5 text-[11px] font-semibold uppercase tracking-[0.07em] transition-colors",
      pathname === href || pathname.startsWith(`${href}/`)
        ? "bg-black text-white"
        : "text-foreground hover:bg-black hover:text-white"
    );

  const handleLogout = async () => {
    setIsLoading(true);
    await supabase.auth.signOut();
    setIsLoading(false);
    setMenuOpen(false);
    router.push("/login");
    router.refresh();
  };

  return (
    <header className="sticky top-0 z-30 border-b border-black/85 bg-[linear-gradient(90deg,rgba(255,255,255,0.98),rgba(255,244,230,0.85),rgba(255,255,255,0.98))] backdrop-blur">
      <div className="mx-auto w-full max-w-[1400px] px-4 sm:px-6 lg:px-8">
        <div className="flex min-h-[4.75rem] items-center justify-between gap-3 py-1.5">
          <Link href="/" aria-label="Germany Check List home" className="flex min-w-0 items-center gap-3">
            <BrandLogo compact showTitle={false} />
            <div className="hidden min-w-0 md:block">
              <p className="truncate text-[1.7rem] font-extrabold leading-none tracking-tight text-black">Germany Check List</p>
              <p className="mt-1 truncate text-[11px] font-semibold uppercase tracking-[0.12em] text-[#dc2626]">
                India to Germany MS Roadmap
              </p>
            </div>
          </Link>

          <div className="flex items-center gap-2">
            {userInfo ? (
              <>
                <div className="relative" ref={profileMenuRef}>
                  <button
                    type="button"
                    className="inline-flex h-10 items-center gap-2 rounded-md border border-black bg-white px-3 text-sm font-medium text-foreground transition hover:bg-[#fff4e6] hover:text-[#dc2626]"
                    onClick={() => setMenuOpen((prev) => !prev)}
                    aria-expanded={menuOpen}
                    aria-haspopup="menu"
                  >
                    <UserRound className="h-4 w-4" />
                    <span className="hidden sm:inline">Profile</span>
                    <ChevronDown className={cn("h-4 w-4 transition-transform", menuOpen && "rotate-180")} />
                  </button>

                  {menuOpen ? (
                    <div
                      className="absolute right-0 mt-2 w-72 rounded-xl border border-black bg-white p-3"
                      role="menu"
                    >
                      <div className="space-y-1 border-b border-black pb-3">
                        <p className="text-xs font-semibold uppercase tracking-[0.12em] text-black">Profile Details</p>
                        {userInfo.fullName ? <p className="text-sm font-semibold text-foreground">{userInfo.fullName}</p> : null}
                        <p className="break-all text-sm text-black">{userInfo.email ?? "No email available"}</p>
                        <p className="text-xs text-black">User ID: {userInfo.id.slice(0, 8)}...</p>
                      </div>

                      <div className="space-y-2 pt-3">
                        <Link
                          href="/profile"
                          className="flex items-center gap-2 rounded-md px-2.5 py-2 text-sm font-medium text-foreground transition hover:bg-[#fff4e6] hover:text-[#dc2626]"
                        >
                          <UserRoundCog className="h-4 w-4" />
                          Profile Settings
                        </Link>
                        <button
                          type="button"
                          className="flex w-full items-center gap-2 rounded-md px-2.5 py-2 text-left text-sm font-medium text-foreground transition hover:bg-[#fff4e6] hover:text-[#dc2626]"
                          onClick={handleLogout}
                          disabled={isLoading}
                        >
                          <LogOut className="h-4 w-4" />
                          {isLoading ? "Signing out..." : "Logout"}
                        </button>
                      </div>
                    </div>
                  ) : null}
                </div>
              </>
            ) : (
              !isAuthPage && (
                <>
                  <Link href="/login">
                    <Button size="sm" variant="outline">
                      Login
                    </Button>
                  </Link>
                  <Link href="/signup">
                    <Button size="sm" variant="saffron">
                      Sign up
                    </Button>
                  </Link>
                </>
              )
            )}
          </div>
        </div>

        <nav className="hidden items-center gap-1 overflow-x-auto border-t border-black/20 py-2 md:flex [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          <Link href="/dashboard" className={navLinkClass("/dashboard")}>
            Dashboard
          </Link>
          <Link href="/guide/application" className={navLinkClass("/guide/application")}>
            Application
          </Link>
          <Link href="/guide/post-arrival" className={navLinkClass("/guide/post-arrival")}>
            Post-Arrival
          </Link>
          <Link href="/guide/life-in-germany" className={navLinkClass("/guide/life-in-germany")}>
            Life in Germany
          </Link>
          <Link href="/resources" className={navLinkClass("/resources")}>
            Resources
          </Link>
          <Link href="/learn-german?section=learn-german" className={navLinkClass("/learn-german")}>
            Learning German
          </Link>
          <Link href="/opportunity-card" className={navLinkClass("/opportunity-card")}>
            Opportunity Card
          </Link>
          <Link href="/master-programs?stream=computer-science" className={navLinkClass("/master-programs")}>
            Master Programs
          </Link>
          <Link href="/faq" className={navLinkClass("/faq")}>
            FAQ
          </Link>
        </nav>
      </div>
    </header>
  );
}
