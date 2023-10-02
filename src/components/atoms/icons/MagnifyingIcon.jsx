import React from "react"

const MagnifyingIcon = ({ style, strokeColor = '#CBD5E1' }) => {
    return (
        <svg style={style} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 14 14" fill="none">
            <path d="M6 11.5C9.03757 11.5 11.5 9.03757 11.5 6C11.5 2.96243 9.03757 0.5 6 0.5C2.96243 0.5 0.5 2.96243 0.5 6C0.5 9.03757 2.96243 11.5 6 11.5Z" stroke={strokeColor} strokeLinecap="round" strokeLinejoin="round" />
            <path d="M13.5 13.5L10 10" stroke={strokeColor} strokeLinecap="round" strokeLinejoin="round" />
        </svg>
    )
}

export default MagnifyingIcon