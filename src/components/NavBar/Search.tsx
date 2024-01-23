"use client";

import { SearchIcon } from "@/Icons/SearchIcon";
import React, { Dispatch, SetStateAction } from "react";

interface ISearch {
  pathName: string;
  // router={router}
  searchQuery: string;
  setSearchQuery: Dispatch<SetStateAction<string>>;
  setPageLoader: Dispatch<SetStateAction<boolean>>;
  setShowSearchBar: Dispatch<SetStateAction<boolean>>;
}

const Search = (props: ISearch) => {
  const {
    pathName,
    searchQuery,
    setSearchQuery,
    setPageLoader,
    setShowSearchBar,
  } = props;
  return (
    <div className="hidden md:flex justify-center items-center text-center">
      <div className="bg-black-0.75 border border-[hsla(0,0%,100%,0.85)] px-4 flex items-center text-center ">
        <div className="order-2">
          <input
            name="search"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search Movies, TV and Dramas"
            className="bg-transparent text-[14px] font-medium h-[34px] px-4 py-2 placeholder:text-[14px] font-md text-white outline-none w-[210px]"
          />
        </div>
        <button onClick={() => setShowSearchBar(false)} className="px-2.5">
          <SearchIcon className="hidden sm:inline sm:w-6 sm:h-6 cursor-pointer" />
        </button>
      </div>
    </div>
  );
};

export default Search;
