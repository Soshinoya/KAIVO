import React from 'react'

import styles from './ResultsBlock.module.scss'

import { Link } from 'react-router-dom'


const ResultsBlock = ({ results }) => {
    return (
        <>
            {results.length > 0 && (
                <div className={`panel ${styles['results-block']}`}>
                    {results.map(({ id, title, link }) => (
                        <div className={`${styles['results-block__single']}`} key={id}>
                            <Link to={link}>
                                {title}
                            </Link>
                        </div>
                    ))}
                </div>
            )}
        </>
    )
}

export default ResultsBlock