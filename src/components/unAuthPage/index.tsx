"use client";

import { signIn, signOut } from "next-auth/react";

export default function UnAuthPage() {
  return (
    <div>
      <button onClick={() => signIn("github")}>Sign in</button>
    </div>
  );
}
