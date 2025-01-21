
import React, { useEffect, useRef, useState } from "react";
import useDebounce from "../../hooks/useDebouce";
import { FaSearch } from "react-icons/fa";

interface SearchFilterProps {
    onSearch: (payload: { search: string }) => void;
    searchTitle?: string;
    value:string
}

const SearchFilter: React.FC<SearchFilterProps> = ({ onSearch, searchTitle = "Name" , value = "" }) => {
    const [searchValue, setSearchValue] = useState(value);
    const debouncedSearchValue = useDebounce(searchValue, 2000);

    const inputRef = useRef<any>()

    const handleSearch = (search: string) => {
        const payload = { search };
        onSearch(payload)
    };
    useEffect(() => {
        if (debouncedSearchValue) {
            handleSearch(debouncedSearchValue);
        }
    }, [debouncedSearchValue]);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchValue(e.target.value);
    };

    // Ensure the input is focused on mount
    useEffect(() => {
        inputRef.current?.focus();
    }, []);

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter") {
            handleSearch(searchValue); // Trigger search immediately on Enter
        }
    };
    return (
        <div className=" flex flex-row border-2 w-1/3 py-3 px-3 rounded-3xl text-primary gap-2 items-center ">
            <FaSearch/>
            <input
                type="text"
                ref={inputRef} // Use the ref correctly
                placeholder={`Search by ${searchTitle}`}
                value={searchValue}
                onChange={handleInputChange}
                onKeyDown={handleKeyDown}
                className="appearance-none border-none outline-none bg-transparent focus:ring-0"
            />
        </div>
    )
}

export default SearchFilter