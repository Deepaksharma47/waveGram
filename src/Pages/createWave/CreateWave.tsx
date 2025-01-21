import { useSelector } from "react-redux"
import BackpageHeading from "../../components/common/BackpageHeading"
import ProfileTemplate from "../../components/common/ProfileTemplate"
import { RootState } from "../../interfaces/interfaces"
import WaveForm from "./WaveForm"
import WaveList from "./WaveList"

const CreateWave = () => {
    const { user } = useSelector((state:RootState) => state?.Auth)

  return (
    <div className="flex flex-col gap-2 mx-6 mt-5 overflow-visible ">
        <BackpageHeading  heading="Create Waves" />
        <div className=" bg-white rounded-lg mb-5 pb-5">
            <ProfileTemplate user={user} backgroundText="Create Waves" />
            <div className=" flex flex-col px-6 gap-5 mt-11 text-gray-700 w-full">
                <p className="">What do you want to share?</p>
                <WaveForm/> 
                <WaveList/>
            </div>
        </div>
    </div>
  )
}

export default CreateWave