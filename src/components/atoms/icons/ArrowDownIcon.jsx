import React from "react"

const ArrowDownIcon = ({ style, strokeColor = '#CBD5E1' }) => {
    return (
        <svg style={style} xmlns="http://www.w3.org/2000/svg" width="12" height="7" viewBox="0 0 12 7" fill="none">
            <path d="M1 0.5L6 6.5L11 0.5" stroke={strokeColor} strokeLinecap="round" strokeLinejoin="round" />
        </svg>
    )
}

export default ArrowDownIcon