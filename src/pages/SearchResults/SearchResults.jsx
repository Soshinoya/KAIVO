import React, { useEffect, useState } from 'react'
import { useLocation, useParams } from 'react-router-dom'
import queryString from 'query-string'
import { Link } from 'react-router-dom'

import styles from './SearchResults.module.scss'

import DataSource from '../../service/DataSource'

import Loader from '../../components/atoms/Loader'
import PostPreviewSmall from '../../components/organisms/PostPreviewSmall/PostPreviewSmall'
import UserPreviewLarge from '../../components/molecules/UserPreviewLarge/UserPreviewLarge'

const SearchResults = () => {

    const { dataType } = useParams()

    const location = useLocation()

    const searchQuery = queryString.parse(location.search)

    const [lastDoc, setLastDoc] = useState()

    const [totalPostsCount, setTotalPostsCount] = useState(0)

    const [fetching, setFetching] = useState(true)

    const [data, setData] = useState([])

    useEffect(() => {
        if (fetching) {
            if (dataType === 'users') {
                DataSource.searchUsersByText(searchQuery?.query, 10, lastDoc)
                    .then(({ users, lastDoc, size }) => {
                        setData([...data, ...users])
                        setLastDoc(lastDoc)
                        setTotalPostsCount(size)
                    })
                    .catch(error => console.log(error.message))
                    .finally(() => setFetching(false))
            } else if (dataType === 'posts') {
                if (searchQuery?.tag) {
                    DataSource.searchPostsByTag(`#${searchQuery?.tag}`, 1, lastDoc)
                        .then(({ posts, lastDoc, size }) => {
                            console.log(posts)
                            setData([...data, ...posts])
                            setLastDoc(lastDoc)
                            setTotalPostsCount(size)
                        })
                        .catch(error => console.log(error.message))
                        .finally(() => setFetching(false))
                } else {
                    DataSource.searchPostsByText(searchQuery?.query, 10, lastDoc)
                        .then(({ posts, lastDoc, size }) => {
                            setData([...data, ...posts])
                            setLastDoc(lastDoc)
                            setTotalPostsCount(size)
                        })
                        .catch(error => console.log(error.message))
                        .finally(() => setFetching(false))
                }
            }
        }
    }, [fetching])

    useEffect(() => {
        document.addEventListener('scroll', scrollHandler)
        return function () {
            document.removeEventListener('scroll', scrollHandler)
        }
    }, [data])

    const scrollHandler = e => {
        if (e.target.documentElement.scrollHeight - (e.target.documentElement.scrollTop + window.innerHeight) < 100
            && data.length < totalPostsCount) {
            setFetching(true)
        }
    }

    return (
        <div className={`${styles['search-results']}`}>
            <div className={`${styles['search-results__header']}`}>
                <Link to={`/search${location.search}`}>
                    <p className='body-small'>
                        Back to search page
                    </p>
                </Link>
            </div>
            {dataType === 'users' && (
                <div className={`${styles['users']}`}>
                    {data.length > 0 && data.map((user, i) => <UserPreviewLarge key={i} {...user} />)}
                </div>
            )}
            {dataType === 'posts' && (
                <div className={`${styles['posts']}`}>
                    {data.length > 0 && data.map((post, i) => <PostPreviewSmall key={i} {...post} />)}
                </div>
            )}
            <Loader isLoading={fetching} />
        </div>
    )
}

export default SearchResults