import useNotifications from './useNotifications'

function useNotificationExample() {
    const triggerNotif = useNotifications('Can I send notification?', {
        body: 'What`s wrong?...'
    })

    return (
        <div className="useNotificationExample">
            <h1>This is useNotifications custom hook</h1>
            <button onClick={triggerNotif}>Send notification</button>
        </div>
    )
}

export default useNotificationExample