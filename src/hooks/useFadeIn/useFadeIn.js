import { useEffect, useRef } from "react"

const useFadeIn = (duration = 3, delay = 0) => {
    const element = useRef()

    useEffect(() => {
        if (element.current) {
            const { current } = element
            current.style.transition = `opacity ${duration}s ease-in-out ${delay}s`
            current.style.opacity = 1
        }
    }, [element])

    return {
        ref: element,
        style: { opacity: 0 }
    }
}

export default useFadeIn