import React from 'react'

import { useNavigate } from 'react-router-dom'

import styles from './NotFound.module.scss'

import NotFoundImage from '../../images/404.png'

import Button from '../../components/atoms/Button'

const NotFound = () => {

  const navigate = useNavigate()

  return (
    <div className={`${styles['wrapper']}`}>
      <div className={`${styles['image']}`}>
        <img src={NotFoundImage} alt='404 - Not Found' />
      </div>
      <div className={`${styles['inner']}`}>
        <h1>404 - Not found</h1>
        <p className={`${styles['text']}`}>
          Please be careful and watch for road signs to avoid these accidents on our site
        </p>
        <Button size='large' text='Home page' onClick={() => navigate('/')} />
      </div>
    </div>
  )
}

export default NotFound