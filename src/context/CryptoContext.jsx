import { createContext, useEffect, useState } from 'react'

import { getFromLS, removeFromLS } from '../utils/localStorageActions'

import DataSource from '../service/DataSource'

import { auth } from '../service/database/firebase'

const Crypto = createContext()

const CryptoContext = ({ children }) => {

    const [user, setUser] = useState(null)

    const [userPrivateInfo, setUserPrivateInfo] = useState(null)

    useEffect(() => {
        const userId = getFromLS('userId')
        if (userId) {
            if (auth.currentUser) {
                DataSource.getUserById(userId).then(setUser)
            } else {
                removeFromLS('userId')
                console.log('Please log in')
            }
        }
    }, [])

    return (
        <Crypto.Provider value={{ user, setUser, setUserPrivateInfo }}>
            {children}
        </Crypto.Provider>
    )
}

export { CryptoContext, Crypto }