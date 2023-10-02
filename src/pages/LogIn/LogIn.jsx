import React, { useContext, useState } from 'react'
import { useNavigate } from 'react-router-dom'

import styles from './LogIn.module.scss'

import { getRandomUUID } from '../../utils/getRandomUUID'
import { blurBackground } from '../../utils/blurBackground'
import { addToLS } from '../../utils/localStorageActions'

import { Crypto } from '../../context/CryptoContext'

import Authentication from '../../service/Authentication'

import ButtonWideInvert from '../../components/atoms/ButtonWideInvert'
import Form from '../../components/molecules/Form/Form'
import BlurLoader from '../../components/atoms/BlurLoader'
import { defineError } from '../../utils/defineError'

const LogIn = () => {

    const { setUser } = useContext(Crypto)

    const navigate = useNavigate()

    const [isBlurLoaderLoading, setIsBlurLoaderLoading] = useState(false)

    const loginWithGoogle = async () => {
        setIsBlurLoaderLoading(true)
        Authentication.loginWithGoogle()
            .then(userInfo => {
                addToLS('userId', userInfo?.id)
                setUser(userInfo)
            })
            .then(() => navigate('/'))
            .catch(err => console.log(defineError(err?.message)))
            .finally(() => {
                setIsBlurLoaderLoading(false)
                blurBackground(false)
            })
    }

    const inputsInfo = [
        {
            id: getRandomUUID(),
            required: true,
            type: 'email',
            name: 'email',
            placeholder: 'E-mail',
        },
        {
            id: getRandomUUID(),
            required: true,
            type: 'password',
            name: 'password',
            placeholder: 'Password',
        }
    ]

    return (
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100%' }}>
            <BlurLoader isLoading={isBlurLoaderLoading} />
            <div className={`panel ${styles['wrapper']}`}>
                <h1>Sign In</h1>
                <p className='body-medium'>
                    Failure will never overtake me if my determination to succeed is strong enough.
                </p>
                <ButtonWideInvert text='Sign In with Google' onClick={loginWithGoogle} />
                <div className='divider'></div>
                <Form inputsInfo={inputsInfo} btnText='Sign In' secondaryText='Don`t have an account?' secondaryLinkText='Sign Up' secondaryLinkUrl='/register' actionOnSubmit='login' />
            </div>
        </div>
    )
}

export default LogIn