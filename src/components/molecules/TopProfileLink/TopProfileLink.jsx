import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { signOut } from 'firebase/auth'
import { auth } from '../../../service/database/firebase'

import styles from './TopProfileLink.module.scss'

import { removeFromLS } from '../../../utils/localStorageActions'

import ArrowDownIcon from '../../atoms/icons/ArrowDownIcon'
import SettingsIcon from '../../atoms/icons/SettingsIcon'
import LeaveIcon from '../../atoms/icons/LeaveIcon'

import UserAvatar from '../../atoms/UserAvatar'

const TopProfileLink = ({ userId, userTitle, userImageSrc, userProfileUrl, userImageSize = 'md', direction = 'down' }) => {

    const [menu, setMenu] = useState(false)

    const onLogoutClickHandler = async () => {
        removeFromLS('userId')
        await signOut(auth)
        window.location.reload()
    }

    return (
        <div className={`${styles['top-profile-link']}`}>
            <Link to={userProfileUrl}>
                <UserAvatar src={userImageSrc} size={userImageSize} />
            </Link>
            <div className={`${styles['top-profile-link__inner']}`} onClick={() => setMenu(!menu)}>
                <h4>{userTitle}</h4>
                <ArrowDownIcon style={{ width: '7px', height: '4px' }} />
            </div>
            {menu && (
                <ul className={`panel ${styles['top-profile-link__menu']} ${styles[`direction-${direction}`]}`}>
                    <li>
                        <Link to={`/users/${userId}`} className={`${styles['top-profile-link__menu-item']}`}>
                            <SettingsIcon style={{ width: '20px', height: '20px' }} />
                            <p className='body-medium'>Settings</p>
                        </Link>
                    </li>
                    <li className={`${styles['top-profile-link__menu-item']}`} onClick={onLogoutClickHandler}>
                        <LeaveIcon style={{ width: '20px', height: '20px' }} />
                        <p className='body-medium'>Log out</p>
                    </li>
                </ul>
            )}
        </div>
    )
}

export default TopProfileLink