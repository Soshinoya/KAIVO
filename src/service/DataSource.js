import { doc, setDoc, getDoc, collection, getDocs, query, limit, where, startAfter, orderBy } from 'firebase/firestore'

import { db } from './database/firebase'

import YandexDrive from './YandexDrive'

import { defineError } from '../utils/defineError'
import { HTMLToText, textToHTML } from '../utils/parser'

import postPreviewDefault from '../images/plug-image.jpg'
import userImageDefault from '../images/pinksilvia.jpg'
import userCoverDefault from '../images/backgrounds/Background.png'

export default class DataSource {

    static getPosts = async (lastDoc, postsLimit = 10) => {
        // код, получающий посты
        try {
            const size = await this.getCollectionSize('posts')

            const querySnapshot = lastDoc
                ? await getDocs(query(collection(db, 'posts'), startAfter(lastDoc), limit(postsLimit)))
                : await getDocs(query(collection(db, 'posts'), limit(postsLimit)))

            const responseDataArray = []

            querySnapshot.forEach(post => {
                if (post.exists()) {
                    responseDataArray.push(post.data())
                }
            })

            const posts = await Promise.all(responseDataArray.map(async post => {
                const content = await this._getPostMedia(post)
                const user = await this.getUserById(post?.userId)
                return { ...post, content, user }
            }))

            return { posts, lastDoc: querySnapshot.docs[querySnapshot.docs.length - 1], size }
        } catch (error) {
            console.log(defineError(error?.message))
        }
    }

    static getPostById = async id => {
        // код, получающий статью по уникальному идентификатору

        try {
            const post = await getDoc(query(doc(db, 'posts', id)))

            if (post.exists()) {
                const postInfo = post.data()

                const content = await this._getPostMedia(postInfo)

                const user = await this.getUserById(postInfo?.userId)

                return { ...postInfo, content, user }
            } else {
                throw new Error(defineError('POST_DOESNT_EXIST'))
            }
        } catch (error) {
            console.log(defineError(error?.message))
        }

    }

    static getUserById = async id => {
        // код, получающий только данные о пользователе

        try {
            const userRef = doc(db, 'users', id)
            const userInfo = await getDoc(userRef)
            if (userInfo.exists()) {
                const user = userInfo.data()

                switch (user.userImageSrc) {
                    case 'default':
                        user.userImageSrc = userImageDefault
                        break;
                    case 'custom':
                        const customImage = await YandexDrive.downloadFile(`/kaivo/users/${id}/userImage.${user.userImageExtension}`)
                        user.userImageSrc = customImage
                        break;
                    default:
                        break;
                }

                switch (user.coverImageSrc) {
                    case 'default':
                        user.coverImageSrc = userCoverDefault
                        break;
                    case 'custom':
                        const customImage = await YandexDrive.downloadFile(`/kaivo/users/${id}/userCover.${user.coverImageExtension}`)
                        user.coverImageSrc = customImage
                        break;
                    default:
                        break;
                }

                return user
            } else {
                throw new Error(defineError('USER_DOESNT_EXIST'))
            }
        } catch (error) {
            console.log(defineError(error?.message))
        }
    }

    static getUsers = async (countOfUsers = 5) => {
        // код, получающий только данные о пользователях

        try {
            const querySnapshot = await getDocs(query(collection(db, 'users'), limit(countOfUsers)))
            const responseDataArray = []

            querySnapshot.forEach(user => {
                if (user.exists()) {
                    responseDataArray.push(user.data())
                }
            })

            const users = await Promise.all(responseDataArray.map(async user => {
                switch (user.userImageSrc) {
                    case 'default':
                        user.userImageSrc = userImageDefault
                        break;
                    case 'custom':
                        const customImage = await YandexDrive.downloadFile(`/kaivo/users/${user.id}/userImage.${user.userImageExtension}`)
                        user.userImageSrc = customImage
                        break;
                    default:
                        break;
                }
                switch (user.coverImageSrc) {
                    case 'default':
                        user.coverImageSrc = userCoverDefault
                        break;
                    case 'custom':
                        const customImage = await YandexDrive.downloadFile(`/kaivo/users/${user.id}/userCover.${user.coverImageExtension}`)
                        user.coverImageSrc = customImage
                        break;
                    default:
                        break;
                }
                return user
            }))

            return users
        } catch (error) {
            console.log(defineError(error?.message))
        }
    }

    static getPopularUsers = async (usersLimit = 5) => {
        // код, получающий только данные о пользователях

        try {
            const querySnapshot = await getDocs(query(collection(db, 'users'), orderBy('followers', 'asc'), limit(usersLimit)))
            const responseDataArray = []

            querySnapshot.forEach(user => {
                if (user.exists()) {
                    responseDataArray.push(user.data())
                }
            })

            const users = await Promise.all(responseDataArray.map(async user => {
                switch (user.userImageSrc) {
                    case 'default':
                        user.userImageSrc = userImageDefault
                        break;
                    case 'custom':
                        const customImage = await YandexDrive.downloadFile(`/kaivo/users/${user.id}/userImage.${user.userImageExtension}`)
                        user.userImageSrc = customImage
                        break;
                    default:
                        break;
                }
                switch (user.coverImageSrc) {
                    case 'default':
                        user.coverImageSrc = userCoverDefault
                        break;
                    case 'custom':
                        const customImage = await YandexDrive.downloadFile(`/kaivo/users/${user.id}/userCover.${user.coverImageExtension}`)
                        user.coverImageSrc = customImage
                        break;
                    default:
                        break;
                }
                return user
            }))

            return users
        } catch (error) {
            console.log(defineError(error?.message))
        }
    }

    static getFollowers = async (followerIds = [], countOfUsers = 5) => {
        // код, получающий только данные о пользователях, которые подписаны на залогиненного пользователя

        try {
            const followerUsers = await Promise.all(followerIds.map(async (id, i) => {
                if (i >= countOfUsers) return
                const user = await this.getUserById(id)
                return user
            }))

            return followerUsers
        } catch (error) {
            console.log(defineError(error?.message))
        }
    }

    static getSubscriptionUsers = async (subscriptions = [], countOfSubscriptions = 5) => {
        // код, получающий только данные о пользователях, на которых подписан залогиненый пользователь

        try {
            if (subscriptions?.length === 0) return
            const userSubscriptions = await Promise.all(subscriptions?.map(async ({ id, type }, i) => {
                if (i >= countOfSubscriptions) return
                switch (type) {
                    case 'user':
                        const user = await this.getUserById(id)
                        return user
                    // Если в дальнейшем будут добавлены группы (и соответственно возможность подписки на них) то некст кейсом нужно добавить обработку для типа 'group'

                    default:
                        break;
                }
            }))

            return userSubscriptions
        } catch (error) {
            console.log(defineError(error?.message))
        }
    }

    static getCategoryPosts = async (category = 'livery', lastDoc, postsLimit = 10) => {
        // код, получающий посты

        try {
            const size = await this.getCollectionSize('posts', {
                field: 'category',
                condiotion: '==',
                value: category
            })

            const querySnapshot = lastDoc
                ? await getDocs(query(collection(db, 'posts'), startAfter(lastDoc), limit(postsLimit), where('category', '==', category)))
                : await getDocs(query(collection(db, 'posts'), limit(postsLimit), where('category', '==', category)))

            const responseDataArray = []

            querySnapshot.forEach(post => {
                if (post.exists()) {
                    responseDataArray.push(post.data())
                }
            })

            if (responseDataArray.length <= 0) throw new Error('NO_POSTS_WITH_THE_SELECTED_CATEGORY')

            const posts = await Promise.all(responseDataArray.map(async post => {
                const content = await this._getPostMedia(post)
                const user = await this.getUserById(post?.userId)
                return { ...post, content, user }
            }))

            return { posts, lastDoc: querySnapshot.docs[querySnapshot.docs.length - 1], size }
        } catch (error) {
            console.log(defineError(error?.message))
        }
    }

    static getUserCategoryPosts = async (userId, category, lastDoc, postsLimit = 10) => {
        // код, получающий только данные о постах пользователя определённой категории

        try {
            const userPosts = await getDocs(query(collection(db, 'posts'), where('userId', '==', userId)))
            let newLastDoc;
            let size = 0

            userPosts.forEach(post => {
                if (post.exists()) {
                    const postData = post.data()
                    postData?.category === category && size++
                }
            })

            const querySnapshot = lastDoc
                ? await getDocs(query(collection(db, 'posts'), startAfter(lastDoc), limit(postsLimit), where('userId', '==', userId)))
                : await getDocs(query(collection(db, 'posts'), limit(postsLimit), where('userId', '==', userId)))

            const responseDataArray = []

            querySnapshot.forEach(post => {
                if (post.exists()) {
                    const postData = post.data()
                    if (postData?.category === category) {
                        responseDataArray.push(postData)
                    } else {
                        newLastDoc = post
                    }
                }
            })

            if (newLastDoc && responseDataArray.length < postsLimit && responseDataArray.length < size) {
                const updatedPostsObj = await this.getUserCategoryPosts(userId, category, newLastDoc, postsLimit)
                return updatedPostsObj
            }

            if (responseDataArray.length <= 0) throw new Error('NO_POSTS_WITH_THE_SELECTED_CATEGORY')

            const posts = await Promise.all(responseDataArray.map(async post => {
                const content = await this._getPostMedia(post)
                const user = await this.getUserById(post?.userId)
                return { ...post, content, user }
            }))

            return { posts, lastDoc: querySnapshot.docs[querySnapshot.docs.length - 1], size }
        } catch (error) {
            throw new Error(defineError(error?.message))
        }
    }

    static _getPostMedia = async post => {
        switch (post?.imageSrc) {
            case 'default':
                post.imageSrc = postPreviewDefault
                break;
            case 'custom':
                const customImage = await YandexDrive.downloadFile(`/kaivo/posts/${post?.id}/postImage.${post?.imageExtension}`)
                post.imageSrc = customImage
                break;
            default:
                break;
        }

        const html = textToHTML(post?.content)
        const imgTags = html.querySelectorAll('img')
        const contentImagesNames = []

        imgTags.forEach(imgTag => {
            const src = imgTag.getAttribute('src')
            contentImagesNames.push(src)
            return imgTag
        })

        if (contentImagesNames.length > 0) {
            await Promise.all(contentImagesNames.map(async (imageName, i) => {
                const image = await YandexDrive.downloadFile(`/kaivo/posts/${post?.id}/${imageName}`)
                imgTags[i].setAttribute('src', image)
            }))
        }

        return HTMLToText(html)
    }

    static getCountOfUserCategoryPosts = async (category = '', postsIds = []) => {
        let countOfPosts = 0
        await Promise.all(postsIds.map(async postId => {
            const post = await getDoc(doc(db, 'posts', postId))
            if (post.exists()) {
                const postData = post.data()
                if (postData?.category === category) countOfPosts++
            }
        }))
        return countOfPosts
    }

    static getCollectionSize = async (collectionName, whereCondition) => {
        try {
            const querySnapshot = whereCondition
                ? await getDocs(query(collection(db, collectionName), where(whereCondition?.field, whereCondition?.condiotion, whereCondition?.value)))
                : await getDocs(query(collection(db, collectionName)))
            return querySnapshot.size
        } catch (error) {
            console.error("Ошибка при получении размера коллекции:", error)
            return 0
        }
    }

    static getPopularPosts = async (postsLimit = 2) => {
        try {

            const querySnapshot = await getDocs(query(collection(db, 'posts'), orderBy('likes', 'desc'), limit(postsLimit)))

            const responseDataArray = []

            querySnapshot.forEach(post => {
                if (post.exists()) {
                    responseDataArray.push(post.data())
                }
            })

            const posts = await Promise.all(responseDataArray.map(async post => {
                const content = await this._getPostMedia(post)

                const user = await this.getUserById(post?.userId)

                return { ...post, content, user }
            }))

            return posts
        } catch (error) {
            console.log(defineError(error?.message))
        }
    }

    static addUserToDB = async ({ nickname, id }) => {

        const userTemplate = {
            id,
            nickname,
            userImageSrc: 'default',
            userImageExtension: '',
            coverImageSrc: 'default',
            coverImageExtension: '',
            secondaryText: 'secondary text',
            status: 'status',
            accountInfo: {
                number: 0,
                country: 'RUS'
            },
            interfaceSettings: {
                isBackgroundAnimationEnabled: false
            },
            followers: [],
            likes: 0,
            posts: [],
            subscriptions: []
        }

        const userRef = doc(db, 'users', id)

        await setDoc(userRef, userTemplate)

        await YandexDrive.createFolder(`/kaivo/users%2F${id}`)

        return userTemplate

    }

    static searchUsersByText = async (searchText = '', usersLimit = 4, lastDoc) => {
        try {

            const objWithSize = await getDocs(query(collection(db, 'users'),
                where('nickname', '>=', searchText),
                where('nickname', '<=', searchText + '\uf8ff')
            ))

            const querySnapshot = lastDoc
                ? await getDocs(query(collection(db, 'users'),
                    startAfter(lastDoc),
                    where('nickname', '>=', searchText),
                    where('nickname', '<=', searchText + '\uf8ff'),
                    limit(usersLimit)))
                : await getDocs(query(collection(db, 'users'),
                    where('nickname', '>=', searchText),
                    where('nickname', '<=', searchText + '\uf8ff'),
                    limit(usersLimit)))

            const responseDataArray = []

            querySnapshot.forEach(user => {
                if (user.exists()) {
                    responseDataArray.push(user.data())
                }
            })

            const users = await Promise.all(responseDataArray.map(async user => {
                switch (user.userImageSrc) {
                    case 'default':
                        user.userImageSrc = userImageDefault
                        break;
                    case 'custom':
                        const customImage = await YandexDrive.downloadFile(`/kaivo/users/${user.id}/userImage.${user.userImageExtension}`)
                        user.userImageSrc = customImage
                        break;
                    default:
                        break;
                }
                switch (user.coverImageSrc) {
                    case 'default':
                        user.coverImageSrc = userCoverDefault
                        break;
                    case 'custom':
                        const customImage = await YandexDrive.downloadFile(`/kaivo/users/${user.id}/userCover.${user.coverImageExtension}`)
                        user.coverImageSrc = customImage
                        break;
                    default:
                        break;
                }
                return user
            }))

            return { users, size: objWithSize.size, lastDoc: querySnapshot.docs[querySnapshot.docs.length - 1] }
        } catch (error) {
            console.log(defineError(error.message))
        }
    }

    static searchPostsByText = async (searchText = '', postsLimit = 3, lastDoc) => {
        try {
            const objWithSize = await getDocs(query(collection(db, 'posts'),
                where('title', '>=', searchText),
                where('title', '<=', searchText + '\uf8ff'),
            ))

            const querySnapshot = lastDoc
                ? await getDocs(query(collection(db, 'posts'),
                    startAfter(lastDoc),
                    where('title', '>=', searchText),
                    where('title', '<=', searchText + '\uf8ff'),
                    limit(postsLimit)))
                : await getDocs(query(collection(db, 'posts'),
                    where('title', '>=', searchText),
                    where('title', '<=', searchText + '\uf8ff'),
                    limit(postsLimit)))

            const responseDataArray = []

            querySnapshot.forEach(post => {
                if (post.exists()) {
                    responseDataArray.push(post.data())
                }
            })

            const posts = await Promise.all(responseDataArray.map(async post => {
                const content = await this._getPostMedia(post)
                const user = await this.getUserById(post?.userId)
                return { ...post, content, user }
            }))

            return { posts, size: objWithSize.size, lastDoc: querySnapshot.docs[querySnapshot.docs.length - 1] }
        } catch (error) {
            console.log(defineError(error.message))
        }
    }

    static searchPostsByTag = async (searchTag = '', postsLimit = 3, lastDoc) => {
        try {
            const objWithSize = await getDocs(query(collection(db, 'posts'),
                where('tags', 'array-contains', searchTag),
            ))

            const querySnapshot = lastDoc
                ? await getDocs(query(collection(db, 'posts'),
                    startAfter(lastDoc),
                    where('tags', 'array-contains', searchTag),
                    limit(postsLimit)))
                : await getDocs(query(collection(db, 'posts'),
                    where('tags', 'array-contains', searchTag),
                    limit(postsLimit)))

            const responseDataArray = []

            querySnapshot.forEach(post => {
                if (post.exists()) {
                    responseDataArray.push(post.data())
                }
            })

            const posts = await Promise.all(responseDataArray.map(async post => {
                const content = await this._getPostMedia(post)
                const user = await this.getUserById(post?.userId)
                return { ...post, content, user }
            }))

            return { posts, size: objWithSize.size, lastDoc: querySnapshot.docs[querySnapshot.docs.length - 1] }
        } catch (error) {
            console.log(defineError(error.message))
        }
    }
}