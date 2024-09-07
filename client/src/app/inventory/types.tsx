
export type ColumnsData = {
  id: string;
  headerName: string;
  headerType: "Checkbox" | "Sort" | "Text";
  CellType: "Selectable" | "Price" | "Action" | "Text";
  enableSorting: boolean;
  enableHiding: boolean;
};

export type Product = {
  id: string;
  productName: string;
  productDesc: string;
  imageLink: string;
  unit: string;
  status: string;
  costPrice: number;
  sellingPrice: number;
  stockLevel: number;
  reorderLevel: number;
  barcode: string;
  createdAt: string;
  updatedAt: string;
  categoryName: string;
  categoryDesc: string;
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
