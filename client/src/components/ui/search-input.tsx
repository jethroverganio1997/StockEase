import React, { useState } from "react";
import { Input } from "./input";
import { Filter, Search, SlidersHorizontal } from "lucide-react";
import { Popover, PopoverContent, PopoverTrigger } from "./popover";
import { Button } from "./button";
import { RadioGroup, RadioGroupItem } from "./radio-group";
import { Label } from "./label";
import { Checkbox } from "./checkbox";
import { ScrollArea } from "@/components/ui/scroll-area";
import { getLowestAndHighest } from "../../lib/utils";

interface SearchFilterInputProps {
  onSearch: (value: any) => void;
}

export default function SearchFilterInput({
  onSearch,
}: SearchFilterInputProps) {
  const [searchTerm, setSearchTerm] = useState("");
  const [orderBy, setOrderBy] = useState("ProductName");
  const [category, setCategory] = useState("");
  const [priceRange, setPriceRange] = useState<string[]>([]);
  const [stocksRange, setStockRange] = useState<string[]>([]);

  var priceRangeFilter = getLowestAndHighest(priceRange);
  var stockRangeFilter = getLowestAndHighest(stocksRange);

  return (
    <div className="relative w-full max-w-xs">
      <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 transform text-gray-400" />
      <Input
        onKeyDown={(e) => e.key === "Enter" && onSearch({
          searchItem: searchTerm,
          orderBy: orderBy,
          categoryFilter: category,
          priceFilter: priceRangeFilter,
          stocksFilter: stockRangeFilter,
        })}
        placeholder="Filter product..."
        onChange={(e) => setSearchTerm(e.target.value)}
        className="pl-10 pr-10"
      />
      <Popover>
        <PopoverTrigger asChild>
          <Button
            variant="ghost"
            size="icon"
            className="absolute right-0 top-1/2 -translate-y-1/2 transform"
            aria-label="Filter options"
          >
            <SlidersHorizontal className="h-4 w-4" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-80">
          <ScrollArea className="h-96">
            <div className="grid gap-4">
              <div className="space-y-2">
                <h4 className="font-medium leading-none">Order by</h4>
                <RadioGroup value={orderBy} onValueChange={setOrderBy}>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="ProductName" id="all" />
                    <Label htmlFor="all">Product Name</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="StockLevel" id="electronics" />
                    <Label htmlFor="electronics">Stock Level</Label>
                  </div>
                </RadioGroup>
              </div>
              <div className="space-y-2">
                <h4 className="font-medium leading-none">Sort by Category</h4>
                <RadioGroup value={category} onValueChange={setCategory}>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="" id="all" />
                    <Label htmlFor="all">All</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="electronics" id="electronics" />
                    <Label htmlFor="electronics">Electronics</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="clothing" id="clothing" />
                    <Label htmlFor="clothing">Clothing</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="books" id="books" />
                    <Label htmlFor="books">Books</Label>
                  </div>
                </RadioGroup>
              </div>
              <div className="space-y-2">
                <h4 className="font-medium leading-none">
                  Filter by Selling Price
                </h4>
                <div className="flex flex-col space-y-2">
                  {["0-50", "51-100", "101-200", "200+"].map((range) => (
                    <div key={range} className="flex items-center space-x-2">
                      <Checkbox
                        id={range}
                        checked={priceRange.includes(range)}
                        onCheckedChange={(checked) => {
                          setPriceRange(
                            checked
                              ? [...priceRange, range]
                              : priceRange.filter((r) => r !== range),
                          );
                        }}
                      />
                      <Label htmlFor={range}>${range}</Label>
                    </div>
                  ))}
                </div>
              </div>
              <div className="space-y-2">
                <h4 className="font-medium leading-none">Filter by Stocks</h4>
                <div className="flex flex-col space-y-2">
                  {["0-50", "51-100", "101-500", "500+"].map((range) => (
                    <div key={range} className="flex items-center space-x-2">
                      <Checkbox
                        id={range}
                        checked={stocksRange.includes(range)}
                        onCheckedChange={(checked) => {
                          setStockRange(
                            checked
                              ? [...stocksRange, range]
                              : stocksRange.filter((r) => r !== range),
                          );
                        }}
                      />
                      <Label htmlFor={range}>{range}</Label>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </ScrollArea>
        </PopoverContent>
      </Popover>
    </div>
  );
}
