import { setSearchParams } from "../(state)/search-slice";
import { useAppDispatch, useAppSelector } from "@/state/redux";

import qs from "query-string";

export const useSearchProducts = () => {
  const searchParams = useAppSelector((state) => ({
    searchItem: state.search.searchItem,
    pageIndex: state.search.pageIndex,
    pageSize: state.search.pageSize,
    orderBy: state.search.orderBy,
    filterBy: state.search.filterBy,
    filterName: state.search.filterName,
  }));

  const dispatch = useAppDispatch();

  const url = qs.stringifyUrl({ url: "", query: searchParams });

  const onSearch = (value: string) => {
    dispatch(setSearchParams({ searchItem: value }));
  };

  return {
    url,
    onSearch,
  };
};
