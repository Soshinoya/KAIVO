import React from "react"

const StatisticItem = ({ title, text }) => {
    return (
        <div className='statistic-item'>
            <h2 className='statistic-item__title'>{title}</h2>
            <p className='statistic-item__text body-medium'>{text}</p>
        </div>
    )
}

export default StatisticItem