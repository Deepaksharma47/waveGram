import {Route, Routes} from 'react-router-dom'
import { useEffect, useState } from 'react';
import AuthRoutes from './routes/authRoutes';
import  NothingFoundBackground  from './Pages/notFoundImage/NotFoundImage';
import { useDispatch, useSelector } from 'react-redux';
import adminRoutes from './routes/adminRoutes';
import { RootState } from './interfaces/interfaces';
import apiClient from './apis/apiClient';
import { api } from './apis/apies';
import { logout, setLoading,setLoggedIn, setUser, setUserType } from './Slices/userSlice';
import Loading from './components/Loading';
interface route{
  path: string;
  layout:React.FC<{ children: React.ReactNode }>;
  component:React.FC;
}



function App() {
  const dispatch = useDispatch()
  const {user,isLoggedIn,isLoading,token} = useSelector((state:RootState) => state.Auth);

  const [initialRoutes, setInitialRoutes] = useState<Array<route>|null>()

  const [loader, setLoader] = useState(true)

  useEffect(()=>{
    const fetchData = async () => {
      try{
        dispatch(setLoading(true))
        const response = await apiClient.get(api.getProfile);
        dispatch(setLoggedIn(true))
        dispatch(setUser(response?.data?.data))
        dispatch(setUserType(response?.data?.data?.roleId))
        dispatch(setLoading(false))
      } catch(err){
        console.log(err)
        dispatch(logout())
      }
    };
    if(token){
      fetchData()
    }
  },[token])

  useEffect(()=>{

    if(isLoggedIn){
      if(user?.roleId === 1){
        setInitialRoutes(adminRoutes)
      }
    }
    else{
      setInitialRoutes(AuthRoutes)
    }
  },[isLoggedIn,user?.roleId])

  setTimeout(()=>{
    setLoader(false)
  },1000)

  if(isLoading || loader){
    return(
      <Loading/>
    )
  }

  return (
    <div>
      <Routes>
          {initialRoutes?.map((route: route, index:number) => {
              const { layout: Layout, component: Component } = route;
              return (
                  <Route
                      key={index}
                      path={route.path}
                      element={

                          <Layout>
                              <Component />
                          </Layout>
                      }
                  />
              );
          })}
          {/* Add a not found route */}
          <Route path="*" element={<NothingFoundBackground/>}/>
      </Routes>
    </div>
  )
} 

export default App
