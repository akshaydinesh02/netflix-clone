"use client";

import LoadingSpinner from "@/components/common/LoadingSpinner";
import { useSession } from "next-auth/react";

export default function Movies() {
  // const { data: session } = useSession();

  // if (session === undefined) return <LoadingSpinner />;

  // if (session === null) return <UnAuthPage />;
  return <div>Movies</div>;
}
