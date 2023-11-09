import React from 'react'
import { Link } from 'react-router-dom'
import { useMutation, useQueryClient } from '@tanstack/react-query'

import styles from './Header.module.scss'

import logo from '../../../images/Kaivo.png'

import { USER } from '../../../service/queryKeys'

import Input from '../../atoms/Input'
import Button from '../../atoms/Button'
import TopProfileLink from '../../molecules/TopProfileLink/TopProfileLink'

const Header = ({ setSearchResults }) => {

    const queryClient = useQueryClient()

    const user = queryClient.getQueryData([USER])

    const { mutate: logOutMutate } = useMutation({
        mutationKey: [USER],
        mutationFn() {
            return null
        },
        onSuccess() {
            queryClient.invalidateQueries([USER])
        }
    })

    return (
        <header className={`panel ${styles['header']}`}>
            <div className={`${styles['header__inner']}`}>
                <Link to='/' className={`${styles['header__logo']}`}>
                    <img src={logo} alt="logotype" />
                </Link>
                <Input name='search' type='text' placeholder='Search for news...' setResults={setSearchResults} />
                <div className={`${styles['header__profile']}`}>
                    {
                        user
                            ? <TopProfileLink userId={user.id} userTitle={user.nickname} userImageSrc={user.userImageSrc} userProfileUrl={`users/${user.id}`} logOutMutate={logOutMutate} />
                            : <Link to='/login'><Button size='large' text='Go to authorization' /></Link>
                    }
                </div>
            </div>
        </header>
    )
}

export default Header