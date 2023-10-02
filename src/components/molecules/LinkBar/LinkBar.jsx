import React from 'react'

import styles from './LinkBar.module.scss'

const LinkBar = ({ title, text, children }) => {
  return (
    <div className={`panel ${styles['link-bar']}`}>
      <div>
        {children}
      </div>
      <div className={`${styles['link-bar-bottom']}`}>
        <h4>{title}</h4>
        <p className='body-small'>{text}</p>
      </div>
    </div>
  )
}

export default LinkBar