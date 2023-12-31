import { defineStore } from 'pinia'
import requestor from '@/composables/requestor'
import { type UserMe } from '@/interfaces/user'
import { type StoriesInterface } from '@/interfaces/story'

export const useUserStore = defineStore('user', {
    state: () => {
        const me: UserMe = {
            username: '',
            avatar: '',
            isPremium: false,
            uuid: '',
            isEmailApproved: false,
            email: '',
            createdAt: ''
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
            this.isLoggedIn = true
        },
        async getUserMeStories(): Promise<StoriesInterface> {
            const { data } = await requestor<StoriesInterface>(`/user/me/stories`)
            return data
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
                email: '',
                createdAt: ''
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
