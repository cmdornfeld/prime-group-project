import axios from 'axios';
import { put, takeLatest } from 'redux-saga/effects';

function* editDate(action) {
    try {
        yield axios.put(`/api/admin/date/${action.payload.id}`, action.payload);
        yield put({type: 'GET_EVENT_INFO'})
    } catch (error) {
        console.log('Failed updating event location', error);
    }
}

function* editDateSaga() {
    yield takeLatest('EDIT_DATE', editDate);
}

export default editDateSaga;