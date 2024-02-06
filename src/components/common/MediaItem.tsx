"use client";

import { CheckIcon } from "@/Icons/CheckIcon";
import { ChevronDownIcon } from "@/Icons/ChevronDownIcon";
import { PlusIcon } from "@/Icons/PlusIcon";
import { useGlobalContext } from "@/context";
import { motion } from "framer-motion";
import { useSession } from "next-auth/react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import mongoose from "mongoose";

const baseUrl = "https://image.tmdb.org/t/p/w500";

interface IMediaItem {
  item: any;
  title?: string;
  searchView?: boolean;
  similarMovieView?: boolean;
}

const MediaItem = (props: IMediaItem) => {
  const {
    item,
    title = "",
    searchView = false,
    similarMovieView = false,
  } = props;
  const router = useRouter();
  const { setCurrentSelectedMediaInfo, setShowDetailsPopup, loggedInProfile } =
    useGlobalContext();

  const { data: session } = useSession();

  async function handleAddToFavorites(item: any) {
    const { backdrop_path, poster_path, id, mediaType } = item;
    console.log("Item", item);

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
    console.log("Result", result);
  }

  async function handleRemoveFromFavorites(item: any) {}

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
            router.push(`/watch/${item?.mediaType || "movie"}/${item?.id}`)
          }
        />
        <div className="space-x-3 hidden absolute p-2 bottom-0 buttonWrapper">
          <button
            onClick={
              item?.addedToFavorites
                ? () => handleRemoveFromFavorites(item)
                : () => handleAddToFavorites(item)
            }
            className="cursor-pointer border flex p-2 items-center gap-x-2 rounded-full text-sm font-semibold transition hover:opacity-90 border-white bg-black opacity-75 text-black"
          >
            {item?.addedToFavourites ? (
              <CheckIcon color="#ffffff" className="h-7 w-7" />
            ) : (
              <PlusIcon color="#ffffff" className="h-7 w-7" />
            )}
          </button>
          <button
            onClick={() => {
              setCurrentSelectedMediaInfo({
                type: item?.mediaType,
                id: item?.id,
              });
              setShowDetailsPopup(true);
            }}
            className="cursor-pointer border flex p-2 items-center gap-x-2 rounded-full text-sm font-semibold transition hover:opacity-90 border-white bg-black opacity-75"
          >
            <ChevronDownIcon color="#ffffff" className="h-7 w-7" />
          </button>
          p
        </div>
      </div>
    </motion.div>
  );
};

export default MediaItem;
