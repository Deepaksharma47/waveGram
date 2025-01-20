import React from 'react'
import { iconBtn } from '../../interfaces/interfaces'

const IconBtn: React.FC<iconBtn> = ({
    text,
    onClick,
    children,
    disabled = false,
    customClasses = "",
    type = "button"
}) => {

    // console.log("typetypetype", type)
    return (
        <button
            disabled={disabled}
            onClick={onClick}
            type={type}
            className={` text-base px-6 ${customClasses ? `${customClasses}
                ` : " bg-primary text-white"}
                } cursor-pointer rounded-xl py-2  font-semibold hover:bg-gray-600 hover:text-white  transition-all duration-150 ${customClasses}`}
        >
            {
                children ? (<div className='flex items-center justify-center gap-2'>
                    <span>
                        {text}
                    </span>
                    {children}
                </div>) : (text)
            }
        </button>
    )
}

export default IconBtn