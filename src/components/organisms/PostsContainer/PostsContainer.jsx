import React from 'react'

import styles from './PostsContainer.module.scss'

import PostPreviewMedium from '../PostPreviewMedium/PostPreviewMedium'

const PostsContainer = ({ title, postsData = [] }) => {
    return (
        <div className={`panel ${styles['posts-container']}`}>
            <h3>{title}</h3>
            <ul className={`${styles['posts-container__inner']}`}>
                {postsData?.map(post => (
                    <li key={post.id}>
                        <PostPreviewMedium {...post} userImageSize='sm' />
                    </li>
                ))}
            </ul>
        </div>
    )
}

export default PostsContainer