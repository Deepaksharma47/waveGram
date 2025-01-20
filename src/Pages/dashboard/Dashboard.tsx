import FriendList from "./friendList/FriendList"
import MakingWave from "./waves/MakingWave"

const Dashboard = () => {
  return (
    <div className="flex flex-col mx-6 mt-5 gap-6 overflow-visible">
      <MakingWave/>
      <FriendList/>
    </div>
  )
}

export default Dashboard