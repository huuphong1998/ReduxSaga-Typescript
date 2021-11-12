import { authSaga } from 'features/auth/authSaga'
import citySaga from 'features/city/citySaga'
import counterSaga from 'features/counter/counterSaga'
import dashboardSaga from 'features/dashboard/dashboradSaga'
import studentSaga from 'features/student/studentSaga'
import { all } from 'redux-saga/effects' // all là một effects của redux-saga

export default function* rootSaga() {
    yield all([counterSaga(), authSaga(), dashboardSaga(), studentSaga(), citySaga()])
}
