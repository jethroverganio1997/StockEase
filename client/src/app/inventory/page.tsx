"use client";

import React, { useEffect, useState } from "react";
import useSWR from "swr";
import { getData } from "./actions";
import InventoryTable from "./inventory-table";
import { useAppDispatch, useAppSelector } from "../redux";
import { searchParamsReset, setSearchParams } from "./search-slice";
import { setProducts } from "./inventory-slice";
import { PagedResult, Product } from "./types";
import qs from "query-string";
import { Button } from "../../components/ui/button";

const fetcher = (url: string) => getData().then((res) => res.data);
// const { data, error, isLoading } = useSWR('/api/user/123', fetcher);

export default function Inventory() {
  // const { data, error, isLoading } = useSWR('/api/user/123', fetcher);
  const [loading, setLoading] = useState(true);
  const [index, setIndex] = useState(1);

  const dispatch = useAppDispatch();
  // const searchParams = useAppSelector((state) => ({
  //   searchItem: state.search.searchItem,
  //   pageIndex: state.search.pageIndex,
  //   pageSize: state.search.pageSize,
  //   orderBy: state.search.orderBy,
  //   filterBy: state.search.filterBy,
  //   filterName: state.search.filterName,
  // }));

  const searchState = useAppSelector((state) => state.search);
  const searchParams = {
    searchItem: searchState.searchItem,
    pageIndex: searchState.pageIndex,
    pageSize: searchState.pageSize,
    orderBy: searchState.orderBy,
    filterBy: searchState.filterBy,
    filterName: searchState.filterName,
  };

  const inventoryState = useAppSelector((state) => state.inventory);

  const url = qs.stringifyUrl({ url: "", query: searchParams });

  // if (isLoading) return <div>Loading...</div>;
  // if (error) return <div>Error fetching data</div>;
  // return <>{data && <InventoryTable data={data} />}</>;
  const handlePageChange = (pageIndex: number) => {
    console.log("pageIndex", pageIndex);
    // dispatch(setSearchParams({ pageIndex: pageIndex }));
    dispatch(setSearchParams({ pageIndex: pageIndex}));
    setIndex(pageIndex);
  }

  useEffect(() => {
    console.log("useEffect", index);
    getData(url).then((response) => {
      dispatch(setProducts(response.data));
      setLoading(false);
    });
    // dispatch(searchParamsReset());
  }, [searchState.pageIndex, searchState.pageSize, searchState]);

  if (loading) return <div>Loading...</div>;
  return <>
    {/* {console.log("inventoryState", searchParams)} */}
    { console.log("pageRender: searchItem", searchState.searchItem) }
    { console.log("pageRender: PageIndex", searchState.pageIndex) }
    { console.log("pageRender: pageSize", searchState.pageSize)}
    { console.log("pageRender: orderBy", searchState.orderBy)}
    { console.log("pageRender: filterBy", searchState.filterBy)}
    { console.log("pageRender: filterName", searchState.filterName)}
    {/* { console.log("pageRender: pageCount", inventoryState.products.pageCount)} */}
    {/* <Button onClick={() => handlePageChange(index == 2 ? 1 : 2)}>Next</Button> */}
    <InventoryTable products={inventoryState.products} />
  </>
}


