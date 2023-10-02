import React, { useEffect, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { validate as uuidValidate } from 'uuid'

import DataSource from '../../service/DataSource'
import { setCharacterLimit } from '../../utils/setCharacterLimit'

const Breadcrumbs = () => {

    const location = useLocation()
    const paths = location.pathname.split('/').filter(path => path !== '')

    const [postInfo, setPostInfo] = useState({})

    useEffect(() => {
        paths.forEach((path, i, arr) => {
            if (uuidValidate(path)) {
                let type = ''
                switch (arr[i - 1]) {
                    case 'users':
                        type = 'user'
                        break;
                
                    default:
                        type = 'post'
                        break;
                }
                setPostInfo(prevState => ({ ...prevState, id: path, type }))
            }
        })
    }, [location])

    useEffect(() => {
        switch (postInfo?.type) {
            case 'post':
                DataSource.getPostById(postInfo?.id).then(post =>
                    setPostInfo(prevState => ({ ...prevState, title: post.title }))
                )
                break;

            default:
                break;
        }
    }, [postInfo.id])

    return (
        <div className='breadcrumbs'>
            <Link className='breadcrumbs__link body-medium' to={'/'}>Home</Link>
            {paths.map((path, i) => {
                let title = ''
                if (uuidValidate(path)) {
                    title = postInfo?.title
                } else {
                    title = path[0].toUpperCase() + path.slice(1, path.length)
                }
                const routeTo = `/${paths.slice(0, i + 1).join('/')}`
                return (
                    <Link className='breadcrumbs__link body-medium' to={routeTo} key={i}>{setCharacterLimit(title, 51)}</Link>
                )
            })}
        </div>
    )
}

export default Breadcrumbs