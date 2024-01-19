import { useSession } from "next-auth/react";
import Browse from "./browse/page";
import LoadingSpinner from "@/components/common/LoadingSpinner";
import { getServerSession } from "next-auth";
import LoginComponent from "@/components/common/LoginComponent";
import AuthHOC from "@/components/HOC/AuthHOC";

export default function Home() {
  return (
    // <AuthHOC>
    <Browse />
    // </AuthHOC>
  );
}
