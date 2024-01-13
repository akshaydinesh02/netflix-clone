"use client";

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
  test: boolean;
  setTest: Dispatch<SetStateAction<boolean>>;
}

const GlobalContext = createContext<IGlobalContext | null>(
  null
) as Context<IGlobalContext>;

export const GlobalContextProvider = ({
  children,
}: {
  children: ReactNode;
}) => {
  const [test, setTest] = useState(false);

  const value = {
    test,
    setTest,
  };

  return (
    <GlobalContext.Provider value={value}>{children}</GlobalContext.Provider>
  );
};

export const useGlobalContext = () => useContext(GlobalContext);

export default GlobalContextProvider;
