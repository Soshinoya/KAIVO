import { signInWithEmailAndPassword, createUserWithEmailAndPassword, signInWithPopup, GoogleAuthProvider, deleteUser } from 'firebase/auth'

import { auth } from './database/firebase'

import DataSource from './DataSource'

import { defineError } from '../utils/defineError'

export default class Authentication {

    static loginWithGoogle = async () => {
        try {
            const provider = new GoogleAuthProvider()
            const result = await signInWithPopup(auth, provider)
            const userInfo = await DataSource.getUserById(result?.user?.uid)
            if (!userInfo) {
                // Удаляем пользователя если его нету в БД
                await deleteUser(auth.currentUser)
                throw new Error('EMAIL_NOT_FOUND')
            }
            return userInfo
        } catch (error) {
            throw new Error(error.message)
        }
    }

    static registerWithGoogle = async () => {
        try {
            let userInfo;
            const provider = new GoogleAuthProvider()
            const result = await signInWithPopup(auth, provider)
            const user = result.user
            const userAlreadyExists = await DataSource.getUserById(user.uid)
            if (!userAlreadyExists) {
                userInfo = await DataSource.addUserToDB({ nickname: user?.displayName, id: user?.uid })
            } else {
                userInfo = userAlreadyExists
            }

            return userInfo
        } catch (error) {
            throw new Error(defineError(error.message))
        }
    }

    static login = async ({ email, password }) => {
        try {
            const userCredential = await signInWithEmailAndPassword(auth, email, password)
            const userInfo = await DataSource.getUserById(userCredential.user.uid)
            const userPrivateInfo = {
                token: userCredential._tokenResponse.idToken,
                email: userCredential._tokenResponse.email,
                userId: userCredential._tokenResponse.localId,
                refreshToken: userCredential._tokenResponse.refreshToken,
                expiresin: userCredential._tokenResponse.expiresIn
            }
            return { userInfo, userPrivateInfo }
        } catch (error) {
            throw new Error(defineError(error.code))
        }
    }

    static register = async ({ nickname, email, password }) => {
        try {
            await createUserWithEmailAndPassword(auth, email, password)
            const userCredential = await signInWithEmailAndPassword(auth, email, password)
            const userInfo = await DataSource.addUserToDB({ nickname, id: userCredential.user.uid })
            const userPrivateInfo = {
                token: userCredential._tokenResponse.idToken,
                email: userCredential._tokenResponse.email,
                userId: userCredential._tokenResponse.localId,
                refreshToken: userCredential._tokenResponse.refreshToken,
                expiresin: userCredential._tokenResponse.expiresIn
            }
            return { userInfo, userPrivateInfo }
        } catch (error) {
            throw new Error(defineError(error.code))
        }
    }

}