import React from "react"

const RoadIcon = ({ style, strokeColor = '#CBD5E1' }) => {
    return (
        <svg style={style} viewBox="0 0 52 52" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M1 51L13 1" stroke={strokeColor} strokeLinecap="round" strokeLinejoin="round" />
            <path d="M26 1V9" stroke={strokeColor} strokeLinecap="round" strokeLinejoin="round" />
            <path d="M26 22V30" stroke={strokeColor} strokeLinecap="round" strokeLinejoin="round" />
            <path d="M26 43V51" stroke={strokeColor} strokeLinecap="round" strokeLinejoin="round" />
            <path d="M51 51L39 1" stroke={strokeColor} strokeLinecap="round" strokeLinejoin="round" />
        </svg>

    )
}

export default RoadIcon