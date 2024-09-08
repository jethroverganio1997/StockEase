import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface SearchState {
  searchItem: string;
  pageIndex: number;
  pageSize: number;
  orderBy: string; // ProductName, StockLevel
  filterBy: string; // Status, Category
  filterName: string; // Active, Inactive etc.. or CategoryName
}

const initialState: SearchState = {
  searchItem: "",
  pageIndex: 1,
  pageSize: 5,
  orderBy: "ProductName",
  filterBy: "",
  filterName: "",
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
