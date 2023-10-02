import React, { useContext } from 'react'

import { Link } from 'react-router-dom'

import styles from './Header.module.scss'

import logo from '../../../images/Kaivo.png'

import { Crypto } from '../../../context/CryptoContext'

import Input from '../../atoms/Input'
import Button from '../../atoms/Button'
import TopProfileLink from '../../molecules/TopProfileLink/TopProfileLink'

const Header = ({ setSearchResults }) => {

    const { user } = useContext(Crypto)

    return (
        <header className={`panel ${styles['header']}`}>
            <div className={`${styles['header__inner']}`}>
                <Link to='/' className={`${styles['header__logo']}`}>
                    <img src={logo} alt="logotype" />
                </Link>
                <Input name='search' type='text' placeholder='Search for news...' setResults={setSearchResults} />
                <div className={`${styles['header__profile']}`}>
                    {
                        user !== null
                            ? <TopProfileLink userId={user.id} userTitle={user.nickname} userImageSrc={user.userImageSrc} userProfileUrl={`users/${user.id}`} />
                            : <Link to='/login'><Button size='large' text='Go to authorization' /></Link>
                    }
                </div>
            </div>
        </header>
    )
}

export default Header