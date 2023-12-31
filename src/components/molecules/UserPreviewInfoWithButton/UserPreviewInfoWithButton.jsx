import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { useMutation, useQueryClient } from '@tanstack/react-query'

import { formatTimeDifference, formatDate } from '../../../utils/formatTime'

import styles from './UserPreviewInfoWithButton.module.scss'

import AccountActions from '../../../service/AccountActions'

import { USER } from '../../../service/queryKeys'

import UserAvatar from '../../atoms/UserAvatar'
import Button from '../../atoms/Button'

const UserPreviewInfoWithButton = ({ id: userId, nickname, userImageSrc, userImageSize = 'md', date, secondaryText, titleClassName = '', textGap = '5px', btnText, btnSize, btnOnClick }) => {

    const userProfileUrl = `/users/${userId}`

    const queryClient = useQueryClient()

    const user = queryClient.getQueryData([USER])

    const { mutate: mutateUser } = useMutation({
        mutationKey: [USER],
        mutationFn(updatedUser) {
            return updatedUser
        },
        onSuccess() {
            queryClient.invalidateQueries([USER])
        }
    })

    const [isFollower, setIsFollower] = useState(false)

    useEffect(() => {
        if (!user) return
        setIsFollower(user?.id === userId || user?.subscriptions?.find(({ id: subscriptionId }) => subscriptionId === userId) ? true : false)
    }, [user])

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

    let btnConfig = {}

    switch (btnOnClick) {
        case 'follow':
            if (!isFollower) {
                btnConfig = {
                    text: btnText,
                    size: btnSize,
                    async onClick() {
                        try {
                            await AccountActions.subscribeToUser(userId, 'user', { user, mutateUser })
                            setIsFollower(true)
                        } catch (error) {
                            console.error(error)
                        }
                    }
                }
            }
            break;

        default:
            break;
    }

    return !isFollower && (
        <div className={`${styles['user-preview-info__wrapper']}`}>
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
            <Button {...btnConfig} />
        </div>
    )
}

export default UserPreviewInfoWithButton

/*

*/