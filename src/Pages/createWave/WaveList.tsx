import { useState } from 'react'
import SearchFilter from '../../components/common/SearchFilter'
import { useSearchQuery } from '../../actions/waveActions';
import WaveDisplayCard from '../../components/common/WaveDisplayCard';
import { WaveInterface } from '../../interfaces/interfaces';
// import { useQueryClient } from '@tanstack/react-query';

const WaveList = () => {
    // const queryClient = useQueryClient()
    const [params, setParams] = useState<{ search: string; limit: number; page: number }>({
        search: "",
        limit: 4, // Default limit
        page: 1,   // Default page
    });


    const { data, isLoading, isError,error } = useSearchQuery(params.search, {
        limit: params.limit,
        page: params.page,
    });

    const handleSearch = (payload: { search: string }) => {
        setParams((prev) => ({ ...prev, search: payload.search })); // Update search param
    };

    if (isLoading) {
        return (
            <div className="absolute inset-0 flex items-center justify-center bg-white bg-opacity-75 z-10">
                    <div className="loader"></div> {/* Spinner styles */}
                </div>
        )
    }
    if(isError){
        console.log(error)
    }
    return (
        <div className=' flex flex-col gap-5'>
            <SearchFilter onSearch={handleSearch} searchTitle='Search' value = {params.search} />
            <div className='flex flex-col gap-4'>
            {
                data && data?.data?.map((wave : WaveInterface,index:number) =>{
                    return (
                        <WaveDisplayCard data={wave} key={index}/>
                    )
                })
            }
            </div>

        </div>
    )
}

export default WaveList