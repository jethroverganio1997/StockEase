import React, { useEffect, useState } from "react";
import { ColumnsData, PagedResult, Product } from "./types";
import createColumnsData from "../../components/ui/custom-columns";
import { DataTable } from "../../components/ui/custom-data-table";
import { Input } from "../../components/ui/input";
import { Button } from "../../components/ui/button";
import { MoreHorizontal } from "lucide-react";
// import { DataTablePagination } from "../../components/ui/data-table-pagination";

import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  ColumnFiltersState,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  SortingState,
  useReactTable,
  VisibilityState,
} from "@tanstack/react-table";
import TablePagination from "./table-pagination";
import TableRowSize from "./table-row-size";
import TableColumnsVisible from "./table-columns-visible";
import { useAppDispatch, useAppSelector } from "../redux";
import qs from "query-string";
import { setSearchParams } from "./search-slice";
import { getData } from "./actions";
import { setProducts } from "./inventory-slice";

const columnsDef: ColumnsData[] = [
  {
    id: "select",
    headerName: "Select",
    headerType: "Checkbox",
    CellType: "Selectable",
    enableSorting: false,
    enableHiding: false,
  },
  {
    id: "productName",
    headerName: "Name",
    headerType: "Sort",
    CellType: "Text",
    enableSorting: true,
    enableHiding: true,
  },
  {
    id: "productDesc",
    headerName: "Description",
    headerType: "Sort",
    CellType: "Text",
    enableSorting: true,
    enableHiding: true,
  },
  {
    id: "stockLevel",
    headerName: "Stocks",
    headerType: "Sort",
    CellType: "Text",
    enableSorting: true,
    enableHiding: true,
  },
  {
    id: "costPrice",
    headerName: "Cost Price",
    headerType: "Sort",
    CellType: "Price",
    enableSorting: true,
    enableHiding: true,
  },
  {
    id: "sellingPrice",
    headerName: "Selling Price",
    headerType: "Sort",
    CellType: "Price",
    enableSorting: true,
    enableHiding: true,
  },
  {
    id: "unit",
    headerName: "Unit",
    headerType: "Sort",
    CellType: "Text",
    enableSorting: true,
    enableHiding: true,
  },
  {
    id: "categoryName",
    headerName: "Category",
    headerType: "Sort",
    CellType: "Text",
    enableSorting: true,
    enableHiding: true,
  },
  {
    id: "status",
    headerName: "Status",
    headerType: "Sort",
    CellType: "Text",
    enableSorting: true,
    enableHiding: true,
  },
  {
    id: "actions",
    headerName: "Actions",
    headerType: "Text",
    CellType: "Action",
    enableSorting: false,
    enableHiding: false,
  },
];

type InventoryTableProps = {
  products: PagedResult<Product[]>;
};

export default function InventoryTable({ products }: InventoryTableProps) {
  // const fetcher = (url: string) => getData().then((res) => res.data);
  // const { data, error, isLoading } = useSWR('/api/user/123', fetcher);
  const columns = createColumnsData<Product>(columnsDef);
  const dispatch = useAppDispatch();

  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = useState({});

  const table = useReactTable({
    data: products.results,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    onSortingChange: setSorting,
    getSortedRowModel: getSortedRowModel(),
    onColumnFiltersChange: setColumnFilters,
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
    },
  });

  const handlePageChange = (pageIndex: number) => {
    console.log("pageIndex", pageIndex);
    dispatch(setSearchParams({ pageIndex: pageIndex, pageSize: 5, searchItem: "", orderBy: "ProductName", filterBy: "", filterName: "" }));
  };

  return (
    <div>
      {/* Table Header */}
      <div className="flex items-center gap-4">
        <Input
          placeholder="Filter product..."
          value={""}
          onChange={(event) => {}}
          className="max-w-sm"
        />
        <TableColumnsVisible table={table} />
        <Button>Add Product</Button>
      </div>

      {/* Table */}
      <DataTable table={table} columns={columns} />

      {/* Table Footer */}
      <div className="flex items-center justify-between px-2">
        <div className="flex-1 text-sm text-muted-foreground">
          {table.getFilteredSelectedRowModel().rows.length} of{" "}
          {table.getFilteredRowModel().rows.length} row(s) selected.
        </div>
        <div className="flex flex-wrap sm:flex-nowrap justify-center items-center space-x-6 lg:space-x-8">
          <TableRowSize pageSize={products.pageSize} />
          <TablePagination
            pageIndex={products.pageIndex}
            pageCount={products.pageCount}
            handlePageChange={handlePageChange}
          />
        </div>
      </div>
    </div>
  );
}
