import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useMutation, useQueryClient } from '@tanstack/react-query'

import styles from './LogIn.module.scss'

import { getRandomUUID } from '../../utils/getRandomUUID'
import { blurBackground } from '../../utils/blurBackground'
import { defineError } from '../../utils/defineError'

import { USER } from '../../service/queryKeys'

import Authentication from '../../service/Authentication'

import Form from '../../components/molecules/Form/Form'

import ButtonWideInvert from '../../components/atoms/ButtonWideInvert'
import BlurLoader from '../../components/atoms/BlurLoader'

const LogIn = () => {

    const queryClient = useQueryClient()

    const { mutate: mutateUser } = useMutation({
        mutationKey: [USER],
        mutationFn(updatedUser) {
            return updatedUser
        },
        onSuccess() {
            queryClient.invalidateQueries([USER])
        }
    })

    const navigate = useNavigate()

    const [isBlurLoaderLoading, setIsBlurLoaderLoading] = useState(false)

    const loginWithGoogle = async () => {
        try {
            setIsBlurLoaderLoading(true)
            const userInfo = await Authentication.loginWithGoogle()
            mutateUser(userInfo)
            navigate('/')
        } catch (error) {
            console.error(defineError(error?.message))
        } finally {
            setIsBlurLoaderLoading(false)
            blurBackground(false)
        }
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