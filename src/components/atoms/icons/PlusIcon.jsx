import React from "react"

const PlusIcon = ({ style, strokeColor = '#CBD5E1' }) => {
    return (
        <svg style={style} xmlns="http://www.w3.org/2000/svg" width="14" height="15" viewBox="0 0 14 15" fill="none">
            <path d="M7 1V14" stroke={strokeColor} strokeLinecap="round" strokeLinejoin="round" />
            <path d="M0.5 7.45996H13.5" stroke={strokeColor} strokeLinecap="round" strokeLinejoin="round" />
        </svg>
    )
}

export default PlusIcon