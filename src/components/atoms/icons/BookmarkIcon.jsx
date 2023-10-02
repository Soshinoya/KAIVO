import React from "react"

const BookmarkIcon = ({ style, strokeColor = '#CBD5E1' }) => {
    return (
        <svg style={style} xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 30 30" fill="none">
            <path d="M10.7142 6.42859H19.2856C19.6645 6.42859 20.0279 6.5791 20.2958 6.84701C20.5637 7.11492 20.7142 7.47828 20.7142 7.85716V25L14.9999 19.2857L9.28564 25V7.85716C9.28564 7.47828 9.43615 7.11492 9.70406 6.84701C9.97197 6.5791 10.3353 6.42859 10.7142 6.42859Z" stroke={strokeColor} strokeLinecap="round" strokeLinejoin="round" />
        </svg>
    )
}

export default BookmarkIcon