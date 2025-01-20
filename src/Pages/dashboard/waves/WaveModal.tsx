// Modal.tsx
import React from "react";
import { WaveInterface } from "../../../interfaces/interfaces";
import ProfileTemplate from "../../../components/common/ProfileTemplate";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  // children: React.ReactNode;
  waveData: WaveInterface
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, waveData }) => {
  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50"
      onClick={onClose} // Close the modal if clicking outside
    >
      <div
        className="bg-white rounded-lg shadow-lg w-1/2 px-3 py-1 relative"
        onClick={(e) => e.stopPropagation()} // Prevent click propagation to overlay
      >
        <button
          className="absolute -translate-x-3 translate-y-1 top-2 right-2 text-gray-500 hover:text-gray-700 z-20"
          onClick={onClose}
        >
          ✕
        </button>
        <div className="flex flex-col">
          <ProfileTemplate user={waveData?.admin} backgroundText="Details" />
          <div className=" flex flex-row h-44">
              <div className=" flex flex-col justify-center w-full border-r-2 p-3">
                <p className=" font-semibold">Message</p>
                <p className=" px-3">{waveData?.waveMessage}</p>
              </div>
              <img src={waveData?.wavePhoto} alt="wave image" className=" w-full m-2 "/>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Modal;
