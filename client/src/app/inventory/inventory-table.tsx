import React, { useState } from "react";
import { PagedResult } from "@/types";
import createColumnsData from "@/components/ui/custom-columns";
import { DataTable } from "@/components/ui/custom-data-table";
import { Button } from "@/components/ui/button";
import TablePagination from "../../components/ui/table-pagination";
import TableRowSize from "../../components/ui/table-row-size";
import TableColumnsVisible from "../../components/ui/table-columns-visible";
import { useAppDispatch } from "../../state/redux";
import { setSearchParams } from "./(state)/search-slice";
import SearchInput from "../../components/ui/search-input";
import { Product } from "./(types)/product";
import InventoryColumns from "./(types)/inventory-columns";
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
import AddProductDialog from "./add-product-dialog";

interface InventoryTableProps {
  products: PagedResult<Product[]>;
}

export default function InventoryTable({ products }: InventoryTableProps) {
  const columns = createColumnsData<Product>(InventoryColumns);
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

  function handlePageChange(pageIndex: number) {
    dispatch(setSearchParams({ pageIndex: pageIndex }));
  }

  function handlePageRowChange(pageSize: number) {
    dispatch(setSearchParams({ pageSize: pageSize }));
  }

  function onSearch(value: string) {
    dispatch(setSearchParams({ searchItem: value }));
  }

  return (
    <div>
      {/* Table Header */}
      <div className="flex items-center gap-4">
        <SearchInput onSearch={onSearch} />
        <TableColumnsVisible table={table} />
        <AddProductDialog />
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
          <TableRowSize
            pageSize={products.pageSize}
            handlePageRowChange={handlePageRowChange}
          />
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
