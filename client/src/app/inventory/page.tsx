"use client";

import React from "react";
import InventoryTable from "./inventory-table";
import SearchFilterInput from "../../components/ui/search-input";
import { useSearchProducts } from "./(hooks)/useSearchProducts";
import { useProductSearchQuery } from "./(hooks)/useProductSearchQuery";
import { AddProductDialog } from "./add-product-dialog";

export default function Inventory() {
  const { url, onSearch } = useSearchProducts();
  const { data, error, isLoading } = useProductSearchQuery(url);

  function errorTest() {
    throw new Error("Test Error");
  }

  return (
    <>
      <div className="flex items-center justify-between gap-4">
        <SearchFilterInput onSearch={onSearch} />
        <AddProductDialog />
      </div>
      <InventoryTable products={data} error={error} loading={isLoading} />
    </>
  );
}
