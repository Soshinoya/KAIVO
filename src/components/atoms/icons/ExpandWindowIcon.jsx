import React from "react"

const ExpandWindowIcon = ({ style, strokeColor = '#CBD5E1' }) => {
    return (
        <svg style={style} viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M19.2857 11.4286V17.8571C19.2857 18.236 19.1352 18.5994 18.8672 18.8673C18.5993 19.1352 18.236 19.2857 17.8571 19.2857H2.1428C1.76392 19.2857 1.40056 19.1352 1.13265 18.8673C0.864743 18.5994 0.714233 18.236 0.714233 17.8571V2.14286C0.714233 1.76398 0.864743 1.40061 1.13265 1.1327C1.40056 0.864796 1.76392 0.714286 2.1428 0.714286H8.57138" stroke={strokeColor} stroke-linecap="round" stroke-linejoin="round" />
            <path d="M14.2857 0.714286H19.2857V5.71429" stroke={strokeColor} stroke-linecap="round" stroke-linejoin="round" />
            <path d="M19.2857 0.714286L10 10" stroke={strokeColor} stroke-linecap="round" stroke-linejoin="round" />
        </svg>
    )
}

export default ExpandWindowIcon