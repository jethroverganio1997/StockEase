import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import React from "react";

type TableRowSizeProps = {
  pageSize: number;
  handlePageRowChange: (pageSize: number) => void;
};

export default function TableRowSize({ pageSize, handlePageRowChange }: TableRowSizeProps) {
  return (
    <div className="flex min-w-52 justify-center items-center space-x-2">
      <span className="text-sm font-medium text-muted-foreground">Rows per page</span>
      <Select value={`${pageSize}`} onValueChange={(value) => handlePageRowChange(parseInt(value))}>
        <SelectTrigger className="h-10 w-[70px]">
          <SelectValue placeholder={pageSize} />
        </SelectTrigger>
        <SelectContent side="top">
          {[5, 10, 20, 30, 40].map((pageSize) => (
            <SelectItem key={pageSize} value={`${pageSize}`}>
              {pageSize}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}
