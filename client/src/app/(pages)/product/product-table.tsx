import React, { useState } from "react";
import { PagedResult } from "@/types";
import createColumnsData from "@/components/ui/custom-columns";
import { DataTable } from "@/components/ui/custom-data-table";
import TablePagination from "@/components/ui/table-pagination";
import TableRowSize from "@/components/ui/table-row-size";
import { usePagination } from "@/features/inventory/hooks/usePagination";
import { useTableState } from "@/features/inventory/hooks/useTableState";
import TableSkeleton from "@/components/ui/table-skeleton";
import AlertScreen from "@/components/ui/alert-screen";
import { Product } from "@/features/inventory/types/product";
import InventoryColumns from "@/features/inventory/types/inventory-columns";
import { AlertCircle, AlertTriangle, Loader2, Pencil } from "lucide-react";
import {
  Alert,
  AlertDescription,
  AlertTitle,
} from "../../../components/ui/alert";
import { useAppDispatch, useAppSelector } from "../../redux";
import { Button } from "../../../components/ui/button";
import { ColumnDef } from "@tanstack/react-table";
import {
  setSelectedProduct,
  setSheetOpen,
} from "../../../features/inventory/stores/product-slice";

export default function ProductTable() {
  const dispatch = useAppDispatch();
  const productState = useAppSelector((state) => state.product);

  const columns = createColumnsData<Product>(InventoryColumns);
  const columnsWithAction: ColumnDef<Product>[] = [
    ...columns,
    {
      accessorKey: "actions",
      header: "Actions",
      cell: (info) => (
        <div className="flex space-x-2">
          <Button
            variant="outline"
            size="sm"
            onClick={(e) => {
              e.stopPropagation();
              handleEdit(info.row.original);
            }}
          >
            <Pencil className="h-4 w-4" />
          </Button>
        </div>
      ),
    },
  ];

  const handleEdit = (item: Product) => {
    dispatch(setSelectedProduct(item));
    dispatch(setSheetOpen(true));
  };

  const { table } = useTableState<Product>({
    data: productState.products.results,
    columns: columnsWithAction,
  });

  const { handlePageChange, handlePageRowChange } = usePagination();

  return (
    <div>
      {/* error */}
      {productState.error && (
        <Alert variant="default" className="my-4">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Error</AlertTitle>
          <AlertDescription>
            Your session has expired. Please log in again.
          </AlertDescription>
        </Alert>
      )}

      {/* loading */}
      {productState.isLoading ? (
        <div className="flex h-32 items-center justify-center">
          <Loader2 className="h-8 w-8 animate-spin" />
        </div>
      ) : (
        <DataTable
          table={table}
          columns={columns}
          // onRowClick={(row) => handleEdit(row)}
        />
      )}

      {/* Table Footer */}
      <div className="flex items-center justify-between px-2">
        <div className="flex-1 text-sm text-muted-foreground">
          {table.getFilteredSelectedRowModel().rows.length} of{" "}
          {table.getFilteredRowModel().rows.length} row(s) selected.
        </div>
        <div className="flex flex-wrap items-center justify-center space-x-6 sm:flex-nowrap lg:space-x-8">
          <TableRowSize
            pageSize={productState.products.pageSize}
            handlePageRowChange={handlePageRowChange}
          />
          <TablePagination
            pageIndex={productState.products.pageIndex}
            pageCount={productState.products.pageCount}
            handlePageChange={handlePageChange}
          />
        </div>
      </div>
    </div>
  );
}
