import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import ComboboxSearch from "../../../components/ui/combobox-search";
import { Textarea } from "../../../components/ui/textarea";
import { ScrollArea } from "../../../components/ui/scroll-area";
import { useScrollJump } from "../../../features/inventory/hooks/useScrollJump";
import { useRef, useState } from "react";
import { Product } from "../../../features/inventory/types/product";
import { Loader2, PlusIcon } from "lucide-react";
import { useAppDispatch, useAppSelector } from "../../redux";
import {
  setSelectedProduct,
  setSheetOpen,
} from "../../../features/inventory/stores/product-slice";

export function ProductSheet() {
  const scrollIds = ["Product", "Pricing", "Inventory"];
  const scrollAreaRef = useRef<HTMLDivElement>(null);
  const { positionId, setPositionId, scrollToSection } = useScrollJump(
    scrollIds,
    scrollAreaRef,
  );
  const dispatch = useAppDispatch();
  const productState = useAppSelector((state) => state);

  return (
    <Sheet
      open={productState.isSheetOpen}
      onOpenChange={(val) => dispatch(setSheetOpen(val))}
    >
      <SheetTrigger asChild>
        <Button
          onClick={() => {
            setPositionId(0);
            dispatch(setSelectedProduct(null));
          }}
        >
          <PlusIcon className="mr-2 h-4 w-4" />
          Add Product
        </Button>
      </SheetTrigger>
      <SheetContent className="flex min-w-[40%] flex-col">
        <SheetHeader>
          <SheetTitle>Add New Product</SheetTitle>
          <SheetDescription>
            Fill in the details of the new product. Click save when you're done.
          </SheetDescription>
        </SheetHeader>
        <ScrollArea ref={scrollAreaRef} className="flex-grow">
          <form className="pr-4">
            <div className="grid gap-4 py-4">
              <h3
                key={scrollIds[0]}
                id={scrollIds[0]}
                className="text-lg font-semibold"
              >
                Details
              </h3>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="name" className="text-right">
                  Name
                </Label>
                <Input
                  id="name"
                  defaultValue={productState.selectedProduct?.productName || ""}
                  className="col-span-3"
                  required
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="description" className="text-right">
                  Description
                </Label>
                <Textarea
                  id="description"
                  defaultValue={productState.selectedProduct?.productDesc || ""}
                  className="col-span-3"
                  required
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="category" className="text-right">
                  Category
                </Label>
                <ComboboxSearch
                  data={["Active", "Alcohon", "Snacks"]}
                  initialValue={
                    productState.selectedProduct?.categoryName || ""
                  }
                  label="Category"
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="warehouse" className="text-right">
                  Status
                </Label>
                <ComboboxSearch
                  data={["Active", "Alcohon", "Snacks"]}
                  initialValue={productState.selectedProduct?.status || ""}
                  label="Status"
                  className="col-span-3"
                />
              </div>
              <h3
                key={scrollIds[1]}
                id={scrollIds[1]}
                className="mt-6 text-lg font-semibold"
              >
                Pricing
              </h3>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="price" className="text-right">
                  Selling Price
                </Label>
                <Input
                  id="price"
                  type="number"
                  defaultValue={
                    productState.selectedProduct?.sellingPrice || ""
                  }
                  className="col-span-3"
                  required
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="cost" className="text-right">
                  Cost Price
                </Label>
                <Input
                  id="cost"
                  type="number"
                  defaultValue={productState.selectedProduct?.costPrice || ""}
                  className="col-span-3"
                  required
                />
              </div>

              <h3
                key={scrollIds[2]}
                id={scrollIds[2]}
                className="mt-6 text-lg font-semibold"
              >
                Inventory
              </h3>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="quantity" className="text-right">
                  Unit
                </Label>
                <ComboboxSearch
                  data={["Active", "Alcohon", "Snacks"]}
                  initialValue={productState.selectedProduct?.unit || ""}
                  label="Unit"
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="lowStock" className="text-right">
                  Low Stock Alert
                </Label>
                <Input
                  id="lowStock"
                  type="number"
                  defaultValue={
                    productState.selectedProduct?.reorderLevel || ""
                  }
                  className="col-span-3"
                  required
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="barcode" className="text-right">
                  Barcode
                </Label>
                <Input
                  id="barcode"
                  defaultValue={productState.selectedProduct?.barcode || ""}
                  className="col-span-3"
                />
              </div>
            </div>
          </form>
        </ScrollArea>
        <SheetFooter>
          {positionId === 2 ? (
            <Button type="submit" disabled={productState.isLoadingSheet}>
              {productState.isLoadingSheet ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Please wait
                </>
              ) : productState.selectedProduct ? (
                "Update Product"
              ) : (
                "Add Product"
              )}
            </Button>
          ) : (
            <Button onClick={() => scrollToSection(scrollIds[2])} type="submit">
              More
            </Button>
          )}
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}
