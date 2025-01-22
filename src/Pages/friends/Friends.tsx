import BackpageHeading from '../../components/common/BackpageHeading'
import SearchFilter from '../../components/common/SearchFilter'
import IconBtn from '../../components/common/IconBtn'
import FriendsCard from '../../components/common/FriendsCard';
import { useNavigate } from 'react-router-dom';
const users = [
    { firstName: "John", lastName: "Doe", email: "john.doe@example.com", status: 0 },
    { firstName: "Jane", lastName: "Smith", email: "jane.smith@example.com", status: 1 },
    { firstName: "Alice", lastName: "Johnson", email: "alice.johnson@example.com", status: 1 },
    { firstName: "Bob", lastName: "Brown", email: "bob.brown@example.com", status: 0 },
    { firstName: "Chris", lastName: "Evans", email: "chris.evans@example.com", status: 0 },
    { firstName: "Diana", lastName: "Prince", email: "diana.prince@example.com", status: 0 },
    { firstName: "Eve", lastName: "Adams", email: "eve.adams@example.com", status: 0 },
    { firstName: "Frank", lastName: "Miller", email: "frank.miller@example.com", status: 1 },
    { firstName: "Grace", lastName: "Hopper", email: "grace.hopper@example.com", status: 1 },
    { firstName: "Henry", lastName: "Ford", email: "henry.ford@example.com", status: 0 },
    { firstName: "Laura", lastName: "Wilson", email: "laura.wilson@example.com", status: 0 },
    { firstName: "Sam", lastName: "Taylor", email: "sam.taylor@example.com", status: 1 },
];



const Friends = () => {
    const navigate = useNavigate()
    return (
        <div className='flex flex-col gap-2 mx-6 mt-5 overflow-visible'>
            <BackpageHeading heading='Friends' />

            <div className=' bg-white px-5 pt-5 pb-2 rounded-lg '>
                <div className='flex justify-between'>
                    <SearchFilter
                        onSearch={() => { }}
                        searchTitle='Name, Email'
                    />
                    <IconBtn
                        text={"Invite Friend"}
                        onClick={()=>{
                            navigate("/invite-friends")
                        }}
                    />
                </div>
                <div className=' grid  lg:grid-cols-2 grid-cols-1 gap-x-6 gap-y-4 my-6'>
                    {
                        users.map((user, index) => (
                            <FriendsCard data={user} key={index}/>
                        ))
                    }
                </div>

            </div>
        </div>
    )
}

export default Friends