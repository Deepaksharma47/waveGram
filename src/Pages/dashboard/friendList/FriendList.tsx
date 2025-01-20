// import React from 'react'
import { useState } from 'react';
import FriendsCard from '../../../components/common/FriendsCard'
import { FriendListData } from '../waves/testwavedata'
import { adminInterface } from '../../../interfaces/interfaces';
import FriendDetailModal from './FriendDetailModal';

const FriendList = () => {
    const [isModalOpen, setModalOpen] = useState(false);
    const [modalData, setModalData] = useState<adminInterface | null>(null);

    return (
        <div className=' bg-white px-4 py-8 flex flex-col gap-6 rounded-lg'>
            {/* Heading */}
            <div className=' text-xl'>Friends</div>
            <div className=' grid lg:grid-cols-2 md:grid-cols-1 sm:grid-cols-1 gap-x-6 gap-y-4'>
                {
                    FriendListData?.map((list, index) => {
                        const data = {
                            status: list?.status,
                            firstName: list?.admin?.firstName,
                            lastName: list?.admin?.lastName,
                            email: list?.admin?.email
                        }
                        return (<div key={index}
                            onClick={()=>{
                                setModalOpen(true);
                                setModalData(list?.admin);
                            }}
                        >
                            <FriendsCard data={data} key={index} />
                        </div>
                        )
                    })
                }
            </div>
            <FriendDetailModal isOpen={isModalOpen} onClose={()=>setModalOpen(false)} waveData={modalData}/>
        </div>
    )
}

export default FriendList