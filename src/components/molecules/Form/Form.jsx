import React, { useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useMutation, useQueryClient } from '@tanstack/react-query'

import Authentication from '../../../service/Authentication'

import { USER } from '../../../service/queryKeys'

import { validateByName } from '../../../utils/validateByName'
import { blurBackground } from '../../../utils/blurBackground'

import ButtonWide from '../../atoms/ButtonWide'
import InputBordered from '../../atoms/InputBordered'
import MiniLink from '../../atoms/MiniLink'
import BlurLoader from '../../atoms/BlurLoader'

import styles from './Form.module.scss'

const Form = ({ inputsInfo, btnText, secondaryText, secondaryLinkText, secondaryLinkUrl, actionOnSubmit = '' }) => {

    const [isBlurLoaderLoading, setIsBlurLoaderLoading] = useState(false)

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

    const formRef = useRef(null)

    const [errors, setErrors] = useState([])

    const onSubmitHandler = e => {
        e.preventDefault()
        setIsBlurLoaderLoading(true)

        const formData = new FormData(formRef.current)

        const updatedErrors = []

        const additionalValues = {}

        inputsInfo.forEach(({ name, required }) => {
            if (name === 'repeatPassword') {
                additionalValues.passwordValue = formData.get('password')
            }
            if (required) {
                const { boo, message } = validateByName(name, formRef.current.querySelector(`[name='${name}']`).value, additionalValues)
                if (boo) {
                    updatedErrors.some(({ errName }) => errName !== name)
                } else {
                    updatedErrors.push({ name, message })
                }
            }
        })

        errors.length !== updatedErrors.length && setErrors(updatedErrors)

        if (updatedErrors.length === 0) {
            switch (actionOnSubmit) {
                case 'login':
                    const login = async () => {
                        try {
                            const userInfo = await Authentication.login({
                                email: formData.get('email'),
                                password: formData.get('password')
                            })
                            mutateUser(userInfo)
                            navigate('/')
                        } catch (error) {
                            console.error('<<<Error at login>>>', error?.message)
                        } finally {
                            setIsBlurLoaderLoading(false)
                            blurBackground(false)
                        }
                    }
                    login()
                    // Добавить сообщения об исходе операции 2. В случае ошибки сообщение ошибки можно получить - (error.message)
                    break;
                case 'register':
                    const register = async () => {
                        try {
                            const userInfo = await Authentication.register({
                                nickname: formData.get('nickname'),
                                email: formData.get('email'),
                                password: formData.get('password')
                            })
                            mutateUser(userInfo)
                            navigate('/')
                        } catch (error) {
                            console.error('<<<Error at register>>>', error?.message)
                        } finally {
                            setIsBlurLoaderLoading(false)
                            blurBackground(false)
                        }
                    }
                    register()
                    // Добавить сообщения об исходе операции 2. В случае ошибки сообщение ошибки можно получить - (error.message)
                    break;

                default:
                    setIsBlurLoaderLoading(false)
                    break;
            }
        } else {
            setIsBlurLoaderLoading(false)
        }
    }

    return (
        <form className={`${styles.form}`} ref={formRef}>
            <BlurLoader isLoading={isBlurLoaderLoading} />
            {inputsInfo.map(({ type, name, placeholder, required, id }) => (
                <InputBordered errors={errors} type={type} name={name} placeholder={placeholder} required={required} key={id} />
            ))}
            <div className={`${styles['form__submit']}`}>
                <ButtonWide type='submit' text={btnText} onClick={onSubmitHandler} />
                <div className={`${styles['form__secondary']}`}>
                    <p className='body-small'>{secondaryText}</p>
                    <MiniLink url={secondaryLinkUrl} text={secondaryLinkText} />
                </div>
            </div>
        </form>
    )
}

export default Form