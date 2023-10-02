import React from 'react'
import { Link } from 'react-router-dom'

import styles from './UserPreviewLarge.module.scss'

import UserAvatar from '../../atoms/UserAvatar'

const UserPreviewLarge = ({ id, nickname = '', secondaryText = '', userImageSrc }) => {

    const userProfileUrl = `/users/${id}`

    return (
        <Link to={userProfileUrl}>
            <div className={`panel ${styles['user-preview']}`}>
                <UserAvatar size='xl' src={userImageSrc} />
                <div className={`${styles['user-preview__inner']}`}>
                    <h4>{nickname}</h4>
                    <p className='body-small'>{secondaryText}</p>
                </div>
            </div>
        </Link>
    )
}

export default UserPreviewLarge