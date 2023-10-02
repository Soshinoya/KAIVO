import React from 'react'

import { Link } from 'react-router-dom'

import styles from './PostFieldWrap.module.scss'

import PlusIcon from '../../atoms/icons/PlusIcon'

const PostFieldWrap = ({ text = '', to = '' }) => {
    return (
        <div className={`panel ${styles['holder']}`}>
            <h4>{text}</h4>
            <Link to={to}>
                <PlusIcon />
            </Link>
        </div>
    )
}

export default PostFieldWrap