"use client";

import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command";

import { Check, ChevronsUpDown } from "lucide-react";

import { Category } from "@/sanity.types";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { cn } from "@/lib/utils";

interface CategorySelectorProps {
    categories: Category[];
}

export function CategorySelector({ categories }: CategorySelectorProps) {
    const [open, setOpen] = useState(false);
    const [selectedCategory, setSelectedCategory] = useState<string>("");
    const router = useRouter();

    return (

    <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
            <Button 
               variant="outline" 
               role="combobox"
               aria-expanded={open}
               className="w-full max-w-full relative flex justify-center sm:justify-start 
               sm:flex-none items-center space-x-2 bg-gray-50 hover:bg-gray-100
               text-gray-700 font-medium py-2 px-4 rounded border-gray-200"
            >
                {selectedCategory ? categories.find(category => category._id === selectedCategory)?.title
                 : "Filter by Category"}
                 <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 text-gray-500" />
            </Button>
        </PopoverTrigger>
        <PopoverContent className="w-full p-0">
            <Command>
                <CommandInput 
                    placeholder="Search category..." 
                    className="h-9"
                    onKeyDown={(e) => {
                        if (e.key === "Enter") {
                            const selectedCategory = categories.find ((c) =>
                                c.title
                                ?.toLowerCase()
                                .includes (e.currentTarget.value.toLowerCase())
                            );
                            if (selectedCategory?. slug?.current) {
                                setSelectedCategory(selectedCategory._id);
                                router.push(`/categories/${selectedCategory.slug.current}`);
                                setOpen (false);
                            }
                        }
                    }}
                />
                <CommandList>
                    <CommandEmpty>No category found.</CommandEmpty>
                    <CommandGroup >
                        {/* Map through the categories and create a command item for each one */}
                        {/* If the category is selected, set the selected category to the category id */}
                        {categories.map((category) => (
                            <CommandItem 
                                key={category._id} 
                                value={category.title}
                                onSelect={() => {
                                    setSelectedCategory(category._id ? "" : category._id);
                                    router.push(`/categories/${category.slug?.current}`);
                                    setOpen(false);
                                }}
                            >
                                {category.title}
                                <Check className={cn(
                                        "ml-auto h-4 w-4", 
                                        selectedCategory === category._id ? "opacity-100" : "opacity-0" 
                                    )} 
                                />
                            </CommandItem>
                        ))}
                    </CommandGroup>
                </CommandList>
            </Command>
        </PopoverContent>
    </Popover>
)}
