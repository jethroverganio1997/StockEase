import React, { useState } from "react";
import { Input } from "./input";
import { Search } from "lucide-react";

interface SearchInputProps {
  onSearch: (value: string) => void;
}

export default function SearchInput({ onSearch }: SearchInputProps) {
  const [value, setValue] = useState("");

  function onSearchChange(event: any) {
    setValue(event.target.value);
  }

  return (
    <div className="relative w-full max-w-sm">
      <Input
        onKeyDown={(e) => e.key === "Enter" && onSearch(value)}
        placeholder="Filter product..."
        onChange={onSearchChange}
        className="max-w-sm"
      />
      <Search
        onClick={() => onSearch(value)}
        className="absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 transform text-gray-400"
      />
    </div>
  );
}
