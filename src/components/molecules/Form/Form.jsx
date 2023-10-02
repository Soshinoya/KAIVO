import React, { useContext, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'

import Authentication from '../../../service/Authentication'

import { validateByName } from '../../../utils/validateByName'
import { addToLS } from '../../../utils/localStorageActions'
import { blurBackground } from '../../../utils/blurBackground'

import { Crypto } from '../../../context/CryptoContext'

import ButtonWide from '../../atoms/ButtonWide'
import InputBordered from '../../atoms/InputBordered'
import MiniLink from '../../atoms/MiniLink'
import BlurLoader from '../../atoms/BlurLoader'

import styles from './Form.module.scss'

const Form = ({ inputsInfo, btnText, secondaryText, secondaryLinkText, secondaryLinkUrl, actionOnSubmit = '' }) => {

    const [isBlurLoaderLoading, setIsBlurLoaderLoading] = useState(false)

    const { setUser, setUserPrivateInfo } = useContext(Crypto)

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
                    Authentication.login({
                        email: formData.get('email'),
                        password: formData.get('password')
                    })
                        .then(({ userInfo, userPrivateInfo }) => {
                            addToLS('userId', userInfo?.id)
                            setUser(userInfo)
                            setUserPrivateInfo(userPrivateInfo)
                        })
                        .then(() => navigate('/'))
                        .catch(error => console.log('<<<Error at login>>>', error.message))
                        .finally(() => {
                            setIsBlurLoaderLoading(false)
                            blurBackground(false)
                        })
                    // Добавить сообщения об исходе операции 2. В случае ошибки сообщение ошибки можно получить - (error.message)
                    break;
                case 'register':
                    Authentication.register({
                        nickname: formData.get('nickname'),
                        email: formData.get('email'),
                        password: formData.get('password')
                    })
                        .then(({ userInfo, userPrivateInfo }) => {
                            addToLS('userId', userInfo?.id)
                            setUser(userInfo)
                            setUserPrivateInfo(userPrivateInfo)
                        })
                        .then(() => navigate('/'))
                        .catch(error => console.log('<<<Error at register>>>', error.message))
                        .finally(() => {
                            setIsBlurLoaderLoading(false)
                            blurBackground(false)
                        })
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