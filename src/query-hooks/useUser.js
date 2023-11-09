import { useQuery } from "@tanstack/react-query";

import { USER } from "../service/queryKeys";

import DataSource from "../service/DataSource";

import { auth } from "../service/database/firebase";

import { defineError } from "../utils/defineError";

export const useUser = (options = {}) => useQuery({
    queryKey: [USER],
    async queryFn() {
        try {
            const id = await new Promise((resolve, reject) => {
                auth.onAuthStateChanged(userData => {
                    if (userData) {
                        resolve(userData.uid)
                    } else {
                        reject(new Error('PLEASE_LOGIN'))
                    }
                })
            })
            return await DataSource.getUserById(id) ?? null
        } catch (error) {
            console.log(defineError(error?.message))
            return null
        }
    },
    initialData: null,
    ...options
})