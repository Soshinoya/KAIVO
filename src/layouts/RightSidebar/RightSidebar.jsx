import React, { useContext, useEffect, useState } from 'react'

import styles from './RightSidebar.module.scss'

import DataSource from '../../service/DataSource'

import { Crypto } from '../../context/CryptoContext'

import UsersAvatarBlock from '../../components/molecules/UsersAvatarBlock/UsersAvatarBlock'
import UsersInfoBlock from '../../components/organisms/UsersInfoBlock/UsersInfoBlock'
import TagsContainer from '../../components/molecules/TagsContainer/TagsContainer'
import PostsContainer from '../../components/organisms/PostsContainer/PostsContainer'

const RightSidebar = ({ tagsData, setTagsData }) => {

    const { user } = useContext(Crypto)

    const [subscriptionsUsersData, setSubscriptionsUsersData] = useState([])

    const [recommendedUsersData, setRecommendedUsersData] = useState([])

    const [popularPostsData, setPopularPostsData] = useState([])

    useEffect(() => {
        if (user?.subscriptions?.length > 0) {
            DataSource.getSubscriptionUsers(user?.subscriptions, 5).then(setSubscriptionsUsersData)
        } else {
            setSubscriptionsUsersData([])
        }
        DataSource.getPopularUsers(3).then(setRecommendedUsersData)
        DataSource.getPopularPosts(3)
            .then(setPopularPostsData)
            .catch(error => console.log(error.message))
    }, [user])

    return (
        <aside className={`${styles['sidebar']}`}>
            {subscriptionsUsersData?.length > 0 && <UsersAvatarBlock title='Subscriptions' usersData={subscriptionsUsersData} />}
            <UsersInfoBlock title='Who To Follow' titleClassName='body-medium' usersInfo={recommendedUsersData} usersImageSize='sm' btnSize='small' btnText='Follow' btnOnClick='follow' />
            <TagsContainer title='Following Tags' tagsData={tagsData} setTagsData={setTagsData} action='search' />
            <PostsContainer title='Popular posts' postsData={popularPostsData} />
        </aside>
    )
}

export default RightSidebar