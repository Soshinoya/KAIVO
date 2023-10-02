import useInput from './useInput'

function useInputExample() {
    const inputName = useInput('')

    return (
        <div className="example">
            <h1>This is useInput custom hook</h1>
            <input {...inputName} placeholder='Name' />
        </div>
    )
}

export default useInputExample