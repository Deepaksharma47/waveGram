import React from 'react'
import { useNavigate } from 'react-router-dom'
import { IoMdArrowBack } from "react-icons/io";

interface BackpageHeadingProps {
    heading: string;
  }

const BackpageHeading:React.FC<BackpageHeadingProps> = ({heading}) => {
    const navigate = useNavigate()
  return (
    <div className='flex flex-row gap-2 font-semibold text-xl mt-2'>
        <button type='button' onClick={() => navigate(-1)} aria-label="Go back">
            <IoMdArrowBack className=' font-semibold text-xl'/>
        </button>
        <div className=''>
            {heading}
        </div>
    </div>
  )
}

export default BackpageHeading