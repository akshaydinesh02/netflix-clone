"use client";
import { useSession, signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import LoadingSpinner from "./LoadingSpinner";

const LoginComponent: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const { data: session, status: sessionStatus } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (sessionStatus === "authenticated") {
      router.replace("/browse");
    }
  }, [sessionStatus, router]);

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  const isValidEmail = (email: string) => {
    const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
    return emailRegex.test(email);
  };

  const handleSignIn = async () => {
    if (!isValidEmail(email)) {
      console.log("Email is invalid");
      setError("Email is invalid");
      return;
    }

    // if (!password || password.length < 8) {
    //   console.log("Password is invalid");
    //   setError("Password is invalid");
    //   return;
    // }

    const res = await signIn("credentials", {
      redirect: false,
      email,
      password,
    });
    console.log("Res", res);

    if (res?.error) {
      console.log("Invalid email or password");
      setError("Invalid email or password");
      if (res?.url) router.replace("/");
    } else {
      setError("");
    }
  };

  if (!sessionStatus || sessionStatus === "loading") return <LoadingSpinner />;

  return (
    sessionStatus !== "authenticated" && (
      <div className="flex justify-center items-center h-screen bg-black">
        <div className="bg-red-700 p-8 rounded shadow-md w-96">
          <h2 className="text-2xl font-bold mb-4 text-white text-center">
            Sign In
          </h2>
          <div className="mb-4">
            <p>
              <strong>User</strong> - admin@test.com
            </p>
            <p>
              <strong>Password</strong> - admintest
            </p>
          </div>

          <div className="mb-4">
            <label
              htmlFor="email"
              className="block text-white text-sm font-bold mb-2"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={handleEmailChange}
              className="w-full border rounded py-2 px-3 bg-gray-800 text-white"
            />
          </div>
          <div className="mb-6">
            <label
              htmlFor="password"
              className="block text-white text-sm font-bold mb-2"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={handlePasswordChange}
              className="w-full border rounded py-2 px-3 bg-gray-800 text-white"
            />
          </div>
          <div className="flex flex-col gap-2">
            <button
              onClick={handleSignIn}
              className="bg-white text-red-700 py-2 px-4 rounded hover:bg-gray-300 focus:outline-none focus:shadow-outline-gray active:bg-gray-400"
            >
              Sign In
            </button>
            <button
              onClick={() => signIn("github")}
              className="bg-white text-red-700 py-2 px-4 rounded hover:bg-gray-300 focus:outline-none focus:shadow-outline-gray active:bg-gray-400"
            >
              GitHub Login
            </button>
            <button
              onClick={() => signIn("google")}
              className="bg-white text-red-700 py-2 px-4 rounded hover:bg-gray-300 focus:outline-none focus:shadow-outline-gray active:bg-gray-400"
            >
              Google Login
            </button>
          </div>
        </div>
      </div>
    )
  );
};

export default LoginComponent;
