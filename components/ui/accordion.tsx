"use client";

import * as AccordionPrimitive from "@radix-ui/react-accordion";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

const Accordion = AccordionPrimitive.Root;

const AccordionItem = ({ className, ...props }: AccordionPrimitive.AccordionItemProps) => (
  <AccordionPrimitive.Item className={cn("rounded-lg border border-black bg-card", className)} {...props} />
);

const AccordionTrigger = ({
  className,
  children,
  ...props
}: AccordionPrimitive.AccordionTriggerProps) => (
  <AccordionPrimitive.Header>
    <AccordionPrimitive.Trigger
      className={cn(
        "flex w-full items-center justify-between px-4 py-3 text-left text-sm font-medium transition hover:bg-white",
        className
      )}
      {...props}
    >
      {children}
      <ChevronDown className="h-4 w-4 shrink-0" />
    </AccordionPrimitive.Trigger>
  </AccordionPrimitive.Header>
);

const AccordionContent = ({ className, ...props }: AccordionPrimitive.AccordionContentProps) => (
  <AccordionPrimitive.Content className={cn("border-t border-black px-4 py-4 text-sm", className)} {...props} />
);

export { Accordion, AccordionItem, AccordionTrigger, AccordionContent };
