import React from 'react'
import { Link } from 'react-router-dom'

import { formatTimeDifference, formatDate } from '../../../utils/formatTime'

import styles from './UserPreviewInfo.module.scss'

import UserAvatar from '../../atoms/UserAvatar'

const UserPreviewInfo = ({ id, nickname, userImageSrc, userImageSize = 'md', date, secondaryText, titleClassName = '', textGap = '5px' }) => {
    
    const userProfileUrl = `/users/${id}`

    let formattedSecondaryText = ''

    if (date?.type) {
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
    } else if (secondaryText) {
        formattedSecondaryText = secondaryText
    }

    return (
        <div className={`${styles['user-preview-info']}`}>
            <Link to={userProfileUrl}>
                <UserAvatar size={userImageSize} src={userImageSrc} />
            </Link>
            <div className={`${styles['user-preview-info__inner']}`} style={{ gap: textGap }}>
                <Link to={userProfileUrl}>
                    <h4 className={`${titleClassName}`}>{nickname}</h4>
                </Link>
                <p className='body-small'>{formattedSecondaryText}</p>
            </div>
        </div>
    )
}

export default UserPreviewInfo

/*

*/