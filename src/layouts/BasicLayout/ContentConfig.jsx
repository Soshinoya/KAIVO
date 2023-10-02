import React from 'react'

import styles from './ContentConfig.module.scss'

import SprayIcon from '../../components/atoms/icons/SprayIcon'
import VehicleIcon from '../../components/atoms/icons/VehicleIcon'
import CameraIcon from '../../components/atoms/icons/CameraIcon'
import RoadIcon from '../../components/atoms/icons/RoadIcon'
import DashboardIcon from '../../components/atoms/icons/DashboardIcon'

import { getRandomUUID } from '../../utils/getRandomUUID'

import Select from '../../components/atoms/Select'
import BurgerMenu from '../../components/molecules/BurgerMenu/BurgerMenu'

const ContentConfig = ({ selectConfig }) => {

    const burgerMenuLinks = [
        {
            id: getRandomUUID(),
            text: 'Home',
            url: '/',
            icon: <DashboardIcon style={{ width: '20px', height: '20px', strokeWidth: '1px' }} />
        },
        {
            id: getRandomUUID(),
            text: 'Livery',
            url: '/category/livery',
            icon: <SprayIcon style={{ width: '20px', height: '20px', strokeWidth: '2px' }} />
        },
        {
            id: getRandomUUID(),
            text: 'Photo',
            url: '/category/photo',
            icon: <CameraIcon style={{ width: '20px', height: '20px', strokeWidth: '2px' }} />
        },
        {
            id: getRandomUUID(),
            text: 'Tuning',
            url: '/category/tuning',
            icon: <VehicleIcon style={{ width: '20px', height: '20px', strokeWidth: '2px' }} />
        },
        {
            id: getRandomUUID(),
            text: 'Blueprint',
            url: '/category/blueprint',
            icon: <RoadIcon style={{ width: '20px', height: '20px', strokeWidth: '2px' }} />
        }
    ]

    return (
        <div className={`${styles['wrapper']}`}>
            {selectConfig?.options?.length > 0 && <Select {...selectConfig} />}
            {window.matchMedia('(max-width: 1160px)').matches && <BurgerMenu links={burgerMenuLinks} />}
        </div>
    )
}

export default ContentConfig