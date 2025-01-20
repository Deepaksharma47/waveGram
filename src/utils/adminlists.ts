
// import react icons
import { MdDashboardCustomize,MdRoomPreferences  } from "react-icons/md";
import { CgProfile } from "react-icons/cg";
import { FaUserFriends } from "react-icons/fa";
import { IoCreateSharp } from "react-icons/io5";
import { PiPasswordBold } from "react-icons/pi";

export type MenuItem = {
    id: number;
    label: string;
    link: string;
    Logo?: unknown;
};

export type BasicDetail = {
    label: string, fieldName: string, placeholder: string, required: boolean, errorMessage: string, enable?:boolean , disabled : boolean,type:string
}

// header admin list
export const adminMenuItems: MenuItem[] = [
    { id: 1, label: "My Profile", link: "/my-profile" },
    { id: 2, label: "Preferences", link: "/preferences" },
    { id: 3, label: "Friends", link: "/friends" },
    { id: 4, label: "Create Waves", link: "/create-waves" },
    { id: 5, label: "Change Password", link: "/change-password" },
];

// side bar admin list
export const adminSidebarItems: MenuItem[] = [
    { id: 0, label: "Dashboard", link: "/dashboard", Logo: MdDashboardCustomize },
  { id: 1, label: "My Profile", link: "/my-profile", Logo: CgProfile },
  { id: 2, label: "Preferences", link: "/preferences", Logo: MdRoomPreferences },
  { id: 3, label: "Friends", link: "/friends", Logo: FaUserFriends },
  { id: 4, label: "Create Waves", link: "/create-waves", Logo: IoCreateSharp },
  { id: 5, label: "Change Password", link: "/change-password", Logo:PiPasswordBold },
]

export const basicDetailAdminList : BasicDetail[] = [
    { label: "First Name", fieldName: "firstName",type: "text", placeholder: "First Name", required: true, errorMessage: "Enter First Name", disabled : false  },
    { label: "Last Name", fieldName: "lastName",type: "text", placeholder: "Last Name", required: true, errorMessage: "Enter Last Name",  disabled : false },
    { label: "Email", fieldName: "email", placeholder: "Email",type: "email", required: true, errorMessage: "Enter a valid Email", disabled : true },
    { label: "Mobile Number", fieldName: "mobileNumber",type: "text", placeholder: "Mobile Number", required: false, errorMessage: "Enter Mobile Number", disabled : false },
    { label: "Address", fieldName: "address", placeholder: "Address",type: "text", required: true, errorMessage: "Enter Address", disabled : false },
    { label: "City", fieldName: "city", placeholder: "City", required: true,type: "text", errorMessage: "Enter City", disabled : false },
    { label: "State", fieldName: "state", placeholder: "State",type: "text", required: true, errorMessage: "Enter State", disabled : false },
    { label: "Zip Code", fieldName: "zipCode", placeholder: "Zip Code",type: "text", required: true, errorMessage: "Enter Zip Code", disabled : false },
  ];
  