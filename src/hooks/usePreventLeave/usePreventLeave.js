const usePreventLeave = () => {
    const listener = e => {
        e.preventDefault()
        e.returnValue = ''
    }
    const disablePrevent = () => window.removeEventListener('beforeunload', listener)
    const enablePrevent = () => window.addEventListener('beforeunload', listener)
    return { enablePrevent, disablePrevent }
}

export default usePreventLeave