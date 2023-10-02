import React, { useEffect, useState } from 'react'

import styles from './Category.module.scss'

import DataSource from '../../service/DataSource'

import { getRandomUUID } from '../../utils/getRandomUUID'
import { sortPosts } from '../../utils/sortPosts'

import PostPreviewSmall from '../../components/organisms/PostPreviewSmall/PostPreviewSmall'
import Loader from '../../components/atoms/Loader'
import ContentConfig from '../../layouts/BasicLayout/ContentConfig'

const Category = ({ category }) => {

    const [selectedValue, setSelectedValue] = useState('trending')

    const [postsData, setPostsData] = useState([])

    const [lastDoc, setLastDoc] = useState()

    const [totalPostsCount, setTotalPostsCount] = useState(0)

    const [fetching, setFetching] = useState(true)

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
        setPostsData([])
        setLastDoc()
        setFetching(true)
    }, [category])

    useEffect(() => {
        if (fetching) {
            setLastDoc()
            DataSource.getCategoryPosts(categoryData.keyword, lastDoc, 10)
                .then(({ posts, lastDoc, size }) => {
                    setPostsData([...postsData, ...posts])
                    setLastDoc(lastDoc)
                    setTotalPostsCount(size)
                })
                .catch(error => console.log(error.message))
                .finally(() => {
                    setSelectedValue('trending')
                    setFetching(false)
                })
        }
    }, [category, fetching])

    useEffect(() => {
        document.addEventListener('scroll', scrollHandler)
        return function () {
            document.removeEventListener('scroll', scrollHandler)
        }
    }, [postsData])

    const scrollHandler = e => {
        if (e.target.documentElement.scrollHeight - (e.target.documentElement.scrollTop + window.innerHeight) < 100
            && postsData.length < totalPostsCount) {
            setFetching(true)
        }
    }

    useEffect(() => {
        setPostsData(sortPosts(postsData, selectedValue))
    }, [selectedValue])

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
                {postsData?.length > 0 && (
                    postsData?.map(post => (
                        <li key={post.id}>
                            <PostPreviewSmall {...post} />
                        </li>
                    ))
                )}
                <Loader isLoading={fetching} />
            </ul>
        </div>
    )
}

export default Category