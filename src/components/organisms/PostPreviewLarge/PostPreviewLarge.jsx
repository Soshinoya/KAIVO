import React, { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'

import styles from './PostPreviewLarge.module.scss'

import PostActions from '../../../service/PostActions'

import { getRandomUUID } from '../../../utils/getRandomUUID'
import { textToHTML } from '../../../utils/parser'

import HeartIcon from '../../atoms/icons/HeartIcon'
import CommentIcon from '../../atoms/icons/CommentIcon'
import BookmarkIcon from '../../atoms/icons/BookmarkIcon'

import PostPreviewHeader from '../../molecules/PostPreviewHeader/PostPreviewHeader'

const PostPreviewLarge = ({ id, category, content, date, user, providedActions = [], buttonConfig }) => {

    const postRef = useRef(null)

    const [isReadMore, setIsReadMore] = useState(false)

    const postUrl = `/category/${category}/${id}`

    useEffect(() => {
        if (!postRef.current) return

        const htmlContent = textToHTML(content)
        const images = htmlContent.querySelectorAll('img')
        const imageLoadPromises = []

        images.forEach(img => {
            const imageLoader = new Image()
            imageLoader.src = img.src

            const imageLoadPromise = new Promise(resolve => {
                imageLoader.onload = () => {
                    resolve()
                }
            })

            imageLoadPromises.push(imageLoadPromise)
        })

        // Wait for all image promises to resolve
        Promise.all(imageLoadPromises).then(() => {
            const postContentElement = postRef.current.querySelector('.post-content')
            const postContentHeight = postContentElement.getBoundingClientRect().height

            if (postContentHeight > 600) {
                postContentElement.style.maxHeight = '600px'
                setIsReadMore(true)
            }
        })
    }, [postRef, content])

    const actions = providedActions.length > 0 ? providedActions : [
        {
            title: 'Complain',
            action: () => PostActions.complainOnPost(id).catch(console.log),
            id: getRandomUUID()
        }
    ]

    const [isLiked, setIsLiked] = useState(false) // дефолтное значени должно браться из выражения: Находиться ли id пользователя в массиве всех тех, кто поставил лайк

    const onClickLike = () => {
        if (isLiked) {
            // удаление id пользователя из тех, кто поставил лайк данному посту
            PostActions.removeLike(id)
                .then(setIsLiked)
                .catch(console.log)
        } else {
            // добавление id пользователя к тем, кто поставил лайк данному посту
            PostActions.addLike(id)
                .then(setIsLiked)
                .catch(console.log)
        }
    }

    useEffect(() => {
        PostActions.checkLike(id).then(setIsLiked)
    }, [])

    const onClickComment = () => console.log('Comment icon was clicked')
    const onClickFavorite = () => console.log('Adding this post to your favorite posts')

    return (
        <div ref={postRef} className={`panel ${styles['post-preview-large']}`}>
            <PostPreviewHeader user={user} date={date} actions={actions} {...buttonConfig} />
            <div className={`${styles['post-preview-large__content-wrapper']}`}>
                <Link to={postUrl}>
                    <div className={`${styles['post-preview-large__content']} post-content`} dangerouslySetInnerHTML={{ __html: content }} />
                </Link>
                {isReadMore && <Link to={postUrl}><span>Read More</span></Link>}
            </div>
            <div className={`${styles['post-preview-large__footer']}`}>
                <div className={`${styles['post-preview-large__footer--near']}`}>
                    <div className={`${styles['post-preview-large__footer-btn']} ${isLiked && styles['post-preview-large__footer-btn--filled']}`} onClick={onClickLike}>
                        <HeartIcon />
                    </div>
                    <div className={`${styles['post-preview-large__footer-btn']}`} onClick={onClickComment}>
                        <CommentIcon />
                    </div>
                </div>
                <div className={`${styles['post-preview-large__footer-btn']}`} onClick={onClickFavorite}>
                    <BookmarkIcon />
                </div>
            </div>
        </div>
    )
}

export default PostPreviewLarge