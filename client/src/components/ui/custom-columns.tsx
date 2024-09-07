"use client";

import { ColumnDef } from "@tanstack/react-table";
import { MoreHorizontal, ArrowUpDown } from "lucide-react";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ColumnsData } from "../../app/inventory/types";

export default function createColumnData<T>(
  columnsData: ColumnsData[]
): ColumnDef<T>[] {
  return columnsData.map((columnData) => {
    const {
      id,
      headerName,
      headerType,
      CellType,
      enableSorting,
      enableHiding,
    } = columnData;

    return {
      accessorKey: id,
      header: ({ table, column }) => {
        if (headerType === "Checkbox") {
          return (
            <Checkbox
              checked={
                table.getIsAllPageRowsSelected() ||
                (table.getIsSomePageRowsSelected() && "indeterminate")
              }
              onCheckedChange={(value) =>
                table.toggleAllPageRowsSelected(!!value)
              }
              aria-label="Select all"
            />
          );
        } else if (headerType === "Sort") {
          return (
            <Button
              variant="ghost"
              onClick={() =>
                column.toggleSorting(column.getIsSorted() === "asc")
              }
            >
              {headerName}
              <ArrowUpDown className="ml-2 h-4 w-4" />
            </Button>
          );
        } else {
          return headerName;
        }
      },
      cell: ({ row }) => {
        if (CellType === "Selectable") {
          return (
            <Checkbox
              checked={row.getIsSelected()}
              onCheckedChange={(value) => row.toggleSelected(!!value)}
              aria-label="Select row"
            />
          );
        } else if (CellType === "Price") {
          const costPrice = parseFloat(row.getValue(id));
          const formatted = new Intl.NumberFormat("en-US", {
            style: "currency",
            currency: "USD",
          }).format(costPrice);

          return <div className="text-right font-medium">{formatted}</div>;
        } else if (CellType == "Text") {
          return <div>{row.getValue(id)}</div>;
        } else if (CellType === "Action") {
          return (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="h-8 w-8 p-0">
                  <span className="sr-only">Open menu</span>
                  <MoreHorizontal className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuLabel>Actions</DropdownMenuLabel>
                <DropdownMenuItem onClick={() => {}}>
                  Copy payment ID
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem>View customer</DropdownMenuItem>
                <DropdownMenuItem>View payment details</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          );
        }
      },
      enableSorting,
      enableHiding,
    };
  });
}
