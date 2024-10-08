import { useQuery } from "@tanstack/react-query";
import { searchProducts } from "../actions/product-action";

export const useProductSearchQuery = (url: string) => {
  const initialData = {
    results: [],
    pageIndex: 1,
    pageSize: 5,
    pageCount: 1,
    totalCount: 1,
  };

  const { data, error, isPending } = useQuery({
    initialData: initialData,
    queryKey: ["inventory", url],
    queryFn: async () => {
      const result = await searchProducts(url);
      return result.data;
    },
  });

  return { data, error, isPending };
};
