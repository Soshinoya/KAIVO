import React from "react"

const LeaveIcon = ({ style, strokeColor = '#CBD5E1' }) => {
    return (
        <svg style={style} xmlns="http://www.w3.org/2000/svg" width="14" height="15" viewBox="0 0 14 15" fill="none">
            <path d="M9.5 11.2083V13.2083C9.5 13.4735 9.39464 13.7278 9.20711 13.9154C9.01957 14.1029 8.76522 14.2083 8.5 14.2083H1.5C1.23478 14.2083 0.98043 14.1029 0.792893 13.9154C0.605357 13.7278 0.5 13.4735 0.5 13.2083V2.20825C0.5 1.94304 0.605357 1.68868 0.792893 1.50115C0.98043 1.31361 1.23478 1.20825 1.5 1.20825H8.5C8.76522 1.20825 9.01957 1.31361 9.20711 1.50115C9.39464 1.68868 9.5 1.94304 9.5 2.20825V4.20825" stroke={strokeColor} strokeLinecap="round" strokeLinejoin="round" />
            <path d="M6.5 7.70825H13.5" stroke={strokeColor} strokeLinecap="round" strokeLinejoin="round" />
            <path d="M11.5 5.70825L13.5 7.70825L11.5 9.70825" stroke={strokeColor} strokeLinecap="round" strokeLinejoin="round" />
        </svg>
    )
}

export default LeaveIcon