import useConfirm from './useConfirm'

function useConfirmExample() {
    const deleteAll = () => console.log('Удалено')

    const abort = () => console.log('Отменено')

    const confirmDelete = useConfirm('Вы уверены?', deleteAll, abort)

    return (
        <div className="useConfirmExample">
            <h1>This is useConfirm custom hook</h1>
            <button onClick={confirmDelete}>Удалить</button>
        </div>
    )
}

export default useConfirmExample