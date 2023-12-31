import React, { useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'

import styles from './ProfileHeader.module.scss'

import loaderImageSrc from '../../../images/loader.gif'

import AccountActions from '../../../service/AccountActions'
import YandexDrive from '../../../service/YandexDrive'

import ActionMenu from '../../atoms/ActionMenu'
import Button from '../../atoms/Button'
import UserAvatar from '../../atoms/UserAvatar'
import BlurLoader from '../../atoms/BlurLoader'

const ProfileHeader = ({ userId, nickname, status, profileImageSrc, profileImageSize = 'xl', coverImageSrc, isCoverImageLoaded, setIsCoverImageLoaded, isAvatarImageLoaded, setIsAvatarImageLoaded, actions, isMyProfile, btnText = 'Follow', btnSize = 'small', btnOnClick }) => {

    const navigate = useNavigate()

    const coverInputRef = useRef(null)

    const avatarInputRef = useRef(null)

    const [isLoading, setIsLoading] = useState(false)

    const [adaptiveImageSize, setAdaptiveImageSize] = useState(profileImageSize)

    useEffect(() => {
        if (window.matchMedia('(max-width: 600px)').matches) {
            setAdaptiveImageSize('lg')
        }
    }, [profileImageSize])

    const imageInputChangeHandler = imageType => {
        const image = imageType === 'avatar' ? avatarInputRef.current.files[0] : coverInputRef.current.files[0]

        const imageExtension = image?.name.split('.').pop().toLowerCase()

        if (imageExtension !== 'webp') {
            // Сюда добавить уведомление при ошибке
            console.log(`The .${imageExtension} extension is not supported, Available extensions: .webp`)
            return
        }

        if (image?.size > 10 * 1024 * 1024) {
            // Сюда добавить уведомление при ошибке
            console.log('The selected file is too large. The maximum size is 10 MB.')
            return
        }

        switch (imageType) {
            case 'cover':
                setIsLoading(true)
                YandexDrive.uploadFile(image, `/kaivo/users/${userId}/userCover.webp`)
                    .then(async () => {
                        await AccountActions.updateAccountProperties(userId, {
                            coverImageSrc: 'custom'
                        })
                        navigate('/')
                        window.location.reload()
                    })
                break;
            case 'avatar':
                setIsLoading(true)
                YandexDrive.uploadFile(image, `/kaivo/users/${userId}/userImage.webp`)
                    .then(async () => {
                        await AccountActions.updateAccountProperties(userId, {
                            userImageSrc: 'custom'
                        })
                        navigate('/')
                        window.location.reload()
                    })
                break;
            default:
                break;
        }
    }

    return (
        <div className={`panel ${styles['wrapper']}`}>
            <div className={`${styles['cover']}`}>
                <img style={{ display: isCoverImageLoaded ? 'block' : 'none' }} className={`${styles['cover__image']}`} src={coverImageSrc} alt='profile cover' onLoad={() => setIsCoverImageLoaded(true)} />
                <img style={{ display: isCoverImageLoaded ? 'none' : 'block' }} className={`${styles['cover__image-loader']}`} src={loaderImageSrc} alt='loader animation' />
                {isMyProfile && (
                    <div>
                        <div className={`${styles['cover__input-label']}`}>
                            <Button text='Change cover' size='medium' />
                        </div>
                        <input ref={coverInputRef} className={`${styles['cover__input']}`} type='file' onChange={() => imageInputChangeHandler('cover')} />
                    </div>
                )}
            </div>
            <div className={`${styles['profile-info']}`}>
                <div className={`${styles['profile-info__inner']}`}>
                    <UserAvatar size={adaptiveImageSize} src={profileImageSrc} fileInput={isMyProfile ? <input ref={avatarInputRef} type='file' onChange={() => imageInputChangeHandler('avatar')} /> : false} isAvatarImageLoaded={isAvatarImageLoaded} setIsAvatarImageLoaded={setIsAvatarImageLoaded} />
                    <div className={`${styles['profile-info__text']}`}>
                        <h4>{nickname}</h4>
                        <p className='body-small'>{status}</p>
                    </div>
                </div>
                {typeof btnOnClick === 'function' ? <Button text={btnText} size={btnSize} onClick={btnOnClick} /> : <ActionMenu actions={actions} />}
            </div>
            <BlurLoader isLoading={isLoading} />
        </div>
    )
}

export default ProfileHeader