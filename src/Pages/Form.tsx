// import imageLogo from "../assets/logo.png"
import waveFrontImage from "../assets/wave_front.png"

interface FormProps {
  children: React.ReactNode;
}

const Form: React.FC<FormProps> = ({ children }) => {
  return (
    <div>
      <div className=' h-screen flex flex-row'>
          <img src={waveFrontImage} alt="logo" className=" w-[50%] lg:flex hidden object-cover" />
        <div className=' lg:w-[50%] w-full bg-white p-9 md:px-28 lg:px-10 items-center justify-center overflow-y-auto'>
          {children}
        </div>
      </div>
    </div>
  )
}


export default Form