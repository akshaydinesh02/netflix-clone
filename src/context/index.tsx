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
} from "react";

interface IGlobalContext {
  loggedInAccount: any | null;
  setLoggedInAccount: Dispatch<SetStateAction<any | null>>;

  accounts: Array<any>;
  setAccounts: Dispatch<SetStateAction<Array<any>>>;

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
  const [loggedInAccount, setLoggedInAccount] = useState(null);
  const [accounts, setAccounts] = useState<Array<any>>([]);
  const [pageLoader, setPageLoader] = useState(true);

  const value = {
    loggedInAccount,
    setLoggedInAccount,
    accounts,
    setAccounts,
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
