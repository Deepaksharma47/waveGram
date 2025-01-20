import { useSelector } from 'react-redux'
import ProfileTemplate from '../../components/common/ProfileTemplate'
import {  RootState } from '../../interfaces/interfaces'
import BackpageHeading from '../../components/common/BackpageHeading'
import BasicDetail from '../../components/common/BasicDetail'

const Profile = () => {
    const {user} = useSelector((state:RootState) => state.Auth)
  return (
    <div className=' flex flex-col mx-6 mt-5 overflow-visible'>
        <BackpageHeading heading='Profile'/>
        <ProfileTemplate user={user} backgroundText='My Profile' changeButton={true}/>

        <div className=' mt-8 mb-3 text-xl'>Change Information</div>

        <div className=' bg-white h-fit px-4 pb-5 rounded-lg overflow-y-visible '>
            <div className=' py-1 mb-4 font-semibold border-b-4 border-gray-600 text-base box-content text-gray-600 w-fit'>
                Basic Details
            </div>
            <BasicDetail/>
        </div>

    </div>
  )
}

export default Profile