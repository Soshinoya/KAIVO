import React, { useEffect, useRef, useState } from 'react'
import { useMutation, useQueryClient } from '@tanstack/react-query'

import styles from './SettingsModal.module.scss'

import Countries from '../../../../service/Countries'
import AccountActions from '../../../../service/AccountActions'

import { USER } from '../../../../service/queryKeys'

import { validateByName } from '../../../../utils/validateByName'

import useCustomModal from '../../../../hooks/useCustomModal/useCustomModal'

import CrossIcon from '../../../atoms/icons/CrossIcon'
import StepBackIcon from '../../../atoms/icons/StepBackIcon'
import ArrowDownIcon from '../../../atoms/icons/ArrowDownIcon'
import UserIcon from '../../../atoms/icons/UserIcon'
import MixerIcon from '../../../atoms/icons/MixerIcon'

import InputBordered from '../../../atoms/InputBordered'
import Button from '../../../atoms/Button'
import Select from '../../../atoms/Select'
import Toggle from '../../../atoms/Toggle'

const SettingsModal = ({ isModalOpen, setIsModalOpen }) => {

    const [navigate, setNavigate] = useState('/')

    const queryClient = useQueryClient()

    const user = queryClient.getQueryData([USER])

    const { mutate } = useMutation({
        mutationKey: [USER],
        async mutationFn(updatedProperties) {
            return await AccountActions.updateAccountProperties(user.id, updatedProperties)
        },
        onSuccess() {
            queryClient.invalidateQueries([USER])
        }
    })

    const [content, setContent] = useState()

    const [countries, setCountries] = useState([])

    const [countryCurrentValue, setCountryCurrentValue] = useState(user?.accountInfo?.country)

    useEffect(() => {
        setCountryCurrentValue(user?.accountInfo?.country)
    }, [user?.accountInfo?.country])

    useEffect(() => {
        Countries.getCountries().then(setCountries)
    }, [])

    const [errors, setErrors] = useState([])

    const accountForm = useRef(null)

    const settingsForm = useRef(null)

    const onAccountFormSubmit = async e => {
        e.preventDefault()
        const formData = new FormData(accountForm.current)
        const updatedErrors = []
        formData.forEach((text, name) => {
            const output = validateByName(name, text)
            if (!output.boo) {
                updatedErrors.push({ name, message: output.message })
                if (!errors?.some(error => error.name === name)) {
                    setErrors(prevErrors => [...prevErrors, { name, message: output.message }])
                }
            } else {
                setErrors(prevErrors => prevErrors?.filter(error => error.name !== name))
            }
        })
        if (updatedErrors.length <= 0) {
            mutate({
                nickname: formData.get('nickname'),
                status: formData.get('status'),
                secondaryText: formData.get('secondaryText'),
                accountInfo: {
                    country: countryCurrentValue,
                    number: formData.get('number')
                }
            })
        }
    }

    const onInterfaceSettingsFormSubmit = async e => {
        e.preventDefault()
        const formData = new FormData(settingsForm.current)
        mutate({
            interfaceSettings: {
                isBackgroundAnimationEnabled: Boolean(formData.get('background-animation-toggle')) || false
            }
        })
    }

    const countrySelectConfig = {
        options: countries,
        selectedValue: countryCurrentValue,
        onChange: val => setCountryCurrentValue(val)
    }

    useEffect(() => {
        switch (navigate) {
            case '/':
                setContent(
                    <>
                        <div className={`${styles['modal__header']}`}>
                            <h1>Settings</h1>
                            <span className={`${styles['modal__close']}`} data-button-close="true" onClick={() => setIsModalOpen(false)}>
                                <CrossIcon style={{ width: '14.286px', height: '14.286px' }} />
                            </span>
                        </div>
                        <ul className={`${styles['modal__body-links']}`}>
                            <li className={`${styles['link']}`} onClick={() => setNavigate('/account')}>
                                <div className={`${styles['link__inner']}`}>
                                    <UserIcon style={{ width: '22.857px', height: '22.857px' }} />
                                    <h4>My account</h4>
                                </div>
                                <ArrowDownIcon style={{ transform: 'rotate(-90deg)', width: '10px', height: '5.714px' }} />
                            </li>
                            <li className={`${styles['link']}`} onClick={() => setNavigate('/settings')}>
                                <div className={`${styles['link__inner']}`}>
                                    <MixerIcon style={{ width: '24px', height: '24px' }} />
                                    <h4>My settings</h4>
                                </div>
                                <ArrowDownIcon style={{ transform: 'rotate(-90deg)', width: '10px', height: '5.714px' }} />
                            </li>
                        </ul>
                    </>
                )
                break;
            case '/account':
                setContent(
                    <>
                        <div className={`${styles['modal__header']}`}>
                            <h1>My account</h1>
                            <span className={`${styles['modal__close']}`} onClick={() => setNavigate('/')}>
                                <StepBackIcon style={{ width: '15.86px', height: '10.982px' }} />
                            </span>
                        </div>
                        <div className={`${styles['account__wrapper']}`}>
                            <form ref={accountForm} className={`${styles['account']}`}>
                                <div className={`${styles['account__input-inner']}`}>
                                    <label htmlFor="nickname">Nickname | <span className='body-medium'>{user?.nickname}</span></label>
                                    <InputBordered type='text' name='nickname' initialValue={user?.nickname} errors={errors} />
                                </div>
                                <div className={`${styles['account__input-inner']}`}>
                                    <label htmlFor="number">Number | <span className='body-medium'>{user?.number}</span></label>
                                    <InputBordered type='number' name='number' initialValue={user?.number} errors={errors} />
                                </div>
                                <div className={`${styles['account__input-inner']}`}>
                                    <label htmlFor="status">Status | <span className='body-medium'>{user?.status}</span></label>
                                    <InputBordered type='status' name='status' initialValue={user?.status} errors={errors} />
                                </div>
                                <div className={`${styles['account__input-inner']}`}>
                                    <label htmlFor="secondaryText">Secondary Text | <span className='body-medium'>{user?.secondaryText}</span></label>
                                    <InputBordered type='secondaryText' name='secondaryText' initialValue={user?.secondaryText} errors={errors} />
                                </div>
                                <div className={`${styles['account__field-inner']}`}>
                                    <h4>Country</h4>
                                    {countries.length > 0 ? <Select {...countrySelectConfig} /> : 'Loading...'}
                                </div>
                            </form>
                            <div className={`${styles['account__submit']}`}>
                                <Button type='submit' text='Save' size='large' onClick={onAccountFormSubmit} />
                            </div>
                        </div>
                    </>
                )
                break;
            case '/settings':
                setContent(
                    <>
                        <div className={`${styles['modal__header']}`}>
                            <h1>My settings</h1>
                            <span className={`${styles['modal__close']}`} onClick={() => setNavigate('/')}>
                                <StepBackIcon style={{ width: '15.86px', height: '10.982px' }} />
                            </span>
                        </div>
                        <div className={`${styles['account__wrapper']}`}>
                            <form ref={settingsForm} className={`${styles['account']}`}>
                                <div className={`${styles['account__field-inner']}`}>
                                    <h4>Enable background animation</h4>
                                    <Toggle name='background-animation-toggle' checked={user?.interfaceSettings?.isBackgroundAnimationEnabled} />
                                </div>
                            </form>
                            <div className={`${styles['account__submit']}`}>
                                <Button type='submit' text='Save' size='large' onClick={onInterfaceSettingsFormSubmit} />
                            </div>
                        </div>
                    </>
                )
                break;

            default:
                break;
        }
    }, [navigate, errors, countryCurrentValue])

    const settingsModalConfig = {
        closable: true,
        content: (
            <div className={`${styles['modal']}`}>
                {content}
            </div>
        ),
        setIsModalOpen(e, boo) {
            if (e.target.dataset['overlayClose']) {
                setIsModalOpen(boo)
            }
        }
    }

    const { modalJSX, modalOpen, modalClose } = useCustomModal(settingsModalConfig, setIsModalOpen)

    useEffect(() => {
        if (isModalOpen) {
            modalOpen()
        } else {
            modalClose()
        }
    }, [isModalOpen])

    return modalJSX
}

export default SettingsModal