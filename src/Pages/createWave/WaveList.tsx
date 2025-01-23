import { useEffect, useState } from 'react'
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


    const { data, isLoading, isFetching, isError, error, refetch } = useSearchQuery(params.search, {
        limit: params.limit,
        page: params.page,
    });

    const handleSearch = (payload: { search: string }) => {
        setParams((prev) => ({ ...prev, search: payload.search })); // Update search param
        refetch()
    };

    useEffect(()=>{
        refetch()
    },[])

    if (isError) {
        console.log(error)
    }
    return (
        <div className=' flex flex-col gap-5'>
            <SearchFilter onSearch={handleSearch} searchTitle='Search' />
            <div className='flex flex-col gap-4'>
                {(isLoading || isFetching) ? (
                    <div className="flex justify-center items-center">
                        <p>Loading...</p> {/* Replace with a loader component if available */}
                    </div>
                ) : (
                    data && data.data.map((wave: WaveInterface, index: number) => (
                        <WaveDisplayCard data={wave} key={index} />
                    ))
                )}
            </div>

        </div>
    )
}

export default WaveList