import React from "react"

const Tag = ({ text, onClick }) => {
    return (
        <div className="tag" onClick={onClick}>
            <p className="tag__title body-small">{text}</p>
        </div>
    )
}

export default Tag