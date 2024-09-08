import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { PagedResult } from "@/types";
import { Product } from "../(types)/product";

type Status = "loading" | "success" | "error";

interface InventoryState {
  status: Status;
  products: PagedResult<Product[]>;
}

const initialState: InventoryState = {
  status: "loading",
  products: {
    results: [],
    pageIndex: 1,
    pageSize: 5,
    pageCount: 1,
    totalCount: 1,
  },
};

const inventorySlice = createSlice({
  name: "inventory",
  initialState,
  reducers: {
    setStatus: (state, action: PayloadAction<Status>) => {
      state.status = action.payload;
    },
    setProducts: (state, action: PayloadAction<PagedResult<Product[]>>) => {
      state.products = action.payload;
    },
  },
});

export const { setProducts, setStatus } = inventorySlice.actions;
export default inventorySlice.reducer;
