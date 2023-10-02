import React, { useEffect, useRef, useState } from 'react'

import styles from './BurgerMenu.module.scss'

import MazdaRX from '../../../images/mazdarx.jpg'

import { blurBackground } from '../../../utils/blurBackground'

import Link from '../../atoms/Link'
import TopProfileLink from '../TopProfileLink/TopProfileLink'

const BurgerMenu = ({ links }) => {

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
        userTitle: 'Wade Warren',
        userImageSrc: MazdaRX,
        userProfileUrl: '/#user'
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
                            <Link text={text} url={url}>
                                {icon}
                            </Link>
                        </li>
                    ))}
                </ul>
                <div className={`${styles['burger-menu__links-bottom']}`}>
                    <TopProfileLink direction='top' {...userInfo} />
                </div>
            </div>
        </div>
    )
}

export default BurgerMenu