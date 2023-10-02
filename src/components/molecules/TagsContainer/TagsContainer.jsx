import React from 'react'

import styles from './TagsContainer.module.scss'

import Tags from '../Tags'

const TagsContainer = ({ title, tagsData, setTagsData, action }) => {
    return (
        <div className={`panel ${styles['tags-container']}`}>
            <h4>{title}</h4>
            <div className={`${styles['tags-container__inner']}`}>
                <Tags tagsData={tagsData} setTagsData={setTagsData} action={action} />
            </div>
        </div>
    )
}

export default TagsContainer