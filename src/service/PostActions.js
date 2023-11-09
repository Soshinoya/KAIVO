import { doc, getDoc, query, setDoc, updateDoc } from 'firebase/firestore'
import { db } from './database/firebase'

import { defineError } from '../utils/defineError'
export default class PostActions {

    static complainOnPost = async (postId, userId) => {
        try {
            if (!userId) throw new Error('UnauthorizedError').message

            const queryGetSnapshot = await getDoc(query(doc(db, 'complaints', postId)))

            const complain = queryGetSnapshot.exists() ? queryGetSnapshot.data() : undefined

            if (complain) {
                // Проверяем существовал ли объект с жалобой
                if (complain?.usersWhoComplained?.find(id => id === userId)) {
                    // Проверяем есть ли id пользователя в массиве usersWhoComplained
                    throw new Error('COMPLAINT_WAS_SENT').message
                } else {
                    // Если id пользователя не находться в массиве с ids пользователями, то добавляем его в этот массив
                    const updatedComplainTemplate = {
                        ...complain,
                        usersWhoComplained: [
                            ...complain?.usersWhoComplained,
                            userId
                        ]
                    }
                    await updateDoc(doc(db, 'complaints', postId), updatedComplainTemplate)
                }
            } else {
                // Если раньше не было жалоб на пост, то создаём объект с жалобой
                const complainTemplate = {
                    type: 'post',
                    usersWhoComplained: [userId]
                }
                await setDoc(doc(db, 'complaints', postId), complainTemplate)
            }
        } catch (error) {
            throw new Error(defineError(error)).message
        }
    }

    static checkLike = async (postId, userId) => {
        try {
            if (!userId) return false

            let isLiked = false

            const querySnapshot = await getDoc(query(doc(db, 'posts', postId)))

            if (querySnapshot.exists()) {
                const post = querySnapshot.data()
                if (post?.likes?.find(id => id === userId)) {
                    isLiked = true
                }
            }

            return isLiked
        } catch (error) {
            console.log(defineError(error?.message))
        }
    }

    static addLike = async (postId, userId) => {
        try {
            if (!userId) throw new Error('UnauthorizedError').message

            let isLiked = false

            const querySnapshot = await getDoc(query(doc(db, 'posts', postId)))

            if (querySnapshot.exists()) {
                const post = querySnapshot.data()
                if (!post?.likes?.find(id => id === userId)) {
                    isLiked = true
                    await updateDoc(doc(db, 'posts', postId), { ...post, likes: [...post?.likes, userId] })
                }
            }

            return isLiked
        } catch (error) {
            throw new Error(defineError(error)).message
        }
    }

    static removeLike = async (postId, userId) => {
        try {
            if (!userId) throw new Error('UnauthorizedError').message

            let isLiked = true

            const querySnapshot = await getDoc(query(doc(db, 'posts', postId)))

            if (querySnapshot.exists()) {
                const post = querySnapshot.data()
                if (post?.likes?.find(id => id === userId)) {
                    isLiked = false
                    await updateDoc(doc(db, 'posts', postId), { ...post, likes: post?.likes?.filter(id => id !== userId) })
                }
            }

            return isLiked
        } catch (error) {
            throw new Error(defineError(error)).message
        }
    }

}