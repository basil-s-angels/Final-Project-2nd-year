"use client";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Search } from "lucide-react";

import { useState } from "react";
import handleSearch from "@/lib/searchInvoice";

export default function OrderSearch({ setSearchResult }: any) {
  const [selected, setSelected] = useState<string>("invoiceID");
  const [inputValue, setInputValue] = useState<string>("");

  return (
    <main className="flex flex-row">
      <Input
        type="text"
        placeholder="Search here:"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
      />
      {inputValue && (
        <Button
          variant="destructive"
          onClick={() => {
            setInputValue("");
            setSearchResult(null);
          }}
        >
          Reset
        </Button>
      )}
      <Button
        variant="outline"
        size="icon"
        onClick={async () => {
          handleSearch(selected, inputValue).then((result) => {
            console.log(result, "from backend shesh");
            setSearchResult(result);
          });
        }}
      >
        <Search className="h-4 w-8" />
      </Button>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline">Search by: {selected}</Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-56">
          <DropdownMenuLabel>Search by:</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuRadioGroup value={selected} onValueChange={setSelected}>
            <DropdownMenuRadioItem value="invoiceID">
              Invoice ID
            </DropdownMenuRadioItem>
            <DropdownMenuRadioItem value="tableNum">
              Table Number
            </DropdownMenuRadioItem>
          </DropdownMenuRadioGroup>
        </DropdownMenuContent>
      </DropdownMenu>
    </main>
  );
}
