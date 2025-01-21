import React from 'react'
import { WaveInterface } from '../../interfaces/interfaces'
import { truncateString } from '../../utils/helpingFunction'

const Wave: React.FC<WaveInterface> = (wave) => {
    return (
        <div className='flex flex-row gap-5 w-full' >
            <img
                src={`${wave?.admin?.profilePhoto}`}
                alt="User Profile"
                className="rounded-full border h-12"
                aria-expanded="false"
            />
            <div className='flex flex-col justify-evenly'>
                <p className=' text-yellowLion'>{`@${wave?.admin?.firstName}${wave?.admin?.lastName}`}</p>
                <p className=" text-gray-700">{truncateString(wave?.waveMessage, 25)}</p>
            </div>

        </div>
    )
}

export default Wave