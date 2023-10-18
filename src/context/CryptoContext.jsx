import { createContext, useEffect, useState } from 'react'

import DataSource from '../service/DataSource'

import { auth } from '../service/database/firebase'

const Crypto = createContext()

const CryptoContext = ({ children }) => {

    const [user, setUser] = useState(null)

    const [userPrivateInfo, setUserPrivateInfo] = useState(null)

    useEffect(() => {
        const fetching = async () => {
            try {
                const user = auth.currentUser

                if (user) {
                    // Если пользователь уже аутентифицирован, вы можете получить данные пользователя
                    const userData = await DataSource.getUserById(user.uid)
                    setUser(userData)
                } else {
                    // Если пользователь ещё не аутентифицирован, дождитесь аутентификации с помощью промиса
                    auth.onAuthStateChanged(async (user) => {
                        if (user) {
                            const userData = await DataSource.getUserById(user.uid)
                            setUser(userData)
                        } else {
                            console.log('Plese log in')
                        }
                    })
                }
            } catch (error) {
                console.error(error)
            }
        }
        fetching()
    }, [])

    return (
        <Crypto.Provider value={{ user, setUser, setUserPrivateInfo }}>
            {children}
        </Crypto.Provider>
    )
}

export { CryptoContext, Crypto }