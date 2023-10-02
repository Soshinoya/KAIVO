import defaultAxios from 'axios'
import { useEffect, useState } from 'react'

const useAxios = (opts, axiosInstance = defaultAxios) => {
    const [state, setState] = useState({
        loading: true,
        error: null,
        data: null
    })
    const [trigger, setTrigger] = useState(0)
    const refetch = () => {
        setState({
            ...state,
            loading: true
        })
        setTrigger(Date.now)
    }
    useEffect(() => {
        axiosInstance(opts)
            .then((data) => {
                setState({
                    ...state,
                    data,
                    loading: false
                })
            })
            .catch((error) => {
                setState({
                    ...state,
                    error,
                    loading: false
                })
            })
    }, [trigger])
    return { ...state, refetch }
}

export default useAxios