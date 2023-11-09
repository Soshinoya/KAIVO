import { useQuery, useQueryClient } from "@tanstack/react-query";

import DataSource from "../service/DataSource";

import { defineError } from "../utils/defineError";

export const useCategoryPosts = (queryKey = '', categoryKeyword = '', postsLimit = 10, options = {}) => {

    const queryClient = useQueryClient()

    const queryData = queryClient.getQueryData([queryKey])

    return useQuery({
        queryKey: [queryKey],
        async queryFn() {
            try {
                const { posts, lastDoc, size } = await DataSource.getCategoryPosts(categoryKeyword, queryData?.lastDoc, postsLimit)
                const currentPosts = queryData?.posts?.length > 0 ? [...queryData.posts, ...posts] : [...posts]
                return { posts: currentPosts, lastDoc, totalPostsCount: size }
            } catch (error) {
                console.error(defineError(error?.message))
                return queryData
            }
        },
        ...options
    })
}