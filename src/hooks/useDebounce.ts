import { useEffect, useState } from "react"

const useDebounce = (value: string, time: number) => {

    const [valueState, setValueState] = useState(value);

    useEffect(() => {
        const timeout = setTimeout(() => {
            setValueState(value)
        }, time);

        return () => clearTimeout(timeout)
    }, [value, time])

    return valueState
}

export default useDebounce