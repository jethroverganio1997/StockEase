import React from "react";
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

interface Props {
  products: PagedResult<Product[]>;
  loading: boolean;
  error: Error | null;
}

export default function ProductTable({
  products,
  loading,
  error,
}: Props) {
  const columns = createColumnsData<Product>(InventoryColumns);

  const { handlePageChange, handlePageRowChange } = usePagination();

  const { table } = useTableState<Product>({
    data: products.results,
    columns,
  });

  return (
    <div>
      {/* Table */}
      {loading ? (
        <TableSkeleton />
      ) : error ? (
        <AlertScreen error={error} />
      ) : (
        <DataTable table={table} columns={columns} />
      )}

      {/* Table Footer */}
      <div className="flex items-center justify-between px-2">
        <div className="flex-1 text-sm text-muted-foreground">
          {table.getFilteredSelectedRowModel().rows.length} of{" "}
          {table.getFilteredRowModel().rows.length} row(s) selected.
        </div>
        <div className="flex flex-wrap items-center justify-center space-x-6 sm:flex-nowrap lg:space-x-8">
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
