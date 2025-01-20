// import React from 'react'
import { useState } from "react"
import { waves } from "./testwavedata"
import Wave from './Wave'
import Modal from "./WaveModal"
import { WaveInterface } from "../../../interfaces/interfaces"
const MakingWave = () => {
  const [isModalOpen, setModalOpen] = useState(false);
  const [modalData, setModalData] = useState<WaveInterface | null >(null);
  return (
    <div className=' bg-white px-4 py-8 flex flex-col gap-6 rounded-lg'>
      {/* Heading */}
      <div className=' text-xl'>Making Waves</div>
      <div className=' grid lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1 gap-x-4 gap-y-16'>
        {
          waves?.map((wave, index) => (
            <div key={wave.id}
              className={`p-3 border-r-2  ${index % 4 !== 3 && 'md:border-r'
                }`}
                onClick={()=>{setModalOpen(true); setModalData(wave)}}>
              <Wave {...wave} />
            </div>
          ))
        }
      </div>
      <Modal isOpen={isModalOpen} onClose={() => setModalOpen(false)} waveData={modalData}>
        Deepak Sharma
      </Modal>
    </div>
  )
}

export default MakingWave