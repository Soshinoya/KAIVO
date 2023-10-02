import React from "react"

const MoreActionsIcon = ({ style, fillColor = '#94A3B8' }) => {
    return (
        <svg style={style} xmlns="http://www.w3.org/2000/svg" width="25" height="6" viewBox="0 0 25 6" fill="none">
            <path d="M22.5 5.5C23.8805 5.5 25 4.3805 25 3C25 1.6195 23.8805 0.5 22.5 0.5C21.1195 0.5 20 1.6195 20 3C20 4.3805 21.1195 5.5 22.5 5.5Z" fill={fillColor} />
            <path d="M12.5 5.5C13.8805 5.5 15 4.3805 15 3C15 1.6195 13.8805 0.5 12.5 0.5C11.1195 0.5 10 1.6195 10 3C10 4.3805 11.1195 5.5 12.5 5.5Z" fill={fillColor} />
            <path d="M2.5 5.5C3.8807 5.5 5 4.3805 5 3C5 1.6195 3.8807 0.5 2.5 0.5C1.1193 0.5 0 1.6195 0 3C0 4.3805 1.1193 5.5 2.5 5.5Z" fill={fillColor} />
        </svg>
    )
}

export default MoreActionsIcon