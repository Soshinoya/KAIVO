import React, { useEffect, useState } from 'react'
import { useQuery } from '@tanstack/react-query'

import styles from './Home.module.scss'

import DataSource from '../../service/DataSource'

import { getRandomUUID } from '../../utils/getRandomUUID'
import { sortPosts } from '../../utils/sortPosts'

import PostPreviewLarge from '../../components/organisms/PostPreviewLarge/PostPreviewLarge'
import ContentConfig from '../../layouts/BasicLayout/ContentConfig'
import Loader from '../../components/atoms/Loader'

const Home = () => {

    const { data, refetch, isFetching, isError, error } = useQuery({
        queryKey: ['feedPosts'],
        queryFn: async () => {
            const { posts, lastDoc, size } = await DataSource.getPosts(data?.lastDoc, 2, { fieldPath: 'date.value', direction: 'desc' })
            return { posts: data?.posts?.length > 0 ? [...data?.posts, ...posts] : posts, lastDoc, size }
        },
        refetchOnWindowFocus: false,
        enabled: false
    })

    const [postsData, setPostsData] = useState(data?.posts || [])

    const [selectedValue, setSelectedValue] = useState('latest')

    if (isError) {
        console.error(error)
    }

    useEffect(() => {
        setPostsData(data?.posts || [])
    }, [data])

    useEffect(() => {
        if (data?.posts?.length > 0) {
            setPostsData(data?.posts)
        } else {
            refetch()
        }
    }, [])

    useEffect(() => {
        document.addEventListener('scroll', scrollHandler)
        return function () {
            document.removeEventListener('scroll', scrollHandler)
        }
    }, [data])

    const scrollHandler = e => {
        if (e.target.documentElement.scrollHeight - (e.target.documentElement.scrollTop + window.innerHeight) < 100
            && postsData.length < data?.size || 0) {
            refetch()
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
                {postsData?.length > 0 && postsData?.map(post => {
                    return <PostPreviewLarge {...post} key={post.id} />
                })}
                <Loader isLoading={isFetching} />
            </div>
        </div>
    )
}

export default Home