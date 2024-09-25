import { ColumnsData } from "../../../types";

const InventoryColumns: ColumnsData[] = [
  {
    id: "select",
    headerName: "Select",
    headerType: "Checkbox",
    CellType: "Selectable",
    enableSorting: false,
    enableHiding: false,
  },
  {
    id: "productName",
    headerName: "Name",
    headerType: "Sort",
    CellType: "Text",
    enableSorting: true,
    enableHiding: true,
  },
  {
    id: "productDesc",
    headerName: "Description",
    headerType: "Sort",
    CellType: "Text",
    enableSorting: true,
    enableHiding: true,
  },
  {
    id: "stockLevel",
    headerName: "Stocks",
    headerType: "Sort",
    CellType: "Text",
    enableSorting: true,
    enableHiding: true,
  },
  {
    id: "costPrice",
    headerName: "Cost Price",
    headerType: "Sort",
    CellType: "Price",
    enableSorting: true,
    enableHiding: true,
  },
  {
    id: "sellingPrice",
    headerName: "Selling Price",
    headerType: "Sort",
    CellType: "Price",
    enableSorting: true,
    enableHiding: true,
  },
  {
    id: "unit",
    headerName: "Unit",
    headerType: "Sort",
    CellType: "Text",
    enableSorting: true,
    enableHiding: true,
  },
  {
    id: "categoryName",
    headerName: "Category",
    headerType: "Sort",
    CellType: "Text",
    enableSorting: true,
    enableHiding: true,
  },
  {
    id: "status",
    headerName: "Status",
    headerType: "Sort",
    CellType: "Text",
    enableSorting: true,
    enableHiding: true,
  },
];

export default InventoryColumns;
