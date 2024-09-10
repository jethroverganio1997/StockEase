import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface SearchState {
  searchItem: string;
  categoryFilter: string; // Food, Bread
  orderBy: string; // ProductName, StockLevel
  priceFilter: string; // "0-100"
  stocksFilter: string; // "0-100"
  pageIndex: number;
  pageSize: number;
}

const initialState: SearchState = {
  searchItem: "",
  pageIndex: 1,
  pageSize: 5,
  orderBy: "ProductName",
  categoryFilter: "",
  priceFilter: "",
  stocksFilter: "",
};

const searchSlice = createSlice({
  name: "search",
  initialState,
  reducers: {
    resetSearchParams: (state) => state = initialState,
    setSearchParams: (state, action: PayloadAction<Partial<SearchState>>) => {
      if (action.payload.pageIndex) {
        return {
          ...state,
          pageIndex: action.payload.pageIndex ?? state.pageIndex,
        };
      } else {
        return { ...state, ...action.payload, pageIndex: 1 };
      }
    },
  },
});

export const { setSearchParams , resetSearchParams} = searchSlice.actions;
export default searchSlice.reducer;
