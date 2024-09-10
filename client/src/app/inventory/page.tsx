"use client";

import React from "react";
import InventoryTable from "./inventory-table";
import SearchFilterInput from "../../components/ui/search-input";
import AddProductDialog from "./add-product-dialog";
import { useSearchProducts } from "./(hooks)/useSearchProducts";
import { useProductSearchQuery } from "./(hooks)/useProductSearchQuery";

export default function Inventory() {
  const { url, onSearch } = useSearchProducts();
  const { data, error, isFetching } = useProductSearchQuery(url);

  return (
    <>
      <div className="flex items-center justify-between gap-4">
        {/* TOP LEFT */}
        <SearchFilterInput onSearch={onSearch} />

        {/* TOP RIGHT */}
        <AddProductDialog />
      </div>
      <InventoryTable products={data} error={error} loading={isFetching} />
    </>
  );
}
