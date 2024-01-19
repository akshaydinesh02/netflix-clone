"use client";

import AuthHOC from "@/components/HOC/AuthHOC";
import LoginComponent from "@/components/common/LoginComponent";
import ManageAccounts from "@/components/ManageProfiles";
import { useGlobalContext } from "@/context";
import { useSession } from "next-auth/react";

export default function Tv() {
  const { data: session } = useSession();

  const loggedInAccount = useGlobalContext().loggedInAccount;

  if (session === null) return <LoginComponent />;
  if (loggedInAccount === null) return <ManageAccounts />;
  return <div>Tv</div>;
}
