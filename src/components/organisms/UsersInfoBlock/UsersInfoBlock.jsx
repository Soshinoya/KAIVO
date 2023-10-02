import React from 'react'

import styles from './UsersInfoBlock.module.scss'

import UserPreviewInfoWithButton from '../../molecules/UserPreviewInfoWithButton/UserPreviewInfoWithButton'

const UsersInfoBlock = ({ title, usersInfo, usersImageSize = 'sm', titleClassName = 'body-medium', btnText = 'Follow', btnSize = 'small', btnOnClick = 'follow' }) => {
    return (
        <div className={`panel ${styles['users-block']}`}>
            <h4>{title}</h4>
            <ul className={`${styles['users-block__inner']}`}>
                {usersInfo.map(user => (
                    <li key={user.id}>
                        <UserPreviewInfoWithButton {...user} userImageSize={usersImageSize} titleClassName={titleClassName} textGap={0} btnText={btnText} btnSize={btnSize} btnOnClick={btnOnClick} />
                    </li>
                ))}
            </ul>
        </div>
    )
}

export default UsersInfoBlock