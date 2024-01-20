"use client";

import LoginComponent from "@/components/common/LoginComponent";
import ManageProfiles from "@/components/ManageProfiles";
import { useGlobalContext } from "@/context";
import { getServerSession } from "next-auth";
import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";

export default function Browse() {
  const { data: session } = useSession();

  const loggedInProfile = useGlobalContext().loggedInProfile;

  if (loggedInProfile === null) return <ManageProfiles />;
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
