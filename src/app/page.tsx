import { useSession } from "next-auth/react";
import Browse from "./browse/page";
import UnAuthPage from "@/components/unAuthPage";
import LoadingSpinner from "@/components/common/LoadingSpinner";
import { getServerSession } from "next-auth";

export default async function Home() {
  // const session = await getServerSession();

  // if (!session || !session.user) return <UnAuthPage />;
  return <Browse />;
  // return (
  //   <>
  //     {
  //       session.
  //   }
  //   </>
  // )
}
