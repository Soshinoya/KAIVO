import React, { useContext, useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'

import styles from './Profile.module.scss'

import SprayIcon from '../../components/atoms/icons/SprayIcon'
import CameraIcon from '../../components/atoms/icons/CameraIcon'
import VehicleIcon from '../../components/atoms/icons/VehicleIcon'
import RoadIcon from '../../components/atoms/icons/RoadIcon'

import { Crypto } from '../../context/CryptoContext'

import DataSource from '../../service/DataSource'
import AccountActions from '../../service/AccountActions'

import { defineError } from '../../utils/defineError'

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

    const { user, setUser } = useContext(Crypto)

    const [isLoading, setIsLoading] = useState(true)

    const [isBlurLoaderLoading, setIsBlurLoaderLoading] = useState(false)

    const [isModalOpen, setIsModalOpen] = useState(false)

    const [userData, setUserData] = useState()

    const [postsData, setPostsData] = useState([])

    const [countOfCategoryPosts, setCountOfCategoryPosts] = useState({
        livery: 0,
        photo: 0,
        tuning: 0,
        blueprint: 0
    })

    const { id: userId } = useParams()

    const isMyProfile = user?.id === userId ? true : false

    const [isFollower, setIsFollower] = useState(false)

    const [lastDocIndex, setLastDocIndex] = useState(0)

    const [fetching, setFetching] = useState(true)

    useEffect(() => {
        setUserData()
        setFetching(true)
        setPostsData([])
        setLastDocIndex(0)
    }, [userId])

    // Устанавливаем значение isFollower
    useEffect(() => {
        if (!user) return
        setIsFollower(user?.subscriptions?.find(({ id: subscriptionId }) => subscriptionId === userId) ? true : false)
    }, [user])

    // Получение объекта пользователя
    useEffect(() => {
        setIsLoading(true)
        if (isMyProfile) {
            setUserData(user)
            setIsLoading(false)
            return
        }

        DataSource.getUserById(userId)
            .then(setUserData)
            .catch(error => console.log(error.message))
            .finally(() => setIsLoading(false))
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

    // fetch posts
    useEffect(() => {
        if (!userData) return
        if (fetching) {
            try {
                const fetchPosts = async () => {
                    const newPosts = []
                    await Promise.all([...userData?.posts]?.splice(lastDocIndex, 5)?.map(async postId => {
                        const post = await DataSource.getPostById(postId)
                        newPosts.push(post)
                    }))
                    setLastDocIndex([...postsData, ...newPosts].length)
                    setPostsData([...postsData, ...newPosts])
                }
                fetchPosts()
            } catch (error) {
                console.log(defineError(error?.message))
            } finally {
                setFetching(false)
            }
        }
    }, [userData, fetching])

    useEffect(() => {
        document.addEventListener('scroll', scrollHandler)
        return function () {
            document.removeEventListener('scroll', scrollHandler)
        }
    }, [postsData])

    const scrollHandler = e => {
        if (!userData) return
        if (e.target.documentElement.scrollHeight - (e.target.documentElement.scrollTop + window.innerHeight) < 100
            && postsData.length < userData?.posts?.length) {
            setFetching(true)
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
            btnOnClick: () => {
                setIsBlurLoaderLoading(true)
                AccountActions.subscribeToUser(userId, 'user', { user, setUser })
                    .then(() => setIsFollower(true))
                    .catch(console.log)
                    .finally(() => setIsBlurLoaderLoading(false))
            }
        }
    } else if (isFollower) {
        btnConfig = {
            btnText: 'unsubscribe',
            btnSize: 'small',
            btnOnClick: () => {
                setIsBlurLoaderLoading(true)
                AccountActions.unsubscribeFromUser(userId, 'user', { user, setUser })
                    .then(() => setIsFollower(false))
                    .catch(console.log)
                    .finally(() => setIsBlurLoaderLoading(false))
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
                    </>
                )}
                <Loader isLoading={isLoading} />
                <ul className={`${styles['posts']}`}>
                    {postsData.length > 0 && postsData.map(post => (
                        <li key={post.id}>
                            <PostPreviewLarge {...post} />
                        </li>
                    ))}
                </ul>
                <SettingsModal isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen} nickname={userData?.nickname} number={userData?.accountInfo?.number} country={userData?.accountInfo?.country} status={userData?.status} secondaryText={userData?.secondaryText} />
            </div>
        </>
    )
}

export default Profile