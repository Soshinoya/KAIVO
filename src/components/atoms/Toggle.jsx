import React from 'react'

import useInput from '../../hooks/useInput/useInput'

const Toggle = ({ name = '', checked, setChecked }) => {

    const { value, onChange } = useInput(checked)

    const onChangeHandler = e => {
        onChange({ target: { value: e.target.checked } })
        setChecked(e.target.checked)
    }

    return (
        <input
            name={name}
            type='checkbox'
            className='toggle-switch'
            checked={value}
            value={value}
            onChange={onChangeHandler}
        />
    )
}

export default Toggle
