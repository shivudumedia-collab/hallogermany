import { BrandLogo } from "@/components/brand-logo";

export function SiteFooter() {
  return (
    <footer className="border-t border-black bg-white">
      <div className="page-container flex flex-col gap-3 py-6 text-sm text-black sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-3">
          <BrandLogo compact showTitle={false} />
          <p className="font-semibold tracking-[0.04em] text-black">Germany Check List © 2026</p>
        </div>
        <p className="text-black">Built for Indian students planning MS in Germany.</p>
      </div>
    </footer>
  );
}
