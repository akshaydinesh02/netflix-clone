import LoginComponent from "@/components/common/LoginComponent";
import { getServerSession } from "next-auth";
import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";

export default function Browse() {
  // const session = getServerSession();
  // console.log("Session from browse", session);

  // if (!session) redirect("/");
  // if (session === null) return <LoginComponent />;
  return (
    <div>
      <p>Browse page</p>
      {/* <LoginComponent /> */}
    </div>
  );
}

// notifications,
// myList,
// trailers you have watched,
// continue watching,
// recently watched,
