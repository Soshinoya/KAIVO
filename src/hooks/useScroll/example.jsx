import useScroll from './useScroll'

function useScrollExample() {
    const { y } = useScroll()

    return (
        <div className="useScrollExample" style={{ height: '1000vh' }}>
            <h1 style={{ position: 'fixed', color: y > 400 ? 'red' : 'blue' }}>This is useNetwork custom hook</h1>
        </div>
    )
}

export default useScrollExample