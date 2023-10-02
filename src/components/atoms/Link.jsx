import React from 'react'

import { Link as ReactRouterLink } from 'react-router-dom'

const Link = ({ isActive = true, children, text = 'link', url }) => {
    return (
        <ReactRouterLink to={url} className='link body-medium'>
            <div className="link-icon">
                {children}
            </div>
            <p className={`${!isActive ? 'link--disactive' : ''}`}>
                {text}
            </p>
        </ReactRouterLink>
    )
}

export default Link