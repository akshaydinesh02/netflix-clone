"use client";

import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { motion } from "framer-motion";
import MuiModal from "@mui/material/Modal";
import { CloseIcon } from "@/Icons/CloseIcon";
import { PlusIcon } from "@/Icons/PlusIcon";
import { ThumbsUpIcon } from "@/Icons/ThumbsUpIcon";
import { SpeakerMute } from "@/Icons/SpeakerMute";
import { SpeakerUnmute } from "@/Icons/SpeakerUnmute";
import { useGlobalContext } from "@/context";
import {
  getMediaDetailsByID,
  getSimilarMediaDetailsByID,
} from "@/utils/getMediaFunctions";
import ReactPlayer from "react-player";
import MediaItem from "./MediaItem";
import PlayIcon from "@/Icons/PlayIcon";
import { useRouter } from "next/navigation";

interface IDetailsPopup {
  show: boolean;
  setShow: Dispatch<SetStateAction<boolean>>;
  media: {
    type: string;
    id: string;
  };
}

const DetailsPopup = (props: IDetailsPopup) => {
  const { show, setShow, media } = props;

  const {
    mediaDetails,
    setMediaDetails,
    similarMedia,
    setSimilarMedia,
    currentSelectedMediaInfo,
    setCurrentSelectedMediaInfo,
    loggedInProfile,
    setPageLoader,
  } = useGlobalContext();

  const router = useRouter();

  const [mediaKey, setMediaKey] = useState("");

  useEffect(() => {
    if (!currentSelectedMediaInfo || !loggedInProfile) return;
    async function getDetails() {
      const extractedMediaDetails = await getMediaDetailsByID(
        currentSelectedMediaInfo.type,
        parseInt(currentSelectedMediaInfo.id)
      );

      const extractedSimilarMedia = await getSimilarMediaDetailsByID(
        currentSelectedMediaInfo.type,
        parseInt(currentSelectedMediaInfo.id)
      );

      const indexOfTrailer = extractedMediaDetails?.videos?.results?.findIndex(
        (item: any) => item.type === "Trailer"
      );

      const indexOfClip = extractedSimilarMedia?.results?.findIndex(
        (item: any) => item.type === "Clip"
      );

      setMediaDetails(extractedMediaDetails);
      setMediaKey(
        indexOfTrailer !== -1
          ? extractedMediaDetails?.videos?.results[indexOfTrailer]?.key
          : indexOfClip !== -1
          ? extractedSimilarMedia?.results[indexOfClip]?.key
          : "XuDwndGaCFo"
      );

      setSimilarMedia(
        extractedSimilarMedia?.results?.map((item: any) => ({
          ...item,
          mediaType: currentSelectedMediaInfo.type === "movie" ? "movie" : "tv",
          addedToFavorites: false,
        }))
      );

      setPageLoader(false);
    }

    getDetails();
  }, [currentSelectedMediaInfo, loggedInProfile]);

  function handleClose() {
    setShow(false);
    setCurrentSelectedMediaInfo({
      type: "",
      id: "",
    });
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
      <MuiModal
        open={show}
        onClose={handleClose}
        className="fixed !top-7 left-0 right-0 z-40 w-full mx-auto max-w-5xl overflow-hidden rounded-md scrollbar-hide"
      >
        <div>
          <button
            onClick={handleClose}
            className="modalButton flex items-center justify-center absolute top-5 right-5 bg-[#181818] hover:bg-[#181818] !z-20 border-none h-9 w-9"
          >
            <CloseIcon className="h-6 w-6" />
          </button>
          <div className="relative pt-[56.25%]">
            <ReactPlayer
              url={`https://www.youtube.com/watch?v=${mediaKey}`}
              width={`100%`}
              height={`100%`}
              style={{ position: "absolute", top: "0", left: "0" }}
              playing
              controls
            />
            <div className="absolute bottom-[4.25rem] flex w-full item-center justify-between pl-[1.5rem]">
              <div>
                <button
                  onClick={() =>
                    router.push(
                      `/watch/${currentSelectedMediaInfo?.type}/${currentSelectedMediaInfo?.id}`
                    )
                  }
                  className="cursor-pointer flex items-center gap-x-2 rounded px-5 py-1.5 text-sm font-semibold transition hover:opacity-75 md:py-2.5 md:px-8 md:text-xl bg-white text-black"
                >
                  <PlayIcon className="h-4 w-4 text-black md:h-7 md:w-7 cursor-pointer" />
                  Play
                </button>
              </div>
            </div>
          </div>
          <div className="rounded-b-md bg-[#181818] p-8">
            <div className="space-x-2 pb-4 flex gap-4">
              <div className="text-green-400 font-semibold flex gap-2">
                <span>
                  {mediaDetails?.release_date
                    ? mediaDetails?.release_date.split("-")[0]
                    : "2024"}
                </span>
                <div className="inline-flex border-2 border-white/40 rounded px-2">
                  HD
                </div>
              </div>
            </div>
            <h2 className="mt-10 mb-6 cursor-pointer text-sm font-semibold text-gray-300 transition-colors duration-200 hover:text-white md:text-2xl">
              More like this...
            </h2>
            <div className="grid grid-cols-5 gap-3 items-center scrollbar-hide md:p-2">
              {similarMedia?.length
                ? similarMedia
                    .filter(
                      (mediaItem: any) =>
                        mediaItem.backdrop_path !== null &&
                        mediaItem.poster_path !== null
                    )
                    .map((mediaItem: any) => (
                      <MediaItem
                        key={mediaItem.id}
                        item={mediaItem}
                        similarMovieView={true}
                      />
                    ))
                : null}
            </div>
          </div>
        </div>
      </MuiModal>
    </motion.div>
  );
};

export default DetailsPopup;
