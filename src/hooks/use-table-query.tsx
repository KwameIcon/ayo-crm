import { useSearchParams } from "react-router-dom";

interface UseTableQueryOptions {
    searchKey?: string; // default "q"
}

export function useTableQuery({ searchKey = "q" }: UseTableQueryOptions = {}) {
    const [searchParams, setSearchParams] = useSearchParams();

    const setParam = (key: string, value?: string | null) => {
        const params = new URLSearchParams(searchParams);

        if (!value) {
            params.delete(key);
        } else {
            params.set(key, value);
        }

        setSearchParams(params);
    };

    const getParam = (key: string) => searchParams.get(key) || "";

    const clearAll = () => {
        setSearchParams({});
    };

    return {
        search: getParam(searchKey),
        setSearch: (value: string) => setParam(searchKey, value),

        getFilter: getParam,
        setFilter: setParam,

        clearAll,
    };
}