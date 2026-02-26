"use client";

import * as React from "react";
import { Check, ChevronsUpDown } from "lucide-react";
import { cn } from "@/lib/utils";
import {
    Button,
} from "@/components/ui/button";
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList, } from "@/components/ui/command";
import { Popover, PopoverContent, PopoverTrigger, } from "@/components/ui/popover";



type SearchableSelectProps = {
    value: string;
    setValue: (value: string) => void;
    options: { value: string; label: string }[];
}



export function SearchableSelect({ value, setValue, options }: SearchableSelectProps) {
    const [open, setOpen] = React.useState(false);

    return (
        <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild className="">
                <Button
                    variant="outline"
                    role="combobox"
                    aria-expanded={open}
                    className="w-full justify-between crm-bg-border"
                >
                    {value
                        ? options.find((option) => option.value === value)?.label
                        : "Select a option..."}
                    <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                </Button>
            </PopoverTrigger>
            <PopoverContent className="w-[var(--radix-popover-trigger-width)] p-0 max-h-[300px] bg-background" asChild>
                <Command className="" >
                    <CommandInput placeholder="Search option..."/>
                    <CommandList >
                        <CommandEmpty>No results found.</CommandEmpty>
                        <CommandGroup>
                            {options.map((option) => (
                                <CommandItem
                                    key={option.value}
                                    value={`${option.label} ${option.value}`}
                                    onSelect={() => {
                                        setValue(option.value === value ? "" : option.value);
                                        setOpen(false);
                                    }}
                                >
                                    {option.label}
                                    <Check
                                        className={cn(
                                            "ml-auto h-4 w-4",
                                            value === option.value ? "opacity-100" : "opacity-0"
                                        )}
                                    />
                                </CommandItem>
                            ))}
                        </CommandGroup>
                    </CommandList>
                </Command>
            </PopoverContent>
        </Popover>
    );
}
