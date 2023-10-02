import React from 'react'

import styles from './PostPreviewHeader.module.scss'

import UserPreviewInfo from '../UserPreviewInfo/UserPreviewInfo'
import ActionMenu from '../../atoms/ActionMenu'
import Button from '../../atoms/Button'

const PostPreviewHeader = ({ user, date, actions, btnText, btnOnClick }) => {
    return (
        <div className={`${styles['post-preview-header']}`}>
            <UserPreviewInfo {...user} date={date} />
            <div className={`${styles['post-preview-header--near']}`}>
                {btnText && <Button size='small' text={btnText} onClick={btnOnClick} />}
                <ActionMenu actions={actions} />
            </div>
        </div>
    )
}

export default PostPreviewHeader