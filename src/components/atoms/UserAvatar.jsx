import React from 'react'

import Button from './Button'

const UserAvatar = ({ size, src, fileInput }) => {
    return (
        <div className={`${fileInput ? 'user-image__wrapper' : ''}`}>
            <img className={`user-image--${size}`} src={`${src}`} alt='user image' />
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