import React, { useEffect, useState } from 'react'

import { useQueryClient } from '@tanstack/react-query'

import styles from './RightSidebar.module.scss'

import DataSource from '../../service/DataSource'

import { USER } from '../../service/queryKeys'

import { usePosts } from '../../query-hooks/usePosts'
import { BEST_POSTS } from '../../service/queryKeys'

import UsersAvatarBlock from '../../components/molecules/UsersAvatarBlock/UsersAvatarBlock'
import UsersInfoBlock from '../../components/organisms/UsersInfoBlock/UsersInfoBlock'
import TagsContainer from '../../components/molecules/TagsContainer/TagsContainer'
import PostsContainer from '../../components/organisms/PostsContainer/PostsContainer'

const RightSidebar = ({ tagsData, setTagsData }) => {

    const { data: dataPopularPosts, refetch: refetchPopularPosts, isError: isErrorPopularPosts, error: errorPopularPosts } = usePosts(BEST_POSTS, 1, { fieldPath: 'likes', direction: 'desc' })

    const queryClient = useQueryClient()

    const user = queryClient.getQueryData([USER])

    const [subscriptionsUsersData, setSubscriptionsUsersData] = useState([])

    const [recommendedUsersData, setRecommendedUsersData] = useState([])

    const [popularPosts, setPopularPosts] = useState(dataPopularPosts?.posts || [])

    if (isErrorPopularPosts) {
        console.log(errorPopularPosts)
    }

    useEffect(() => {
        if (user?.subscriptions?.length > 0) {
            DataSource.getSubscriptionUsers(user.subscriptions, 5).then(setSubscriptionsUsersData)
        } else {
            setSubscriptionsUsersData([])
        }
        if (user) {
            if (recommendedUsersData.length === 0) {
                DataSource.getPopularUsers(user?.id, 3).then(setRecommendedUsersData)
            } else {
                setRecommendedUsersData([...recommendedUsersData].filter(({ id }) => !user?.subscriptions?.find(({ id: subscriptionId }) => id === subscriptionId)))
            }
        }
    }, [user])

    useEffect(() => {
        setPopularPosts(dataPopularPosts?.posts)
    }, [dataPopularPosts])

    // Эффект, срабатывающий при componentDidMount
    useEffect(() => {
        if (dataPopularPosts?.posts?.length > 0) {
            setPopularPosts(dataPopularPosts?.posts)
        } else {
            refetchPopularPosts()
        }
    }, [])

    return (
        <aside className={`${styles['sidebar']}`}>
            {subscriptionsUsersData?.length > 0 && <UsersAvatarBlock title='Subscriptions' usersData={subscriptionsUsersData} />}
            {user && <UsersInfoBlock title='Who To Follow' titleClassName='body-medium' usersInfo={recommendedUsersData} usersImageSize='sm' btnSize='small' btnText='Follow' btnOnClick='follow' />}
            <TagsContainer title='Following Tags' tagsData={tagsData} setTagsData={setTagsData} action='search' />
            <PostsContainer title='Popular posts' postsData={popularPosts} />
        </aside>
    )
}

export default RightSidebar