"use client";

import LoginComponent from "@/components/common/LoginComponent";
import ManageAccounts from "@/components/ManageProfiles";
import { useGlobalContext } from "@/context";
import { getServerSession } from "next-auth";
import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";

export default function Browse() {
  const { data: session } = useSession();

  const loggedInAccount = useGlobalContext().loggedInAccount;

  if (loggedInAccount === null) return <ManageAccounts />;
  if (session === null) return <LoginComponent />;
  return (
    <div>
      <p>Browse page</p>
    </div>
  );
}

// notifications,
// myList,
// trailers you have watched,
// continue watching,
// recently watched,
