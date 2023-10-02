import React from 'react'
import { Link } from 'react-router-dom'

import styles from './SearchMedia.module.scss'

const SearchMedia = ({ title = '', linkForAll = '', children }) => {
    return (
        <div className={`${styles['search-media']}`}>
            <div className={`${styles['search-media__header']}`}>
                <h2>{title}</h2>
                <Link to={linkForAll}>
                    <p className='body-small'>View all {title}</p>
                </Link>
            </div>
            {children}
            <div className={`divider ${styles['search-media__divider']}`}></div>
        </div>
    )
}

export default SearchMedia