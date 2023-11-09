import { arrayRemove, arrayUnion, doc, updateDoc } from 'firebase/firestore'

import { db } from './database/firebase'

import { defineError } from '../utils/defineError'


export default class AccountActions {

    static updateAccountProperties = async (userId, updatedPropertiesObject) => {
        try {
            await updateDoc(doc(db, 'users', userId), updatedPropertiesObject)
        } catch (error) {
            console.log(defineError(error?.message))
        }
    }

    static subscribeToUser = async (subscriptionId, subscriptionType, localUserState = {}) => {
        try {
            const loggedUserId = localUserState?.user?.id
            if (!loggedUserId) throw new Error('UnauthorizedError')
            await updateDoc(doc(db, 'users', loggedUserId), {
                subscriptions: arrayUnion({ id: subscriptionId, type: subscriptionType })
            })
            await updateDoc(doc(db, 'users', subscriptionId), {
                followers: arrayUnion(loggedUserId)
            })
            localUserState?.mutateUser({ ...localUserState?.user, subscriptions: [...localUserState?.user?.subscriptions, { id: subscriptionId, type: subscriptionType }] })
        } catch (error) {
            throw new Error(defineError(error?.message)).message
        }
    }

    static unsubscribeFromUser = async (subscriptionId, subscriptionType, localUserState = {}) => {
        try {
            const loggedUserId = localUserState?.user?.id
            if (!loggedUserId) throw new Error('UnauthorizedError')
            await updateDoc(doc(db, 'users', loggedUserId), {
                subscriptions: arrayRemove({ id: subscriptionId, type: subscriptionType })
            })
            await updateDoc(doc(db, 'users', subscriptionId), {
                followers: arrayRemove(loggedUserId)
            })
            localUserState?.mutateUser({ ...localUserState?.user, subscriptions: localUserState?.user?.subscriptions.filter(({ id }) => id !== subscriptionId) })
        } catch (error) {
            throw new Error(defineError(error?.message)).message
        }
    }

}