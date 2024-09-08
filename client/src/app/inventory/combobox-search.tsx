"use client";

import * as React from "react";
import { Check, ChevronsUpDown } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

const productCategories = [
  {
    value: "electronics",
    label: "Electronics",
  },
  {
    value: "fashion",
    label: "Fashion",
  },
  {
    value: "home_appliances",
    label: "Home Appliances",
  },
  {
    value: "books",
    label: "Books",
  },
  {
    value: "toys",
    label: "Toys",
  },
  {
    value: "sports",
    label: "Sports",
  },
  {
    value: "beauty",
    label: "Beauty",
  },
  {
    value: "automotive",
    label: "Automotive",
  },
  {
    value: "groceries",
    label: "Groceries",
  },
  {
    value: "furniture",
    label: "Furniture",
  },
];

export default function ComboboxSearch() {
  const [open, setOpen] = React.useState(false);
  const [value, setValue] = React.useState("");

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-full justify-between"
        >
          {value
            ? productCategories.find(
                (productCategories) => productCategories.value === value
              )?.label
            : "Select status..."}
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[450px] p-0">
        <Command>
          <CommandInput placeholder="Select status..." />
          <CommandList>
            <CommandEmpty>No Category found.</CommandEmpty>
            <CommandGroup>
              {productCategories.map((productCategories) => (
                <CommandItem
                  key={productCategories.value}
                  value={productCategories.value}
                  onSelect={(currentValue) => {
                    setValue(currentValue === value ? "" : currentValue);
                    setOpen(false);
                  }}
                >
                  <Check
                    className={cn(
                      "mr-2 h-4 w-4",
                      value === productCategories.value
                        ? "opacity-100"
                        : "opacity-0"
                    )}
                  />
                  {productCategories.label}
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
