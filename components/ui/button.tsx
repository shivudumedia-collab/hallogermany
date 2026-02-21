import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "relative inline-flex items-center justify-center overflow-hidden whitespace-nowrap rounded-md text-sm font-semibold transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#ff7a00] disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        default: "border border-black bg-black text-white hover:bg-[#111827]",
        saffron:
          "border border-[#ff7a00] bg-[#ff7a00] text-white shadow-[0_12px_24px_-14px_rgba(255,122,0,0.55)] hover:bg-[#dc2626]",
        outline: "border border-black bg-white text-black hover:border-[#ff7a00] hover:text-[#dc2626]",
        ghost: "text-black hover:bg-[#fff4e6] hover:text-[#dc2626]",
        destructive: "border border-black bg-black text-white hover:bg-[#111827]"
      },
      size: {
        default: "h-10 px-4 py-2",
        sm: "h-9 rounded-md px-3",
        lg: "h-11 rounded-md px-8"
      }
    },
    defaultVariants: {
      variant: "default",
      size: "default"
    }
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, ...props }, ref) => {
    return <button className={cn(buttonVariants({ variant, size, className }))} ref={ref} {...props} />;
  }
);
Button.displayName = "Button";

export { Button, buttonVariants };
