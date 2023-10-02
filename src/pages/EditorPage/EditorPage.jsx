import React, { useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { arrayUnion, doc, setDoc } from 'firebase/firestore'

import { db } from '../../service/database/firebase'
import YandexDrive from '../../service/YandexDrive'
import AccountActions from '../../service/AccountActions'

import styles from './EditorPage.module.scss'

import { getFromLS } from '../../utils/localStorageActions'
import { getRandomUUID } from '../../utils/getRandomUUID'
import { validateByName } from '../../utils/validateByName'
import { HTMLToText } from '../../utils/parser'
import { defineError } from '../../utils/defineError'

import QuillEditor from '../../components/organisms/QuillEditor/QuillEditor'
import Select from '../../components/atoms/Select'
import InputBordered from '../../components/atoms/InputBordered'
import Button from '../../components/atoms/Button'
import BlurLoader from '../../components/atoms/BlurLoader'
import Breadcrumbs from '../../components/atoms/Breadcrumbs'

const EditorPage = () => {

    const [isBlurLoaderLoading, setIsBlurLoaderLoading] = useState(false)

    const fileInputRef = useRef(null)

    const formRef = useRef(null)

    const navigate = useNavigate()

    const [fileInputName, setFileInputName] = useState('')

    const [article, setArticle] = useState('')

    const [errors, setErrors] = useState([])

    const [categorySelectValue, setCategorySelectValue] = useState('photo')

    const [imageFiles, setImageFiles] = useState([])

    useEffect(() => {
        if (!getFromLS('userId')) {
            navigate('/')
        }
    }, [])

    const imageInputClickHandler = () => setFileInputName(fileInputRef.current.files[0]?.name)

    const renderPropOnSubmit = (html, imageFiles) => {
        setArticle(html)
        setImageFiles(imageFiles)
    }

    const submitClickHandler = async e => {
        e.preventDefault()
        try {
            setIsBlurLoaderLoading(true)

            const updatedErrors = []

            formRef.current.querySelectorAll('input').forEach(input => {
                const name = input?.getAttribute('name')
                const value = input.value
                if (!name) return
                const { boo, message } = validateByName(name, value)
                if (boo) {
                    updatedErrors.some(({ errName }) => errName !== name)
                } else {
                    updatedErrors.push({ name, message })
                }
            })

            errors.length !== updatedErrors.length && setErrors(updatedErrors)

            if (updatedErrors.length > 0) return

            const previewImage = fileInputRef.current.files[0]

            const isGotImage = previewImage ? true : false

            const previewType = fileInputRef.current.files.length > 0 ? 'custom' : 'default'

            const previewImageExtension = previewImage?.name.split('.').pop().toLowerCase()

            if (isGotImage && previewImageExtension !== 'jpg' && previewImageExtension !== 'png' && previewImageExtension !== 'webp') {
                // Сюда добавить уведомление при ошибке
                console.log(`The .${previewImageExtension} extension is not supported`)
                return
            }

            if (isGotImage && previewImage?.size > 10 * 1024 * 1024) {
                // Сюда добавить уведомление при ошибке
                console.log('The selected file is too large. The maximum size is 10 MB.')
                return
            }

            const postId = getRandomUUID()

            const articleString = HTMLToText(article)

            const postTemplate = {
                id: postId,
                category: categorySelectValue,
                title: formRef.current.querySelector('[name=title]')?.value,
                description: formRef.current.querySelector('[name=description]')?.value,
                content: articleString,
                imageSrc: previewType,
                imageExtension: previewType === 'custom' ? previewImageExtension : '',
                date: {
                    type: 'date',
                    value: Date.now()
                },
                userId: getFromLS('userId'),
                likes: [],
                tags: formRef.current.querySelector('[name=tags]')?.value.split(' ').map(tag => tag.toLowerCase())
            }

            const postRef = doc(db, 'posts', postId)

            await setDoc(postRef, postTemplate)

            await YandexDrive.createFolder(`/kaivo/posts%2F${postId}`)

            await Promise.all(imageFiles.map(async ({ file, index }) => {
                await YandexDrive.uploadFile(file, `/kaivo/posts/${postId}/${index}.${file.name.split('.').pop().toLowerCase()}`)
            }))

            if (previewType === 'custom') {
                await YandexDrive.uploadFile(fileInputRef.current.files[0], `/kaivo/posts/${postId}/postImage.${previewImageExtension}`)
            }

            await AccountActions.updateAccountProperties(getFromLS('userId'), { posts: arrayUnion(postId) })
        } catch (error) {
            console.log(defineError(error?.message))
        } finally {
            setIsBlurLoaderLoading(false)
        }
    }

    const categorySelectConfig = {
        options: [
            { label: 'Livery', value: 'livery', id: getRandomUUID() },
            { label: 'Photo', value: 'photo', id: getRandomUUID() },
            { label: 'Tuning', value: 'tuning', id: getRandomUUID() },
            { label: 'Blueprint', value: 'blueprint', id: getRandomUUID() }
        ],
        selectedValue: categorySelectValue,
        onChange: setCategorySelectValue
    }

    return !article ? <QuillEditor rendernPropOnSubmit={renderPropOnSubmit} /> : (
        <div className={styles['wrapper']}>
            <BlurLoader isLoading={isBlurLoaderLoading} />
            <div className={`${styles['editor__top']}`}>
                <h1>Publication settings</h1>
                <p>
                    The headline should be no more than 30 characters. Description should be between 30 and 256 characters. Upload pictures less than 10 MB for the cover of the publication
                </p>
                <div className='panel'>
                    <Breadcrumbs />
                </div>
                <span className={`${styles['editor__top-line']}`}></span>
            </div>
            <form ref={formRef} className={`${styles['editor__body']}`}>
                <div className={`${styles['editor__body-field']}`}>
                    <h4>Category</h4>
                    <Select {...categorySelectConfig} />
                </div>
                <InputBordered type='text' name='title' placeholder='Title' errors={errors} />
                <InputBordered type='text' name='description' placeholder='Description' errors={errors} />
                <InputBordered type='text' name='tags' placeholder='Insert tags (including #) after a space e.g. #tag #short-tag #next-tag' errors={errors} />
                <div className={`${styles['editor__body-fileInput__wrapper']}`}>
                    <svg width='672' height='350' viewBox='0 0 672 350' fill='none' xmlns='http://www.w3.org/2000/svg'>
                        <rect x='0.5' y='0.5' width='671' height='349' rx='19.5' stroke='#CBD5E1' strokeDasharray='10 10' />
                    </svg>
                    <div className={`${styles['editor__body-fileInput__inner']}`}>
                        <h2 className={`${styles['editor__body-fileInput__title']}`}>
                            {fileInputName
                                ? fileInputName
                                : 'Select an image by clicking on the button'}
                        </h2>
                        <Button size='lg' text='Select a file' />
                        <span className={`${styles['editor__body-fileInput__span']}`}>Available formats - JPG, PNG, WEBP</span>
                    </div>
                    <input ref={fileInputRef} className={`${styles['editor__body-fileInput']} body-small`} type='file' onChange={imageInputClickHandler} />
                </div>
                <Button type='submit' size='lg' text='Submit a post' onClick={submitClickHandler} />
            </form>
        </div>
    )
}

export default EditorPage