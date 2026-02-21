import { cn } from "@/lib/utils";

export function Progress({ value, className }: { value: number; className?: string }) {
  const safeValue = Math.max(0, Math.min(100, value));

  return (
    <div className={cn("h-3 w-full overflow-hidden rounded-full border border-black bg-white", className)}>
      <div
        className="h-full bg-gradient-to-r from-[#ff7a00] via-[#dc2626] to-[#16a34a] transition-all duration-300"
        style={{ width: `${safeValue}%` }}
      />
    </div>
  );
}
