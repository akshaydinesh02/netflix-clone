"use client";

import AuthHOC from "@/components/HOC/AuthHOC";
import LoginComponent from "@/components/common/LoginComponent";
import ManageProfiles from "@/components/ManageProfiles";
import { useGlobalContext } from "@/context";
import { useSession } from "next-auth/react";
import CommonLayout from "@/components/common/CommonLayout";
import { useEffect } from "react";
import { getAllFavorites, getMediaByGenre } from "@/utils/getMediaFunctions";
import LoadingSpinner from "@/components/common/LoadingSpinner";

export default function Tv() {
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
      const actionAdventure = await getMediaByGenre("tv", 10759);
      const crime = await getMediaByGenre("tv", 80);
      const comedy = await getMediaByGenre("tv", 35);
      const family = await getMediaByGenre("tv", 10751);
      const mystery = await getMediaByGenre("tv", 9648);
      const reality = await getMediaByGenre("tv", 10764);
      const sciFiAndFantasy = await getMediaByGenre("tv", 10765);
      const war = await getMediaByGenre("tv", 10768);
      const western = await getMediaByGenre("tv", 37);
      const drama = await getMediaByGenre("tv", 18);
      const allFavorites = await getAllFavorites(
        // @ts-ignore
        session?.user?.uid,
        loggedInProfile._id
      );

      setMediaData(
        [
          {
            title: "Action & Adventure",
            media: actionAdventure,
          },
          {
            title: "Crime",
            media: crime,
          },
          {
            title: "Comedy",
            media: comedy,
          },
          {
            title: "Family",
            media: family,
          },
          {
            title: "Mystery",
            media: mystery,
          },
          {
            title: "Reality",
            media: reality,
          },
          {
            title: "Sci-Fi & Fantasy",
            media: sciFiAndFantasy,
          },
          {
            title: "War",
            media: war,
          },
          {
            title: "Western",
            media: western,
          },
          {
            title: "Drama",
            media: drama,
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
        }))
      );

      setPageLoader(false);
    }
    getMedia();
  }, [loggedInProfile, session?.user]);

  if (session === null) return <LoginComponent />;
  if (loggedInProfile === null) return <ManageProfiles />;
  if (pageLoader) return <LoadingSpinner />;
  return (
    <main className="flex min-h-screen flex-col">
      <CommonLayout mediaData={mediaData} />
    </main>
  );
}
