"use client";

import { useGlobalContext } from "@/context";
import { useSession } from "next-auth/react";
import React, { useEffect, useState } from "react";
import LoadingSpinner from "../common/LoadingSpinner";
import Image from "next/image";
import { LockIcon } from "@/Icons/LockIcon";
import AccountForm from "./ProfileForm";

const initialFormData = {
  name: "",
  pin: "",
};

const ManageProfiles = () => {
  const profiles = useGlobalContext().accounts;
  const setProfiles = useGlobalContext().setAccounts;
  const pageLoader = useGlobalContext().pageLoader;
  const setPageLoader = useGlobalContext().setPageLoader;

  const { data: session } = useSession();

  const [showNewProfileForm, setShowNewProfileForm] = useState(false);
  const [formData, setFormData] = useState(initialFormData);

  console.log("All profiles", profiles);

  async function getAllAccountProfiles() {
    try {
      const response = await fetch(
        // @ts-ignore
        `/api/profile/getAllAccountProfiles?id=${session?.user?.uid}`,
        {
          method: "GET",
        }
      );

      // console.log("")

      const result = await response.json();
      if (result && result?.data?.length) {
        console.log("Results", result.data);
        setProfiles(result.data);
      }
    } catch (error: any) {
      console.error("Error while fetching all account profiles");
    } finally {
      setPageLoader(false);
    }
  }

  async function handleSaveProfile() {
    try {
      const response = await fetch(`/api/profile/createProfile`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...formData,
          // @ts-ignore
          uid: session?.user?.uid,
        }),
      });
      console.log("Response", await response.json());
    } catch (error: any) {
      console.error("Error while saving profile", error);
    } finally {
      await getAllAccountProfiles();
      setShowNewProfileForm(false);
      setFormData(initialFormData);
    }
  }

  useEffect(() => {
    getAllAccountProfiles();
  }, []);

  if (pageLoader) return <LoadingSpinner />;

  return (
    <div className="min-h-screen flex justify-center flex-col items-center relative">
      <div className="flex justify-center flex-col items-center">
        <h1 className="text-white font-bold text-[54px] my-[36px]">
          Who&#39;s watching?
        </h1>
        <ul className="flex gap-8 p-0 my-[25px]">
          {profiles.length
            ? profiles.map((account: any) => {
                return (
                  <li
                    key={account._id}
                    className="max-w-[200px] w-[155px] cursor-pointer flex flex-col items-center gap-3 min-w-[200px]"
                  >
                    <div className="relative">
                      <Image
                        className="max-w-[200px] rounded min-w-[84px] max-h-[200px] min-h-[84px] object-cover w-[155px] h-[155px]"
                        src="https://fastly.picsum.photos/id/237/200/300.jpg?hmac=TmmQSbShHz9CdQm0NkEjx1Dyh_Y984R9LpNrpvH2D_U"
                        alt={account._id}
                        width={25}
                        height={25}
                      />
                    </div>
                    <span className="mb-4">{account.name}</span>
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
      </div>
      <AccountForm
        formData={formData}
        setFormData={setFormData}
        showNewProfileForm={showNewProfileForm}
        handleSaveProfile={handleSaveProfile}
      />
    </div>
  );
};

export default ManageProfiles;
