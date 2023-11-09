import { useQuery, useQueryClient } from "@tanstack/react-query";

import DataSource from "../service/DataSource";

const usePosts = (queryKey, postsLimit = 10, orderByConfig = {}) => {
    const queryClient = useQueryClient()

    const queryData = queryClient.getQueryData([queryKey])

    return useQuery({
        queryKey: [queryKey],
        async queryFn() {
            const { posts, lastDoc, size } = await DataSource.getPosts(queryData?.lastDoc, postsLimit, orderByConfig)
            return { posts: queryData?.posts?.length > 0 ? [...queryData?.posts, ...posts] : posts, lastDoc, size }
        },
        enabled: false
    })
}

export { usePosts }