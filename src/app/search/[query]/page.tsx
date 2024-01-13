"use client";

import LoadingSpinner from "@/components/common/LoadingSpinner";
import UnAuthPage from "@/components/unAuthPage";
import { useSession } from "next-auth/react";

export default function Search() {
  // const { data: session } = useSession();

  // if (session === undefined) return <LoadingSpinner />;
  return <div>Search</div>;
}
