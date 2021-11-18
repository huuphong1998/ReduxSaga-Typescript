import { call, delay, fork, put, take } from '@redux-saga/core/effects'
import { PayloadAction } from '@reduxjs/toolkit'
import userApi from 'api/userApi'
import { push } from 'connected-react-router'
import { ListResponseUser } from 'models'
import { authActions, LoginPayload } from './authSlice'

function* handleLogin(payload: LoginPayload) {
    try {
        // console.log('Handle login', payload)
        const response: ListResponseUser = yield call(userApi.login, payload)
        console.log(response)
        yield put(authActions.loginSuccess(response))
        localStorage.setItem('access_token', response.data.access_token)
        // redirect to admin page
        yield put(push('/admin/dashboard'))
    } catch (error: any) {
        // console.log('error saga', error)
        yield put(authActions.loginFailed(error))
    }
}
function* handleLogout() {
    yield delay(500)
    // console.log('Handle logout')
    localStorage.removeItem('access_token')
    // redirect to login page
    yield put(push('/login'))
}

function* watchLoginFlow() {
    while (true) {
        // console.log('Watch login')
        const isLoggedIn = Boolean(localStorage.getItem('access_token'))
        if (!isLoggedIn) {
            const action: PayloadAction<LoginPayload> = yield take(authActions.login.type)
            yield fork(handleLogin, action.payload)
        }

        yield take(authActions.logout.type)
        yield call(handleLogout)
    }
}

export function* authSaga() {
    yield fork(watchLoginFlow)
}
