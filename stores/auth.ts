import { defineStore } from 'pinia'
import requestor from '@/composables/requestor'

export const useAuthStore = defineStore('auth', {
    actions: {
        async postLogin(username: string, password: string) {
            return await requestor(
                '/auth/login',
                {
                    method: 'POST',
                    body: {
                        username,
                        password
                    }
                }
            )
        }
    },
})
