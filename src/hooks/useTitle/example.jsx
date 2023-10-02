import useTitle from './useTitle'

function useTitleExample() {
    const titleUpdater = useTitle('Загрузка...')

    setTimeout(() => titleUpdater('React'), 2000)

    return (
        <div className="useTitleExample">
            <h1>This is useTitle custom hook</h1>
        </div>
    )
}

export default useTitleExample