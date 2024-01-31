"use client";

import LoadingSpinner from "@/components/common/LoadingSpinner";
import { useSession } from "next-auth/react";
import {
  createContext,
  useState,
  Dispatch,
  SetStateAction,
  Context,
  ReactNode,
  useContext,
  useEffect,
} from "react";

interface IGlobalContext {
  loggedInProfile: any | null;
  setLoggedInProfile: Dispatch<SetStateAction<any | null>>;

  profiles: Array<any>;
  setProfiles: Dispatch<SetStateAction<Array<any>>>;

  pageLoader: boolean;
  setPageLoader: Dispatch<SetStateAction<boolean>>;

  mediaData: Array<any>;
  setMediaData: Dispatch<Array<any>>;

  searchResults: Array<any>;
  setSearchResults: Dispatch<Array<any>>;

  currentSelectedMediaInfo: {
    type: string;
    id: string;
  };

  setCurrentSelectedMediaInfo: Dispatch<
    SetStateAction<{
      type: string;
      id: string;
    }>
  >;

  showDetailsPopup: boolean;
  setShowDetailsPopup: Dispatch<SetStateAction<boolean>>;

  mediaDetails: any | null;
  setMediaDetails: Dispatch<SetStateAction<any>>;

  similarMedia: Array<any>;
  setSimilarMedia: Dispatch<SetStateAction<Array<any>>>;
}

const GlobalContext = createContext<IGlobalContext | null>(
  null
) as Context<IGlobalContext>;

export const GlobalContextProvider = ({
  children,
}: {
  children: ReactNode;
}) => {
  const [loggedInProfile, setLoggedInProfile] = useState<any>(null);
  const [profiles, setProfiles] = useState<Array<any>>([]);
  const [pageLoader, setPageLoader] = useState<boolean>(true);
  const [mediaData, setMediaData] = useState<Array<any>>([]);
  const [searchResults, setSearchResults] = useState<Array<any>>([]);
  const [currentSelectedMediaInfo, setCurrentSelectedMediaInfo] = useState<any>(
    {
      type: "",
      id: "",
    }
  );
  const [showDetailsPopup, setShowDetailsPopup] = useState<boolean>(false);
  const [mediaDetails, setMediaDetails] = useState<any | null>(null);
  const [similarMedia, setSimilarMedia] = useState<Array<any>>([]);

  useEffect(() => {
    const currentProfile = sessionStorage.getItem("currentProfile");
    if (!currentProfile) return;
    setLoggedInProfile(JSON.parse(currentProfile));
  }, []);

  const value = {
    loggedInProfile,
    setLoggedInProfile,
    profiles,
    setProfiles,
    pageLoader,
    setPageLoader,
    mediaData,
    setMediaData,
    searchResults,
    setSearchResults,
    currentSelectedMediaInfo,
    setCurrentSelectedMediaInfo,
    showDetailsPopup,
    setShowDetailsPopup,
    mediaDetails,
    setMediaDetails,
    similarMedia,
    setSimilarMedia,
  };

  const { data: session } = useSession();

  if (session === undefined) return <LoadingSpinner />;

  return (
    <GlobalContext.Provider value={value}>{children}</GlobalContext.Provider>
  );
};

export const useGlobalContext = () => useContext(GlobalContext);

export default GlobalContextProvider;
