"use client";

import CommonLayout from "@/components/common/CommonLayout";
import LoadingSpinner from "@/components/common/LoadingSpinner";
import LoginComponent from "@/components/common/LoginComponent";
import ManageProfiles from "@/components/ManageProfiles";
import { useGlobalContext } from "@/context";
import { getAllFavorites, getMediaByGenre } from "@/utils/getMediaFunctions";
import { useSession } from "next-auth/react";
import { useEffect } from "react";

export default function Movies() {
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
      const action = await getMediaByGenre("movie", 28);
      const adventure = await getMediaByGenre("movie", 12);
      const crime = await getMediaByGenre("movie", 80);
      const comedy = await getMediaByGenre("movie", 35);
      const family = await getMediaByGenre("movie", 10751);
      const mystery = await getMediaByGenre("movie", 9648);
      const romance = await getMediaByGenre("movie", 10764);
      const sciFiAndFantasy = await getMediaByGenre("movie", 878);
      const war = await getMediaByGenre("movie", 10752);
      const history = await getMediaByGenre("movie", 36);
      const drama = await getMediaByGenre("movie", 18);
      const thriller = await getMediaByGenre("movie", 53);
      const horror = await getMediaByGenre("movie", 27);
      const allFavorites = await getAllFavorites(
        // @ts-ignore
        session?.user?.uid,
        loggedInProfile._id
      );

      setMediaData(
        [
          {
            title: "Action",
            media: action,
          },
          {
            title: "Adventure",
            media: adventure,
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
            title: "Romance",
            media: romance,
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
            title: "History",
            media: history,
          },
          {
            title: "Drama",
            media: drama,
          },
          {
            title: "Thriller",
            media: thriller,
          },
          {
            title: "Horror",
            media: horror,
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
        }))
      );

      setPageLoader(false);
    }
    getMedia();
  }, [loggedInProfile]);

  if (session === null) return <LoginComponent />;
  if (loggedInProfile === null) return <ManageProfiles />;
  if (pageLoader) return <LoadingSpinner />;

  return (
    <main className="flex min-h-screen flex-col">
      <CommonLayout mediaData={mediaData} />
    </main>
  );
}
