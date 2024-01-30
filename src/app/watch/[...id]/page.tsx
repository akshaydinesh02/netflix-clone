"use client";

import LoadingSpinner from "@/components/common/LoadingSpinner";
import { useGlobalContext } from "@/context";
import { getMediaVideoByID } from "@/utils/getMediaFunctions";
import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import ReactPlayer from "react-player";

const Watch = () => {
  const [mediaDetails, setMediaDetails] = useState(null);
  const [mediaKey, setMediaKey] = useState(null);

  const params = useParams();

  const { pageLoader, setPageLoader } = useGlobalContext();

  useEffect(() => {
    const mediaType = params.id[0];
    const mediaID = params.id[1];

    if (!mediaID || !mediaType) {
      setMediaDetails(null);
      setMediaKey(null);
      return;
    }
    async function getMediaItemDetails() {
      const mediaItemDetails = await getMediaVideoByID(
        mediaType,
        parseInt(mediaID)
      );

      if (mediaItemDetails) {
        const indexOfTrailer = mediaItemDetails?.results?.findIndex(
          (item: any) => item.type === "Trailer"
        );

        const indexOfClip = mediaItemDetails?.results?.findIndex(
          (item: any) => item.type === "Clip"
        );

        setMediaDetails(mediaItemDetails);
        setMediaKey(
          indexOfTrailer !== -1
            ? mediaItemDetails?.results[indexOfTrailer]?.key
            : indexOfClip !== -1
            ? mediaItemDetails?.results[indexOfClip]?.key
            : "XuDwndGaCFo"
        );

        setPageLoader(false);
      }
    }
    getMediaItemDetails();
  }, [params]);

  if (pageLoader && mediaDetails === null) return <LoadingSpinner />;

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
      <ReactPlayer
        url={`https://www.youtube.com/watch?v=${mediaKey}`}
        width={`100%`}
        height={`100%`}
        style={{ position: "absolute", top: "0", left: "0" }}
        playing
        controls
      />
    </motion.div>
  );
};

export default Watch;
