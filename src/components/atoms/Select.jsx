import React, { useState, useRef, useEffect } from 'react'

import { hoverEffect } from "../../utils/hoverEffect"

import ArrowDownIcon from './icons/ArrowDownIcon'

const Select = ({ options, selectedValue, onChange }) => {

    const selectRef = useRef(null)
    const spanRef = useRef(null)

    useEffect(() => {
        hoverEffect(selectRef, spanRef)
    }, [selectRef, spanRef])

    const [isOpen, setIsOpen] = useState(false)

    const handleOptionClick = value => {
        setIsOpen(false)
        onChange && onChange(value)
    }

    const toggleSelect = () => setIsOpen(!isOpen)

    const handleOutsideClick = ({ target }) => {
        if (selectRef.current && !selectRef.current.contains(target)) {
            setIsOpen(false)
        }
    }

    // Добавляем обработчик клика вне селектора для закрытия при щелчке вне компонента
    useEffect(() => {
        document.addEventListener('click', handleOutsideClick)

        return () => {
            document.removeEventListener('click', handleOutsideClick)
        }
    }, [])

    return (
        <div className="select__wrapper body-small">
            <div className="panel select" ref={selectRef} onClick={toggleSelect}>
                <p className="select__option">
                    {options?.find(obj => obj.value === selectedValue)?.label}
                </p>
                <ArrowDownIcon style={{ width: '10px', height: '6px' }} />
                <span style={{ zIndex: -1 }} ref={spanRef}></span>
            </div>
            {isOpen && (
                <div className="panel select__options">
                    {options?.map(({ value, id, label }) => (
                        <p
                            key={id}
                            className="select__option"
                            onClick={() => handleOptionClick(value)}
                        >
                            {label}
                        </p>
                    ))}
                </div>
            )}
        </div>
    )
}

export default Select