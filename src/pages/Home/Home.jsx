import React, { useEffect, useState } from 'react'

import styles from './Home.module.scss'

import DataSource from '../../service/DataSource'

import { getRandomUUID } from '../../utils/getRandomUUID'
import { sortPosts } from '../../utils/sortPosts'

import PostPreviewLarge from '../../components/organisms/PostPreviewLarge/PostPreviewLarge'
import ContentConfig from '../../layouts/BasicLayout/ContentConfig'
import Loader from '../../components/atoms/Loader'

const Home = () => {

    const [postsData, setPostsData] = useState([])

    const [lastDoc, setLastDoc] = useState()

    const [totalPostsCount, setTotalPostsCount] = useState(0)

    const [fetching, setFetching] = useState(true)

    const [selectedValue, setSelectedValue] = useState('trending')

    // Получение постов
    useEffect(() => {
        if (fetching) {
            DataSource.getPosts(lastDoc, 5)
                .then(({ posts, lastDoc, size }) => {
                    setPostsData([...postsData, ...posts])
                    setLastDoc(lastDoc)
                    setTotalPostsCount(size)
                })
                .catch(error => console.log(error.message))
                .finally(() => {
                    setFetching(false)
                })
        }
    }, [fetching])

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
        <div className={`${styles['home']}`}>
            <ContentConfig selectConfig={selectConfig} />
            <div className={`${styles['home__content']}`}>
                {postsData.length > 0 && postsData?.map(post => <PostPreviewLarge {...post} key={post.id} />)}
                <Loader isLoading={fetching} />
            </div>
        </div>
    )
}

export default Home