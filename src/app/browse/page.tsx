"use client";

import UnAuthPage from "@/components/unAuthPage";
import { signOut, useSession } from "next-auth/react";

export default function Browse() {
  const { data: session } = useSession();
  console.log("Session", session);

  if (session === null) return <UnAuthPage />;
  return (
    <div>
      <p>Browse</p>
      <button onClick={() => signOut()}>Sign Out</button>
    </div>
  );
}
