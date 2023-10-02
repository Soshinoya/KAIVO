import React from 'react'

import styles from './SinglePost.module.scss'

import Breadcrumbs from '../../atoms/Breadcrumbs'
import PostInfo from '../../molecules/PostInfo/PostInfo'

const SinglePost = ({ content, date, user }) => {
    return (
        <div className={`panel ${styles['post']}`}>
            <div>
                <Breadcrumbs />
            </div>
            <div className='post-content' dangerouslySetInnerHTML={{ __html: content }}>
            </div>
            <div className='divider'></div>
            <div>
                <PostInfo {...user} date={date} />
            </div>
        </div>
    )
}

export default SinglePost