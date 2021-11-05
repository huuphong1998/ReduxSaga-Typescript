import { call, delay, fork, put, take } from '@redux-saga/core/effects'
import { PayloadAction } from '@reduxjs/toolkit'
import { push } from 'connected-react-router'
import { authActions, LoginPayload } from './authSlice'

function* handleLogin(payload: LoginPayload) {
    try {
        // console.log('Handle login', payload)
        yield delay(1000)
        localStorage.setItem('access_token', 'fake_token')
        yield put(
            authActions.loginSuccess({
                id: 1,
                name: 'Huu Phong',
            })
        )
        // redirect to admin page
        yield put(push('/admin/dashboard'))
    } catch (error) {
        yield put(authActions.loginFailed(error.message))
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
