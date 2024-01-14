"use client";

import { signIn, signOut } from "next-auth/react";

export default function UnAuthPage() {
  return (
    <div className="flex flex-col gap-4 p-4 border border-white w-[50%]">
      <button onClick={() => signIn("email")}>Sign in - Email</button>
      <button onClick={() => signIn("github")}>Sign in - GitHub</button>
      <button onClick={() => signIn("google")}>Sign in - Google</button>
    </div>
  );
}

// notifications,
// myList,
// trailers you have watched,
// continue watching,
// recently watched,
