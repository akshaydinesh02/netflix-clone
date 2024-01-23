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
}

const GlobalContext = createContext<IGlobalContext | null>(
  null
) as Context<IGlobalContext>;

export const GlobalContextProvider = ({
  children,
}: {
  children: ReactNode;
}) => {
  const [loggedInProfile, setLoggedInProfile] = useState(null);
  const [profiles, setProfiles] = useState<Array<any>>([]);
  const [pageLoader, setPageLoader] = useState(true);

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
  };

  const { data: session } = useSession();

  if (session === undefined) return <LoadingSpinner />;

  return (
    <GlobalContext.Provider value={value}>{children}</GlobalContext.Provider>
  );
};

export const useGlobalContext = () => useContext(GlobalContext);

export default GlobalContextProvider;
