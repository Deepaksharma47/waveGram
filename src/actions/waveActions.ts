import { useQuery } from "@tanstack/react-query";
import apiClient from "../apis/apiClient";
import { api } from "../apis/apies";

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
        staleTime: 2*60*1000
    }
    );
};