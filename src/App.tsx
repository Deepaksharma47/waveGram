import {Route, Routes} from 'react-router-dom'
import { useEffect, useState } from 'react';
import AuthRoutes from './routes/authRoutes';
import  NothingFoundBackground  from './Pages/notFoundImage/NotFoundImage';
import { useDispatch, useSelector } from 'react-redux';
import adminRoutes from './routes/adminRoutes';
import { RootState } from './interfaces/interfaces';
// import { useQuery } from '@tanstack/react-query';
import apiClient from './apis/apiClient';
import { api } from './apis/apies';
// import { getAccessToken } from './actions/token.action';
import { setLoading,setLoggedIn, setUser, setUserType } from './Slices/userSlice';
import Loading from './components/Loading';
// import { useGetProfile, useLogout } from './actions/user';
// import { setLoading, setUser, setUserType } from './Slices/userSlice';

interface route{
  path: string;
  layout:React.FC<{ children: React.ReactNode }>;
  component:React.FC;
}



function App() {
  const dispatch = useDispatch()
  const {user,isLoggedIn,isLoading,token} = useSelector((state:RootState) => state.Auth);

  const [initialRoutes, setInitialRoutes] = useState<Array<route>|null>()

  useEffect(()=>{
    const fetchData = async () => {
      dispatch(setLoading(true))
      const response = await apiClient.get(api.getProfile);
      dispatch(setLoggedIn(true))
      dispatch(setUser(response?.data?.data))
      dispatch(setUserType(response?.data?.data?.roleId))
      dispatch(setLoading(false))
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

  if(isLoading){
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
