// import { useDispatch } from "react-redux";
import { BasicDetailInterface, loginInterface, signupInterface } from "../interfaces/interfaces";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { api } from "../apis/apies";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { setLoggedIn, setUserType, logout, setUser, setLoading } from "../Slices/userSlice"
import apiClient from "../apis/apiClient";
import { AxiosError } from "axios";
import { setAccessToken } from "./token.action";


//custom hooks for signUp
export const useSingUp = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    return useMutation({
        mutationKey: ['signup'],
        mutationFn: async (data: signupInterface) => {
            dispatch(setLoading(true))

            console.log("data,data,data", data)
            const response = await apiClient.post(api.signupUrl, data);
            console.log(response);
            return response.data;
        },
        onSuccess: (response) => {
            setTimeout(() => {
                dispatch(setLoading(false))
                toast.success("Register Success");
                navigate("/login", {
                    state: { email: response?.data?.email }
                })
            }, 500);

        },
        onError: (err) => {
            if (err instanceof AxiosError && err.response) {
                toast.error(err.response?.data?.message)
            } else {
                console.error('An unexpected error occurred');
            }
            console.log(err)
        }
    })
}

// login service
export const useLogin = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate()
    return useMutation({
        mutationKey: ['login'],
        mutationFn: async (data: loginInterface) => {
            dispatch(setLoading(true));
            console.log("apiurl apiurl apiurl")
            const response = await apiClient.post(api.loginUrl, data)
            return response.data;
        },
        onSuccess: (response) => {
            console.log(response.data)
            setAccessToken(response?.token)
            dispatch(setUser(response?.data))
            dispatch(setUserType(response?.data?.roleId))
            dispatch(setLoggedIn(true));
            setTimeout(() => {
                dispatch(setLoading(false))
                toast.success("logged In")
            }, 1000)

            navigate("/dashboard")
        },
        onError: (err) => {
            if (err instanceof AxiosError && err.response) {
                toast.error(err.response?.data?.message)
            } else {
                console.error('An unexpected error occurred');
            }
            dispatch(logout())
        }
    })
}

// getUserProfile for rendering

// const getProfileFn = async () => {
//     const response = await apiClient.get(api.getProfile)
//     console.log(response)
//     return response.data
// }
// export const getMyProfile = () => {
//     return (dispatch: any) => {
//         try {
//             getProfileFn()
//                 .then((response) => {
//                     dispatch(setLoggedIn(true))
//                     dispatch(setUser(response?.data?.data))
//                     dispatch(setUserType(response?.data?.data?.roleId))
//                     dispatch(setLoading(false))
//                 }).catch(() => {
//                     dispatch(logout())
//                 })
//         } catch (err) {
//             if(err){
//                 dispatch(logout())
//             }
//         }
//     }
// }

export const useUpdateProfile = () => {
    const dispatch = useDispatch()
    return useMutation({
        mutationKey: ["udpateProfile"],
        mutationFn: async (data: BasicDetailInterface) => {
            dispatch(setLoading(true));
            const response = await apiClient.put(api.updateProfile, data)
            return response?.data
        },
        onSuccess: (response) => {
            // getMyProfile();
            dispatch(setUser(response?.data));
            setTimeout(() => {
                dispatch(setLoading(false))
            }, 500);
        },
        onError: (err) => {
            if (err instanceof AxiosError && err.response) {
                toast.error(err.response?.data?.message)
            } else {
                console.error('An unexpected error occurred');
            }
            dispatch(logout())
        }
    })
}
// const dispatch = useDispatch();
//     // dispatch(setLoading(true))
//     return useQuery({
//         queryKey:["getProfile"],
//         queryFn: getProfileFn,
//         staleTime:5000
//     })
// }
// const dispatch = useDispatch()
// return useQuery(["getProfile"],getProfileFn,{
//     onSuccess: (response) => {
//         dispatch(setUser(response?.data))
//         dispatch(setUserType(response?.data?.roleId))
//         dispatch(setLoading(false))
//     },
// })}
//         queryKey: ['getProfile'],
//         queryFn: async () =>{
//             const response =  await apiClient.get(api.getProfile)
//             console.log(response)
//             return response.data
//         },
//         onSuccess: (response) => {
//             dispatch(setUser(response?.data))
//             dispatch(setUserType(response?.data?.roleId))
//             dispatch(setLoading(false))
//         },
//         onError:(err) => {
//             if (err instanceof AxiosError && err.response) {
//                 toast.error(err.response?.data?.message)
//             } else {
//                 console.error('An unexpected error occurred');
//             }
//             dispatch(logout())
//         }
//     })
// }

// Logout hook
export const useLogout = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate()
    return useMutation({
        mutationKey: ['logout'],
        mutationFn: async () => {
            dispatch(setLoading(true));
            // await apiClient.post(api.logout)
        },
        onSuccess: () => {
            dispatch(logout());

            setTimeout(() => {
                dispatch(setLoading(false))
                toast.success("Logged out")
            }, 700)
            navigate("/login")
        },
        onError: (err) => {
            if (err instanceof AxiosError && err.response) {
                toast.error(err.response?.data?.message)
            } else {
                console.error('An unexpected error occurred');
            }
            dispatch(logout())

        }
    })
}


export const useCreateWave = () => {
    const queryClient = useQueryClient()
    const dispatch = useDispatch()
    return useMutation({
        mutationKey: ['createWave'],
        mutationFn: async (data:FormData) => {
            dispatch(setLoading(true))
            const response = await apiClient.post(api.createWave, data)
            return response.data
        },
        onSuccess: () => {
            queryClient.invalidateQueries(['search'])
            dispatch(setLoading(false))
            toast.success("Wave created")
        },
        onError: (err) => {
            if (err instanceof AxiosError && err.response) {
                toast.error(err.response?.data?.message)
            } else {
                console.error('An unexpected error occurred');
            }
            dispatch(setLoading(false))
        }
    })
}
// export const checkuser = (callback: unknown) => {
//     return (dispatch:unknown) => {
//         const tokenRaw: unknown= getAccessToken();

//         try {
//             if (tokenRaw) {
//                 apiClient.get(
//                     `/user/get-profile`,

//                 ).then((response: any) => {
//                     if (response.status === 200) {
//                         const actionData = {
//                             ...response,
//                             data: response?.user,
//                         };
//                         dispatch(loginSuccess(actionData));
//                        return callback(response);
//                     } else if (response.status === 404 || response.status === 401) {
//                         dispatch(loginFailed(response));
//                        return callback(response);
//                     } else {
//                         dispatch(loginFailed(response));
//                         return callback(response);
//                     }
//                 }).catch((error:any)=> {
//                     dispatch(loginFailed(error));
//                     return callback(error);
//                 });
//             }
//         } catch (err) {
//             if (err) {
//                 dispatch(loginFailed(err));
//             }
//         }
//     };
// };





// export const userLogin = (data: any, callback: any) => {
//     return (dispatch: any) => {
//         dispatch(handleLoading(true));
//         ApiClient.post(`${apiUrl}${PORT}${version}/admin/login`, data).then(
//             (response: any) => {
//                 if (response.status === 200 || response.status === 201) {
//                     dispatch(loginSuccess(response));
//                     setAccessToken(response?.token);
//                     if (response?.token) {
//                         setAuthorizationToken(axios, response?.token);
//                         sessionStorage.setItem('token', response?.token)
//                     }
//                     dispatch(handleLoading(false));
//                     return callback(response);
//                 } else if (response.status === 404) {
//                     openNotificationWithIcon('error', response.message);
//                     dispatch(handleLoading(false));
//                     // return callback(response);
//                 } else {
//                     openNotificationWithIcon('error', response.message);
//                     dispatch(handleLoading(false));
//                 }
//             }
//         );
//     };
// };
