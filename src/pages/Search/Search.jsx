import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import queryString from 'query-string'

import styles from './Search.module.scss'

import { defineError } from '../../utils/defineError'

import DataSource from '../../service/DataSource'

import UserPreviewLarge from '../../components/molecules/UserPreviewLarge/UserPreviewLarge'
import SearchMedia from '../../components/organisms/SearchMedia/SearchMedia'
import PostPreviewSmall from '../../components/organisms/PostPreviewSmall/PostPreviewSmall'
import Loader from '../../components/atoms/Loader'

const Search = () => {
    
    const [isLoading, setIsLoading] = useState(true)
    
    const location = useLocation()
    
    const searchQuery = queryString.parse(location.search)
    
    const [users, setUsers] = useState([])
    
    const [posts, setPosts] = useState([])

    useEffect(() => {
        setIsLoading(true)
        const fetchingData = async () => {
            try {
                if (searchQuery?.tag) {
                    await DataSource.searchPostsByTag(`#${searchQuery?.tag}`, 3).then(({ posts }) => setPosts(posts))
                    setUsers([])
                } else {
                    await DataSource.searchUsersByText(searchQuery?.query, 4).then(({ users }) => setUsers(users))
                    await DataSource.searchPostsByText(searchQuery?.query, 3).then(({ posts }) => setPosts(posts))
                }
            } catch (error) {
                console.log(defineError(error?.message))
            } finally {
                setIsLoading(false)
            }
        }
        fetchingData()
    }, [location])

    return users?.length === 0 && posts?.length === 0
        ? (
            <>
                {isLoading ? <Loader isLoading={isLoading} /> : <h1 className={`${styles['search__nothing']}`}>Nothing was found</h1>}
            </>
        )
        : (
            <div className={`${styles['search']}`}>
                {users?.length > 0 && (
                    <SearchMedia title='Users' linkForAll={`/search/users${location?.search}`}>
                        <div className={`${styles['search-media__users']}`}>
                            {users.map((user, i) => <UserPreviewLarge key={i} {...user} />)}
                        </div>
                    </SearchMedia>
                )}
                {posts?.length > 0 && (
                    <SearchMedia title='Posts' linkForAll={`/search/posts${location?.search}`}>
                        <div className={`${styles['search-media__posts']}`}>
                            {posts.map((post, i) => <PostPreviewSmall key={i} {...post} />)}
                        </div>
                    </SearchMedia>
                )}
            </div>
        )
}

export default Search