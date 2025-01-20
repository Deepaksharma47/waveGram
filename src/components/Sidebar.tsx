import { NavLink } from "react-router-dom";
import { Link } from "react-router-dom";
import logo from "../assets/wave_logo.png";
import { useSelector } from "react-redux";
import { adminSidebarItems } from "../utils/adminlists";
import { useEffect, useState } from "react";
import { MenuItem } from "../utils/adminlists";
import { formatString, getLastPartOfURL } from "../utils/helpingFunction";
import { MdLogout } from "react-icons/md";
import { useLogout } from "../actions/user";
import { RootState } from "../interfaces/interfaces";

const Sidebar = () => {
    const { isLoggedIn, user } = useSelector((state: RootState) => state?.Auth);

    const [sideBarList, setSidebarList] = useState<MenuItem[]>([])

    const logoutMutation = useLogout()

    useEffect(() => {
        switch (user?.roleId) {
            case 1: {
                setSidebarList(adminSidebarItems)
                break;
            }
            default: {
                break;
            }
        }
    }, [user, sideBarList])

    return (
        <nav className=" flex flex-col bg-primary border-t-[1px] h-screen w-1/4 py-3">
            <Link to="/dashboard" className="flex items-center justify-center p-2">
                <img src={logo} alt="WaveGram" className="h-20 mt-1 mb-3" />
            </Link>
            <div className=" ">
                <ul className=" space-y-2 text-left text-sm ">
                    {isLoggedIn && (
                        <>
                            {
                                sideBarList.map((list) => {
                                    const LG:React.FC = list?.Logo;
                                    return (
                                        <li key={list?.id} className={`flex hover:bg-yellowLion rounded-md  cursor-pointer overflow-hidden ms-9 me-4 transition-all duration-150 ${formatString(list?.label) === getLastPartOfURL() ? "bg-yellowLion" : ""} `}>
                                            <NavLink
                                                to={list?.link}
                                                className={` text-white hover:text-white flex flex-row justify-start items-center gap-2 text-nowrap py-3 ps-4 font-normal  w-full`}
                                            >
                                                <LG/>
                                                <span className=" text-white">{list?.label}</span>
                                            </NavLink>
                                        </li>
                                    )
                                }

                                )
                            }
                        </>
                    )}
                </ul>
            </div>
            <div className=" flex justify-start items-center align-middle h-full ">
                <button className="flex flex-row items-center text-white font-medium gap-2 text-sm ms-9 me-4 ps-4 hover:scale-110 transition-all duration-150"
                    onClick={() =>{
                        logoutMutation.mutate();
                    }}
                >
                    <MdLogout className=" text-xl" />
                    Logout
                </button>
            </div>
        </nav>
    );
};

export default Sidebar;