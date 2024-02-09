"use client";

import Image from "next/image";
import { Dispatch, SetStateAction } from "react";

interface IProfilesPopup {
  profiles: any;
  setPageLoader: Dispatch<SetStateAction<boolean>>;
  signOut: () => void;
  loggedInProfile: any;
  setLoggedInProfile: Dispatch<SetStateAction<any>>;
}

const ProfilesPopup = (props: IProfilesPopup) => {
  const {
    profiles,
    setPageLoader,
    signOut,
    loggedInProfile,
    setLoggedInProfile,
  } = props;

  const filteredProfiles = profiles.filter(
    (profile: any) => profile._id != loggedInProfile?._id
  );

  return (
    <div className="px-8 py-8 fixed top-[50px] gap-3 flex flex-col items-start right-[45px] bg-black opacity-[0.85] z-40">
      {/* <div className="flex flex-col gap-3">
        {filteredProfiles.length
          ? filteredProfiles.map((profile: any) => {
              return (
                <div
                  onClick={() => {
                    setLoggedInProfile(null);
                    sessionStorage.removeItem("currentProfile");
                  }}
                  key={profile._id}
                  className="cursor-pointer flex gap-5"
                >
                  <Image
                    src="/default-profile-image.png"
                    alt="current profile"
                    width={25}
                    height={25}
                    className="max-w-[30px] rounded min-w-[20px] max-h-[30px] min-h-[20px] object-cover w-[30px] h-[30px]"
                  />
                  <p className="mb-4">{profile.name}</p>
                </div>
              );
            })
          : null}
      </div> */}
      {/* <div> */}
      <button
        onClick={() => {
          setLoggedInProfile(null);
          sessionStorage.removeItem("currentProfile");
        }}
      >
        Change Profile
      </button>
      <button
        onClick={() => {
          setPageLoader(true);
          signOut();
          setLoggedInProfile(null);
          sessionStorage.removeItem("currentProfile");
        }}
      >
        Sign out
      </button>
    </div>
    // </div>
  );
};

export default ProfilesPopup;
