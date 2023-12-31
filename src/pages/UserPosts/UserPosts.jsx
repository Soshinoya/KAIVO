import React, { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { useMutation, useQueryClient } from "@tanstack/react-query"

import styles from './UserPosts.module.scss'

import DataSource from "../../service/DataSource"
import AccountActions from "../../service/AccountActions"

import { USER } from "../../service/queryKeys"

import { useUser } from "../../query-hooks/useUser"

import { sortPosts } from '../../utils/sortPosts'
import { getRandomUUID } from '../../utils/getRandomUUID'

import Loader from '../../components/atoms/Loader'
import Breadcrumbs from '../../components/atoms/Breadcrumbs'
import PostPreviewLarge from '../../components/organisms/PostPreviewLarge/PostPreviewLarge'
import Select from '../../components/atoms/Select'
import BlurLoader from '../../components/atoms/BlurLoader'

const UserPosts = () => {

    const queryClient = useQueryClient()

    const user = queryClient.getQueryData([USER])

    const { mutate: mutateUser } = useMutation({
        mutationKey: [USER],
        mutationFn(updatedUser) {
            return updatedUser
        },
        onSuccess() {
            queryClient.invalidateQueries([USER])
        }
    })

    const [isBlurLoaderLoading, setIsBlurLoaderLoading] = useState(false)

    const { id: userId, categoryName } = useParams()

    const [postsData, setPostsData] = useState([])

    const [isFollower, setIsFollower] = useState(false)

    const [lastDoc, setLastDoc] = useState()

    const [totalPostsCount, setTotalPostsCount] = useState(0)

    const [fetching, setFetching] = useState(true)

    const [selectedValue, setSelectedValue] = useState('latest')

    useEffect(() => {
        if (!user) return
        setIsFollower(user?.id === userId || user?.subscriptions?.find(({ id: subscriptionId }) => subscriptionId === userId) ? true : false)
    }, [user])

    useEffect(() => {
        if (fetching) {
            DataSource.getUserCategoryPosts(userId, categoryName, lastDoc, 1)
                .then(({ posts, lastDoc, size }) => {
                    setPostsData([...postsData, ...posts])
                    setLastDoc(lastDoc)
                    setTotalPostsCount(size)
                    // setPostsData(sortPosts(postsData, 'latest'))
                })
                .catch(error => console.log(error.message))
                .finally(() => setFetching(false))
        }
    }, [userId, categoryName, fetching])

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

    const actions = [
        {
            title: 'Delete',
            action: () => {
                console.log('Deleting this post...')
            },
            id: getRandomUUID()
        }
    ]

    const btnConfig = isFollower
        ? {}
        : {
            btnText: 'Follow',
            btnSize: 'small',
            async btnOnClick() {
                try {
                    setIsBlurLoaderLoading(true)
                    await AccountActions.subscribeToUser(userId, 'user', { user, mutateUser })
                    setIsFollower(true)
                } catch (error) {
                    console.error(error)
                } finally {
                    setIsBlurLoaderLoading(false)
                }
            }
        }

    return (
        <div className={`${styles['wrapper']}`}>
            <BlurLoader isLoading={isBlurLoaderLoading} />
            <div className={`panel ${styles['breadcrumbs']}`}>
                <Breadcrumbs />
            </div>
            <Select {...selectConfig} />
            {postsData.length > 0 && postsData.map(post => <PostPreviewLarge {...post} providedActions={actions} buttonConfig={btnConfig} key={post.id} />)}
            <Loader isLoading={fetching} />
        </div>
    )
}

export default UserPosts