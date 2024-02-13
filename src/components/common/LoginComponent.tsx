"use client";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { motion } from "framer-motion";
import { PlusIcon } from "@/Icons/PlusIcon";
import Image from "next/image";
import { GitHubIcon } from "@/Icons/GitHubIcon";
import { GoogleIcon } from "@/Icons/GoogleIcon";

const questions = [
  {
    ques: "What is Netflix?",
    ans: `Netflix is a streaming service that offers a wide variety of award-winning TV shows, movies, anime, documentaries and more – on thousands of internet-connected devices. You can watch as much as you want, whenever you want, without a single ad – all for one low monthly price. There's always something new to discover, and new TV shows and movies are added every week!`,
  },
  {
    ques: "How much does Netflix cost",
    ans: `Watch Netflix on your smartphone, tablet, Smart TV, laptop, or streaming device, all for one fixed monthly fee. Plans range from ₹ 149 to ₹ 649 a month. No extra costs, no contracts.`,
  },
  {
    ques: "What can I watch on Netflix?",
    ans: `Watch anywhere, anytime. Sign in with your Netflix account to watch instantly on the web at netflix.com from your personal computer or on any internet-connected device that offers the Netflix app, including smart TVs, smartphones, tablets, streaming media players and game consoles.

    You can also download your favorite shows with the iOS, Android, or Windows 10 app. Use downloads to watch while you're on the go and without an internet connection. Take Netflix with you anywhere.`,
  },
  {
    ques: "How do I cancel?",
    ans: `Netflix is flexible. There are no annoying contracts and no commitments. You can easily cancel your account online in two clicks. There are no cancellation fees – start or stop your account anytime.`,
  },
  {
    ques: "What can I watch on Netflix?",
    ans: `Netflix has an extensive library of feature films, documentaries, TV shows, anime, award-winning Netflix originals, and more. Watch as much as you want, anytime you want.`,
  },
  {
    ques: "Is Netflix good for kids?",
    ans: `The Netflix Kids experience is included in your membership to give parents control while kids enjoy family-friendly TV shows and films in their own space.

Kids profiles come with PIN-protected parental controls that let you restrict the maturity rating of content kids can watch and block specific titles you don’t want kids to see.`,
  },
];

function LoginBanner({ router }: any) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

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
      setError("Email is invalid");
      return;
    }

    const res = await signIn("credentials", {
      redirect: false,
      email,
      password,
    });

    if (res?.error) {
      setError("Invalid email or password");
      if (res?.url) router.replace("/");
    } else {
      setError("");
    }
  };

  return (
    <div className="h-[65vh] sm:h-[90vh] xl:h-[95vh] bg-cover bg-no-repeat bg-[url('https://assets.nflxext.com/ffe/siteui/vlv3/84526d58-475e-4e6f-9c81-d2d78ddce803/e3b08071-f218-4dab-99a2-80315f0922cd/LK-en-20221228-popsignuptwoweeks-perspective_alpha_website_small.jpg')] border-b-8 border-gray-800  ">
      <div className="bg-black bg-opacity-70 h-[100vh]">
        <div className="flex items-center justify-between">
          <Image
            alt="netflix-logo"
            src="/Netflix_logo.svg"
            width={120}
            height={120}
            className="w-28 sm:w-36 lg:w-52 ml-4 sm:ml-8 pt-4"
            onClick={() => router.push("/")}
          />
          <div className="flex mr-4 sm:mr-10">
            <button
              onClick={() => signIn("github")}
              className="h-8 px-1 sm:px-4 m-2 text-white bg-[#e50914] rounded"
            >
              Sign In using GitHub
            </button>
          </div>
        </div>
        <div className="h-[55vh] sm:h-[80vh] w-[90%] md:w-[80%] mx-[5%] md:mx-[10%] flex flex-col items-center justify-center text-white text-center">
          <h1 className="text-2xl sm:text-4xl lg:text-5xl xl:text-6xl sm:px-[15%] md:px-[15%] lg:mx-14 lg:px-[7%] xl:px-[15%] font-medium">
            Unlimited movies, TV shows, and more..
          </h1>
          <h2 className="text-lg sm:text-1xl lg:text-2xl font-medium m-2 sm:m-4">
            Watch anywhere. Cancel anytime.
          </h2>
          <div className="flex flex-col gap-4 justify-center">
            <button
              onClick={() => signIn("github")}
              className="bg-red-600 hover:bg-[#e50914] p-4 rounded flex justify-center items-center gap-2"
            >
              Sign In using GitHub{" "}
              <GitHubIcon height={25} width={25} fill="white" />
            </button>
            <button
              onClick={() => signIn("google")}
              className="bg-red-600 hover:bg-[#e50914] p-4 rounded flex justify-center items-center gap-2"
            >
              Sign In using Google
              <GoogleIcon height={25} width={25} fill="white" />
            </button>
            <div>
              <div className="bg-[#e50914] p-4 rounded shadow-md w-96">
                <h2 className="text-white text-center">
                  Sign In using Credentials
                </h2>
                <div className="mb-4 italic text-xs self-end">
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
                    className="block text-white text-sm font-bold mb-1"
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
                    className="block text-white text-sm font-bold mb-1"
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
                    className="bg-white text-red-700 py-2 px-4 rounded hover:bg-gray-400 hover:text-white focus:outline-none focus:shadow-outline-gray active:bg-gray-400"
                  >
                    Sign In
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

const LoginComponent: React.FC = () => {
  const [showCurrentAnswer, setShowCurrentAnswer] = useState<number | null>(
    null
  );

  const router = useRouter();

  return (
    <motion.div
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
    >
      <main>
        <div className="bg-black">
          <LoginBanner router={router} />

          <div className="border-b-8 border-gray-800 pb-8">
            <div className="flex flex-col h-[85vh] lg:h-[95vh] text-white px-8 sm:px-14 md:px-28 lg:px-48 xl:px-80 mt-3 sm:mt-14">
              <h1 className="mb-5 text-xl sm:text-3xl md:text-4xl lg:text-5xl text-bold text-center px-14 md:px-0">
                Frequently asked questions
              </h1>
              {questions.map((item: any, _i: number) => (
                <div key={_i} className="flex flex-col gap-3">
                  <div
                    onClick={() =>
                      setShowCurrentAnswer(showCurrentAnswer === _i ? null : _i)
                    }
                    className="flex justify-between items-center p-3 lg:p-5 mt-2 bg-[#303030] cursor-pointer"
                  >
                    <h2>{item.ques}</h2>
                    <PlusIcon color="white" />
                  </div>
                  {showCurrentAnswer === _i ? (
                    <div className="p-3 ml-4 lg:p-5 mt-2 bg-[#303030] cursor-pointer">
                      {item.ans}
                    </div>
                  ) : (
                    <></>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>
    </motion.div>
  );
};

export default LoginComponent;
