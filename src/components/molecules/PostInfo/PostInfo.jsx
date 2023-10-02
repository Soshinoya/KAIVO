import React from 'react'
import { Link } from 'react-router-dom'

import styles from './PostInfo.module.scss'

import { formatTimeDifference, formatDate } from '../../../utils/formatTime'

import UserAvatar from '../../atoms/UserAvatar'

const PostInfo = ({ id, nickname, userImageSrc, userImageSize = 'md', date, titleClassName, secondaryTextSize }) => {

    const userProfileUrl = `/users/${id}`

    let formattedSecondaryText = ''
    
    switch (date?.type) {
        case 'date':
            formattedSecondaryText = formatDate(date?.value)
            break;
        case 'time':
            formattedSecondaryText = formatTimeDifference(date?.value)
            break;
        default:
            formattedSecondaryText = date?.value
            break;
    }

    return (
        <div className={`${styles['post-info']}`}>
            <div className={`${styles['post-info__user']}`}>
                <Link to={userProfileUrl}>
                    <UserAvatar size={userImageSize} src={userImageSrc} />
                </Link>
                <Link to={userProfileUrl}>
                    <h4 className={`${titleClassName}`}>{nickname}</h4>
                </Link>
            </div>
            <p className={secondaryTextSize ? `body-${secondaryTextSize}` : 'body-medium'}>{formattedSecondaryText}</p>
        </div>
    )
}

export default PostInfo