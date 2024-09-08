// import { Button } from "@/components/ui/button"
// import {
//   Dialog,
//   DialogContent,
//   DialogDescription,
//   DialogFooter,
//   DialogHeader,
//   DialogTitle,
//   DialogTrigger,
// } from "@/components/ui/dialog"
// import { Input } from "@/components/ui/input"
// import { Label } from "@/components/ui/label"
// import { Textarea } from "@/components/ui/textarea"
// import {
//   Select,
//   SelectContent,
//   SelectItem,
//   SelectTrigger,
//   SelectValue,
// } from "@/components/ui/select"
// import { Plus, Image as ImageIcon } from "lucide-react"

// export default function AddProductDialog() {
//   return (
//     <Dialog>
//       <DialogTrigger asChild>
//         <Button>
//           <Plus className="mr-2 h-4 w-4" />
//           Add Product
//         </Button>
//       </DialogTrigger>
//       <DialogContent className="sm:max-w-[425px]">
//         <DialogHeader>
//           <DialogTitle>Add New Product</DialogTitle>
//           <DialogDescription>
//             Fill in the details of the new product. Click save when you're done.
//           </DialogDescription>
//         </DialogHeader>
//         <div className="grid gap-4 py-4">
//           <div className="grid grid-cols-4 items-center gap-4">
//             <Label htmlFor="name" className="text-right">
//               Name
//             </Label>
//             <Input id="name" placeholder="Product name" className="col-span-3" />
//           </div>
//           <div className="grid grid-cols-4 items-center gap-4">
//             <Label htmlFor="description" className="text-right">
//               Description
//             </Label>
//             <Textarea id="description" placeholder="Product description" className="col-span-3" />
//           </div>
//           <div className="grid grid-cols-4 items-center gap-4">
//             <Label htmlFor="price" className="text-right">
//               Price
//             </Label>
//             <Input id="price" placeholder="0.00" type="number" step="0.01" className="col-span-3" />
//           </div>
//           <div className="grid grid-cols-4 items-center gap-4">
//             <Label htmlFor="category" className="text-right">
//               Category
//             </Label>
//             <Select>
//               <SelectTrigger className="col-span-3">
//                 <SelectValue placeholder="Select a category" />
//               </SelectTrigger>
//               <SelectContent>
//                 <SelectItem value="electronics">Electronics</SelectItem>
//                 <SelectItem value="clothing">Clothing</SelectItem>
//                 <SelectItem value="books">Books</SelectItem>
//                 <SelectItem value="home">Home & Garden</SelectItem>
//               </SelectContent>
//             </Select>
//           </div>
//           <div className="grid grid-cols-4 items-center gap-4">
//             <Label htmlFor="stock" className="text-right">
//               Stock
//             </Label>
//             <Input id="stock" placeholder="0" type="number" className="col-span-3" />
//           </div>
//           <div className="grid grid-cols-4 items-center gap-4">
//             <Label htmlFor="image" className="text-right">
//               Image
//             </Label>
//             <div className="col-span-3">
//               <Button variant="outline" className="w-full">
//                 <ImageIcon className="mr-2 h-4 w-4" />
//                 Upload Image
//               </Button>
//             </div>
//           </div>
//         </div>
//         <DialogFooter>
//           <Button type="submit">Save Product</Button>
//         </DialogFooter>
//       </DialogContent>
//     </Dialog>
//   )
// }

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Plus, Image as ImageIcon, DollarSign, BarChart2 } from "lucide-react";
import ComboboxSearch from "./combobox-search";

export default function AddProductDialog() {
  const [step, setStep] = useState("basic");

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>
          <Plus className="mr-2 h-4 w-4" />
          Add Product
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Add New Product</DialogTitle>
          <DialogDescription>
            Fill in the product details step by step. Navigate through the tabs
            to complete all information.
          </DialogDescription>
        </DialogHeader>
        <Tabs value={step} onValueChange={setStep} className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="basic">Product Info</TabsTrigger>
            <TabsTrigger value="pricing">Pricing</TabsTrigger>
            <TabsTrigger value="inventory">Inventory</TabsTrigger>
          </TabsList>
          <TabsContent value="basic" className="space-y-4">
            <div className="space-y-4 py-4">
              <div className="space-y-2">
                <Label htmlFor="name">Product Name</Label>
                <Input id="name" placeholder="Enter product name" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  placeholder="Describe your product"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="category">Category</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="electronics">Electronics</SelectItem>
                    <SelectItem value="clothing">Clothing</SelectItem>
                    <SelectItem value="books">Books</SelectItem>
                    <SelectItem value="home">Home & Garden</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="image" className="text-right">
                  Image
                </Label>
                <div className="col-span-3">
                  <Button variant="outline" className="w-full">
                    <ImageIcon className="mr-2 h-4 w-4" />
                    Upload Image
                  </Button>
                </div>
              </div>
            </div>
          </TabsContent>
          <TabsContent value="pricing" className="space-y-4">
            <div className="space-y-4 py-4">
              <div className="space-y-2">
                <Label htmlFor="price">Price</Label>
                <div className="relative">
                  <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" />
                  <Input
                    id="price"
                    type="number"
                    step="0.01"
                    placeholder="0.00"
                    className="pl-8"
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="cost">Cost Price</Label>
                <div className="relative">
                  <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" />
                  <Input
                    id="cost"
                    type="number"
                    step="0.01"
                    placeholder="0.00"
                    className="pl-8"
                  />
                </div>
              </div>
            </div>
          </TabsContent>
          <TabsContent value="inventory" className="space-y-4">
            <div className="space-y-4 py-4">
              <div>
                <Label htmlFor="stock">Stock Quantity</Label>
                <p className="text-sm text-muted-foreground mb-2">
                  Stock quantity can be change by purchasing or selling the
                  product
                </p>
                <Input
                  disabled={true}
                  id="stock"
                  type="number"
                  placeholder="0"
                />
              </div>
              <div>
                <Label htmlFor="lowStock">Low Stock Threshold</Label>
                <p className="text-sm text-muted-foreground mb-2">
                  A minimum stock that signals when to reorder stock.
                </p>
                <Input id="lowStock" type="number" placeholder="10" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="sku">Barcode</Label>
                <Input id="sku" placeholder="Enter SKU" />
              </div>
              <div className="space-y-2">
                <Label>Status</Label>
                <ComboboxSearch/>
              </div>
            </div>
          </TabsContent>
        </Tabs>
        <DialogFooter className="flex justify-between">
          <Button
            variant="outline"
            onClick={() =>
              setStep(
                step === "basic"
                  ? "basic"
                  : step === "pricing"
                  ? "basic"
                  : "pricing"
              )
            }
          >
            {step === "basic" ? "Cancel" : "Back"}
          </Button>
          <Button
            onClick={() =>
              setStep(
                step === "basic"
                  ? "pricing"
                  : step === "pricing"
                  ? "inventory"
                  : "inventory"
              )
            }
          >
            {step === "inventory" ? "Save Product" : "Next"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
