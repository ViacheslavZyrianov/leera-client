export interface User {
    username: string
    avatar?: string
    isPremium: boolean
    uuid: string
    createdAt: string
}

export interface UserMe extends User {
    email: string
    isEmailApproved: boolean,
}
