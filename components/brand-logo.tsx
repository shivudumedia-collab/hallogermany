import Image from "next/image";
import { cn } from "@/lib/utils";

interface BrandLogoProps {
  className?: string;
  compact?: boolean;
  showTitle?: boolean;
}

export function BrandLogo({ className, compact = false, showTitle = true }: BrandLogoProps) {
  return (
    <div className={cn("inline-flex items-center gap-3", className)}>
      <Image
        src="/germany-check-list-logo.png"
        alt="Germany Check List"
        width={compact ? 52 : 70}
        height={compact ? 52 : 70}
        priority
        className={cn(
          "shrink-0 object-contain drop-shadow-[0_10px_18px_rgba(0,0,0,0.22)]",
          compact ? "h-[52px] w-[52px]" : "h-[70px] w-[70px]"
        )}
      />
      {showTitle ? (
        <span
          className={cn(
            "font-extrabold tracking-[0.03em] text-black",
            compact ? "text-base leading-none" : "text-[1.2rem] leading-none lg:text-[1.3rem]"
          )}
        >
          Germany Check List
        </span>
      ) : null}
    </div>
  );
}
