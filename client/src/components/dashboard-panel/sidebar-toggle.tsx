'use client'

import { ChevronLeft } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

interface SidebarToggleProps {
  isOpen: boolean | undefined;
  setIsOpen?: () => void;
}

export function SidebarToggle({ isOpen, setIsOpen }: SidebarToggleProps) {
  return (
    <div className="invisible md:visible absolute top-[20px] -right-[16px] z-20">
      <Button
        onClick={() => setIsOpen?.()}
        variant="outline"
        size="icon"
      >
        <ChevronLeft
          className={cn(
            "h-6 w-6 transition-transform ease-in-out duration-700",
            isOpen === false ? "rotate-180" : "rotate-0"
          )}
        />
      </Button>
    </div>
  );
}