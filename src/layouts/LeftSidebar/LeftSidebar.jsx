import React from 'react'

import styles from './LeftSidebar.module.scss'

import DashboardIcon from '../../components/atoms/icons/DashboardIcon'
import SprayIcon from '../../components/atoms/icons/SprayIcon'
import CameraIcon from '../../components/atoms/icons/CameraIcon'
import VehicleIcon from '../../components/atoms/icons/VehicleIcon'
import RoadIcon from '../../components/atoms/icons/RoadIcon'

import Link from '../../components/atoms/Link'

const LeftSidebar = () => {

    const isActive = !window.matchMedia("(max-width: 1272px)").matches

    return (
        <aside className={`panel ${styles['sidebar']} ${!isActive && styles['sidebar--disactive']}`}>
            <ul className={`${styles['sidebar__links']}`}>
                <li className={`${styles['sidebar__link']}`}>
                    <Link isActive={isActive} text='Home' url='/'>
                        <DashboardIcon style={{ width: '20px', height: '20px', strokeWidth: '1px' }} />
                    </Link>
                </li>
                <li className={`${styles['sidebar__link']}`}>
                    <Link isActive={isActive} text='Livery' url='/category/livery'>
                        <SprayIcon style={{ width: '20px', height: '20px', strokeWidth: '2px' }} />
                    </Link>
                </li>
                <li className={`${styles['sidebar__link']}`}>
                    <Link isActive={isActive} text='Photo' url='/category/photo'>
                        <CameraIcon style={{ width: '20px', height: '20px', strokeWidth: '2px' }} />
                    </Link>
                </li>
                <li className={`${styles['sidebar__link']}`}>
                    <Link isActive={isActive} text='Tuning' url='/category/tuning'>
                        <VehicleIcon style={{ width: '20px', height: '20px', strokeWidth: '2px' }} />
                    </Link>
                </li>
                <li className={`${styles['sidebar__link']}`}>
                    <Link isActive={isActive} text='Blueprint' url='/category/blueprint'>
                        <RoadIcon style={{ width: '20px', height: '20px', strokeWidth: '2px' }} />
                    </Link>
                </li>
            </ul>
        </aside>
    )
}

export default LeftSidebar