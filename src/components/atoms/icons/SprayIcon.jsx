import React from "react"

const SprayIcon = ({ style, strokeColor = '#CBD5E1' }) => {
    return (
        <svg style={style} viewBox="0 0 50 50" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M19.6429 16.0714H5.35719C3.38475 16.0714 1.78577 17.6704 1.78577 19.6429V44.6429C1.78577 46.6153 3.38475 48.2143 5.35719 48.2143H19.6429C21.6154 48.2143 23.2143 46.6153 23.2143 44.6429V19.6429C23.2143 17.6704 21.6154 16.0714 19.6429 16.0714Z" stroke={strokeColor} strokeLinecap="round" strokeLinejoin="round" />
            <path d="M12.5 7.14286V16.0714" stroke={strokeColor} strokeLinecap="round" strokeLinejoin="round" />
            <path d="M30.3572 5.35714L48.2143 1.78572" stroke={strokeColor} strokeLinecap="round" strokeLinejoin="round" />
            <path d="M30.3572 12.5L48.2143 16.0714" stroke={strokeColor} strokeLinecap="round" strokeLinejoin="round" />
            <path d="M8.92859 7.14286H16.0714" stroke={strokeColor} strokeLinecap="round" strokeLinejoin="round" />
        </svg>
    )
}

export default SprayIcon