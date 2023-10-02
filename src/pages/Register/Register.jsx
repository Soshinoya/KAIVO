import React, { useContext, useState } from 'react'
import { useNavigate } from 'react-router-dom'

import styles from './Register.module.scss'

import { getRandomUUID } from '../../utils/getRandomUUID'
import { blurBackground } from '../../utils/blurBackground'
import { addToLS } from '../../utils/localStorageActions'

import { Crypto } from '../../context/CryptoContext'

import Authentication from '../../service/Authentication'

import ButtonWideInvert from '../../components/atoms/ButtonWideInvert'
import Form from '../../components/molecules/Form/Form'
import BlurLoader from '../../components/atoms/BlurLoader'

const Register = () => {
    const { setUser } = useContext(Crypto)

    const navigate = useNavigate()

    const [isBlurLoaderLoading, setIsBlurLoaderLoading] = useState(false)

    const registerWithGoogle = () => {
        setIsBlurLoaderLoading(true)
        Authentication.registerWithGoogle()
            .then(userInfo => {
                setIsBlurLoaderLoading(false)
                blurBackground(false)
                addToLS('userId', userInfo?.id)
                setUser(userInfo)
            })
            .then(() => navigate('/'))
            .catch(console.log)
            .finally(() => {
                setIsBlurLoaderLoading(false)
                blurBackground(false)
            })
    }

    const inputsInfo = [
        {
            id: getRandomUUID(),
            required: true,
            type: 'text',
            name: 'nickname',
            placeholder: 'Nickname',
        },
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
        },
        {
            id: getRandomUUID(),
            required: true,
            type: 'password',
            name: 'repeatPassword',
            placeholder: 'Repeat password',
        }
    ]

    return (
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100%' }}>
            <BlurLoader isLoading={isBlurLoaderLoading} />
            <div className={`panel ${styles['wrapper']}`}>
                <h1>Registration</h1>
                <p className='body-medium'>
                    Failure will never overtake me if my determination to succeed is strong enough.
                </p>
                <ButtonWideInvert text='Sign Up with Google' onClick={registerWithGoogle} />
                <div className='divider'></div>
                <Form inputsInfo={inputsInfo} btnText='Sign Up' secondaryText='Already have an account?' secondaryLinkText='Sign In' secondaryLinkUrl='/login' actionOnSubmit='register' />
            </div>
        </div>
    )
}

export default Register