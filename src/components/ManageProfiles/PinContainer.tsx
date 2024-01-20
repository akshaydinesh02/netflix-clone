"use client";

import { CloseIcon } from "@/Icons/CloseIcon";
import React, { Dispatch, SetStateAction } from "react";
import PinInput from "react-pin-input";

interface IPinContainer {
  showPinContainer: { show: boolean; currentProfile: any };
  setShowPinContainer: Dispatch<
    SetStateAction<{ show: boolean; currentProfile: any }>
  >;
  pinError: boolean;
  setPinError: Dispatch<SetStateAction<boolean>>;
  handlePinSubmit: (value: string, index: number) => void;
  pin: string;
  setPin: Dispatch<SetStateAction<string>>;
}

const PinContainer = (props: IPinContainer) => {
  const {
    showPinContainer,
    setShowPinContainer,
    pinError,
    setPinError,
    handlePinSubmit,
    pin,
    setPin,
  } = props;

  return (
    showPinContainer.show && (
      <div className="z-40 bg-black flex-col min-h-screen absolute left-0 justify-center flex items-center right-0">
        <div>
          <span
            onClick={() =>
              setShowPinContainer((prev) => ({
                currentProfile: null,
                show: false,
              }))
            }
            className="cursor-pointer absolute top-[50px] right-[40px]"
          >
            <CloseIcon />
          </span>
        </div>
        <h1 className="text-gray-400 font-bold text-[16px] font-bold mb-4">
          Profile Lock is currently ON
        </h1>
        {pinError ? (
          <h2 className="text-yellow-500 font-bold text-[30px]">
            Oops! Wrong PIN. Please try again.
          </h2>
        ) : (
          <h2 className="text-white font-bold text-[30px]">
            Enter PIN to access the profile!
          </h2>
        )}
        <PinInput
          length={4}
          initialValue={pin}
          secret
          secretDelay={100}
          onChange={(value, index) => {
            setPin(value);
            if (pinError) setPinError(false);
          }}
          type="numeric"
          inputMode="number"
          style={{ padding: "20px", display: "flex", gap: "10px" }}
          inputStyle={{
            borderColor: "white",
            height: "70px",
            width: "70px",
            fontSize: "40px",
          }}
          inputFocusStyle={{
            borderColor: "white",
          }}
          onComplete={(value, index) => handlePinSubmit(value, index)}
          autoSelect={true}
        />
      </div>
    )
  );
};

export default PinContainer;
