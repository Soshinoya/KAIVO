import React, { useRef, useState } from 'react'

import useInput from '../../hooks/useInput/useInput'

const InputBordered = ({ type, name, required, initialValue = '', placeholder, errors }) => {

    const [input, setInput] = useState(useRef(null))

    const { value, onChange } = useInput(initialValue)

    const errorMessage = errors?.find(o => o.name === name)?.message

    return (
        <div>
            <input
                ref={e => setInput(e)}
                required={required}
                value={value}
                onChange={onChange}
                className={`input-bordered body-small ${errorMessage ? 'input-bordered--error' : ''}`}
                autoComplete='off'
                placeholder={placeholder}
                type={type}
                name={name}
            />
            <span className='input-bordered__span--error body-small'>{errorMessage}</span>
        </div>
    )
}

export default InputBordered