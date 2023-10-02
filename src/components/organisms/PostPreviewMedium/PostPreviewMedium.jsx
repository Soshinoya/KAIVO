import React from 'react'
import { Link } from 'react-router-dom'

import styles from './PostPreviewMedium.module.scss'

import plugImage from '../../../images/plug-image.jpg'

import PostInfo from '../../molecules/PostInfo/PostInfo'

const PostPreviewMedium = ({ id, category, title, description, imageSrc, date, user, userImageSize = 'sm' }) => {

    const postUrl = `/category/${category}/${id}`

    return (
        <div className={`${styles['post-preview-medium']}`}>
            <div className={`${styles['post-preview-medium__img']}`}>
                <Link to={postUrl}>
                    <img src={imageSrc ? imageSrc : plugImage} />
                </Link>
            </div>
            <div className={`${styles['post-preview-medium__info']}`}>
                <div className={`${styles['post-preview-medium__info-inner']}`}>
                    <Link to={postUrl}>
                        <h4>{title?.length > 55 ? title.slice(0, 55) + '...' : title}</h4>
                    </Link>
                    <p className='body-small'>{description?.length > 110 ? description.slice(0, 110) + '...' : description}</p>
                </div>
                <PostInfo {...user} date={date} titleClassName='body-small' secondaryTextSize='small' userImageSize={userImageSize} />
            </div>
        </div>
    )
}

export default PostPreviewMedium