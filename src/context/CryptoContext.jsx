import { createContext, useEffect, useState } from 'react'

import { getFromLS } from '../utils/localStorageActions'

import DataSource from '../service/DataSource'

const Crypto = createContext()

const CryptoContext = ({ children }) => {

    const [user, setUser] = useState(null)

    const [userPrivateInfo, setUserPrivateInfo] = useState(null)

    useEffect(() => {
        const userId = getFromLS('userId')
        if (userId) {
            DataSource.getUserById(userId).then(setUser)
        }
    }, [])

    return (
        <Crypto.Provider value={{ user, setUser, setUserPrivateInfo }}>
            {children}
        </Crypto.Provider>
    )
}

export { CryptoContext, Crypto }