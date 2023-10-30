import { useQuery } from "@tanstack/react-query";

import { BEST_POSTS } from "../service/queryKeys"
import DataSource from "../service/DataSource";

const useBestPosts = (data, postsLimit, orderByConfig) => useQuery({
    queryKey: [BEST_POSTS],
    async queryFn() {
        const { posts, lastDoc, size } = await DataSource.getPosts(data?.lastDoc, postsLimit, orderByConfig)
        return { posts: data?.posts?.length > 0 ? [...data?.posts, ...posts] : posts, lastDoc, size }
    },
    enabled: false
})

export { useBestPosts }