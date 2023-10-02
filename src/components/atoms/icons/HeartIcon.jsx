import React from "react"

const HeartIcon = ({ style, strokeColor = '#CBD5E1' }) => {
    return (
        <svg style={style} xmlns="http://www.w3.org/2000/svg" width="22" height="21" viewBox="0 0 22 21" fill="none">
            <path d="M11 4.28572C11.7143 0.714294 17.2043 0.490008 19.5714 2.85715C21.8614 5.14715 21.7143 9.04858 19.5714 11.4286L11 20L2.42855 11.4286C1.29204 10.2919 0.653564 8.75028 0.653564 7.14287C0.653564 5.53545 1.29204 3.99386 2.42855 2.85715C4.64284 0.642865 10.2857 0.714294 11 4.28572Z" stroke={strokeColor} strokeLinecap="round" strokeLinejoin="round" />
        </svg>
    )
}

export default HeartIcon