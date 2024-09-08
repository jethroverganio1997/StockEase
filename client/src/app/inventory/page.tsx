"use client";

import React, { useEffect, useState } from "react";
import { getData } from "./(data)/actions";
import InventoryTable from "./inventory-table";
import { useAppDispatch, useAppSelector } from "../../state/redux";
import { setProducts } from "./(state)/inventory-slice";
import qs from "query-string";
import TableSkeleton from "@/components/ui/table-skeleton";

export default function Inventory() {
  // const { data, error, isLoading } = useSWR('/api/user/123', fetcher);
  const [loading, setLoading] = useState(true);

  const dispatch = useAppDispatch();

  const searchParams = useAppSelector((state) => ({
    searchItem: state.search.searchItem,
    pageIndex: state.search.pageIndex,
    pageSize: state.search.pageSize,
    orderBy: state.search.orderBy,
    filterBy: state.search.filterBy,
    filterName: state.search.filterName,
  }));

  const inventoryState = useAppSelector((state) => state.inventory);

  const url = qs.stringifyUrl({ url: "", query: searchParams });

  useEffect(() => {
    getData(url).then((response) => {
      dispatch(setProducts(response.data));
      setLoading(false);
    });
    // dispatch(searchParamsReset());
  }, [url]);

  if (loading) return <TableSkeleton />
  return (
    <>
      <InventoryTable products={inventoryState.products} />
    </>
  );
}
