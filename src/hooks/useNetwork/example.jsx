import useNetwork from './useNetwork'

function useNetworkExample() {
    const handleOnlineChange = online => console.log(online ? 'online' : 'offline');
    const isOnline = useNetwork(handleOnlineChange)

    return (
        <div className="useNetworkExample">
            <h1>This is useNetwork custom hook</h1>
            <h2>{isOnline ? 'You`re online' : 'You`re offline'}</h2>
        </div>
    )
}

export default useNetworkExample