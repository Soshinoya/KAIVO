import React from 'react'
import { Link } from 'react-router-dom'

import styles from './PostPreviewSmall.module.scss'

import { getRandomUUID } from '../../../utils/getRandomUUID'

import PostPreviewHeader from '../../molecules/PostPreviewHeader/PostPreviewHeader'

const PostPreviewSmall = ({ id, category, title, description, imageSrc, date, user, providedActions = [] }) => {

    const actions = providedActions.length > 0 ? providedActions : [
        {
            title: 'Complain',
            action: () => {
                console.log('Complaining on this post...')
            },
            id: getRandomUUID()
        }
    ]

    const postUrl = `/category/${category}/${id}`

    return (
        <div className={`panel ${styles['post-preview-small']} ${!imageSrc ? styles['post-preview-small--without-img'] : ''}`}>
            <PostPreviewHeader user={user} date={date} actions={actions} />
            <div className={`${styles['post-preview-small__content']}`}>
                <div className={`${styles['post-preview-small__content-info']}`}>
                    <Link to={postUrl}>
                        <h4>{title}</h4>
                    </Link>
                    <p className='body-small'>{description}</p>
                </div>
                {imageSrc && (
                    <div className={`${styles['post-preview-small__content-img']}`}>
                        <Link to={postUrl}>
                            <img src={imageSrc} />
                        </Link>
                    </div>
                )}
            </div>
        </div>
    )
}

export default PostPreviewSmall