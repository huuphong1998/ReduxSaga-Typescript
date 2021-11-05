import { takeEvery, put, delay, takeLatest, call } from '@redux-saga/core/effects'
import { PayloadAction } from '@reduxjs/toolkit'
import { increment, incrementSaga, incrementSagaSuccess } from './counterSlice'
import { fetchCount } from './counterAPI'

// export function* log(action: PayloadAction) {
//     console.log('Log', action)
// }

function* test() {
    yield fetchCount(2) // trả về một Promise
    // and
    yield call(fetchCount, 2) // trả về một effect (js object)
}

function* handleIncrementSaga(action: PayloadAction<number>) {
    console.log('Waiting 1s')
    // Wait 1s
    yield delay(1000)

    console.log('Waiting done, dispatch action')

    // Dispatch action success
    yield put(incrementSagaSuccess(action.payload))
}

export default function* counterSaga() {
    console.log('counter saga')

    // yield takeEvery(incrementSaga.toString(), handleIncrementSaga) // takeEvery nó sẽ lắng nghe action (* ở đây là bất kỳ action nào cũng nghe) cứ mỗi lần
    // mà có action được dispatch lên nó sẽ lắng nghe
    yield takeLatest(incrementSaga.toString(), handleIncrementSaga)
}
