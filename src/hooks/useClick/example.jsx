import useClick from './useClick'

function useClickExample() {
    const title = useClick(() => title.current.innerText = 'clicked!')

    return (
        <div className="useClickExample">
            <h1 ref={title}>This is useClick custom hook</h1>
        </div>
    )
}

export default useClickExample