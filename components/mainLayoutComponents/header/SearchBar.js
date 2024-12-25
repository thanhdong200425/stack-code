"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import SearchValueContainer from "./SearchValueContainer";
import { search } from "@/app/lib/searchAction";

export default function SearchBar({ name, placeholder, isFocused, setIsFocused }) {
    const [searchInput, setSearchInput] = useState("");
    const [data, setData] = useState({ users: [], problems: [] });
    const [isInteractingWithResults, setIsInteractingWithResults] = useState(false);
    const debounceTimeoutRef = useRef(null);

    function handleInputChange(event) {
        const inputValue = event.target.value;
        setSearchInput(inputValue);

        if (debounceTimeoutRef.current) clearTimeout(debounceTimeoutRef.current);

        debounceTimeoutRef.current = setTimeout(async () => {
            try {
                if (inputValue.trim().length > 0) {
                    const searchResult = await search(inputValue, 7);
                    setData(searchResult);
                } else {
                    setData({ users: [], problems: [] });
                }
            } catch (error) {
                console.log("Error in search function: ", error.message);
            }
        }, 300);
    }

    useEffect(() => {
        return () => {
            if (debounceTimeoutRef.current) clearTimeout(debounceTimeoutRef.current);
        };
    }, []);

    return (
        <div className="relative flex items-center p-2 border border-slate-300 hover:border-indigo-300 rounded-md w-[35rem]">
            <button>
                <Image src={"/icons/search-icon.svg"} alt={"Search icon"} width={20} height={20} />
            </button>
            <input
                type="text"
                placeholder={placeholder}
                className="w-full px-2 focus:outline-none"
                name={name}
                value={searchInput}
                onChange={handleInputChange}
                onFocus={() => setIsFocused(true)}
                onBlur={() => {
                    if (!isInteractingWithResults) setIsFocused(false);
                }}
                autoComplete="off"
            />

            {searchInput.length > 0 && isFocused && (
                <div onMouseEnter={() => setIsInteractingWithResults(true)} onMouseLeave={() => setIsInteractingWithResults(false)}>
                    <SearchValueContainer data={data} />
                </div>
            )}
        </div>
    );
}
