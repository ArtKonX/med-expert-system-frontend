import React from 'react';

import { useEffect, useState } from "react"

const Loader = (
    { dataLoading }: { dataLoading: string[] }) => {

    const [loadingText, setLoadingText] = useState<string | null>(null);
    const [countLoading, setCountLoading] = useState(0)

    useEffect(() => {
        const intervalId = setInterval(() => {
            setCountLoading(prev => dataLoading.length - 1 > prev ? prev + 1 : 0)
        }, 7000)

        return () => clearInterval(intervalId)
    }, [])

    useEffect(() => {
        setLoadingText(dataLoading[countLoading])
    }, [countLoading, setCountLoading])

    return (
        <div className='bg-black/50 absolute w-full h-full
        top-0 left-0 flex items-center
        justify-center z-50'>
            <span className="max-sm:text-2xl text-blue-100 text-4xl font-bold animate-pulse">
                {loadingText}
            </span>
        </div>
    )
}

export default Loader