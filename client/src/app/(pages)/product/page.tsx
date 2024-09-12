"use client";

import React from "react";
import ProductTable from "./product-table";
import SearchFilterInput from "../../../components/ui/search-input";
import { useSearchProducts } from "../../../features/inventory/hooks/useSearchProducts";
import { useProductSearchQuery } from "../../../features/inventory/hooks/useProductSearchQuery";
import { AddProductDialog } from "./add-product-dialog";

export default function Inventory() {
  const { url, onSearch } = useSearchProducts();
  const { data, error, isPending } = useProductSearchQuery(url);

  return (
    <>
      <div className="flex items-center justify-between gap-4">
        <SearchFilterInput onSearch={onSearch} />
        <AddProductDialog />
      </div>
      <ProductTable products={data} error={error} loading={isPending} />
    </>
  );
}
