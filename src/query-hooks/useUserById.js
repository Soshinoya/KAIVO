import { useQuery } from "@tanstack/react-query";

import DataSource from "../service/DataSource";

export const useUserById = (queryKey, id = '', options = {}) => useQuery({
    queryKey: [queryKey],
    async queryFn() {
        return await DataSource.getUserById(id) ?? null
    },
    ...options
})