// Modal.tsx
import React from "react";
import { adminInterface } from "../../../interfaces/interfaces";
import ProfileTemplate from "../../../components/common/ProfileTemplate";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  // children: React.ReactNode;
  waveData: adminInterface
}

const FriendDetailModal: React.FC<ModalProps> = ({ isOpen, onClose, waveData }) => {
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
          <ProfileTemplate user={waveData} backgroundText="Details" />
            <div className=" text-lg font-semibold  mt-8 mb-3 text-gray-800 px-4 ">
                Basic Details
            </div>
            <div className="flex flex-row py-3  text-gray-600  pb-8">
                <div className="flex  gap-8 w-full px-4">
                    <div className="flex flex-col gap-5 ">
                        <p>First Name:</p>
                        <p>Email Id : </p>
                        <p>Mobile No :</p>
                        <p>Gender :</p>
                        <p>State :</p>
                    </div> 
                    <div className="flex flex-col gap-5">
                        <p>{waveData?.firstName}</p>
                        <p>{waveData?.email}</p>
                        <p>{waveData?.mobileNumber}</p>
                        <p>{waveData?.gender}</p>
                        <p>{waveData?.state}</p>
                    </div>
                </div>
                <div className=" bg-gray-400 w-[2px]">

                </div>
                <div className="flex justify-between gap-8 px-4 w-full">
                    <div className="flex flex-col gap-5">
                        <p>Last Name :</p>
                        <p>DOB : </p>
                        <p>Address :</p>
                        <p>City :</p>
                        <p>Zip Code :</p>
                    </div> 
                    <div className="flex flex-col gap-5">
                        <p>{waveData?.lastName}</p>
                        <p>{waveData?.dob}</p>
                        <p>{waveData?.address}</p>
                        <p>{waveData?.city}</p>
                        <p>{waveData?.zipCode}</p>
                    </div>

                </div>
            </div>
        </div>
      </div>
    </div>
  );
};

export default FriendDetailModal;
