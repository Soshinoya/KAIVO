import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

import DataSource from '../../service/DataSource'

import styles from './SinglePostPage.module.scss'

import SinglePost from '../../components/organisms/SinglePost/SinglePost'

const SinglePostPage = () => {

    const { id: postId } = useParams()

    const [postData, setPostData] = useState()

    useEffect(() => {
        DataSource.getPostById(postId)
            .then(setPostData)
            .catch(error => console.log(error.message))
    }, [postId])

    return <SinglePost {...postData} />
}

export default SinglePostPage