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
    searchParamsReset: (state) => state = initialState,
    setSearchParams: (state, action: PayloadAction<Partial<SearchState>>) => {
      console.log("search pageIndex", action.payload.pageIndex);
    //   if (state.pageIndex !== action.payload.pageIndex) {
    //     return {
    //       ...state,
    //       pageIndex: action.payload.pageIndex ?? state.pageIndex,
    //     };
    //   } else {
    //     return { ...state, ...action.payload, pageIndex: 1 };
    //   }
      state.pageIndex = action.payload.pageIndex ?? state.pageIndex;
      state.pageSize = action.payload.pageSize ?? state.pageSize;
      state.orderBy = action.payload.orderBy ?? state.orderBy;
      state.filterBy = action.payload.filterBy ?? state.filterBy;
      state.filterName = action.payload.filterName ?? state.filterName;
      state.searchItem = action.payload.searchItem ?? state.searchItem;

      //   //check if previous state of pageIndex is different from the new state
      //   if (state.pageIndex !== action.payload.pageIndex) {
      //     state = {
      //       ...state,
      //       pageIndex: action.payload.pageIndex ?? state.pageIndex,
      //     };
      //     console.log("state", state);
      //   } else {
      //     state = { ...state, ...action.payload, pageIndex: 1 };
      //     console.log("state", state);
      //   }
    },
  },
});

export const { setSearchParams , searchParamsReset} = searchSlice.actions;
export default searchSlice.reducer;
