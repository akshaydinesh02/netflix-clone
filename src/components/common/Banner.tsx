"use client";

import { InformationIcon } from "@/Icons/InformationIcon";
import PlayIcon from "@/Icons/PlayIcon";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React from "react";

const baseUrl = "https://image.tmdb.org/t/p/original";

interface IBanner {
  medias: any;
}

const Banner = (props: IBanner) => {
  const { medias } = props;
  const randomMedia = medias.length
    ? medias[Math.floor(Math.random() * medias.length)]
    : null;
  const router = useRouter();

  return (
    <div className="flex flex-col space-y-2 py-16 md:space-y-4 lg:h-[65vh] lg:justify-end lg:pb-12 lg:pl-24">
      <div className="absolute top-0 left-0 h-[95vh] w-screen -z-10">
        <Image
          src={`${baseUrl}/${
            randomMedia?.backdrop_path || randomMedia?.poster_path
          }`}
          alt="Media banner"
          fill
          sizes="100vw"
          style={{ objectFit: "cover" }}
        />
        <div className="absolute w-full h-32 bg-gradient-to-t from-gray-100 to-transparent bottom-0 z-20" />
      </div>
      <h1 className="text-2xl md: text-4xl lg:text-7xl font-bold">
        {randomMedia?.title || randomMedia?.name || randomMedia?.original_name}
      </h1>
      <p className="max-w-xs text-shadow-md text-xs md:max-w-lg md:text-lg lg:max-w-2xl line-clamp-5">
        {randomMedia?.overview}
      </p>
      <div className="flex space-x-3">
        <button
          onClick={() =>
            router.push(`/watch/${randomMedia?.mediaType}/${randomMedia?.id}`)
          }
          className="cursor-pointer flex items-center gap-x-2 rounded px-5 py-1.5 text-sm font-semibold transition hover:opacity-75 md:py-2.5 md:px-8 md:text-xl bg-white text-black"
        >
          <PlayIcon className="h-4 w-4 text-black md:h-7 md:w-7 cursor-pointer" />
          Play
        </button>
        <button className="cursor-pointer flex items-center gap-x-2 rounded px-5 py-1.5 text-sm font-semibold transition hover:opacity-75 md:py-2.5 md:px-8 md:text-xl bg-[gray]/70">
          <InformationIcon className="h-5 w-5 md:h-8 md:w-8 cursor-pointer" />
          More Info
        </button>
      </div>
    </div>
  );
};

export default Banner;
