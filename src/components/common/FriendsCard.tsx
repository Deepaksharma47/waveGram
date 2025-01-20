import React from 'react'

const FriendsCard:React.FC<any> = ({data, key}) => {
    return (
        <div className='flex flex-row justify-between bg-grayCard px-3 py-3 rounded-xl ' key={key} >

            <div className='flex flex-row gap-2 items-center ' >
                <img
                    src={`https://api.dicebear.com/5.x/initials/svg?seed=${data?.firstName} ${data?.lastName}`}
                    alt="User Profile"
                    className="rounded-full border h-12"
                    aria-expanded="false"
                />
                <div className=' flex flex-col justify-between text-primary ' >
                    <p className=' text-xl font-semibold ' > {data?.firstName} {data?.lastName} </p>
                    <p className=' text-sm ' >{data?.email}</p>
                </div>

            </div>

            <div className=' flex items-center text-sm' >
                {(data?.status == 1) && (
                    <p className=' rounded-full px-3 bg-greenAcc text-white py-1' >Accepted</p>
                )}
                {(data?.status == 0) && (
                    <p className=' rounded-full px-3 bg-pending text-white py-1' >Pending</p>
                )}
            </div>
        </div>
    )
}

export default FriendsCard