export interface ListResponseUser {
    message: string
    data: UserData
}

export interface UserData {
    access_token: string
    expires: string
    user: User
}

export interface User {
    _id: string
    email: string

    createdAt?: string
    updatedAt?: string
}
