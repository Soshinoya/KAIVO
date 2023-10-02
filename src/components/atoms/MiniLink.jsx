import React from 'react'
import { Link } from 'react-router-dom'

const MiniLink = ({ url, text }) => {
    return <Link to={url} className='mini-link body-small'>{text}</Link>
}

export default MiniLink