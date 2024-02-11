"use client";

import { useGlobalContext } from "@/context";
import { getAllFavorites } from "@/utils/getMediaFunctions";
import { useSession } from "next-auth/react";
import { useEffect } from "react";
import { motion } from "framer-motion";
import NavBar from "@/components/NavBar";
import MediaItem from "@/components/common/MediaItem";
import LoadingSpinner from "@/components/common/LoadingSpinner";
import ManageProfiles from "@/components/ManageProfiles";
import LoginComponent from "@/components/common/LoginComponent";

const MyList = () => {
  const {
    favorites,
    setFavorites,
    pageLoader,
    setPageLoader,
    loggedInProfile,
  } = useGlobalContext();

  const { data: session } = useSession();

  useEffect(() => {
    async function extractFavorites() {
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
      setPageLoader(false);
    }

    extractFavorites();
  }, [session?.user, loggedInProfile]);

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
          My List
        </h2>
        <div className="grid grid-cols-5 gap-3 items-center scrollbar-hide md:p-2">
          {favorites.length
            ? favorites.map((item: any) => (
                <MediaItem key={item.id} item={item} title="" listView={true} />
              ))
            : "No Favorites Added"}
        </div>
      </div>
    </motion.div>
  );
};

export default MyList;
