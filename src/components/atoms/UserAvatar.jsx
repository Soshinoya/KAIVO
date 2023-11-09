import React from 'react'

import Button from './Button'

import loaderImageSrc from '../../images/loader.gif'

const UserAvatar = ({ size, src, fileInput, isAvatarImageLoaded = true, setIsAvatarImageLoaded = () => {} }) => {
    return (
        <div className={`${fileInput ? 'user-image__wrapper' : ''}`}>
            <img style={{ display: isAvatarImageLoaded ? 'block' : 'none' }} className={`user-image--${size}`} src={`${src}`} alt='user image' onLoad={() => setIsAvatarImageLoaded(true)} />
            <img style={{ display: isAvatarImageLoaded ? 'none' : 'block' }} className={`user-image--${size}`} src={loaderImageSrc} alt='loader animation' />
            {fileInput && (
                <>
                    <div className='user-image__input-label'>
                        <Button text='Change' size='small' />
                    </div>
                    <div className='user-image__input'>
                        {fileInput}
                    </div>
                </>
            )}
        </div>
    )
}

export default UserAvatar