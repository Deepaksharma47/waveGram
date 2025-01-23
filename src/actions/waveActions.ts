import { useMutation, useQuery } from "@tanstack/react-query";
import apiClient from "../apis/apiClient";
import { api } from "../apis/apies";
import { setLoading } from "../Slices/userSlice";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { AxiosError } from "axios";
import { InviteFriendInterface } from "../Pages/inviteFriend/InviteFriends";

type Filters = {
    limit?: number;
    page?: number;
    [key: string]: unknown; // Adjust as needed
};
// Search My Wave Qurery
const fetchSearchResults = async (search: string, filters: Filters) => {
    const { data } = await apiClient.get(api.getMyWave, {
        params: { search: search || "", ...filters }, // Include search and filters
    });
    return data;
};

export const useSearchQuery = (search: string, filters: Filters) => {
    return useQuery({
        queryKey: ["search", search, filters],
        queryFn: () => fetchSearchResults(search, filters),
        staleTime: 2 * 60 * 1000
    }
    );
};


export const useInviteFriend = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    return useMutation({
        mutationKey: ["invite-friend"],
        mutationFn: async (data:InviteFriendInterface) => {
            dispatch(setLoading(true))
            const response = await apiClient.post(api.inviteFriend, data);
            return response.data;
        },
        onSuccess: () => {
            toast.success("Invitation sent successfully");
            navigate("/friends")
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
            dispatch(setLoading(false))
        }
    })
}