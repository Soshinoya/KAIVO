import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { useMutation, useQueryClient } from '@tanstack/react-query'

import styles from './Profile.module.scss'

import SprayIcon from '../../components/atoms/icons/SprayIcon'
import CameraIcon from '../../components/atoms/icons/CameraIcon'
import VehicleIcon from '../../components/atoms/icons/VehicleIcon'
import RoadIcon from '../../components/atoms/icons/RoadIcon'

import { useUserById } from '../../query-hooks/useUserById'
import { useUserPosts } from '../../query-hooks/useUserPosts'

import { USER, USER_ID, USER_POSTS_BY } from '../../service/queryKeys'

import DataSource from '../../service/DataSource'
import AccountActions from '../../service/AccountActions'

import ProfileHeader from '../../components/molecules/ProfileHeader/ProfileHeader'
import StatisticItem from '../../components/atoms/StatisticItem'
import LinkBar from '../../components/molecules/LinkBar/LinkBar'
import Loader from '../../components/atoms/Loader'
import PostPreviewLarge from '../../components/organisms/PostPreviewLarge/PostPreviewLarge'
import SettingsModal from '../../components/organisms/ModalCompositions/SettingsModal/SettingsModal'
import Breadcrumbs from '../../components/atoms/Breadcrumbs'
import BlurLoader from '../../components/atoms/BlurLoader'
import PostFieldWrap from '../../components/molecules/PostFieldWrap/PostFieldWrap'

const Profile = () => {

    const { id: userId } = useParams()

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

    const concatenatedUserIdQueryKey = `${USER_ID}${userId}`

    const { data: userData, refetch: refetchUserData, isFetching: isUserDataFetching } = useUserById(concatenatedUserIdQueryKey, userId, { enabled: false })

    const { mutate: mutateUserData } = useMutation({
        mutationKey: [concatenatedUserIdQueryKey],
        mutationFn(updatedUser) {
            return updatedUser
        }
    })

    const concatenatedUserPostsQueryKey = `${USER_POSTS_BY}${userId}`

    const { data: postsData, refetch: refetchPostsData, isFetching: isPostsDataFetching } = useUserPosts(concatenatedUserPostsQueryKey, userData?.posts ?? [], 5, { enabled: false, initialData: {} })

    const [countOfCategoryPosts, setCountOfCategoryPosts] = useState({
        livery: 0,
        photo: 0,
        tuning: 0,
        blueprint: 0
    })

    const isMyProfile = user?.id === userId ? true : false

    const [isBlurLoaderLoading, setIsBlurLoaderLoading] = useState(false)

    const [isModalOpen, setIsModalOpen] = useState(false)

    const [isFollower, setIsFollower] = useState(false)

    const [isCoverImageLoaded, setIsCoverImageLoaded] = useState(false)

    const [isAvatarImageLoaded, setIsAvatarImageLoaded] = useState(false)

    useEffect(() => {
        setIsCoverImageLoaded(false)
        mutateUserData(null)
    }, [userId])

    // Устанавливаем значение isFollower
    useEffect(() => {
        if (!user) return
        setIsFollower(user?.subscriptions?.find(({ id: subscriptionId }) => subscriptionId === userId) ? true : false)
    }, [user])

    // Получение объекта пользователя
    useEffect(() => {
        if (userData) return

        const fetchingUserData = async () => {
            const updatedUser = await refetchUserData()
            mutateUserData(updatedUser.data)
        }

        fetchingUserData()
    }, [userId, user])

    //  Получение кол-ва постов в каждой категории
    useEffect(() => {
        if (!userData) return

        const categories = ['livery', 'photo', 'tuning', 'blueprint']

        const promises = categories.map(category =>
            DataSource.getCountOfUserCategoryPosts(category, userData?.posts)
                .then(count => ({ [category]: count }))
                .catch(error => {
                    console.error(`Error fetching count for category ${category}:`, error)
                    return { [category]: 0 }
                })
        )

        Promise.all(promises)
            .then(counts => {
                const newCountOfCategoryPosts = counts.reduce(
                    (acc, count) => ({ ...acc, ...count }),
                    { ...countOfCategoryPosts }
                )
                setCountOfCategoryPosts(newCountOfCategoryPosts)
            })
            .catch(console.error)
    }, [userData])

    // Получение постов пользователя
    useEffect(() => {
        if (!userData?.posts) return
        refetchPostsData()
    }, [userData])

    // Добавляет обработчик на scroll
    useEffect(() => {
        document.addEventListener('scroll', scrollHandler)
        return function () {
            document.removeEventListener('scroll', scrollHandler)
        }
    }, [postsData])

    // Определяет, когда пользователь докрутил до последнего поста
    const scrollHandler = e => {
        if (!userData) return
        if (e.target.documentElement.scrollHeight - (e.target.documentElement.scrollTop + window.innerHeight) < 100
            && postsData?.posts?.length < userData?.posts?.length) {
            refetchPostsData()
        }
    }

    let btnConfig = {}

    if (isMyProfile) {
        btnConfig = {
            btnText: 'settings',
            btnSize: 'small',
            btnOnClick: () => setIsModalOpen(true)
        }
    } else if (!isFollower) {
        btnConfig = {
            btnText: 'follow',
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
    } else if (isFollower) {
        btnConfig = {
            btnText: 'unsubscribe',
            btnSize: 'small',
            async btnOnClick() {
                try {
                    setIsBlurLoaderLoading(true)
                    await AccountActions.unsubscribeFromUser(userId, 'user', { user, mutateUser })
                    setIsFollower(false)
                } catch (error) {
                    console.error(error)
                } finally {
                    setIsBlurLoaderLoading(false)
                }
            }
        }
    }

    return (
        <>
            <BlurLoader isLoading={isBlurLoaderLoading} />
            <div className='panel'>
                <Breadcrumbs />
            </div>
            <div className={`${styles['wrapper']}`}>
                {userData && (
                    <>
                        <ProfileHeader
                            userId={userId}
                            nickname={userData?.nickname}
                            status={userData?.status}
                            profileImageSrc={userData?.userImageSrc}
                            profileImageSize='xl'
                            coverImageSrc={userData?.coverImageSrc}
                            isCoverImageLoaded={isCoverImageLoaded}
                            setIsCoverImageLoaded={setIsCoverImageLoaded}
                            isAvatarImageLoaded={isAvatarImageLoaded}
                            setIsAvatarImageLoaded={setIsAvatarImageLoaded}
                            isMyProfile={isMyProfile}
                            {...btnConfig}
                        />
                        <ul className={`panel ${styles['statistics']}`}>
                            <li>
                                <StatisticItem title={userData?.followers?.length} text='Followers' />
                            </li>
                            <li>
                                <StatisticItem title={userData?.subscriptions?.length} text='Subscriptions' />
                            </li>
                            <li>
                                <StatisticItem title={userData?.posts?.length} text='Posts' />
                            </li>
                        </ul>
                        <ul className={`panel ${styles['categories']}`}>
                            <li>
                                <Link to='livery'>
                                    <LinkBar title='Livery' text={`View all ${countOfCategoryPosts?.livery} posts`} children={<SprayIcon style={{ width: '25px', height: '25px' }} />} />
                                </Link>
                            </li>
                            <li>
                                <Link to='photo'>
                                    <LinkBar title='Photo' text={`View all ${countOfCategoryPosts?.photo} posts`} children={<CameraIcon style={{ width: '25px', height: '25px' }} />} />
                                </Link>
                            </li>
                            <li>
                                <Link to='tuning'>
                                    <LinkBar title='Tuning' text={`View all ${countOfCategoryPosts?.tuning} posts`} children={<VehicleIcon style={{ width: '25px', height: '25px' }} />} />
                                </Link>
                            </li>
                            <li>
                                <Link to='blueprint'>
                                    <LinkBar title='Blueprint' text={`View all ${countOfCategoryPosts?.blueprint} posts`} children={<RoadIcon style={{ width: '25px', height: '25px' }} />} />
                                </Link>
                            </li>
                        </ul>
                        {isMyProfile && <PostFieldWrap text='Create a new post' to='/editor' />}
                        {postsData?.posts?.length > 0 && (
                            <ul className={`${styles['posts']}`}>
                                {postsData.posts.map(post => (
                                    <li key={post.id}>
                                        <PostPreviewLarge {...post} />
                                    </li>
                                ))}
                            </ul>
                        )}
                        {isMyProfile && <SettingsModal
                            isModalOpen={isModalOpen}
                            setIsModalOpen={setIsModalOpen}
                            nickname={userData?.nickname}
                            number={userData?.accountInfo?.number}
                            country={userData?.accountInfo?.country}
                            status={userData?.status}
                            secondaryText={userData?.secondaryText}
                        />}
                    </>
                )}
                <Loader isLoading={isUserDataFetching || isPostsDataFetching} />
            </div>
        </>
    )
}

export default Profile