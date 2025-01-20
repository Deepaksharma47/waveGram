import Layout from "../Pages/Layout";
import Dashboard from "../Pages/dashboard/Dashboard";
import Friends from "../Pages/friends/Friends";
import InviteFriend from "../Pages/inviteFriend/InviteFriends";
import Profile from "../Pages/profile/Profile";

const adminRoutes = [
    {
        path: '/dashboard',
        layout: Layout,
        component: Dashboard ,
    },
    {
        path: '/my-profile',
        layout: Layout,
        component: Profile,
    },
    {
        path: '/friends',
        layout: Layout,
        component: Friends,
    },
    {
        path: '/invite-friends',
        layout: Layout,
        component: InviteFriend,
    }
    
];

export default adminRoutes;