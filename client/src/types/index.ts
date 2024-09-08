
export type ColumnsData = {
    id: string;
    headerName: string;
    headerType: "Checkbox" | "Sort" | "Text";
    CellType: "Selectable" | "Price" | "Action" | "Text";
    enableSorting: boolean;
    enableHiding: boolean;
  };
  

  
export type PagedResult<T> = {
    results: T;
    pageIndex: number; // current page
    pageSize: number; // number of items per page
    pageCount: number; // total number of pages
    totalCount: number; // total number of items
  };
  
  export type ApiResponse<T> = {
    status: string;
    data: T;
  };
  