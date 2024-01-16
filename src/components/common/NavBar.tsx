"use client";

import { useSession } from "next-auth/react";
import Link from "next/link";
import { signOut } from "next-auth/react";

const NavBar = () => {
  const { data: session, status } = useSession();
  console.log("Session", session);
  return (
    <div>
      <div className="flex justify-between m-10 item-center">
        <div className="flex gap-2">
          <button className="border border-white px-4">LOGO</button>

          <Link href="/">
            <button>Home</button>
          </Link>
          <Link href="/tv">
            <button>TV</button>
          </Link>
          <Link href="/movies">
            <button>Movies</button>
          </Link>
          <Link href="/my">
            <button>My List</button>
          </Link>
          <Link href="/login">
            <button>Login</button>
          </Link>
        </div>
        {!session ? (
          <p>Sign In</p>
        ) : (
          <div className="flex gap-2">
            <p>Welcome, {session?.user?.name}</p>
            <button
              className="border border-white px-4"
              onClick={() => signOut()}
            >
              Sign Out
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default NavBar;
