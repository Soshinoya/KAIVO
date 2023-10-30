import React, { createContext, useContext, useEffect, useState } from 'react'

import { Crypto } from './CryptoContext'

const BackgroundAnimate = createContext()

const AnimateContext = ({ children }) => {

    const { user } = useContext(Crypto)

    const [isEnabled, setIsEnabled] = useState(false)

    useEffect(() => {
        if (user?.interfaceSettings?.isBackgroundAnimationEnabled ?? false) {
            setIsEnabled(true)
        }
    }, [user])

    return (
        <BackgroundAnimate.Provider value={{ isEnabled, setIsEnabled }}>
            <div>
                {children}
            </div>
            {isEnabled && <div className="animation-container">
                <div className="animation-bubbles">
                    <span style={{ '--i': 28 }}></span>
                    <span style={{ '--i': 13 }}></span>
                    <span style={{ '--i': 17 }}></span>
                    <span style={{ '--i': 26 }}></span>
                    <span style={{ '--i': 13 }}></span>
                    <span style={{ '--i': 15 }}></span>
                    <span style={{ '--i': 21 }}></span>
                    <span style={{ '--i': 18 }}></span>
                    <span style={{ '--i': 25 }}></span>
                    <span style={{ '--i': 22 }}></span>
                    <span style={{ '--i': 20 }}></span>
                    <span style={{ '--i': 19 }}></span>
                    <span style={{ '--i': 16 }}></span>
                    <span style={{ '--i': 18 }}></span>
                    <span style={{ '--i': 23 }}></span>
                    <span style={{ '--i': 13 }}></span>
                    <span style={{ '--i': 15 }}></span>
                    <span style={{ '--i': 21 }}></span>
                    <span style={{ '--i': 18 }}></span>
                    <span style={{ '--i': 25 }}></span>
                    <span style={{ '--i': 22 }}></span>
                    <span style={{ '--i': 20 }}></span>
                    <span style={{ '--i': 19 }}></span>
                    <span style={{ '--i': 16 }}></span>
                    <span style={{ '--i': 18 }}></span>
                    <span style={{ '--i': 23 }}></span>
                    <span style={{ '--i': 14 }}></span>
                    <span style={{ '--i': 10 }}></span>
                    <span style={{ '--i': 24 }}></span>
                    <span style={{ '--i': 11 }}></span>
                    <span style={{ '--i': 12 }}></span>
                    <span style={{ '--i': 28 }}></span>
                    <span style={{ '--i': 13 }}></span>
                    <span style={{ '--i': 17 }}></span>
                    <span style={{ '--i': 26 }}></span>
                    <span style={{ '--i': 13 }}></span>
                    <span style={{ '--i': 15 }}></span>
                    <span style={{ '--i': 21 }}></span>
                    <span style={{ '--i': 18 }}></span>
                    <span style={{ '--i': 25 }}></span>
                    <span style={{ '--i': 22 }}></span>
                    <span style={{ '--i': 20 }}></span>
                    <span style={{ '--i': 19 }}></span>
                    <span style={{ '--i': 16 }}></span>
                    <span style={{ '--i': 18 }}></span>
                    <span style={{ '--i': 23 }}></span>
                    <span style={{ '--i': 14 }}></span>
                    <span style={{ '--i': 10 }}></span>
                    <span style={{ '--i': 24 }}></span>
                    <span style={{ '--i': 11 }}></span>
                    <span style={{ '--i': 12 }}></span>
                    <span style={{ '--i': 12 }}></span>
                    <span style={{ '--i': 28 }}></span>
                    <span style={{ '--i': 13 }}></span>
                    <span style={{ '--i': 17 }}></span>
                    <span style={{ '--i': 26 }}></span>
                    <span style={{ '--i': 13 }}></span>
                    <span style={{ '--i': 15 }}></span>
                    <span style={{ '--i': 21 }}></span>
                    <span style={{ '--i': 18 }}></span>
                    <span style={{ '--i': 25 }}></span>
                    <span style={{ '--i': 22 }}></span>
                    <span style={{ '--i': 20 }}></span>
                    <span style={{ '--i': 19 }}></span>
                    <span style={{ '--i': 16 }}></span>
                    <span style={{ '--i': 18 }}></span>
                    <span style={{ '--i': 23 }}></span>
                    <span style={{ '--i': 14 }}></span>
                    <span style={{ '--i': 10 }}></span>
                    <span style={{ '--i': 24 }}></span>
                    <span style={{ '--i': 11 }}></span>
                    <span style={{ '--i': 12 }}></span>
                </div>
            </div>}
        </BackgroundAnimate.Provider>
    )
}

export { AnimateContext, BackgroundAnimate }