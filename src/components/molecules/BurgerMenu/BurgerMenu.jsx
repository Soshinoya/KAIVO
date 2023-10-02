import React, { useContext, useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'

import styles from './BurgerMenu.module.scss'

import { blurBackground } from '../../../utils/blurBackground'

import { Crypto } from '../../../context/CryptoContext'

import CustomLink from '../../atoms/Link'
import TopProfileLink from '../TopProfileLink/TopProfileLink'
import Button from '../../atoms/Button'

const BurgerMenu = ({ links }) => {

    const { user } = useContext(Crypto)

    const burgerMenuRef = useRef(null)

    const [isBurgerMenuOpened, setIsBurgerMenuOpened] = useState(false)

    useEffect(() => {
        isBurgerMenuOpened ? blurBackground(true) : blurBackground(false)
    }, [isBurgerMenuOpened])

    const handleOutsideClick = ({ target }) => {
        if (burgerMenuRef.current && !burgerMenuRef.current.contains(target)) {
            setIsBurgerMenuOpened(false)
        }
    }

    // Добавляем обработчик клика вне селектора для закрытия при щелчке вне компонента
    useEffect(() => {
        document.addEventListener('click', handleOutsideClick)

        return () => {
            document.removeEventListener('click', handleOutsideClick)
        }
    }, [])

    const userInfo = {
        userId: user?.id,
        userTitle: user?.nickname,
        userImageSrc: user?.userImageSrc,
        userProfileUrl: `/users/${user?.id}`
    }

    return (
        <div ref={burgerMenuRef} style={{ marginLeft: 'auto' }}>
            <div className={`${styles['burger-menu']}`} onClick={() => {
                window.scrollTo(0, 0)
                setIsBurgerMenuOpened(true)
            }}>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
            </div>
            <div className={`panel ${styles['burger-menu__links-wrapper']} ${isBurgerMenuOpened && styles['open']}`}>
                <div className={`${styles['burger-menu__links-top']}`}>
                    <h3>Navigation</h3>
                </div>
                <ul className={`${styles['burger-menu__links']}`}>
                    {links.map(({ id, text, url, icon }) => (
                        <li className={`${styles['burger-menu__link']}`} key={id}>
                            <CustomLink text={text} url={url}>
                                {icon}
                            </CustomLink>
                        </li>
                    ))}
                </ul>
                <div className={`${styles['burger-menu__links-bottom']}`}>
                    {
                        user !== null
                            ? <TopProfileLink direction='top' {...userInfo} />
                            : <Link to='/login'><Button size='large' text='Go to authorization' /></Link>
                    }
                </div>
            </div>
        </div>
    )
}

export default BurgerMenu