import { useQuery } from "@tanstack/react-query";

import DataSource from "../service/DataSource";
import { FEED_POSTS } from "../service/queryKeys";

const useFeedPosts = (data, postsLimit = 10, orderByConfig = {}) => useQuery({
    queryKey: [FEED_POSTS],
    async queryFn() {
        const { posts, lastDoc, size } = await DataSource.getPosts(data?.lastDoc, postsLimit, orderByConfig)
        return { posts: data?.posts?.length > 0 ? [...data?.posts, ...posts] : posts, lastDoc, size }
    },
    enabled: false
})

export { useFeedPosts }