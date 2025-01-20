import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { adminMenuItems } from '../utils/adminlists';
import { MenuItem } from '../utils/adminlists';
import { useLogout } from '../actions/user';
import { formatString, getGreeting, getLastPartOfURL } from '../utils/helpingFunction';
import { RootState } from '../interfaces/interfaces';

const Header: React.FC = () => {
    const { user, isLoggedIn } = useSelector((state:RootState ) => state.Auth)
    const [isDropdownOpen, setDropdownOpen] = useState(false);
    const [menuList, setMenuList] = useState<MenuItem[] | null>(null)

    const dropdownRef = useRef<HTMLDivElement>(null);

    const logoutMutation = useLogout();

    const toggleDropdown = () => {
        setDropdownOpen(!isDropdownOpen);
    };

    useEffect(() => {
        setMenuList(adminMenuItems)
    }, [user?.roleId])

    // Close dropdown if click is outside the dropdown
    useEffect(() => {
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    const handleClickOutside = (event: MouseEvent) => {
        if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
            setDropdownOpen(false);
        }
    };

    const closeDropdown = () => {
        setDropdownOpen(false);
    };

    const pf = `https://api.dicebear.com/5.x/initials/svg?seed=${user?.firstName} ${user?.lastName}`;

    return (
        <>
            <div className=" bg-white">
                {isLoggedIn && (
                    <>
                        <div className=''>
                            <div className="relative text-end px-10 py-3" ref={dropdownRef}>
                                <button onClick={toggleDropdown}>
                                    <div className='flex gap-2 py-1 px-3 align-baseline'>
                                        <img src={user?.profilePhoto ? user?.profilePhoto : pf} alt='' className='w-12 h-12 rounded-full' />
                                        <div className=' text-start'>
                                            <span className='text-base font-semibold'>{getGreeting()}</span>
                                            <p className='text-lightGray text-sm font-semibold -mt-1'>{user?.firstName} {user?.lastName}</p>
                                        </div>
                                    </div>
                                </button>
                                {isDropdownOpen && (
                                    <ul className="absolute right-0 mt-4 w-64 text-base text-start bg-white rounded-md shadow-md z-30 ">
                                        {
                                            menuList && menuList.map((list, index: number) => (
                                                <li
                                                    key={index}
                                                >
                                                    <Link
                                                        to={list.link}
                                                        className={`block px-4 py-2 hover:bg-gray-100 hover:text-primary ${formatString(list?.label) === getLastPartOfURL() ?
                                                            " text-primary " : "text-lightGray"
                                                            }
                                                        } `}
                                                        onClick={() => { closeDropdown(); }}
                                                    >
                                                        {list?.label}
                                                    </Link>
                                                </li>
                                            ))
                                        }
                                        <li>
                                            <Link
                                                to="/login"
                                                className={`block px-4 py-2 hover:bg-gray-10 text-lightGray  hover:text-primary `}
                                                onClick={() => { logoutMutation.mutate(); closeDropdown(); }}
                                            >
                                                Logout
                                            </Link>
                                        </li>
                                    </ul>
                                )}
                            </div>
                        </div>
                    </>
                )}
            </div>
        </>
    );
}

export default Header;