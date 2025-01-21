import React from 'react'
import { WaveInterface } from '../../interfaces/interfaces'
import { truncateString } from '../../utils/helpingFunction';
interface WaveData {
    data:WaveInterface;
    key: number;
}

const WaveDisplayCard:React.FC<WaveData> = ({data, key}) => {
    return (
        <div className='flex flex-row justify-between bg-grayCard ps-4 pe-9  py-3 rounded-xl ' key={key} >

            <div className='flex flex-row gap-2 items-center ' >
                <img
                    src={data?.admin?.profilePhoto ? data?.admin?.profilePhoto : "dfd"}
                    alt="User Profile"
                    className="rounded-full border h-12"
                    aria-expanded="false"
                />
                <div className=' flex flex-col justify-between text-primary ' >
                    <p className=' text-yellowLion font-semibold ' > @{data?.admin?.firstName}{data?.admin?.lastName} </p>
                    <p className=' text-sm flex-wrap' >{truncateString(data?.waveMessage,30)}</p>
                </div>

            </div>

            <div className=' flex items-center text-sm' >
                {(data?.status == true) && (
                    <p className=' rounded-full px-3 bg-greenAcc text-white py-1' >Active</p>
                )}
                {(data?.status == false) && (
                    <p className=' rounded-full px-3 bg-pending text-white py-1' >Inacitve</p>
                )}
            </div>
        </div>
    )
}

export default WaveDisplayCard