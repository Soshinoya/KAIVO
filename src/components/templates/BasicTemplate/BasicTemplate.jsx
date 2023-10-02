// Layout (template) for basic page, which receive a props (header, left sidebar, main content, etc.)

import React from 'react'

import styles from './BasicTemplate.module.scss'

const BasicTemplate = ({ header, leftSidebar, rightSidebar, children }) => {
    return (
        <div className={`${styles['basic']}`}>
            {header}
            <div className={`${styles['basic__inner']}`}>
                <div className={`${styles['basic__left-sidebar']}`}>
                    {leftSidebar}
                </div>
                <div className={`${styles['basic__children']}`}>
                    {children}
                </div>
                {rightSidebar}
            </div>
        </div>
    )
}

export default BasicTemplate