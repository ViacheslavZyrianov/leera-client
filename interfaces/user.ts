export interface User {
    username: string
    avatar?: string
    isPremium: boolean
    uuid: string
}

export interface UserMe extends User {
    email: string
    isEmailApproved: boolean,
}
