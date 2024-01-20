"use client";

import AuthHOC from "@/components/HOC/AuthHOC";
import LoginComponent from "@/components/common/LoginComponent";
import ManageProfiles from "@/components/ManageProfiles";
import { useGlobalContext } from "@/context";
import { useSession } from "next-auth/react";

export default function Tv() {
  const { data: session } = useSession();

  const loggedInProfile = useGlobalContext().loggedInProfile;

  if (session === null) return <LoginComponent />;
  if (loggedInProfile === null) return <ManageProfiles />;
  return <div>Tv</div>;
}
