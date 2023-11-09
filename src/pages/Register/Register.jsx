import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useMutation, useQueryClient } from '@tanstack/react-query'

import styles from './Register.module.scss'

import { getRandomUUID } from '../../utils/getRandomUUID'
import { blurBackground } from '../../utils/blurBackground'

import Authentication from '../../service/Authentication'

import { USER } from '../../service/queryKeys'

import ButtonWideInvert from '../../components/atoms/ButtonWideInvert'
import Form from '../../components/molecules/Form/Form'
import BlurLoader from '../../components/atoms/BlurLoader'

const Register = () => {

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

    const registerWithGoogle = async () => {
        try {
            setIsBlurLoaderLoading(true)
            const userInfo = await Authentication.registerWithGoogle()
            mutateUser(userInfo)
            navigate('/')
        } catch (error) {
            console.error(error)
        } finally {
            setIsBlurLoaderLoading(false)
            blurBackground(false)
        }
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