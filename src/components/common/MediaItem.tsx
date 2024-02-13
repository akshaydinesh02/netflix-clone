"use client";

import { CheckIcon } from "@/Icons/CheckIcon";
import { ChevronDownIcon } from "@/Icons/ChevronDownIcon";
import { PlusIcon } from "@/Icons/PlusIcon";
import { useGlobalContext } from "@/context";
import { motion } from "framer-motion";
import { useSession } from "next-auth/react";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import { getAllFavorites } from "@/utils/getMediaFunctions";

const baseUrl = "https://image.tmdb.org/t/p/w500";

interface IMediaItem {
  item: any;
  title?: string;
  searchView?: boolean;
  similarMediaView?: boolean;
  listView?: boolean;
}

const MediaItem = (props: IMediaItem) => {
  const {
    item,
    title = "",
    searchView = false,
    similarMediaView = false,
    listView = false,
  } = props;
  const router = useRouter();
  const {
    setCurrentSelectedMediaInfo,
    setShowDetailsPopup,
    loggedInProfile,
    setFavorites,
    similarMedia,
    setSimilarMedia,
    searchResults,
    setSearchResults,
    mediaData,
    setMediaData,
  } = useGlobalContext();

  const { data: session } = useSession();
  const pathName = usePathname();

  async function updateFavorites() {
    const result = await getAllFavorites(
      // @ts-ignore
      session?.user?.uid,
      loggedInProfile?._id
    );

    if (result) {
      setFavorites(
        result.map((item: any) => ({
          ...item,
          addedToFavorites: true,
        }))
      );
    }
  }

  async function handleAddToFavorites(item: any) {
    const { backdrop_path, poster_path, id, mediaType } = item;

    const response = await fetch(`/api/favorites/addFavorite`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        backdrop_path,
        poster_path,
        mediaID: id,
        type: mediaType,
        // @ts-ignore
        uid: session?.user?.uid,
        profileID: loggedInProfile?._id,
      }),
    });

    const result = await response.json();

    if (result.success === true) {
      if (pathName.includes("mylist")) updateFavorites();
      if (searchView) {
        let updatedSearchResults = [...searchResults];
        const indexOfCurrentAddedMedia = updatedSearchResults.findIndex(
          (item: any) => item.id === id
        );

        updatedSearchResults[indexOfCurrentAddedMedia] = {
          ...updatedSearchResults[indexOfCurrentAddedMedia],
          addedToFavorites: true,
        };

        setSearchResults(updatedSearchResults);
      } else if (similarMediaView) {
        let updatedSimilarMedia = [...similarMedia];
        const indexOfCurrentAddedMedia = updatedSimilarMedia.findIndex(
          (item: any) => item.id === id
        );

        updatedSimilarMedia[indexOfCurrentAddedMedia] = {
          ...updatedSimilarMedia[indexOfCurrentAddedMedia],
          addedToFavorites: true,
        };

        setSimilarMedia(updatedSimilarMedia);
      } else {
        let updatedMedia = [...mediaData];

        const indexOfRowItem = updatedMedia.findIndex(
          (item: any) => item.title === title
        );

        const currentMediaArrayRow = updatedMedia[indexOfRowItem].media;

        const indexOfCurrentMovie = currentMediaArrayRow.findIndex(
          (item: any) => item.id === id
        );

        currentMediaArrayRow[indexOfCurrentMovie] = {
          ...currentMediaArrayRow[indexOfCurrentMovie],
          addedToFavorites: true,
        };

        setMediaData(updatedMedia);
      }
    }
  }

  async function handleRemoveFromFavorites(item: any) {
    const response = await fetch(
      `/api/favorites/removeFavorite?id=${item._id}`,
      {
        method: "DELETE",
      }
    );

    const result = await response.json();

    if (result.success === true) {
      updateFavorites();
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.5 }}
      whileInView={{ opacity: 1, scale: 1 }}
      transition={{
        duration: 0.8,
        delay: 0.5,
        ease: [0, 0.71, 0.2, 1.01],
      }}
    >
      <div className="relative cardWrapper h-28 min-w-[180px] cursor-pointer md:h-36 md:min-w-[260px] transform transition duration-500 hover:scale-110 hover:z-40">
        <Image
          src={`${baseUrl}/${item?.backdrop_path || item?.poster_path}`}
          alt={item?.title || title || "Media item"}
          fill
          sizes="100vw"
          className="rounded sm object-cover md:rounded hover:rounded-sm"
          onClick={() =>
            router.push(
              `/watch/${item?.mediaType || "movie"}/${
                listView ? item?.mediaID : item?.id
              }`
            )
          }
        />
        <div className="space-x-3 hidden absolute p-2 bottom-0 buttonWrapper">
          <button
            onClick={
              item?.addedToFavorites
                ? listView
                  ? () => handleRemoveFromFavorites(item)
                  : () => null
                : () => handleAddToFavorites(item)
            }
            className={`${
              item?.addedToFavorites && !listView ? "cursor-not-allow" : ""
            } cursor-pointer border flex p-2 items-center gap-x-2 rounded-full text-sm font-semibold transition hover:opacity-90 border-white bg-black opacity-75 text-black`}
          >
            {item?.addedToFavorites ? (
              <CheckIcon color="#ffffff" className="h-7 w-7" />
            ) : (
              <PlusIcon color="#ffffff" className="h-7 w-7" />
            )}
          </button>
          <button
            onClick={() => {
              setCurrentSelectedMediaInfo({
                type: item?.mediaType || item?.type || "movie",
                id: listView ? item?.mediaID : item?.id,
              });
              setShowDetailsPopup(true);
            }}
            className="cursor-pointer border flex p-2 items-center gap-x-2 rounded-full text-sm font-semibold transition hover:opacity-90 border-white bg-black opacity-75"
          >
            <ChevronDownIcon color="#ffffff" className="h-7 w-7" />
          </button>
        </div>
      </div>
    </motion.div>
  );
};

export default MediaItem;
