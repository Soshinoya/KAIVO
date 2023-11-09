import React, { useEffect, useState } from 'react'
import { useMutation, useQueryClient } from '@tanstack/react-query'

import styles from './Category.module.scss'

import { CATEGORY_POSTS } from '../../service/queryKeys'

import { getRandomUUID } from '../../utils/getRandomUUID'
import { sortPosts } from '../../utils/sortPosts'

import { useCategoryPosts } from '../../query-hooks/useCategoryPosts'

import PostPreviewSmall from '../../components/organisms/PostPreviewSmall/PostPreviewSmall'
import Loader from '../../components/atoms/Loader'
import ContentConfig from '../../layouts/BasicLayout/ContentConfig'

const Category = ({ category }) => {

    const queryClient = useQueryClient()

    const concatenatedCategoryPostsQueryKey = `${String(category).toUpperCase()}${CATEGORY_POSTS}`

    const { data: postsData, refetch: refetchPostsData, isFetching: isPostsDataFetching } = useCategoryPosts(concatenatedCategoryPostsQueryKey, category, 2, { enabled: false })

    const { mutate: mutateSortPosts } = useMutation({
        mutationKey: [concatenatedCategoryPostsQueryKey],
        mutationFn(sortBy) {
            return sortPosts(postsData?.posts ?? [], sortBy)
        },
        onSuccess() {
            console.log('Success!')
            queryClient.invalidateQueries([concatenatedCategoryPostsQueryKey])
        }
    })

    useEffect(() => {
        console.log(postsData)
    }, [postsData])

    const [selectedValue, setSelectedValue] = useState('trending')

    let categoryData = {}

    switch (category) {
        case 'photo':
            categoryData = {
                title: 'Photo',
                text: 'Posts where you can enjoy the work of professional photographers. Share your photos here',
                keyword: 'photo',
            }
            break;
        case 'tuning':
            categoryData = {
                title: 'Tuning',
                text: 'Detailed and detailed guides, on customizing cars in Forza, with examples and pictures',
                keyword: 'tuning',
            }
            break;
        case 'blueprint':
            categoryData = {
                title: 'Blueprint',
                text: 'In this category you can find articles on the topic of blueprints. Hope you find something to race that you enjoy.',
                keyword: 'blueprint',
            }
            break;
        default:
            categoryData = {
                title: 'Livery',
                text: 'A livery on an auto is a specially designed visual design that gives a unique and distinctive look to a car.',
                keyword: 'livery',
            }
            break;
    }

    useEffect(() => {
        refetchPostsData()
    }, [category])

    useEffect(() => {
        document.addEventListener('scroll', scrollHandler)
        return function () {
            document.removeEventListener('scroll', scrollHandler)
        }
    }, [postsData])

    const scrollHandler = e => {
        if (e.target.documentElement.scrollHeight - (e.target.documentElement.scrollTop + window.innerHeight) < 100
            && postsData?.posts?.length < postsData?.totalPostsCount) {
            refetchPostsData()
        }
    }

    useEffect(() => {
        mutateSortPosts(selectedValue)
    }, [selectedValue, postsData])

    const selectConfig = {
        options: [
            { label: 'Trending', value: 'trending', id: getRandomUUID() },
            { label: 'Latest', value: 'latest', id: getRandomUUID() }
        ],
        selectedValue,
        onChange: val => setSelectedValue(val)
    }

    return (
        <div className={`${styles['category']}`}>
            <div className={`${styles['category__top']}`}>
                <h1>{categoryData?.title}</h1>
                <p>{categoryData?.text}</p>
                <span className={`${styles['category__top-line']}`}></span>
            </div>
            <ContentConfig selectConfig={selectConfig} />
            <ul className={`${styles['category__posts']}`}>
                {postsData?.posts?.length > 0 && (
                    postsData.posts.map(post => (
                        <li key={post.id}>
                            <PostPreviewSmall {...post} />
                        </li>
                    ))
                )}
                <Loader isLoading={isPostsDataFetching} />
            </ul>
        </div>
    )
}

export default Category