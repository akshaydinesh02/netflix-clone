"use client";

import { CheckIcon } from "@/Icons/CheckIcon";
import { ChevronDownIcon } from "@/Icons/ChevronDownIcon";
import { PlusIcon } from "@/Icons/PlusIcon";
import { motion } from "framer-motion";
import Image from "next/image";

const baseUrl = "https://image.tmdb.org/t/p/w500";

interface IMediaItem {
  item: any;
  title: string;
}

const MediaItem = (props: IMediaItem) => {
  const { item, title } = props;
  const addedToFav = false;
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
          layout="fill"
          className="rounded sm object-cover md:rounded hover:rounded-sm"
        />
        <div className="space-x-3 hidden absolute p-2 bottom-0 buttonWrapper">
          <button className="cursor-pointer border flex p-2 items-center gap-x-2 rounded-full text-sm font-semibold transition hover:opacity-90 border-white bg-black opacity-75 text-black">
            {addedToFav ? (
              <CheckIcon color="#ffffff" className="h-7 w-7" />
            ) : (
              <PlusIcon color="#ffffff" className="h-7 w-7" />
            )}
          </button>
          <button className="cursor-pointer border flex p-2 items-center gap-x-2 rounded-full text-sm font-semibold transition hover:opacity-90 border-white bg-black opacity-75">
            <ChevronDownIcon color="#ffffff" className="h-7 w-7" />
          </button>
        </div>
      </div>
    </motion.div>
  );
};

export default MediaItem;
