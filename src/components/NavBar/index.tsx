"use client";

import { useSession } from "next-auth/react";
import Link from "next/link";
import { signOut } from "next-auth/react";
import { useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import Image from "next/image";
import Search from "./Search";
import { SearchIcon } from "@/Icons/SearchIcon";
import { useGlobalContext } from "@/context";
import AccountPopup from "./ProfilesPopup";
import DetailsPopup from "../common/DetailsPopup";

const NavBar = () => {
  const { data: session } = useSession();
  const router = useRouter();
  const pathName = usePathname();

  const {
    setPageLoader,
    loggedInProfile,
    setLoggedInProfile,
    profiles,
    setProfiles,
    showDetailsPopup,
    setShowDetailsPopup,
    currentSelectedMediaInfo,
  } = useGlobalContext();

  const menuItems = [
    {
      id: "home",
      title: "Home",
      path: "/browse",
    },
    {
      id: "tv",
      title: "TV",
      path: "/tv",
    },
    {
      id: "movies",
      title: "Movies",
      path: "/movies",
    },
    {
      id: "myList",
      title: "My List",
      path: "/mylist",
    },
  ];

  const [hasScrolled, setHasScrolled] = useState(false);
  const [showSearchBar, setShowSearchBar] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [showAccountPopup, setShowAccountPopup] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 0) {
        setHasScrolled(true);
      } else {
        setHasScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  // TODO: FIXME: Refactor the below code
  async function getAllAccountProfiles() {
    try {
      const response = await fetch(
        // @ts-ignore
        `/api/profile/getAllAccountProfiles?id=${session?.user?.uid}`,
        {
          method: "GET",
        }
      );

      const result = await response.json();
      if (result && result?.data?.length) {
        setProfiles(result.data);
      }
    } catch (error: any) {
      console.error("Error while fetching all account profiles");
    } finally {
      setPageLoader(false);
    }
  }

  useEffect(() => {
    getAllAccountProfiles();
  }, []);

  return (
    <div className="relative">
      <header
        className={`header ${hasScrolled ? "bg-black" : ""} hover:bg-black`}
      >
        <div className="flex items-center space-x-2 md:space-x-10">
          <Image
            alt="netflix-logo"
            src="/Netflix_logo.svg"
            width={120}
            height={120}
            className="cursor-pointer object-contain"
            onClick={() => router.push("/browse")}
          />

          <ul className="hidden md:space-x-4 md:flex cursor-pointer">
            {menuItems.map((item) => {
              return (
                <li
                  onClick={() => {
                    setPageLoader(true);
                    router.push(item.path);
                    setSearchQuery("");
                    setShowSearchBar(false);
                  }}
                  key={item.id}
                  className="cursor-pointer text-[16px] text-white transition duration-[0.4s] hover:text-gray-400"
                >
                  {item.title}
                </li>
              );
            })}
          </ul>
        </div>
        <div className="font-light flex items-center space-x-4 text-sm">
          {showSearchBar ? (
            <Search
              pathName={pathName}
              // router={router}
              searchQuery={searchQuery}
              setSearchQuery={setSearchQuery}
              setPageLoader={setPageLoader}
              setShowSearchBar={setShowSearchBar}
            />
          ) : (
            <div onClick={() => setShowSearchBar(true)}>
              <SearchIcon className="hidden sm:inline sm:w-6 sm:h-6 cursor-pointer" />
            </div>
          )}
          <div
            onClick={() => setShowAccountPopup(!showAccountPopup)}
            className="flex gap-2 items-center cursor-pointer"
          >
            <Image
              src="/default-profile-image.png"
              alt="current profile"
              width={25}
              height={25}
              className="max-w-[30px] rounded min-w-[20px] max-h-[30px] min-h-[20px] object-cover w-[30px] h-[30px]"
            />
            <p>{loggedInProfile.name ?? ""}</p>
          </div>
        </div>
      </header>
      <DetailsPopup
        show={showDetailsPopup}
        setShow={setShowDetailsPopup}
        media={currentSelectedMediaInfo}
      />
      {showAccountPopup ? (
        <AccountPopup
          profiles={profiles}
          setPageLoader={setPageLoader}
          signOut={signOut}
          loggedInProfile={loggedInProfile}
          setLoggedInProfile={setLoggedInProfile}
        />
      ) : null}
    </div>
  );
};

export default NavBar;
