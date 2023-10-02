import usePreventLeave from './usePreventLeave'

function usePreventLeaveExample() {
    const { enablePrevent, disablePrevent } = usePreventLeave()

    return (
        <div className="usePreventLeaveExample">
            <h1>This is usePreventLeave custom hook</h1>
            <button onClick={enablePrevent}>Защитить</button>
            <button onClick={disablePrevent}>Не защищать</button>
        </div>
    )
}

export default usePreventLeaveExample