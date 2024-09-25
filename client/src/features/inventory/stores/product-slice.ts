import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Product } from "../types/product";
import { PagedResult } from "@/types";

interface ProductState {
  products: PagedResult<Product[]>;
  isLoading: boolean;
  error: string | null;

  selectedProduct: Product | null;
  isLoadingSheet: boolean;
  isSheetOpen: boolean;
}

const initialState: ProductState = {
  products: {
    results: [],
    pageIndex: 1,
    pageSize: 5,
    pageCount: 1,
    totalCount: 1,
  },
  selectedProduct: null,
  isLoading: false,
  error: null,
  isLoadingSheet: false,
  isSheetOpen: false,
};

const productSlice = createSlice({
  name: "global",
  initialState,
  reducers: {
    setProducts: (state, action: PayloadAction<PagedResult<Product[]>>) => {
      state.products = action.payload;
    },
    setSelectedProduct: (state, action: PayloadAction<Product | null>) => {
      state.selectedProduct = action.payload;
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
    setLoadingSheet: (state, action: PayloadAction<boolean>) => {
      state.isLoadingSheet = action.payload;
    },
    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
    },
    setSheetOpen: (state, action: PayloadAction<boolean>) => {
      state.isSheetOpen = action.payload;
    },
  },
});

export const {
  setProducts,
  setSelectedProduct,
  setLoading,
  setError,
  setLoadingSheet,
  setSheetOpen,
} = productSlice.actions;
export default productSlice.reducer;
