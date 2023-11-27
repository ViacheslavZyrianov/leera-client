import { defineStore } from 'pinia'
import sfetch from '@/composables/sfetch'

export const useUserMeStore = defineStore('userMe', {
    state: () => ({
        me: {}
    }),
    actions: {
        async postLogin(username: string, password: string) {
            return sfetch('user/login', {
                method: 'POST',
                body: {
                    username,
                    password
                },
            });
        }
    },
})
