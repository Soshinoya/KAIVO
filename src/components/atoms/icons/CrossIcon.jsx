import React from "react"

const CrossIcon = ({ style, strokeColor = '#CBD5E1' }) => {
    return (
        <svg style={style} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 14 14" fill="none">
            <path d="M13.5 0.5L0.5 13.5" stroke={strokeColor} strokeLinecap="round" strokeLinejoin="round" />
            <path d="M0.5 0.5L13.5 13.5" stroke={strokeColor} strokeLinecap="round" strokeLinejoin="round" />
        </svg>
    )
}

export default CrossIcon