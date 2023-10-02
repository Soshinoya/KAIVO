import React, { useRef } from 'react'
import { useNavigate } from 'react-router-dom'

import useInput from '../../hooks/useInput/useInput'

import MagnifyingIcon from './icons/MagnifyingIcon'
import CrossIcon from './icons/CrossIcon'

const Input = ({ type = 'text', name = 'search', required, placeholder = 'Search for news...' }) => {

    const inputRef = useRef(null)

    const { value, onChange } = useInput('')

    const navigate = useNavigate()

    // Ассинхронная функция для поиска 
    const handleKeyPress = (e) => {
        if (e.key === 'Enter') {
            value[0] === '#' ? navigate(`/search?tag=${value.slice(1, value.length)}`) : navigate(`/search?query=${value}`)
        }
    }

    return (
        <div className='input__outer'>
            <div className={`input__wrapper`}>
                <label htmlFor={name}>
                    <MagnifyingIcon style={{ width: '14px', height: '14px' }} />
                </label>
                <input
                    ref={inputRef}
                    required={required}
                    value={value}
                    onChange={onChange}
                    onKeyPress={handleKeyPress}
                    className={`input body-medium`}
                    autoComplete='off'
                    placeholder={placeholder}
                    type={type}
                    name={name}
                />
            </div>
            <div className='input__cross' onClick={() => onChange({ target: { value: '' } })}>
                <CrossIcon style={{ width: '14px', height: '14px' }} />
            </div>
        </div>
    )
}

export default Input