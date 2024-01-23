"use client";

import CommonLayout from "@/components/common/CommonLayout";
import LoginComponent from "@/components/common/LoginComponent";
import ManageProfiles from "@/components/ManageProfiles";
import { useGlobalContext } from "@/context";
import { getServerSession } from "next-auth";
import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";

export default function Browse() {
  const { data: session } = useSession();

  const loggedInProfile = useGlobalContext().loggedInProfile;

  if (session === null) return <LoginComponent />;
  if (loggedInProfile === null) return <ManageProfiles />;
  return (
    <main className="flex min-h-screen flex-col">
      <CommonLayout />
    </main>
  );
}

// notifications,
// myList,
// trailers you have watched,
// continue watching,
// recently watched,
