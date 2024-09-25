"use client";

import React, { useEffect, useState } from "react";
import ProductTable from "./product-table";
import SearchFilterInput from "../../../components/ui/search-input";
import { useSearchProducts } from "../../../features/inventory/hooks/useSearchProducts";
import { useProductSearchQuery } from "../../../features/inventory/hooks/useProductSearchQuery";
import { ProductSheet } from "./product_sheet";
import { useAppSelector } from "../../redux";

export default function Inventory() {
  const { onSearch } = useSearchProducts();

  return (
    <>
      <div className="flex items-center justify-between gap-4">
        <SearchFilterInput onSearch={onSearch} />
        <ProductSheet />
      </div>

      <ProductTable />
    </>
  );
}
