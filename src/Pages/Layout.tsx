import Header from "../components/Header"
import Sidebar from "../components/Sidebar"

interface UserProfileProps {
  children?: React.ReactNode; // This allows passing any React component as children
}

const Layout: React.FC<UserProfileProps> = ({ children }) => {


  return (
    <div className=" flex flex-row h-screen">
      <div className=" md:w-1/4 w-0 ease-in-out duration-200">
        <Sidebar />
      </div>
      <div className="flex flex-col w-full h-screen"> 
        {/* Header */}
        <div className="flex-shrink-0">
          <Header />
        </div>
        {/* Scrollable Children */}
        <div className="flex-grow overflow-y-auto bg-grayBackground">
          {children}
        </div>
      </div>
    </div>
  )
}

export default Layout