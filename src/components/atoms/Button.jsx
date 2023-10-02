import React, { useEffect, useRef } from 'react'

import { hoverEffect } from '../../utils/hoverEffect'

const Button = ({ type = 'button', size, text = 'Click', onClick, disabled }) => {

    const buttonRef = useRef(null)
    const spanRef = useRef(null)

    useEffect(() => {
        hoverEffect(buttonRef, spanRef)
    }, [buttonRef, spanRef])

    const sizeClasses = ['button-small body-small',
        'button-medium body-medium',
        'button-large']

    const getSizeClass = () => {
        switch (size) {
            case 'small':
                return sizeClasses[0];
            case 'medium':
                return sizeClasses[1];
            case 'large':
                return sizeClasses[2];
            default:
                return sizeClasses[1];
        }
    }

    return (
        <button
            disabled={disabled}
            className={`button ${getSizeClass()}`}
            type={type}
            onClick={onClick}
            ref={buttonRef}
        >
            <span ref={spanRef}></span>
            <p>{text}</p>
        </button>
    )
}

export default Button