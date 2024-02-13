"use client";

import React, { Dispatch, SetStateAction, useMemo } from "react";
import { motion } from "framer-motion";
import { CloseIcon } from "@/Icons/CloseIcon";
import { initialFormData } from ".";

interface IProfileForm {
  showNewProfileForm: boolean;
  setShowNewProfileForm: Dispatch<SetStateAction<boolean>>;
  formData: {
    name: string;
    pin: string;
  };
  setFormData: Dispatch<
    SetStateAction<{
      name: string;
      pin: string;
    }>
  >;
  handleSaveProfile: () => void;
}

const ProfileForm = (props: IProfileForm) => {
  const {
    showNewProfileForm,
    setShowNewProfileForm,
    formData,
    setFormData,
    handleSaveProfile,
  } = props;

  const profileFormSubmitDisabled = useMemo(
    () => !formData.name || !formData.pin,
    [formData]
  );

  return (
    showNewProfileForm && (
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
      >
        <div className="px-8 py-8 h-[300px] fixed top-[10px] gap-3 flex flex-col items-start right-[10px] bg-black opacity-1 z-40 rounded-xl">
          <button
            className="absolute right-0 mr-2"
            onClick={() => {
              setShowNewProfileForm(false);
              setFormData(initialFormData);
            }}
          >
            <CloseIcon />
          </button>
          <div className="flex flex-col gap-5 mr-4">
            <input
              name="name"
              type="text"
              value={formData.name}
              onChange={(e) =>
                setFormData({ ...formData, [e.target.name]: e.target.value })
              }
              placeholder="Enter your name"
              className="px-5 py-3 rounded-lg placeholder:text-red-700 text-lg text-yellow-700 outline-none focus:outline-none"
            />
            <input
              name="pin"
              type="password"
              value={formData.pin}
              onChange={(e) =>
                setFormData({ ...formData, [e.target.name]: e.target.value })
              }
              placeholder="Enter your PIN"
              className="px-5 py-3 rounded-lg placeholder:text-red-700 text-lg text-yellow-700 outline-none focus:outline-none"
              maxLength={4}
            />
            <button
              disabled={profileFormSubmitDisabled}
              onClick={handleSaveProfile}
              className="disabled:bg-gray-700 disabled:text-gray-400 disabled:border-gray-500 disabled:pointer-events-none border p-4 bg-yellow-500 outline-none rounded-lg text-black text-lg font-bold"
            >
              Save
            </button>
          </div>
        </div>
      </motion.div>
    )
  );
};

export default ProfileForm;
