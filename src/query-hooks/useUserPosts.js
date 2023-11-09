import { useQuery, useQueryClient } from "@tanstack/react-query";

import DataSource from "../service/DataSource";

import { defineError } from "../utils/defineError";

export const useUserPosts = (queryKey = '', postIds = [], postsLimit = 5, options = {}) => {

    const queryClient = useQueryClient()

    const queryData = queryClient.getQueryData([queryKey])

    return useQuery({
        queryKey: [queryKey],
        async queryFn() {
            try {
                if (!postIds.length > 0) return
                const newPosts = []
                await Promise.all([...postIds].splice(queryData?.lastDocIndex ?? 0, postsLimit).map(async postId => {
                    const post = await DataSource.getPostById(postId)
                    newPosts.push(post)
                }))
                const currentPosts = queryData?.posts?.length > 0 ? [...queryData.posts, ...newPosts] : [...newPosts]
                return { posts: currentPosts, lastDocIndex: currentPosts.length }
            } catch (error) {
                console.error(defineError(error?.message))
            }
        },
        ...options
    })
}