import { setSearchParams } from "../stores/search-slice";
import { useAppDispatch, useAppSelector } from "@/app/redux";

import qs from "query-string";
import { useEffect } from "react";
import { setError, setLoading, setProducts } from "../stores/product-slice";
import { searchProducts } from "../actions/product-action";
import { toast } from "../../../hooks/use-toast";

export const useSearchProducts = () => {
  const dispatch = useAppDispatch();

  const searchParams = useAppSelector((state) => ({
    searchItem: state.search.searchItem,
    pageIndex: state.search.pageIndex,
    pageSize: state.search.pageSize,
    orderBy: state.search.orderBy,
    priceFilter: state.search.priceFilter,
    stocksFilter: state.search.stocksFilter,
    categoryFilter: state.search.categoryFilter,
  }));

  const query = qs.stringifyUrl({ url: "", query: searchParams });

  const searchItems = async (url: string) => {
    dispatch(setLoading(true));
    dispatch(setError(null));
    try {
      const result = await searchProducts(url);
      dispatch(setProducts(result.data));
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : String(err);
      dispatch(setError(errorMessage));
      showErrorToast(errorMessage);
    } finally {
      dispatch(setLoading(false));
    }
  };

  const onSearch = (params: any) => {
    dispatch(setSearchParams(params));
  };

  useEffect(() => {
    searchItems(query);
  }, [query]);

  const showErrorToast = (message: string) => {
    toast({
      title: "Error",
      description: message,
    });
  };

  return {
    onSearch,
  };
};
