"use client";

import { useGlobalContext } from "@/context";
import { signOut, useSession } from "next-auth/react";
import React, { useEffect, useState } from "react";
import LoadingSpinner from "../common/LoadingSpinner";
import Image from "next/image";
import { LockIcon } from "@/Icons/LockIcon";
import ProfileForm from "./ProfileForm";
import { TrashIcon } from "@/Icons/TrashIcon";
import PinContainer from "./PinContainer";
import { usePathname, useRouter } from "next/navigation";

export const initialFormData = {
  name: "",
  pin: "",
};

const ManageProfiles = () => {
  const profiles = useGlobalContext().profiles;
  const setProfiles = useGlobalContext().setProfiles;
  const pageLoader = useGlobalContext().pageLoader;
  const setPageLoader = useGlobalContext().setPageLoader;
  const setLoggedInProfile = useGlobalContext().setLoggedInProfile;

  const { data: session } = useSession();
  const pathName = usePathname();
  const router = useRouter();

  const [showNewProfileForm, setShowNewProfileForm] = useState(false);
  const [formData, setFormData] = useState(initialFormData);
  const [showDeleteIcon, setShowDeleteIcon] = useState(false);
  const [pin, setPin] = useState("");
  const [pinError, setPinError] = useState(false);
  const [showPinContainer, setShowPinContainer] = useState({
    show: false,
    currentProfile: null,
  });

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

  async function handleSaveProfile() {
    console.log("form data", formData, session?.user);
    try {
      const response = await fetch(`/api/profile/createProfile`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...formData,
          // @ts-ignore
          uid: `${session?.user?.uid}`,
        }),
      });
      console.log("Response -- save profile", await response.json());
    } catch (error: any) {
      console.error("Error while saving profile", error);
    } finally {
      await getAllAccountProfiles();
      setShowNewProfileForm(false);
      setFormData(initialFormData);
    }
  }

  async function handleRemoveProfile(profileData: any) {
    try {
      const response = await fetch(
        `/api/profile/deleteProfile?id=${profileData._id}&userId=${
          // @ts-ignore
          session?.user?.uid
        }`,
        {
          method: "DELETE",
        }
      );
      console.log("Response -- delete profile", await response.json());
    } catch (error: any) {
      console.error("Error while deleting profile", error);
    } finally {
      setShowDeleteIcon(false);
      await getAllAccountProfiles();
    }
  }

  async function handlePinSubmit(value: string, index: number) {
    if (!showPinContainer?.currentProfile) return;
    setPageLoader(true);
    try {
      const response: Response = await fetch(`/api/profile/validatePin`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          // @ts-ignore
          userId: session?.user?.uid,
          // @ts-ignore
          profileId: showPinContainer?.currentProfile._id,
          pin: value,
        }),
      });

      const result = await response.json();

      if (result.success) {
        setLoggedInProfile(showPinContainer.currentProfile);
        sessionStorage.setItem(
          "currentProfile",
          JSON.stringify(showPinContainer.currentProfile)
        );
        if (pathName.includes("mylist")) {
          router.push(
            // @ts-ignore
            `/mylist/${session?.user?.uid}/${showPinContainer.currentProfile?._id}`
          );
        } else {
          router.push(pathName);
        }
        setPageLoader(false);
      } else {
        setPinError(true);
        setPin("");
        setLoggedInProfile(null);
        sessionStorage.removeItem("currentProfile");
      }

      console.log("Response -- validate profile pin", result);
    } catch (error: any) {
      console.error("Error while validating user profile PIN", error);
    } finally {
      setPageLoader(false);
    }
  }

  useEffect(() => {
    getAllAccountProfiles();
  }, []);

  if (pageLoader) return <LoadingSpinner />;

  return (
    <div className="py-4 px-12 flex flex-col">
      <button
        className="self-end border px-2 py-1 rounded-md bg-red-500 border-red-800 text-gray-100 text-bold"
        onClick={() => {
          setPageLoader(true);
          signOut();
          setLoggedInProfile(null);
          sessionStorage.removeItem("currentProfile");
        }}
      >
        Sign out
      </button>
      <div className="min-h-screen flex justify-center flex-col items-center relative">
        <div className="flex justify-center flex-col items-center">
          <h1 className="text-white font-bold text-[54px] my-[36px]">
            Who&#39;s watching?
          </h1>
          <ul className="flex p-0 my-[25px]">
            {profiles.length
              ? profiles.map((profile: any) => {
                  return (
                    <li
                      key={profile._id}
                      className="max-w-[200px] w-[155px] cursor-pointer flex flex-col items-center gap-3 min-w-[200px]"
                      onClick={() =>
                        !showDeleteIcon &&
                        setShowPinContainer({
                          show: true,
                          currentProfile: profile,
                        })
                      }
                    >
                      <div className="relative">
                        <Image
                          className="max-w-[200px] rounded min-w-[84px] max-h-[200px] min-h-[84px] object-cover w-[155px] h-[155px]"
                          src="/default-profile-image.png"
                          alt={profile._id}
                          width={25}
                          height={25}
                        />
                        {showDeleteIcon ? (
                          <div
                            onClick={() => handleRemoveProfile(profile)}
                            className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-40 cursor-pointer"
                          >
                            <TrashIcon />
                            {/* <p className="text-white">TEST</p> */}
                          </div>
                        ) : null}
                      </div>
                      <span className="mb-4">{profile.name}</span>
                      <LockIcon />
                    </li>
                  );
                })
              : null}

            {profiles.length < 4 ? (
              <li
                onClick={() => setShowNewProfileForm(true)}
                className="border text-black bg-yellow-500 font-bold text-lg border-black max-w-[200px] rounded min-w-[84px] max-h-[200px] min-h-[84px] w-[155px] h-[155px] cursor-pointer flex justify-center items-center"
              >
                Add Profile
              </li>
            ) : null}
          </ul>
          <div className="text-center">
            <span
              onClick={() => setShowDeleteIcon(true)}
              className="border border-gray-100 cursor-pointer tracking-wide inline-flex text-sm px-[1.5em] py-[0.5em]"
            >
              Manage Profiles
            </span>
          </div>
        </div>
        <PinContainer
          pin={pin}
          setPin={setPin}
          pinError={pinError}
          setPinError={setPinError}
          showPinContainer={showPinContainer}
          setShowPinContainer={setShowPinContainer}
          handlePinSubmit={handlePinSubmit}
        />
        <ProfileForm
          formData={formData}
          setFormData={setFormData}
          showNewProfileForm={showNewProfileForm}
          handleSaveProfile={handleSaveProfile}
          setShowNewProfileForm={setShowNewProfileForm}
        />
      </div>
    </div>
  );
};

export default ManageProfiles;
