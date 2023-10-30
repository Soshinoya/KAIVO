import React, { useContext, useEffect, useState } from 'react'
import { useQuery } from '@tanstack/react-query'

import styles from './RightSidebar.module.scss'

import DataSource from '../../service/DataSource'

import { Crypto } from '../../context/CryptoContext'

import UsersAvatarBlock from '../../components/molecules/UsersAvatarBlock/UsersAvatarBlock'
import UsersInfoBlock from '../../components/organisms/UsersInfoBlock/UsersInfoBlock'
import TagsContainer from '../../components/molecules/TagsContainer/TagsContainer'
import PostsContainer from '../../components/organisms/PostsContainer/PostsContainer'

const RightSidebar = ({ tagsData, setTagsData }) => {

    const { data: dataPopularPosts, refetch: refetchPopularPosts, isError: isErrorPopularPosts, error: errorPopularPosts} = useQuery({
        queryKey: ['bestPosts'],
        queryFn: async () => {
            const { posts, lastDoc, size } = await DataSource.getPosts(dataPopularPosts?.lastDoc, 2, { fieldPath: 'likes', direction: 'desc' })
            return { posts: dataPopularPosts?.posts?.length > 0 ? [...dataPopularPosts?.posts, ...posts] : posts, lastDoc, size }
        },
        refetchOnWindowFocus: false,
        enabled: false
    })

    const { user } = useContext(Crypto)

    const [subscriptionsUsersData, setSubscriptionsUsersData] = useState([])

    const [recommendedUsersData, setRecommendedUsersData] = useState([])

    const [popularPosts, setPopularPosts] = useState(dataPopularPosts?.posts || [])

    if (isErrorPopularPosts) {
        console.log(errorPopularPosts)
    }

    useEffect(() => {
        if (user?.subscriptions?.length > 0) {
            DataSource.getSubscriptionUsers(user?.subscriptions, 5).then(setSubscriptionsUsersData)
        } else {
            setSubscriptionsUsersData([])
        }
        DataSource.getPopularUsers(3).then(setRecommendedUsersData)
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
            <UsersInfoBlock title='Who To Follow' titleClassName='body-medium' usersInfo={recommendedUsersData} usersImageSize='sm' btnSize='small' btnText='Follow' btnOnClick='follow' />
            <TagsContainer title='Following Tags' tagsData={tagsData} setTagsData={setTagsData} action='search' />
            <PostsContainer title='Popular posts' postsData={popularPosts} />
        </aside>
    )
}

export default RightSidebar