import { LoginPayload } from 'features/auth/authSlice'
import { ListResponseUser } from 'models'
import axiosUser from './axiosUser'

const userApi = {
    register(data: LoginPayload): Promise<ListResponseUser> {
        return axiosUser.post('register', data)
    },

    login(data: LoginPayload): Promise<ListResponseUser> {
        return axiosUser.post('login', data)
    },
}

export default userApi
