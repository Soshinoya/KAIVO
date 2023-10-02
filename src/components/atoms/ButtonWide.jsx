import React, { useEffect, useRef } from "react"

import { hoverEffect } from "../../utils/hoverEffect"

const ButtonWide = ({ type = 'button', text = 'Click', onClick, disabled }) => {

    const buttonRef = useRef(null)
    const spanRef = useRef(null)

    useEffect(() => {
        hoverEffect(buttonRef, spanRef)
    }, [buttonRef, spanRef])

    return (
        <button
            disabled={disabled}
            className="button-wide body-small"
            type={type}
            onClick={onClick}
            ref={buttonRef}
        >
            <span ref={spanRef}></span>
            <p>{text}</p>
        </button>
    )
}

export default ButtonWide