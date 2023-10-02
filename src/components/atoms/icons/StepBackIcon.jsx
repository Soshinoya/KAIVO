import React from "react"

const StepBackIcon = ({ style, strokeColor = '#CBD5E1' }) => {
    return (
        <svg style={style} xmlns="http://www.w3.org/2000/svg" width="18" height="14" viewBox="0 0 18 14" fill="none">
            <path d="M4.79843 1.50877L1.13965 5.17121L4.79965 8.83121" stroke={strokeColor} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M7.23965 12.4912H13.3396C15.7796 12.4912 16.9996 11.2712 16.9996 8.8312C16.9996 6.3912 15.7796 5.1712 13.3396 5.1712H1.13965" stroke={strokeColor} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
    )
}

export default StepBackIcon