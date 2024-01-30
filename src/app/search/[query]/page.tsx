"use client";

import LoadingSpinner from "@/components/common/LoadingSpinner";
import LoginComponent from "@/components/common/LoginComponent";
import ManageProfiles from "@/components/ManageProfiles";
import { useGlobalContext } from "@/context";
import { useSession } from "next-auth/react";
import { useEffect } from "react";
import { getSearchResults } from "@/utils/getMediaFunctions";
import { useParams } from "next/navigation";
import { motion } from "framer-motion";
import NavBar from "@/components/NavBar";
import MediaItem from "@/components/common/MediaItem";

export default function Search() {
  const { data: session } = useSession();

  const {
    loggedInProfile,
    searchResults,
    setSearchResults,
    pageLoader,
    setPageLoader,
  } = useGlobalContext();
  const params = useParams();

  useEffect(() => {
    async function getResults() {
      if (params.query && typeof params.query === "string") {
        const tvShows = await getSearchResults("tv", params.query);
        const movies = await getSearchResults("movie", params.query);

        setSearchResults([
          ...tvShows
            .filter(
              (item: any) =>
                item?.backdrop_path !== null && item?.poster_path !== null
            )
            .map((item: any) => ({
              ...item,
              type: "tv",
              addedToFavourites: false,
            })),

          ...movies
            .filter(
              (item: any) =>
                item?.backdrop_path !== null && item?.poster_path !== null
            )
            .map((item: any) => ({
              ...item,
              type: "movie",
              addedToFavourites: false,
            })),
        ]);

        setPageLoader(false);
      }
    }

    getResults();
  }, []);

  if (session === null) return <LoginComponent />;
  if (loggedInProfile === null) return <ManageProfiles />;
  if (pageLoader) return <LoadingSpinner />;
  return (
    <motion.div
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
    >
      <NavBar />
      <div className="mt-[100px] space-y-0.5 md:space-y-2 px-4">
        <h2 className="cursor-pointer text-sm font-semibold text-gray-300 transition-colors duration-200 hover:text-white md:text-2xl">
          Showing Results{" "}
          {decodeURI(
            typeof params.query === "string" ? `for ${params.query}` : ""
          )}
        </h2>
        <div className="grid grid-cols-5 gap-3 items-center scrollbar-hide md:p-2">
          {searchResults.length
            ? searchResults.map((item: any) => (
                <MediaItem
                  key={item.id}
                  item={item}
                  title=""
                  searchView={true}
                />
              ))
            : null}
        </div>
      </div>
    </motion.div>
  );
}
