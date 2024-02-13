"use client";

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

  return (
    <div className="px-8 py-8 fixed top-[50px] gap-3 flex flex-col items-start right-[45px] bg-black opacity-[0.85] z-40">
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
  );
};

export default ProfilesPopup;
