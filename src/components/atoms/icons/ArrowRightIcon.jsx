import React from "react"

const ArrowRightIcon = ({ style, strokeColor = '#94A3B8' }) => {
    return (
        <svg style={style} xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
            <path d="M0.714338 10L19.2858 10" stroke={strokeColor} strokeLinecap="round" strokeLinejoin="round" />
            <path d="M14.2858 15L19.2858 10L14.2858 5" stroke={strokeColor} strokeLinecap="round" strokeLinejoin="round" />
        </svg>
    )
}

export default ArrowRightIcon