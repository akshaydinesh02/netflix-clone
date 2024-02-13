"use client";

import CommonLayout from "@/components/common/CommonLayout";
import LoginComponent from "@/components/common/LoginComponent";
import ManageProfiles from "@/components/ManageProfiles";
import { useGlobalContext } from "@/context";
import { useSession } from "next-auth/react";
import { useEffect } from "react";
import {
  getAllFavorites,
  getPopularMedia,
  getTopRatedMedia,
  getTrendingMedia,
} from "@/utils/getMediaFunctions";
import LoadingSpinner from "@/components/common/LoadingSpinner";

export default function Browse() {
  const { data: session } = useSession();

  const {
    loggedInProfile,
    mediaData,
    setMediaData,
    pageLoader,
    setPageLoader,
  } = useGlobalContext();

  useEffect(() => {
    async function getMedia() {
      const trendingTvShows = await getTrendingMedia("tv");
      const popularTvShows = await getPopularMedia("tv");
      const topRatedTvShows = await getTopRatedMedia("tv");

      const trendingMovies = await getTrendingMedia("movie");
      const popularMovies = await getPopularMedia("movie");
      const topRatedMovies = await getTopRatedMedia("movie");
      const allFavorites = await getAllFavorites(
        // @ts-ignore
        session?.user?.uid,
        loggedInProfile?._id
      );

      setMediaData([
        ...[
          {
            title: "Trending TV Shows",
            media: trendingTvShows,
          },
          {
            title: "Popular TV Shows",
            media: popularTvShows,
          },
          {
            title: "Top Rated TV Shows",
            media: topRatedTvShows,
          },
        ].map((item) => ({
          ...item,
          media: item.media.map((mediaItem: any) => ({
            ...mediaItem,
            mediaType: "tv",
            addedToFavorites: allFavorites?.length
              ? allFavorites
                  .map((fav: any) => fav.mediaID)
                  .indexOf(mediaItem.id) > -1
              : false,
          })),
        })),
        ...[
          {
            title: "Trending Movies",
            media: trendingMovies,
          },
          {
            title: "Popular Movies",
            media: popularMovies,
          },
          {
            title: "Top Rated Movies",
            media: topRatedMovies,
          },
        ].map((item) => ({
          ...item,
          media: item.media.map((mediaItem: any) => ({
            ...mediaItem,
            mediaType: "movie",
            addedToFavorites: allFavorites?.length
              ? allFavorites
                  .map((fav: any) => fav.mediaID)
                  .indexOf(mediaItem.id) > -1
              : false,
          })),
        })),
      ]);

      setPageLoader(false);
    }
    getMedia();
  }, [loggedInProfile?._id, session?.user]);

  if (session === null) return <LoginComponent />;
  if (loggedInProfile === null) return <ManageProfiles />;
  if (pageLoader) return <LoadingSpinner />;

  return (
    <main className="flex min-h-screen flex-col">
      <CommonLayout mediaData={mediaData} />
    </main>
  );
}
