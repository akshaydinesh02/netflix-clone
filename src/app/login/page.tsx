"use client";

import LoadingSpinner from "@/components/common/LoadingSpinner";
import LoginComponent from "@/components/common/LoginComponent";
import { useSession } from "next-auth/react";

export default function Login() {
  // const { data: session } = useSession();

  // if (session === undefined) return <LoadingSpinner />;

  // if (session === null) return <UnAuthPage />;
  return <LoginComponent />;
}
