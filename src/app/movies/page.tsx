"use client";

import LoadingSpinner from "@/components/common/LoadingSpinner";
import LoginComponent from "@/components/common/LoginComponent";
import ManageAccounts from "@/components/ManageProfiles";
import { useGlobalContext } from "@/context";
import { useSession } from "next-auth/react";

export default function Movies() {
  const { data: session } = useSession();

  const loggedInAccount = useGlobalContext().loggedInAccount;

  if (session === null) return <LoginComponent />;
  if (loggedInAccount === null) return <ManageAccounts />;
  return <div>Movies</div>;
}
