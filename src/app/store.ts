import { Action, combineReducers, configureStore, ThunkAction } from '@reduxjs/toolkit'
import { connectRouter, routerMiddleware } from 'connected-react-router'
import authReducer from 'features/auth/authSlice'
import createSagaMiddleware from 'redux-saga'
import { history } from 'utils'
import counterReducer from '../features/counter/counterSlice'
import rootSaga from './rootSaga'

const rootReducer = combineReducers({
    router: connectRouter(history),
    counter: counterReducer,
    auth: authReducer,
})

const sagaMiddleware = createSagaMiddleware()

export const store = configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(sagaMiddleware, routerMiddleware(history)),
    // dùng default middleware của redux-tookit và thêm middleware là sagaMiddleware
})

// start saga
sagaMiddleware.run(rootSaga)

export type AppDispatch = typeof store.dispatch
export type RootState = ReturnType<typeof store.getState>
export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, RootState, unknown, Action<string>>
