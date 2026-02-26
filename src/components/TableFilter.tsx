import { DialogHeader } from "@/components/ui/dialog";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useTableQuery } from "@/hooks/use-table-query";
import { cn } from "@/lib/utils";
import { Filter, Search } from "lucide-react";


export interface FilterConfig {
    key: string;
    label: string;
    type: "select" | "input";
    options?: string[];
}

export interface TableHeaderConfig {
    title: string;
    resultCount: number;
    searchPlaceholder?: string;
    searchQueryKey?: string;
    filters?: FilterConfig[];
    button?: React.ReactNode;
    headerClassName?: string;
}

export default function TableFilters({ title, resultCount, searchPlaceholder = "Search...", searchQueryKey = "q", filters = [], button = null, headerClassName }: TableHeaderConfig) {
    const { search, setSearch, getFilter, setFilter } = useTableQuery({ searchKey: searchQueryKey });

    const activeFilterKey = getFilter("filterBy");
    const activeFilterValue = getFilter(activeFilterKey);

    return (
        <header className={cn("min-w-full crm-bg-border rounded-xl p-4 flex items-center justify-between gap-[45%] md:gap-0 mb-10", headerClassName)}>
            {/* LEFT SIDE */}
            <div className="">
                <h1 className="text-2xl font-semibold text-foreground whitespace-nowrap">{title}</h1>
                <p className="text-muted-foreground">
                    {resultCount} results found
                </p>
            </div>

            {/* RIGHT SIDE */}
            <div className="flex items-center gap-5 shrink-0">
                {/* GLOBAL SEARCH */}
                <div className="relative">
                    <Search
                        size={16}
                        className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground"
                    />
                    <input
                        type="text"
                        placeholder={searchPlaceholder}
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        className="w-full pl-10 pr-4 py-3 rounded-full crm-bg-border focus:border-primary-color focus:outline-none"
                    />
                    {/* Clear button */}
                    {search && (
                        <button
                            onClick={() => setSearch("")}
                            className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground"
                        >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="current"
                                color="white"
                                viewBox="0 0 24 24"
                                strokeWidth={1.5}
                                stroke="currentColor"
                                className="w-4 h-4 bg-red-500 rounded-full"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M6 18L18 6M6 6l12 12"
                                />
                            </svg>
                        </button>
                    )}
                </div>

                {/* FILTERS */}
                {filters.length > 0 && (
                    <Popover>
                        <PopoverTrigger asChild>
                            <button className="w-12 h-12 rounded-full border flex items-center justify-center hover:bg-muted transition">
                                <Filter size={16} />
                            </button>
                        </PopoverTrigger>

                        <PopoverContent align="end" className="w-80 p-4 grid gap-4">
                            <DialogHeader>
                                <h1 className="text-lg font-semibold">
                                    Filter {title}
                                </h1>
                            </DialogHeader>

                            {/* FILTER TYPE */}
                            <Select
                                value={activeFilterKey}
                                onValueChange={(value) => {
                                    setFilter("filterBy", value);
                                }}
                            >
                                <SelectTrigger>
                                    <SelectValue placeholder="Select filter type" />
                                </SelectTrigger>
                                <SelectContent>
                                    {filters.map((filter) => (
                                        <SelectItem key={filter.key} value={filter.key}>
                                            {filter.label}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>

                            {/* FILTER VALUE */}
                            {filters.map((filter) => {
                                if (filter.key !== activeFilterKey) return null;

                                if (filter.type === "select") {
                                    return (
                                        <Select
                                            key={filter.key}
                                            value={activeFilterValue}
                                            onValueChange={(value) =>
                                                setFilter(filter.key, value)
                                            }
                                        >
                                            <SelectTrigger>
                                                <SelectValue placeholder={`Select ${filter.label}`} />
                                            </SelectTrigger>
                                            <SelectContent>
                                                {filter.options?.map((option) => (
                                                    <SelectItem key={option} value={option}>
                                                        {option}
                                                    </SelectItem>
                                                ))}
                                            </SelectContent>
                                        </Select>
                                    );
                                }

                                return (
                                    <input
                                        key={filter.key}
                                        type="text"
                                        value={activeFilterValue}
                                        onChange={(e) =>
                                            setFilter(filter.key, e.target.value)
                                        }
                                        placeholder="Enter value..."
                                        className="px-4 py-3 rounded-lg bg-card border focus:outline-none"
                                    />
                                );
                            })}
                        </PopoverContent>
                    </Popover>
                )}

                {/* BUTTON */}
                <div>
                    {button}
                </div>

            </div>
        </header>
    );
}