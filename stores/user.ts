import { defineStore } from 'pinia'
import requestor from '@/composables/requestor'
import { type UserMe } from '@/interfaces/user'

export const useUserStore = defineStore('user', {
    state: () => {
        const me: UserMe = {
            username: '',
            avatar: '',
            isPremium: false,
            uuid: '',
            isEmailApproved: false,
            email: ''
        }
        const isLoggedIn: boolean = false

        return {
            me,
            isLoggedIn
        }
    },
    actions: {
        async getUserMe() {
            const { data } = await requestor<UserMe>(`/user/me`)
            this.me = data
            this.me.avatar = null
            this.isLoggedIn = true
        },
        async getUser(uuid: string) {
            return await requestor(`/user/${uuid}`)
        },
        setDefaultMe() {
            this.me = {
                username: '',
                avatar: '',
                isPremium: false,
                uuid: '',
                isEmailApproved: false,
                email: ''
            }
        },
        logout() {
            const jwtCookie = useCookie('jwt')
            const uuidCookie = useCookie('uuid')
            const router = useRouter()

            jwtCookie.value = null
            uuidCookie.value = null

            this.setDefaultMe()
            this.isLoggedIn = false

            return router.replace('/')
        }
    }
})
