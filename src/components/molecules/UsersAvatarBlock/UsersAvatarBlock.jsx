import React from 'react'
import { Link } from 'react-router-dom'

import styles from './UsersAvatarBlock.module.scss'

import UserAvatar from '../../atoms/UserAvatar'

const UsersAvatarBlock = ({ title, usersData }) => {
    return usersData?.length > 0 && (
        <div className={`panel ${styles['user-bar']}`}>
            <h3>{title}</h3>
            <ul className={`${styles['user-bar__inner']}`}>
                {usersData?.map(user => {
                    const userProfileUrl = `/users/${user?.id}`
                    return (
                        <li key={user?.id}>
                            <Link to={userProfileUrl}>
                                <UserAvatar size='md' src={user?.userImageSrc} />
                            </Link>
                        </li>
                    )
                })}
            </ul>
        </div>
    )
}

export default UsersAvatarBlock