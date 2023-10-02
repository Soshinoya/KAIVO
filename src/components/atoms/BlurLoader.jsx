import React, { useEffect } from 'react'

import { blurBackground } from '../../utils/blurBackground'

const BlurLoader = ({ isLoading }) => {

    useEffect(() => {
        isLoading ? blurBackground(true) : blurBackground(false)
    }, [isLoading])

    return isLoading && (
        <div className='blur-loader loader'>
            <div className='circle'></div>
            <div className='circle'></div>
            <div className='circle'></div>
            <div className='circle'></div>
        </div>
    )
}

export default BlurLoader