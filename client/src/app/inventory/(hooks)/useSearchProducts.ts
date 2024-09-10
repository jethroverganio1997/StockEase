import { setSearchParams } from "../(state)/search-slice";
import { useAppDispatch, useAppSelector } from "@/state/redux";

import qs from "query-string";

export const useSearchProducts = () => {
  const searchParams = useAppSelector((state) => ({
    searchItem: state.search.searchItem,
    pageIndex: state.search.pageIndex,
    pageSize: state.search.pageSize,
    orderBy: state.search.orderBy,
    priceFilter: state.search.priceFilter,
    stocksFilter: state.search.stocksFilter,
    categoryFilter: state.search.categoryFilter,
  }));

  const dispatch = useAppDispatch();

  const url = qs.stringifyUrl({ url: "", query: searchParams });

  const onSearch = (params: any) => {
    dispatch(setSearchParams(params));
  };

  return {
    url,
    onSearch,
  };
};
