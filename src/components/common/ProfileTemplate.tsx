import "./style.css"
import { adminInterface } from "../../interfaces/interfaces"
import React from "react"
import { capitalizeFirstLetter } from "../../utils/helpingFunction";
import IconBtn from "./IconBtn";

interface ProfileTemplateInterface {
  user: adminInterface;
  backgroundText?: string;
  changeButton?: boolean | null;

}

const ProfileTemplate: React.FC<ProfileTemplateInterface> = ({ user, backgroundText, changeButton }) => {
  const pf = `https://api.dicebear.com/5.x/initials/svg?seed=${user?.firstName} ${user?.lastName}`
  return (
    <div className="relative bg-yellowLion flex items-center justify-between h-36 rounded-lg">
      {/* Background Text */}
      <div className="background-text absolute inset-0 flex items-center justify-center sm:text-6xl md:text-7xl  lg:text-8xl font-bold opacity-5 text-nowrap">
        {backgroundText}
      </div>

      <div className="absolute inset-11 flex items space-x-4 z-10 ">
        {/* Profile Image */}
        <img
          src={user?.profilePhoto ? user?.profilePhoto : pf} // Replace with actual image URL
          alt="Profile"
          className="h-32 rounded-full object-cover"
        />
        {/* User Name */}
        <div className="text-xl font-medium text-white mt-4 bggr ">{capitalizeFirstLetter(user?.firstName)} {capitalizeFirstLetter(user?.lastName)}</div>
      </div>
      {
        changeButton && <div className="absolute right-0 z-20">
          <IconBtn text="Change Picture"
            onClick={() => { }}
            customClasses=" bg-white mx-6 hover:bg-gray-600 text-black  "
          />
        </div>
      }
    </div>
  )
}

export default ProfileTemplate
