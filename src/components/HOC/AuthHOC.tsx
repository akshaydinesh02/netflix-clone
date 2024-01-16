import { useSession } from "next-auth/react";
import React, { ReactNode, useEffect, useMemo } from "react";
import LoadingSpinner from "../common/LoadingSpinner";
import LoginComponent from "../common/LoginComponent";
import { getServerSession } from "next-auth";

const AuthHOC = async ({ children }: { children: ReactNode }) => {
  const session = await getServerSession();
  // useEffect(() => {
  // }, [session]);
  console.log("current session", session);
  // const currentSession = useMemo(() => session, [session]);
  // if (!session) return <LoadingSpinner />;
  // if (session === null) return <LoginComponent />;
  // if(!session) navigate("/")

  return <>{children}</>;
};

export default AuthHOC;
