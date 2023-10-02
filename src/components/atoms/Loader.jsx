import React from 'react'

const Loader = ({ isLoading }) => {
    return isLoading && (
        <div className='loader'>
            <div className='circle'></div>
            <div className='circle'></div>
            <div className='circle'></div>
            <div className='circle'></div>
        </div>
    )
}

export default Loader