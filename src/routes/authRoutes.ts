import Form from "../Pages/Form";
import Login from "../Pages/login/Login";
// import OtpVerify from "../Pages/otpVerification/OtpVerify";
import SingUp from "../Pages/signup/SingUp";

const AuthRoutes = [
    {
        path: '/',
        layout: Form,
        component: SingUp ,
    },
    {
        path: '/login',
        layout: Form,
        component: Login,
    }
    ,
];

export default AuthRoutes;